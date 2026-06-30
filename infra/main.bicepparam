using './main.bicep'

param appName = 'biharibhojan'
param dbAdminLogin = 'bihariadmin'
param dbName = 'biharibhojan'

// Secret + per-machine values come from environment variables (set by deploy.ps1).
param dbAdminPassword = readEnvironmentVariable('PG_ADMIN_PASSWORD')
param clientIpAddress = readEnvironmentVariable('CLIENT_IP', '')

// Cheapest posture: scale to zero when idle, burst up to 3 under load.
param minReplicas = 0
param maxReplicas = 3
