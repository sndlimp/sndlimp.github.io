# gerar-cidades.ps1 — v3 com variantes de conteúdo
# Lê: cidades-data.json + variants.json + template_cidade.html
# Gera: cidades/{slug}.html com conteúdo > 35% diferente entre páginas

$scriptDir = $PSScriptRoot
if (-not $scriptDir) { $scriptDir = Get-Location }

$dataPath     = Join-Path $scriptDir "cidades-data.json"
$variantsPath = Join-Path $scriptDir "variants.json"
$templatePath = Join-Path $scriptDir "template_cidade.html"
$outputDir    = Join-Path $scriptDir "..\cidades"

# Validação
foreach ($p in @($dataPath, $variantsPath, $templatePath)) {
  if (-not (Test-Path $p)) { Write-Host "ERRO: $p não encontrado" -ForegroundColor Red; exit 1 }
}

$data     = Get-Content $dataPath -Raw -Encoding UTF8 | ConvertFrom-Json
$variants = Get-Content $variantsPath -Raw -Encoding UTF8 | ConvertFrom-Json
$template = Get-Content $templatePath -Raw -Encoding UTF8

if (-not (Test-Path $outputDir)) { New-Item -ItemType Directory -Path $outputDir -Force | Out-Null }

# Vale + Geo (mesmo do script anterior)
$valeMap = @{
  "novo-hamburgo"="Sinos";"sao-leopoldo"="Sinos";"canoas"="Sinos";"campo-bom"="Sinos"
  "sapiranga"="Sinos";"esteio"="Sinos";"estancia-velha"="Sinos";"dois-irmaos"="Sinos"
  "ivoti"="Sinos";"sapucaia-do-sul"="Sinos";"nova-hartz"="Sinos";"nova-santa-rita"="Sinos"
  "portao"="Sinos";"ararica"="Sinos"
  "teutonia"="Taquari";"colinas"="Taquari";"imigrante"="Taquari";"westfalia"="Taquari";"marata"="Taquari"
}
$geoMap = @{
  "novo-hamburgo"="-29.6875;-51.1328";"sao-leopoldo"="-29.7611;-51.1475"
  "canoas"="-29.9194;-51.1833";"campo-bom"="-29.6797;-51.0569"
  "sapiranga"="-29.6392;-51.0072";"esteio"="-29.8619;-51.1794"
  "estancia-velha"="-29.6519;-51.1742";"dois-irmaos"="-29.5781;-51.0856"
  "ivoti"="-29.5908;-51.1594";"sapucaia-do-sul"="-29.8397;-51.1458"
  "nova-hartz"="-29.5831;-50.9056";"nova-santa-rita"="-29.8575;-51.2750"
  "portao"="-29.7019;-51.2417";"ararica"="-29.6136;-50.9267"
  "teutonia"="-29.4489;-51.8069";"colinas"="-29.3819;-51.8736"
  "imigrante"="-29.3553;-51.7775";"westfalia"="-29.4194;-51.7992"
  "marata"="-29.4508;-51.8311"
}

$h1Variants = @{
  "A" = 'Você instalou placas fotovoltaicas em <em>{cidade}</em> para economizar… certo?'
  "B" = 'Em <em>{cidade}</em>, placa solar limpa é mais dinheiro no fim do mês'
  "C" = 'A geração de energia em <em>{cidade}</em> caiu? O problema pode estar na sujeira'
  "D" = 'Economia real em <em>{cidade}</em>: sua placa solar pode render muito mais'
}

$sectionNames = @("prejuizo","problema","solucao","processo","diferenciais","depoimento","cta")

$patternOrder = @{
  "A" = @("prejuizo","problema","solucao","processo","diferenciais","depoimento","cta")
  "B" = @("problema","prejuizo","processo","solucao","diferenciais","depoimento","cta")
  "C" = @("solucao","problema","prejuizo","diferenciais","processo","depoimento","cta")
  "D" = @("depoimento","problema","solucao","prejuizo","processo","diferenciais","cta")
}

