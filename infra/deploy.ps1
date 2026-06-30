<#
  BihariBhojan — one-shot Azure deploy.

  Provisions a cheap + scalable stack and ships the app:
    Azure Container Apps (scale-to-zero) + PostgreSQL Flexible (Burstable) + ACR + Log Analytics.

  Prereqs:  az login   (Docker NOT required — images build in the cloud via `az acr build`).
  Usage:    pwsh ./infra/deploy.ps1
#>
[CmdletBinding()]
param(
  [string]$ResourceGroup  = 'rg-biharibhojan',
  [string]$Location       = 'centralindia',
  [string]$SubscriptionId = '44027c71-593a-4d51-977b-ab0604cb76eb',
  [string]$DeploymentName = 'biharibhojan-infra'
)

$ErrorActionPreference = 'Stop'

# Run an az command and throw if it returns a non-zero exit code.
function Invoke-Az {
  param([Parameter(Mandatory)][string[]]$AzArgs, [switch]$AllowFail)
  & az @AzArgs
  if (-not $AllowFail -and $LASTEXITCODE -ne 0) {
    throw "az $($AzArgs -join ' ') failed with exit code $LASTEXITCODE"
  }
}

$repoRoot = Split-Path $PSScriptRoot -Parent
Push-Location $repoRoot
try {
  Write-Host '==> Selecting subscription...' -ForegroundColor Cyan
  Invoke-Az @('account', 'set', '--subscription', $SubscriptionId)

  Write-Host "==> Ensuring resource group '$ResourceGroup' in $Location..." -ForegroundColor Cyan
  Invoke-Az @('group', 'create', '--name', $ResourceGroup, '--location', $Location, '--output', 'none')

  # Persist the DB password locally (gitignored) so re-runs stay idempotent.
  $secretFile = Join-Path $PSScriptRoot '.pgpassword'
  if ($env:PG_ADMIN_PASSWORD) {
    $env:PG_ADMIN_PASSWORD | Set-Content -Path $secretFile -NoNewline
  }
  elseif (Test-Path $secretFile) {
    $env:PG_ADMIN_PASSWORD = (Get-Content -Path $secretFile -Raw).Trim()
    Write-Host '==> Reusing existing PostgreSQL admin password from infra/.pgpassword'
  }
  else {
    # URL-safe alphanumeric password (no special chars to escape in the connection string),
    # with guaranteed upper/lower/digit to satisfy Postgres complexity rules.
    $pool = (48..57) + (65..90) + (97..122)
    $rand = -join (1..24 | ForEach-Object { [char]($pool | Get-Random) })
    $env:PG_ADMIN_PASSWORD = "Aa1$rand"
    $env:PG_ADMIN_PASSWORD | Set-Content -Path $secretFile -NoNewline
    Write-Host '==> Generated PostgreSQL admin password (saved to infra/.pgpassword):' -ForegroundColor Yellow
    Write-Host "    $env:PG_ADMIN_PASSWORD" -ForegroundColor Yellow
  }

  # Add a temporary firewall rule for this machine so we can push the schema + seed.
  $env:CLIENT_IP = (Invoke-RestMethod -Uri 'https://api.ipify.org')
  Write-Host "==> This machine's public IP: $env:CLIENT_IP"

  # Provision infra. Postgres Flexible Server occasionally returns a transient
  # InternalServerError — retry a few times before giving up.
  $maxAttempts = 3
  for ($attempt = 1; $attempt -le $maxAttempts; $attempt++) {
    Write-Host "==> Provisioning Azure resources (Bicep) - attempt $attempt/$maxAttempts (Postgres can take ~8-10 min)..." -ForegroundColor Cyan
    Invoke-Az @(
      'deployment', 'group', 'create',
      '--resource-group', $ResourceGroup,
      '--name', $DeploymentName,
      '--parameters', 'infra/main.bicepparam',
      '--output', 'none'
    ) -AllowFail

    if ($LASTEXITCODE -eq 0) { break }

    if ($attempt -eq $maxAttempts) {
      throw "Infrastructure deployment failed after $maxAttempts attempts. Inspect: az deployment operation group list -g $ResourceGroup -n $DeploymentName"
    }

    Write-Host '   Deployment failed (often a transient error). Cleaning up any failed SQL server and retrying in 30s...' -ForegroundColor Yellow
    $failed = az sql server list -g $ResourceGroup --query "[?starts_with(name, 'biharibhojan-sql')].name" -o tsv 2>$null
    foreach ($srv in ($failed | Where-Object { $_ })) {
      Invoke-Az @('sql', 'server', 'delete', '-g', $ResourceGroup, '-n', $srv, '--yes') -AllowFail
    }
    Start-Sleep -Seconds 30
  }

  $outputs = az deployment group show -g $ResourceGroup -n $DeploymentName --query properties.outputs -o json | ConvertFrom-Json
  $acrName = $outputs.acrName.value
  $appName = $outputs.containerAppName.value
  $sqlFqdn = $outputs.sqlServerFqdn.value
  $fqdn    = $outputs.containerAppFqdn.value

  if (-not $acrName -or -not $appName -or -not $sqlFqdn) {
    throw "Deployment outputs are incomplete (acr='$acrName', app='$appName', sql='$sqlFqdn')."
  }

  Write-Host '==> Building container image in the cloud (az acr build)...' -ForegroundColor Cyan
  Invoke-Az @('acr', 'build', '--registry', $acrName, '--image', 'biharibhojan:latest', '--file', 'Dockerfile', '.', '--output', 'none')

  Write-Host '==> Applying database schema + seed...' -ForegroundColor Cyan
  $env:DATABASE_URL = "sqlserver://${sqlFqdn}:1433;database=biharibhojan;user=bihariadmin;password=$($env:PG_ADMIN_PASSWORD);encrypt=true;trustServerCertificate=false"
  npx prisma db push --skip-generate
  if ($LASTEXITCODE -ne 0) { throw 'prisma db push failed' }
  npx prisma db seed
  if ($LASTEXITCODE -ne 0) { throw 'prisma db seed failed' }

  Write-Host '==> Pointing the Container App at the freshly built image...' -ForegroundColor Cyan
  Invoke-Az @('containerapp', 'update', '-g', $ResourceGroup, '-n', $appName, '--image', "$acrName.azurecr.io/biharibhojan:latest", '--output', 'none')

  Write-Host ''
  Write-Host "  Deployed!  https://$fqdn" -ForegroundColor Green
  Write-Host ''
}
finally {
  Pop-Location
}
