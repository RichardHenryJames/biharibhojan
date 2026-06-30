using './main.bicep'

param appName = 'biharibhojan'
param dbAdminLogin = 'bihariadmin'
param dbName = 'biharibhojan'
param dbServerSalt = readEnvironmentVariable('DB_SERVER_SALT', 'a')

// Secret + per-machine values come from environment variables (set by deploy.ps1).
param dbAdminPassword = readEnvironmentVariable('PG_ADMIN_PASSWORD')
param clientIpAddress = readEnvironmentVariable('CLIENT_IP', '')

// Phase 1 (infra+ACR) sets DEPLOY_APP=false; phase 2 (after image build) sets true with CONTAINER_IMAGE.
param deployApp = bool(readEnvironmentVariable('DEPLOY_APP', 'true'))
param containerImage = readEnvironmentVariable('CONTAINER_IMAGE', '')

// Cheapest posture: scale to zero when idle, burst up to 3 under load.
param minReplicas = 0
param maxReplicas = 3
