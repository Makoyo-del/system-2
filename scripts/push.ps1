# scripts/push.ps1
param(
    [string]$message = "chore: update",
    [string]$branch = "main"
)

# Make sure we are inside a git repo
if (-not (git rev-parse --is-inside-work-tree 2>$null)) {
    Write-Host "Not a git repository. Initialize first or run scripts/init.ps1"
    exit 1
}

# Add all changes
git add .

# Commit changes
try {
    git commit -m $message
} catch {
    Write-Host "Nothing to commit"
}

# Push to remote
git push origin $branch

# Show short status
git status --short
