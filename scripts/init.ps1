# scripts/init.ps1
param(
    [string]$repoUrl = ""
)

# Move to backend
$backendPath = Join-Path ".." "backend"
Set-Location $backendPath

# Create virtual environment
python -m venv .venv

# Activate venv
if ($env:OS -like "*Windows*") {
    .\.venv\Scripts\Activate.ps1
} else {
    source .venv/bin/activate
}

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install fastapi uvicorn[standard] supabase-py asyncpg python-dotenv pydantic[dotenv]

# Freeze requirements
pip freeze > requirements.txt

# Create minimal backend files
@"
# backend/.env.example
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_ANON_KEY=
DATABASE_URL=
"@ | Out-File -FilePath ".env.example" -Encoding utf8 -Force

@"
from fastapi import FastAPI

app = FastAPI()

@app.get('/health')
async def health():
    return {'status':'ok'}
"@ | Out-File -FilePath "main.py" -Encoding utf8 -Force

# Move back to project root
Set-Location ..

# Initialize git
git init
if ($repoUrl -ne "") {
    git remote add origin $repoUrl
}

Write-Host "Project bootstrapped successfully. Edit backend/.env with your Supabase keys before running dev server."
