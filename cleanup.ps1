# Cleanup Script: Remove obsolete root HTML files that have directory counterparts
# This script organizes your project structure like a professional web developer.

$rootDir = "d:\Git\ampstowatts\Ampstowatt"
Set-Location $rootDir

Write-Host "Scanning for duplicate root HTML files..."

$htmlFiles = Get-ChildItem -Path . -Filter "*.html" -File

$cleanedCount = 0

foreach ($file in $htmlFiles) {
    # Skip index.html and calculators.html etc if they don't have a matching folder
    $baseName = $file.BaseName
    
    # Check if a directory with the exact same name as the HTML file exists
    if (Test-Path -Path ".\$baseName" -PathType Container) {
        Write-Host "Found duplicate: $($file.Name) -> Directory '.\$baseName' already exists."
        Remove-Item -Path $file.FullName -Force
        Write-Host "  Deleted: $($file.Name)"
        $cleanedCount++
    }
}

Write-Host ""
Write-Host "Cleanup complete! Removed $cleanedCount obsolete root HTML files."
Write-Host "Your project structure is now professionally organized using clean URL directories."
