# fix-cidades.ps1 — aplicar em toda a pasta cidades/
$scriptDir = $PSScriptRoot
if (-not $scriptDir) { $scriptDir = Get-Location }

$cidadesDir = Join-Path $scriptDir "cidades"

if (-not (Test-Path $cidadesDir)) {
    Write-Host "ERRO: Pasta cidades/ não encontrada em $scriptDir" -ForegroundColor Red
    exit 1
}

$htmls = Get-ChildItem $cidadesDir -Filter "*.html"
$count = 0

$topbar = @"
<header class="sticky-header" role="banner" aria-label="Barra de navegação principal">
<a href="https://edusidegum.github.io/sndlimp/index.html" aria-label="Página inicial SNDLimp" class="topbar-brand">
<span class="topbar-logo-text">☀ SNDLimp<span class="topbar-logo-sub">Limpeza Técnica de Placas Solares</span></span>
</a>
<nav class="menu-dropdown" aria-label="Menu de navegação">
<button class="menu-toggle" aria-label="Abrir menu" id="menuToggle">☰ Menu</button>
<ul class="menu-lista" id="menuLista">
<li><a href="https://edusidegum.github.io/sndlimp/index.html">Início</a></li>
<li><a href="../folder_comercial.html">Nossa Proposta</a></li>
<li><a href="../galeria.html">Galeria</a></li>
<li><a href="../economia.html">Simulador</a></li>
</ul>
</nav>
</header>
"@

foreach ($file in $htmls) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8

    # 1 - Texto do botão
    $content = $content -replace 'Quero saber se posso perder dinheiro',
                                 'Quero simular se posso ter perdido dinheiro'

    # 2 - TOPBAR (substitui o comentário do bloco-includes.js)
    $content = $content -replace '<!-- TOPBAR via bloco-includes.js -->', $topbar

    $content | Set-Content $file.FullName -Encoding UTF8
    $count++
    Write-Host "  ✓ $($file.Name)" -ForegroundColor Green
}

Write-Host "`n✅ $count páginas atualizadas em: $cidadesDir" -ForegroundColor Cyan