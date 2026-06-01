$dir = "d:\Git\ampstowatts\Ampstowatt"
Set-Location $dir

Write-Host "Starting Clean Slate execution..."

# 1. Clean JS files
$jsFiles = @("script.js", "script.min.js", "tool-page.js", "tool-page.min.js")
foreach ($file in $jsFiles) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw
        
        $indexUI = $content.IndexOf("// ===== UI ENHANCEMENTS FOR PREMIUM DESIGN =====")
        $indexTheme = $content.IndexOf("// ===== LUXURY THEME ENGINE")
        
        $cutIndex = -1
        if ($indexUI -gt 0 -and $indexTheme -gt 0) {
            $cutIndex = [math]::Min($indexUI, $indexTheme)
        } elseif ($indexUI -gt 0) {
            $cutIndex = $indexUI
        } elseif ($indexTheme -gt 0) {
            $cutIndex = $indexTheme
        }
        
        if ($cutIndex -gt 0) {
            $content = $content.Substring(0, $cutIndex)
            Set-Content $file -Value $content
            Write-Host "Cleaned injected UI logic from $file"
        } else {
            Write-Host "$file is already clean."
        }
    }
}

# 2. Inject Native CSS & Cache Busting
$htmlFiles = Get-ChildItem -Path . -Filter "index.html" -Recurse
$newVersion = "?v=" + (Get-Date -Format "yyyyMMddHHmmss")
$count = 0
foreach ($html in $htmlFiles) {
    $content = Get-Content $html.FullName -Raw
    
    # Check if premium-calculator.css is already injected
    if (-not ($content -match "premium-calculator\.css")) {
        # Find the styles.min.css link and append premium-calculator.css right after it
        $content = $content -replace '(<link rel="stylesheet" href="/styles\.min\.css\?v=[a-zA-Z0-9\-]+">)', "`$1`n  <link rel=`"stylesheet`" href=`"/premium-calculator.css$newVersion`">"
    } else {
        # Just update the version strings
        $content = $content -replace "premium-calculator\.css\?v=[a-zA-Z0-9\-]+", "premium-calculator.css$newVersion"
    }
    
    # Cache bust styles.min.css and script.min.css as well
    $content = $content -replace "styles\.min\.css\?v=[a-zA-Z0-9\-]+", "styles.min.css$newVersion"
    $content = $content -replace "script\.min\.css\?v=[a-zA-Z0-9\-]+", "script.min.css$newVersion"
    
    Set-Content $html.FullName -Value $content
    $count++
}
Write-Host "Cache busted and premium CSS injected on $count HTML files."
Write-Host "CLEAN SLATE COMPLETE!"
