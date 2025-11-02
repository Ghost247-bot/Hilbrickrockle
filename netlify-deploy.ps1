# Netlify Deployment Helper Script (PowerShell)
# This script helps you set up and deploy to Netlify

Write-Host "🚀 Netlify Deployment Setup" -ForegroundColor Cyan
Write-Host "============================" -ForegroundColor Cyan
Write-Host ""

# Check if Netlify CLI is installed
$netlifyInstalled = Get-Command netlify -ErrorAction SilentlyContinue

if (-not $netlifyInstalled) {
    Write-Host "📦 Installing Netlify CLI..." -ForegroundColor Yellow
    npm install -g netlify-cli
    Write-Host "✅ Netlify CLI installed" -ForegroundColor Green
} else {
    Write-Host "✅ Netlify CLI is already installed" -ForegroundColor Green
}

Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Login to Netlify:"
Write-Host "   netlify login" -ForegroundColor Yellow
Write-Host ""
Write-Host "2. Initialize your site:"
Write-Host "   netlify init" -ForegroundColor Yellow
Write-Host ""
Write-Host "3. Set environment variables (use .env.example as reference):"
Write-Host "   netlify env:set NEXT_PUBLIC_SUPABASE_URL `"your_url`"" -ForegroundColor Yellow
Write-Host "   netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY `"your_key`"" -ForegroundColor Yellow
Write-Host "   netlify env:set SUPABASE_SERVICE_ROLE_KEY `"your_key`"" -ForegroundColor Yellow
Write-Host "   netlify env:set SUPABASE_JWT_SECRET `"your_secret`"" -ForegroundColor Yellow
Write-Host "   netlify env:set MAILERSEND_API_KEY `"your_key`"" -ForegroundColor Yellow
Write-Host "   # ... add all other variables from .env.example" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Deploy to production:"
Write-Host "   netlify deploy --prod" -ForegroundColor Yellow
Write-Host ""
Write-Host "📚 For detailed instructions, see:" -ForegroundColor Cyan
Write-Host "   - NETLIFY_SETUP_CHECKLIST.md" -ForegroundColor White
Write-Host "   - NETLIFY_DEPLOYMENT_GUIDE.md" -ForegroundColor White
Write-Host ""

