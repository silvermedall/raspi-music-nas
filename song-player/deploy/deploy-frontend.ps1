param(
  [string] $HostName = "naspi",
  [string] $RemoteTmp = "/tmp/mp3frontend-dist",
  [string] $RemoteWebRoot = "/home/pi/mp3frontend"
)

$ErrorActionPreference = "Stop"

$frontendRoot = Resolve-Path (Join-Path $PSScriptRoot "..\frontend")
Push-Location $frontendRoot
try {
  npm.cmd run build
} finally {
  Pop-Location
}

ssh $HostName "rm -rf $RemoteTmp && mkdir -p $RemoteTmp"
scp -r "$frontendRoot\dist\*" "${HostName}:$RemoteTmp/"
ssh $HostName "set -e; sudo find $RemoteWebRoot -mindepth 1 -maxdepth 1 -exec rm -rf {} +; sudo cp -r $RemoteTmp/. $RemoteWebRoot/; sudo find $RemoteWebRoot -type d -exec chmod 755 {} +; sudo find $RemoteWebRoot -type f -exec chmod 644 {} +; sudo chown -R www-data:www-data $RemoteWebRoot; sudo nginx -t; sudo systemctl reload nginx"
