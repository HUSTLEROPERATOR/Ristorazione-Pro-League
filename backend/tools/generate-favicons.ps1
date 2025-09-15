<#
PowerShell script using ImageMagick to generate favicons and png variants
Run from: C:\Users\risto\Desktop\PROGETTO RPL\backend
Requires: ImageMagick (`magick` command available in PATH)
#>

$sourceFolder = "..\..\LOGHI E GRAFICHE"
$outputFolder = ".\public\favicons"

if (-Not (Test-Path $outputFolder)) { New-Item -ItemType Directory -Path $outputFolder | Out-Null }

$tops = @("01U8vspIR4mlslDQvPXMFA.jpg","9qtCJ0izRsajUwT0xiPYaA.webp","ELPANTvsTMKxxom1ptPO3A.webp")

foreach ($file in $tops) {
  $src = Join-Path $sourceFolder $file
  if (-Not (Test-Path $src)) { Write-Warning "Source file not found: $src"; continue }
  $name = [System.IO.Path]::GetFileNameWithoutExtension($file)

  foreach ($size in @(512,192,180,128,64,32,16)) {
    $out = Join-Path $outputFolder "$($name)-${size}.png"
    magick convert "$src" -background none -resize ${size}x${size} -gravity center -extent ${size}x${size} "$out"
    Write-Host "Generated $out"
  }

  # Create ICO from common sizes
  $icoSizes = @(64,32,16)
  $icoInputs = $icoSizes | ForEach-Object { Join-Path $outputFolder "$($name)-${_}.png" }
  $icoOut = Join-Path $outputFolder "$($name).ico"
  magick convert $icoInputs "$icoOut"
  Write-Host "Generated $icoOut"
}

Write-Host "All favicons generated in $outputFolder"; exit 0