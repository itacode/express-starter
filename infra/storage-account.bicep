@minLength(3)
@maxLength(24)
@description('Name of the azure container registry (must be globally unique)')
param name string
param location string = resourceGroup().location

resource storageAccount 'Microsoft.Storage/storageAccounts@2021-09-01' = {
  name: name
  location: location
  kind: 'StorageV2'
  sku:  {
    name: 'Standard_RAGRS'
  }
}

output storageAccount object = storageAccount
