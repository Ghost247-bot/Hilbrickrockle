#!/bin/bash

# Netlify Deployment Helper Script
# This script helps you set up and deploy to Netlify

echo "🚀 Netlify Deployment Setup"
echo "============================"
echo ""

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📦 Installing Netlify CLI..."
    npm install -g netlify-cli
    echo "✅ Netlify CLI installed"
else
    echo "✅ Netlify CLI is already installed"
fi

echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Login to Netlify:"
echo "   netlify login"
echo ""
echo "2. Initialize your site:"
echo "   netlify init"
echo ""
echo "3. Set environment variables (use .env.example as reference):"
echo "   netlify env:set NEXT_PUBLIC_SUPABASE_URL \"your_url\""
echo "   netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY \"your_key\""
echo "   netlify env:set SUPABASE_SERVICE_ROLE_KEY \"your_key\""
echo "   netlify env:set SUPABASE_JWT_SECRET \"your_secret\""
echo "   netlify env:set MAILERSEND_API_KEY \"your_key\""
echo "   # ... add all other variables from .env.example"
echo ""
echo "4. Deploy to production:"
echo "   netlify deploy --prod"
echo ""
echo "📚 For detailed instructions, see:"
echo "   - NETLIFY_SETUP_CHECKLIST.md"
echo "   - NETLIFY_DEPLOYMENT_GUIDE.md"
echo ""

