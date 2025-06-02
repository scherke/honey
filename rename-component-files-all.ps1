# Definiere die zu ersetzenden Endungen und ihre neuen Endungen
$patterns = @{
    '\.component\.ts$'   = '.ts'
    '\.component\.html$' = '.html'
    '\.component\.scss$' = '.scss'
}

# Für jede Endung alle passenden Dateien finden und umbenennen
foreach ($pattern in $patterns.Keys) {
    Get-ChildItem -Path . -Recurse -File | Where-Object { $_.Name -match $pattern } | ForEach-Object {
        $newName = $_.FullName -replace $pattern, $patterns[$pattern]
        Rename-Item -Path $_.FullName -NewName $newName
        Write-Host "Renamed $($_.FullName) to $newName"
    }
}
