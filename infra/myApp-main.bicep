@allowed([
  'dev'
])
param envName string = 'dev'

var envConfigs = {
  dev: {
    location: 'westus'
    appName: 'myApp-${envName}'
  }
}
var config = envConfigs[envName]

resource storageAccount 'Microsoft.Storage/storageAccounts@2021-09-01' = {
  name: 'danistorageacc'
  location: config.location
  kind: 'StorageV2'
  sku:  {
    name: 'Standard_RAGRS'
  }
}

// module containerRegistry 'container-registry.bicep' = {
//   name: 'daniacr'
//   params: {
//     acrName: 'daniacr'
//     location: config.location
//   }
// }

resource containerRegistry 'Microsoft.ContainerRegistry/registries@2021-12-01-preview' = {
  name: 'daniacr'
  location: config.location
  tags: {
    displayName: 'Display name'
    'container.registry': 'daniacr'
  }
  sku: {
    name: 'Basic'
  }
  properties: {
    // For containerApps it needs to be true
    adminUserEnabled: true
  }
}

resource logAnalyticsWorkspace 'Microsoft.OperationalInsights/workspaces@2021-12-01-preview' = {
  name: '${config.appName}-logs'
  location: config.location
  properties: {
    retentionInDays: 30
    features: {
      searchVersion: 1
    }
    sku: {
      name: 'PerGB2018'
    }
  }
}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: '${config.appName}-appins'
  location: config.location
  kind: 'web'
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: logAnalyticsWorkspace.id
  }
}

resource environment 'Microsoft.App/managedEnvironments@2022-03-01' = {
  name: '${config.appName}-environment'
  location: config.location
  properties: {
    daprAIInstrumentationKey: appInsights.properties.InstrumentationKey
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logAnalyticsWorkspace.properties.customerId
        sharedKey: logAnalyticsWorkspace.listKeys().primarySharedKey
      }
    }
  }
  resource daprComponent 'daprComponents@2022-03-01' = {
    name: 'statestore'
    properties: {
      componentType: 'state.azure.blobstorage'
      version: 'v1'
      ignoreErrors: false
      initTimeout: '5s'
      secrets: [
        {
          name: 'storageaccountkey'
          value: storageAccount.listKeys().keys[0].value
        }
      ]
      metadata: [
        {
          name: 'accountName'
          value: storageAccount.name
        }
        {
          name: 'containerName'
          value: storageAccount.name
        }
        {
          name: 'accountKey'
          secretRef: 'storageaccountkey'
        }
      ]
      scopes: [
        'nodeapp'
      ]
    }
  }
}

resource nodeapp 'Microsoft.App/containerApps@2022-03-01' = {
  name: 'nodeapp'
  location: config.location
  dependsOn: [
    environment::daprComponent
  ]
  properties: {
    managedEnvironmentId: environment.id
    configuration: {
      ingress: {
        external: true
        targetPort: 3000
        transport: 'auto'
      }
      dapr: {
        enabled: true
        appId: 'nodeapp'
        appPort: 3000
      }
      registries: [
        {
          server: containerRegistry.properties.loginServer
          username: containerRegistry.name
          passwordSecretRef: 'container-registry-password'
        }
      ]
      secrets: [
        {
          name: 'container-registry-password'
          value: containerRegistry.listCredentials().passwords[0].value
        }
      ]
    }
    template: {
      containers: [
        {
          image: '${containerRegistry.properties.loginServer}/express:latest'
          name: 'express'
          resources: {
            cpu: json('0.5')
            memory: '1.0Gi'
          }
        }
      ]
      scale: {
        minReplicas: 1
        maxReplicas: 1
      }
    }
  }
}
