# 🚀 Netlify Redeployment Setup Guide

Quick guide to prepare and execute a successful Netlify redeployment.

## 📋 Pre-Deployment Checklist

### 1. Verify Code Status

```bash
# Check current changes
git status

# Review uncommitted changes
git diff

# If ready, commit changes
git add .
git commit -m "Prepare for Netlify redeployment"
git push origin main
```

### 2. Verify Configuration Files

All these files should exist and be properly configured:

- ✅ `netlify.toml` - Netlify configuration
- ✅ `next.config.js` - Next.js configuration
- ✅ `.npmrc` - npm configuration (`legacy-peer-deps=true`)
- ✅ `package.json` - Dependencies and scripts
- ✅ `.gitignore` - Excludes `.env`, `.env.local`, `node_modules`, `.next`

### 3. Build Test (Local)

```bash
# Clean previous builds
rm -rf .next
rm -rf node_modules/.cache

# Install dependencies
npm install

# Test build locally
npm run build

# If build succeeds, you're ready!
```

### 4. Environment Variables Verification

**Required in Netlify Dashboard → Site Settings → Environment Variables:**

#### Supabase (Required)
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_JWT_SECRET
```

#### Email Service (Required - Choose One)

**Option A: MailerSend**
```
MAILERSEND_API_KEY
MAILERSEND_FROM_EMAIL
MAILERSEND_FROM_NAME
NOTIFICATION_EMAIL
```

**Option B: SendGrid**
```
SENDGRID_API_KEY
SMTP_FROM
NOTIFICATION_EMAIL
```

#### Admin Configuration
```
ADMIN_EMAIL
```

#### Build Configuration
```
NODE_VERSION=18
NPM_CONFIG_LEGACY_PEER_DEPS=true
```

## 🔄 Redeployment Methods

### Method 1: Automatic (Git Push)

If your site is connected to Git:

1. **Commit and push changes:**
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

2. **Netlify will automatically:**
   - Detect the push
   - Start a new build
   - Deploy when complete

3. **Monitor deployment:**
   - Go to Netlify Dashboard → Deploys
   - Watch build logs in real-time

### Method 2: Manual Trigger (Netlify Dashboard)

1. **Go to Netlify Dashboard:**
   - Visit https://app.netlify.com
   - Select your site

2. **Trigger redeploy:**
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Deploy site"**
   - Select branch (usually `main`)
   - Click **"Deploy"**

3. **Clear cache (optional):**
   - Check **"Clear cache and deploy site"** if needed

### Method 3: Netlify CLI

```bash
# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Login (if not already logged in)
netlify login

# Link to existing site (if not linked)
netlify link

# Deploy to production
netlify deploy --prod

# Or deploy with cache clearing
netlify deploy --prod --build
```

## ⚙️ Configuration Files Status

### netlify.toml ✅
- Build command: `npm run build`
- Next.js plugin: `@netlify/plugin-nextjs`
- Node version: `18`
- Security headers configured
- Cache headers optimized

### next.config.js ✅
- Image optimization enabled
- Supabase domains allowed
- Netlify domains allowed
- Production settings optimized

### package.json ✅
- Build script: `npm run build`
- Netlify plugin in devDependencies
- Node engine: `18.x`

## 🔍 Post-Deployment Verification

### 1. Check Build Status

- ✅ Build completed without errors
- ✅ Build time is reasonable (< 10 minutes)
- ✅ No TypeScript errors (or ignored if configured)
- ✅ All environment variables are available

### 2. Test Site Functionality

**Critical Pages:**
- [ ] Homepage loads: `https://your-site.netlify.app`
- [ ] Booking page: `/booking`
- [ ] Contact page: `/contact`
- [ ] Admin dashboard: `/admin` (if applicable)

**API Endpoints:**
```bash
# Test lawyers API
curl https://your-site.netlify.app/api/lawyers

# Test database connection
curl https://your-site.netlify.app/api/test-db-connection
```

**Forms:**
- [ ] Booking form submits successfully
- [ ] Contact form submits successfully
- [ ] Confirmation emails are sent
- [ ] Admin notifications are sent

### 3. Check Function Logs

1. Go to Netlify Dashboard → **Functions** tab
2. Review logs for any errors
3. Check execution times
4. Verify environment variables are accessible

### 4. Verify Supabase Configuration

1. **Redirect URLs:**
   - Go to Supabase Dashboard → Settings → API
   - Under **Allowed Redirect URLs**, ensure:
     ```
     https://your-site.netlify.app/**
     https://your-site.netlify.app/api/auth/callback
     ```

2. **Database Tables:**
   - Verify all required tables exist
   - Check that data is accessible

## 🐛 Troubleshooting

### Build Fails

**Issue: "Module not found"**
```bash
# Solution: Clean install
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "Update dependencies"
git push
```

**Issue: "TypeScript errors"**
- Check `next.config.js` - `typescript.ignoreBuildErrors` is `true`
- Review build logs for specific errors
- Fix TypeScript errors or keep ignoring if intentional

**Issue: "Environment variable not found"**
- Verify all variables are set in Netlify dashboard
- Check variable names are exact (case-sensitive)
- Redeploy after adding variables

### Runtime Errors

**Issue: API routes return 500**
1. Check Netlify function logs
2. Verify `SUPABASE_SERVICE_ROLE_KEY` is set
3. Test database connection endpoint

**Issue: "Supabase not configured"**
- Verify `NEXT_PUBLIC_SUPABASE_URL` is set
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set
- Check browser console for errors

**Issue: Email sending fails**
- Verify MailerSend/SendGrid API key
- Check domain verification in email service dashboard
- Ensure `FROM_EMAIL` uses verified domain

### Performance Issues

**Issue: Slow cold starts**
- Normal for serverless functions
- Consider Edge Functions for frequently used routes
- Optimize API route code

**Issue: Slow page loads**
- Check Netlify Analytics
- Review image optimization
- Check bundle size

## 📝 Quick Commands Reference

```bash
# Check git status
git status

# Commit and push
git add .
git commit -m "Prepare for redeployment"
git push origin main

# Test build locally
npm run build

# Deploy via CLI
netlify deploy --prod

# Check deployment status
netlify status
```

## 🔐 Security Checklist

Before deploying:
- [ ] No secrets committed to Git
- [ ] All `.env` files are in `.gitignore`
- [ ] Service role keys only in Netlify environment variables
- [ ] API keys are kept secret
- [ ] HTTPS is enforced (automatic with Netlify)

## 🎯 Quick Redeployment Steps

1. ✅ **Commit changes:** `git add . && git commit -m "Redeploy" && git push`
2. ✅ **Or trigger manually:** Netlify Dashboard → Deploys → Trigger deploy
3. ✅ **Monitor build:** Watch logs in real-time
4. ✅ **Verify deployment:** Test critical pages and API endpoints
5. ✅ **Check logs:** Review function logs for any errors

## 📞 Support Resources

- **Netlify Dashboard:** https://app.netlify.com
- **Netlify Docs:** https://docs.netlify.com
- **Next.js on Netlify:** https://www.netlify.com/with/nextjs/
- **Build Logs:** Netlify Dashboard → Deploys → Select deploy → Build log

---

**Ready to redeploy?** Follow the steps above and monitor the deployment! 🚀

