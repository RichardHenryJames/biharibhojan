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

  # ---- Phase 1: provision infra (ACR, SQL, env, identity) WITHOUT the app ----
  # The Container App is deployed in phase 2 with the real image, so its revision
  # is healthy on first try (no placeholder-image port mismatch).
  $env:DEPLOY_APP = 'false'
  $env:CONTAINER_IMAGE = ''
  $maxAttempts = 3
  for ($attempt = 1; $attempt -le $maxAttempts; $attempt++) {
    Write-Host "==> [Phase 1] Provisioning infra (Bicep) - attempt $attempt/$maxAttempts (SQL can take a few min)..." -ForegroundColor Cyan
    Invoke-Az @(
      'deployment', 'group', 'create',
      '--resource-group', $ResourceGroup,
      '--name', "$DeploymentName-infra",
      '--parameters', 'infra/main.bicepparam',
      '--output', 'none'
    ) -AllowFail

    if ($LASTEXITCODE -eq 0) { break }

    if ($attempt -eq $maxAttempts) {
      throw "Infra deployment failed after $maxAttempts attempts. Inspect: az deployment operation group list -g $ResourceGroup -n $DeploymentName-infra"
    }

    # A cancelled/failed earlier run can leave the SQL logical server with an
    # in-flight control-plane op ('UpsertLogicalServerRequestAlreadyInProgress').
    # Delete it and BLOCK until it's fully gone before retrying (the delete itself
    # queues behind the stuck op, so a fixed sleep isn't enough).
    Write-Host '   Failed (often transient). Cleaning up SQL server and waiting for it to fully delete...' -ForegroundColor Yellow
    $failed = az sql server list -g $ResourceGroup --query "[?starts_with(name, 'biharibhojan-sql')].name" -o tsv 2>$null
    foreach ($srv in ($failed | Where-Object { $_ })) {
      Invoke-Az @('sql', 'server', 'delete', '-g', $ResourceGroup, '-n', $srv, '--yes') -AllowFail
      for ($w = 0; $w -lt 20; $w++) {
        Start-Sleep -Seconds 15
        az sql server show -g $ResourceGroup -n $srv --query 'state' -o tsv 2>$null | Out-Null
        if ($LASTEXITCODE -ne 0) { break } # show fails once the server is gone
      }
    }
    Start-Sleep -Seconds 20
  }

  $infra = az deployment group show -g $ResourceGroup -n "$DeploymentName-infra" --query properties.outputs -o json | ConvertFrom-Json
  $acrName = $infra.acrName.value
  $sqlFqdn = $infra.sqlServerFqdn.value
  if (-not $acrName -or -not $sqlFqdn) {
    throw "Phase 1 outputs incomplete (acr='$acrName', sql='$sqlFqdn')."
  }

  Write-Host '==> Building container image in the cloud (az acr build)...' -ForegroundColor Cyan
  Invoke-Az @('acr', 'build', '--registry', $acrName, '--image', 'biharibhojan:latest', '--file', 'Dockerfile', '.', '--output', 'none')

  Write-Host '==> Applying database schema + seed...' -ForegroundColor Cyan
  $env:DATABASE_URL = "sqlserver://${sqlFqdn}:1433;database=biharibhojan;user=bihariadmin;password=$($env:PG_ADMIN_PASSWORD);encrypt=true;trustServerCertificate=false"
  npx prisma db push --skip-generate
  if ($LASTEXITCODE -ne 0) { throw 'prisma db push failed' }
  npx prisma db seed
  if ($LASTEXITCODE -ne 0) { throw 'prisma db seed failed' }

  # ---- Phase 2: deploy the Container App with the real, freshly-built image ----
  Write-Host '==> [Phase 2] Deploying the Container App with the built image...' -ForegroundColor Cyan
  $env:DEPLOY_APP = 'true'
  $env:CONTAINER_IMAGE = "$acrName.azurecr.io/biharibhojan:latest"
  Invoke-Az @(
    'deployment', 'group', 'create',
    '--resource-group', $ResourceGroup,
    '--name', "$DeploymentName-app",
    '--parameters', 'infra/main.bicepparam',
    '--output', 'none'
  )

  $app = az deployment group show -g $ResourceGroup -n "$DeploymentName-app" --query properties.outputs -o json | ConvertFrom-Json
  $fqdn = $app.containerAppFqdn.value

  # ---- Phase 3: re-attach custom domains ----
  # Redeploying the Container App via Bicep drops custom-domain bindings (they're
  # not modelled in the template). Re-bind any custom domains that already have a
  # succeeded managed certificate, so deploys never take the live domain down.
  Write-Host '==> [Phase 3] Re-attaching custom domains (if any)...' -ForegroundColor Cyan
  $bound = az containerapp hostname list -g $ResourceGroup -n $appName --query "[].name" -o tsv 2>$null
  $certs = az containerapp env certificate list -g $ResourceGroup -n 'biharibhojan-env' --managed-certificates-only -o json 2>$null | ConvertFrom-Json
  foreach ($cert in @($certs | Where-Object { $_.properties.provisioningState -eq 'Succeeded' })) {
    $domain = $cert.properties.subjectName
    if ($bound -contains $domain) {
      Write-Host "   $domain already bound."
      continue
    }
    Write-Host "   Re-binding $domain..."
    az containerapp hostname add -g $ResourceGroup -n $appName --hostname $domain --output none 2>$null
    az containerapp hostname bind -g $ResourceGroup -n $appName --hostname $domain --environment 'biharibhojan-env' --certificate $cert.id --output none 2>$null
  }

  Write-Host ''
  Write-Host "  Deployed!  https://$fqdn" -ForegroundColor Green
  if ($certs) {
    foreach ($cert in @($certs | Where-Object { $_.properties.provisioningState -eq 'Succeeded' })) {
      Write-Host "             https://$($cert.properties.subjectName)" -ForegroundColor Green
    }
  }
  Write-Host ''
}
finally {
  Pop-Location
}