function Build-Section($secName, $vIdx, $cityName, $variants) {
  $sec = $variants.sections.$secName
  if ($secName -eq "depoimento") {
    $html = $sec.texto[$vIdx]
    return $html -replace '{cidade}', $cityName
  }
  if ($secName -eq "cta") {
    $h = $sec.heading[$vIdx]
    $s = $sec.sub[$vIdx] -replace '{cidade}', $cityName
    $b = $sec.botao[$vIdx]
    $waLink = "https://wa.me/555196033200?text=$([System.Uri]::EscapeDataString("Olá! Quero agendar uma limpeza em $cityName."))"
    $html = @"
<section class="section section-dark reveal" style="text-align:center;"><div class="container">
<h2 class="section-title" style="margin-bottom:16px;">$h</h2>
<p class="section-sub" style="margin-bottom:32px;">$s</p>
<a href="$waLink" class="btn-cta-hero" target="_blank" rel="noopener">$b</a>
</div></section>
"@
    return $html
  }
  $h = $sec.heading[$vIdx]
  $s = $sec.sub[$vIdx]
  $c = $sec.cards[$vIdx]
  $isDark = @("prejuizo","solucao","diferenciais","cta") -contains $secName
  $darkClass = if ($isDark) { " section-dark" } else { "" }
  $html = @"
<section class="section$darkClass reveal"><div class="container">
<h2 class="section-title">$h</h2>
<p class="section-sub">$s</p>
$c
</div></section>
"@
  return $html
}

$total = $data.cities.Count
Write-Host "Gerando $total páginas com variantes de conteúdo..." -ForegroundColor Cyan

foreach ($city in $data.cities) {
  $slug = $city.slug; $name = $city.name
  $pattern = $city.pattern; $h1Var = $city.h1_variant

  $vale = if ($valeMap[$slug]) { $valeMap[$slug] } else { "Sinos" }
  $geo = if ($geoMap[$slug]) { $geoMap[$slug] } else { "-29.5;-51.3" }
  $lat,$lng = $geo -split ";"

  # Mapa de variantes para este padrão
  $vMap = $variants.pattern_variant_map.$pattern

  # H1
  $h1Raw = $h1Variants[$h1Var] -replace '{cidade}', $name

  # Hero
  $heroEyebrow = $variants.hero.eyebrow[$vMap.hero_eyebrow]
  $heroSub = $variants.hero.sub[$vMap.hero_sub] -replace '{cidade}', $name

  # Construir seções
  $order = $patternOrder[$pattern]
  $sectionsHtml = ""
  foreach ($secName in $order) {
    $vIdx = $vMap.$secName
    $sectionsHtml += "`n" + (Build-Section $secName $vIdx $name $variants)
  }

  # Meta description (usa primeira frase da section solução como fallback)
  $metaDesc = $city.meta_desc
  if ($metaDesc.Length -gt 160) { $metaDesc = $metaDesc.Substring(0, 157) + "..." }

  # Aplicar placeholders no template
  $page = $template
  $page = $page -replace 'META_DESC_PLACEHOLDER', $metaDesc
  $page = $page -replace 'CIDADE_PLACEHOLDER', $name
  $page = $page -replace 'SLUG_PLACEHOLDER', $slug
  $page = $page -replace 'TITLE_PLACEHOLDER', $city.title
  $page = $page -replace 'VALE_PLACEHOLDER', $vale
  $page = $page -replace 'LAT_PLACEHOLDER', $lat
  $page = $page -replace 'LNG_PLACEHOLDER', $lng
  $page = $page -replace 'H1_PLACEHOLDER', $h1Raw
  $page = $page -replace 'HERO_EYEBROW_PLACEHOLDER', $heroEyebrow
  $page = $page -replace 'HERO_SUB_PLACEHOLDER', $heroSub
  $page = $page -replace 'SECTIONS_PLACEHOLDER', $sectionsHtml

  $outputFile = Join-Path $outputDir "$slug.html"
  $page | Set-Content $outputFile -Encoding UTF8
  Write-Host "  ✓ $slug.html ($name) [padrão $pattern]" -ForegroundColor Green
}

Write-Host "`n✅ $total páginas geradas com conteúdo diferenciado em: $outputDir" -ForegroundColor Cyan