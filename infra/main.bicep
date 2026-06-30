// BihariBhojan — cheap + scalable Azure stack.
// Azure Container Apps (scale-to-zero) + PostgreSQL Flexible (Burstable) + ACR + Log Analytics.

targetScope = 'resourceGroup'

@description('Base name used to derive resource names. Lowercase letters/numbers only.')
@minLength(3)
@maxLength(18)
param appName string = 'biharibhojan'

@description('Azure region for all resources.')
param location string = resourceGroup().location

@description('Azure SQL administrator login.')
param dbAdminLogin string = 'bihariadmin'

@description('Azure SQL administrator password.')
@secure()
param dbAdminPassword string

@description('Application database name.')
param dbName string = 'biharibhojan'

@description('Public IP allowed to reach Azure SQL directly (for prisma db push/seed). Empty = skip.')
param clientIpAddress string = ''

@description('Container image. A public placeholder is used on the first deploy, then swapped for the ACR image.')
param containerImage string = 'mcr.microsoft.com/k8se/quickstart:latest'

@description('Minimum replicas. 0 = scale to zero (cheapest).')
@minValue(0)
@maxValue(5)
param minReplicas int = 0

@description('Maximum replicas for scale-out.')
@minValue(1)
@maxValue(20)
param maxReplicas int = 3

var tags = {
  app: appName
  env: 'prod'
  managedBy: 'bicep'
}

var resourceToken = uniqueString(subscription().id, resourceGroup().id, appName)
var acrName = toLower('${appName}acr${resourceToken}')
var sqlServerName = toLower('${appName}-sql-${resourceToken}')

resource logAnalytics 'Microsoft.OperationalInsights/workspaces@2023-09-01' = {
  name: '${appName}-logs'
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'PerGB2018'
    }
    retentionInDays: 30
  }
}

resource acr 'Microsoft.ContainerRegistry/registries@2023-11-01-preview' = {
  name: acrName
  location: location
  tags: tags
  sku: {
    name: 'Basic'
  }
  properties: {
    adminUserEnabled: false
  }
}

resource sqlServer 'Microsoft.Sql/servers@2023-08-01-preview' = {
  name: sqlServerName
  location: location
  tags: tags
  properties: {
    administratorLogin: dbAdminLogin
    administratorLoginPassword: dbAdminPassword
    version: '12.0'
    minimalTlsVersion: '1.2'
    publicNetworkAccess: 'Enabled'
  }
}

resource sqlDatabase 'Microsoft.Sql/servers/databases@2023-08-01-preview' = {
  parent: sqlServer
  name: dbName
  location: location
  tags: tags
  sku: {
    name: 'Basic'
    tier: 'Basic'
    capacity: 5
  }
  properties: {
    collation: 'SQL_Latin1_General_CP1_CI_AS'
    maxSizeBytes: 2147483648
    requestedBackupStorageRedundancy: 'Local'
  }
}

resource sqlAllowAzure 'Microsoft.Sql/servers/firewallRules@2023-08-01-preview' = {
  parent: sqlServer
  name: 'AllowAllAzureServices'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
}

resource sqlAllowClient 'Microsoft.Sql/servers/firewallRules@2023-08-01-preview' = if (!empty(clientIpAddress)) {
  parent: sqlServer
  name: 'AllowClientIp'
  properties: {
    startIpAddress: clientIpAddress
    endIpAddress: clientIpAddress
  }
}

resource caeEnv 'Microsoft.App/managedEnvironments@2024-03-01' = {
  name: '${appName}-env'
  location: location
  tags: tags
  properties: {
    appLogsConfiguration: {
      destination: 'log-analytics'
      logAnalyticsConfiguration: {
        customerId: logAnalytics.properties.customerId
        sharedKey: logAnalytics.listKeys().primarySharedKey
      }
    }
  }
}

var databaseUrl = 'sqlserver://${sqlServer.properties.fullyQualifiedDomainName}:1433;database=${dbName};user=${dbAdminLogin};password=${dbAdminPassword};encrypt=true;trustServerCertificate=false'

resource containerApp 'Microsoft.App/containerApps@2024-03-01' = {
  name: '${appName}-app'
  location: location
  tags: tags
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    managedEnvironmentId: caeEnv.id
    configuration: {
      activeRevisionsMode: 'Single'
      ingress: {
        external: true
        targetPort: 3000
        transport: 'auto'
        allowInsecure: false
        traffic: [
          {
            latestRevision: true
            weight: 100
          }
        ]
      }
      registries: [
        {
          server: acr.properties.loginServer
          identity: 'system'
        }
      ]
      secrets: [
        {
          name: 'database-url'
          value: databaseUrl
        }
      ]
    }
    template: {
      containers: [
        {
          name: appName
          image: containerImage
          resources: {
            cpu: json('0.5')
            memory: '1Gi'
          }
          env: [
            {
              name: 'DATABASE_URL'
              secretRef: 'database-url'
            }
            {
              name: 'NODE_ENV'
              value: 'production'
            }
          ]
        }
      ]
      scale: {
        minReplicas: minReplicas
        maxReplicas: maxReplicas
        rules: [
          {
            name: 'http-scale'
            http: {
              metadata: {
                concurrentRequests: '50'
              }
            }
          }
        ]
      }
    }
  }
}

var acrPullRoleId = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d')

resource acrPullAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: acr
  name: guid(acr.id, containerApp.id, acrPullRoleId)
  properties: {
    principalId: containerApp.identity.principalId
    roleDefinitionId: acrPullRoleId
    principalType: 'ServicePrincipal'
  }
}

output containerAppName string = containerApp.name
output containerAppFqdn string = containerApp.properties.configuration.ingress.fqdn
output acrName string = acr.name
output acrLoginServer string = acr.properties.loginServer
output sqlServerFqdn string = sqlServer.properties.fullyQualifiedDomainName
