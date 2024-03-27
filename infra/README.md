```shell
az deployment group create --mode Complete -g myApp-dev -f .\infra\myApp-main.bicep
```
```shell
az acr build --image express:latest --registry daniacr .
```
