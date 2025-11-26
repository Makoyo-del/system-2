# scripts/dev.ps1
# Navigate to backend
$backendPath = Join-Path ".." "backend"
Set-Location $backendPath

# Activate virtual environment
if ($env:OS -like "*Windows*") {
    .\.venv\Scripts\Activate.ps1
} else {
    source .venv/bin/activate
}

# Load environment variables from .env
if (Test-Path ".env") {
    Get-Content .env | ForEach-Object {
        if ($_ -and -not $_.StartsWith("#")) {
            $pair = $_ -split "=",2
            if ($pair.Length -eq 2) { setx $pair[0] $pair[1] | Out-Null }
        }
    }
}

# Start FastAPI dev server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
