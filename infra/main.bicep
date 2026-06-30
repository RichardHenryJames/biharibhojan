// BihariBhojan — cheap + scalable Azure stack.
// Azure Container Apps (scale-to-zero) + Azure SQL (Basic) + ACR + Log Analytics.

targetScope = 'resourceGroup'

@description('Base name used to derive resource names. Lowercase letters/numbers only.')
@minLength(3)
@maxLength(18)
param appName string = 'biharibhojan'

@description('Azure region for all resources.')
param location string = resourceGroup().location

@description('Salt for the SQL server name. Change this to get a fresh server name if a prior name is stuck/locked.')
param dbServerSalt string = 'a'

@description('Azure SQL administrator login.')
param dbAdminLogin string = 'bihariadmin'

@description('Azure SQL administrator password.')
@secure()
param dbAdminPassword string

@description('Application database name.')
param dbName string = 'biharibhojan'

@description('Public IP allowed to reach Azure SQL directly (for prisma db push/seed). Empty = skip.')
param clientIpAddress string = ''

@description('Container image for the app. Required when deployApp is true.')
param containerImage string = ''

@description('Whether to deploy the Container App. Phase 1 (infra+ACR) sets false; phase 2 (after image build) sets true.')
param deployApp bool = true

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
var sqlServerName = toLower('${appName}-sql-${dbServerSalt}-${resourceToken}')
var acrPullRoleId = subscriptionResourceId('Microsoft.Authorization/roleDefinitions', '7f951dda-4ed3-4680-a7ca-43fe172d538d')

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

// User-assigned identity the Container App uses to pull from ACR.
// Granting AcrPull up front (independent of the app) avoids a first-deploy race.
resource appIdentity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: '${appName}-id'
  location: location
  tags: tags
}

resource acrPullAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: acr
  name: guid(acr.id, appIdentity.id, acrPullRoleId)
  properties: {
    principalId: appIdentity.properties.principalId
    roleDefinitionId: acrPullRoleId
    principalType: 'ServicePrincipal'
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

resource containerApp 'Microsoft.App/containerApps@2024-03-01' = if (deployApp) {
  name: '${appName}-app'
  location: location
  tags: tags
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${appIdentity.id}': {}
    }
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
          identity: appIdentity.id
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

output containerAppName string = deployApp ? containerApp.name : ''
output containerAppFqdn string = deployApp ? containerApp.properties.configuration.ingress.fqdn : ''
output acrName string = acr.name
output acrLoginServer string = acr.properties.loginServer
output sqlServerFqdn string = sqlServer.properties.fullyQualifiedDomainName
