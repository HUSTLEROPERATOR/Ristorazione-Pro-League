# Loghi - Ristorazione Pro League (RPL)

Questa cartella contiene istruzioni e strumenti per generare favicon e versioni web dei loghi caricati in `LOGHI E GRAFICHE`.

Top 3 selezionati (file originali nella root):
- `01U8vspIR4mlslDQvPXMFA.jpg`
- `9qtCJ0izRsajUwT0xiPYaA.webp`
- `ELPANTvsTMKxxom1ptPO3A.webp`

Requisiti:
- ImageMagick (`magick` o `convert`) oppure `sharp`/`imagemagick` in Node
- PowerShell su Windows

Script suggerito (PowerShell) per generare PNG e ICO dai file sorgente:

```powershell
# Esegui nella cartella backend (o modifica i percorsi)
$sourceFolder = "..\..\LOGHI E GRAFICHE"
$outputFolder = ".\favicons"
New-Item -ItemType Directory -Path $outputFolder -Force | Out-Null
$tops = @("01U8vspIR4mlslDQvPXMFA.jpg","9qtCJ0izRsajUwT0xiPYaA.webp","ELPANTvsTMKxxom1ptPO3A.webp")

foreach ($file in $tops) {
  $src = Join-Path $sourceFolder $file
  if (-Not (Test-Path $src)) { Write-Warning "$src not found"; continue }
  $name = [System.IO.Path]::GetFileNameWithoutExtension($file)
  # Resize and generate PNG sizes
  foreach ($size in @(512,192,128,64,32,16)) {
    $out = Join-Path $outputFolder "$($name)-${size}.png"
    magick convert "$src" -background none -resize ${size}x${size} -gravity center -extent ${size}x${size} "$out"
  }
  # Create ICO (multiple sizes inside)
  $icoOut = Join-Path $outputFolder "$($name).ico"
  magick convert @($tops | ForEach-Object { Join-Path $outputFolder "${name}-${size}.png" }) "$icoOut" -colors 256
}

Write-Host "Favicons generated in $outputFolder"
```

Uso HTML (inclusione nel `head`):

```html
<link rel="icon" type="image/x-icon" href="/favicons/01U8vspIR4mlslDQvPXMFA.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicons/01U8vspIR4mlslDQvPXMFA-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/favicons/01U8vspIR4mlslDQvPXMFA-180.png">
```

Se preferisci, posso convertire direttamente i PNG e generare gli ICO qui nel repo (se ImageMagick non è disponibile sulla tua macchina, posso fornire PNG generati direttamente).