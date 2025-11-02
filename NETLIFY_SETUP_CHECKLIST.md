# ✅ Netlify Setup Checklist

Use this checklist to ensure your application is properly configured for Netlify hosting.

## 📋 Pre-Deployment Checklist

### 1. Repository Setup
- [x] ✅ Code is committed to Git
- [x] ✅ `.gitignore` includes `.env`, `.env.local`, `node_modules`, `.next`
- [x] ✅ Repository is pushed to GitHub/GitLab/Bitbucket

### 2. Configuration Files
- [x] ✅ `netlify.toml` is configured
- [x] ✅ `next.config.js` is optimized for Netlify
- [x] ✅ `.npmrc` exists with `legacy-peer-deps=true`
- [x] ✅ `package.json` includes `@netlify/plugin-nextjs` in devDependencies

### 3. Build Configuration
- [x] ✅ Build command: `npm run build`
- [x] ✅ Node version: `18` (specified in `netlify.toml`)
- [x] ✅ Next.js plugin is configured

## 🔐 Environment Variables Setup

**IMPORTANT:** These must be set in Netlify Dashboard → Site Settings → Environment Variables

### Required Environment Variables

#### Supabase Configuration
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_JWT_SECRET=your_jwt_secret_here
```

**How to get:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project → **Settings** → **API**
3. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`
4. Go to **Settings** → **API** → **JWT Secret** → `SUPABASE_JWT_SECRET`

#### Email Configuration (Choose One)

**Option A: MailerSend (Recommended)**
```
MAILERSEND_API_KEY=your_mailersend_api_key_here
MAILERSEND_FROM_EMAIL=noreply@yourdomain.com
MAILERSEND_FROM_NAME=Your Legal Firm Name
NOTIFICATION_EMAIL=admin@yourdomain.com
```

**Option B: SendGrid (Alternative)**
```
SENDGRID_API_KEY=your-sendgrid-api-key
SMTP_FROM=your-verified-sender@yourdomain.com
NOTIFICATION_EMAIL=admin@yourdomain.com
```

#### Admin Configuration
```
ADMIN_EMAIL=admin@yourdomain.com
```

## 🚀 Deployment Steps

### Option 1: Deploy via Netlify Dashboard (Recommended)

1. **Connect Repository:**
   - Go to [Netlify Dashboard](https://app.netlify.com)
   - Click **"Add new site"** → **"Import an existing project"**
   - Connect to your Git provider (GitHub/GitLab/Bitbucket)
   - Select your repository and branch (usually `main`)

2. **Configure Build Settings:**
   - Build command: `npm run build`
   - Publish directory: Leave empty (plugin handles it)
   - Node version: `18`

3. **Add Environment Variables:**
   - Click **"Show advanced"** → **"New variable"**
   - Add all variables from the list above
   - **Important:** Use exact variable names (case-sensitive)

4. **Deploy:**
   - Click **"Deploy site"**
   - Wait for build to complete (usually 2-5 minutes)

### Option 2: Deploy via Netlify CLI

```bash
# 1. Install Netlify CLI globally
npm install -g netlify-cli

# 2. Login to Netlify
netlify login

# 3. Initialize and link site
netlify init
# Follow prompts to create new site or link existing one

# 4. Set environment variables
netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://your-project.supabase.co"
netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your_anon_key"
netlify env:set SUPABASE_SERVICE_ROLE_KEY "your_service_role_key"
netlify env:set SUPABASE_JWT_SECRET "your_jwt_secret"
netlify env:set MAILERSEND_API_KEY "your_mailersend_key"
netlify env:set MAILERSEND_FROM_EMAIL "noreply@yourdomain.com"
netlify env:set MAILERSEND_FROM_NAME "Your Legal Firm Name"
netlify env:set NOTIFICATION_EMAIL "admin@yourdomain.com"
netlify env:set ADMIN_EMAIL "admin@yourdomain.com"

# 5. Deploy to production
netlify deploy --prod
```

## ✅ Post-Deployment Verification

### 1. Check Build Logs
- [ ] Build completed successfully (no errors)
- [ ] All environment variables are set
- [ ] Build time is reasonable (< 10 minutes)

### 2. Test Site Functionality
- [ ] **Homepage loads:** `https://your-site.netlify.app`
- [ ] **Booking form works:** `/booking`
- [ ] **Contact form works:** `/contact`
- [ ] **Admin dashboard:** `/admin` (if applicable)
- [ ] **Images load correctly**
- [ ] **Navigation works**

### 3. Test API Endpoints
```bash
# Test lawyers API
curl https://your-site.netlify.app/api/lawyers

# Test database connection
curl https://your-site.netlify.app/api/test-db-connection
```

Expected: JSON responses (not 500 errors)

### 4. Test Forms
- [ ] Submit booking form → Check email confirmation
- [ ] Submit contact form → Check email notification
- [ ] Upload documents → Verify they're processed

### 5. Check Supabase Configuration
- [ ] Add Netlify URL to Supabase allowed redirect URLs:
  - Go to Supabase Dashboard → **Settings** → **API**
  - Under **Configuration**, add to **Allowed Redirect URLs**:
    ```
    https://your-site.netlify.app/**
    https://your-site.netlify.app/api/auth/callback
    ```

## 🔧 Troubleshooting

### Build Fails

**Issue: "Module not found"**
- ✅ Solution: Ensure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Issue: "TypeScript errors"**
- ✅ Check build logs for specific errors
- Current config has `typescript.ignoreBuildErrors: true` - review and fix errors

**Issue: "Environment variables not found"**
- ✅ Ensure all `NEXT_PUBLIC_*` variables are set in Netlify dashboard
- Variables must be added before deployment

### Runtime Errors

**Issue: "Supabase environment variables not set"**
- ✅ Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set
- ✅ Check variable names are exact (case-sensitive)

**Issue: API routes return 500 errors**
- ✅ Check Netlify function logs: **Functions** tab → View logs
- ✅ Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly

**Issue: Email sending fails**
- ✅ Verify MailerSend API key is correct
- ✅ Check MailerSend dashboard for domain verification
- ✅ Ensure `MAILERSEND_FROM_EMAIL` uses verified domain

### Performance Issues

**Issue: Slow page loads**
- ✅ Check Netlify Analytics (if enabled)
- ✅ Review image optimization settings
- ✅ Check function execution time in logs

**Issue: Cold starts on API routes**
- ✅ Normal for serverless functions
- ✅ Consider using Edge Functions for frequently used routes

## 📝 Configuration Files Reference

### `netlify.toml`
- ✅ Next.js plugin configured
- ✅ Security headers enabled
- ✅ Cache headers optimized
- ✅ Node version specified

### `next.config.js`
- ✅ Image domains configured (Supabase, Netlify)
- ✅ Image optimization enabled
- ✅ Production settings optimized

### `package.json`
- ✅ Build script: `npm run build`
- ✅ Netlify plugin in devDependencies
- ✅ Node engine: `18.x`

## 🌐 Custom Domain Setup (Optional)

1. **Add Domain:**
   - Netlify Dashboard → **Site Settings** → **Domain management**
   - Click **"Add custom domain"**
   - Enter your domain

2. **Configure DNS:**
   - Follow Netlify's DNS instructions
   - Update your domain's DNS records

3. **SSL Certificate:**
   - Netlify automatically provisions SSL via Let's Encrypt
   - Usually ready within a few minutes

4. **Update Supabase Redirect URLs:**
   - Add your custom domain to Supabase allowed redirect URLs

## 🔄 Continuous Deployment

Once connected to Git:
- ✅ Every push to `main` triggers automatic deployment
- ✅ Pull requests create preview deployments
- ✅ Build status shown in GitHub/GitLab

## 📊 Monitoring

1. **Netlify Analytics** (if enabled):
   - View site traffic
   - Monitor performance
   - Check error rates

2. **Function Logs:**
   - **Functions** tab → View API route execution logs
   - Debug errors in real-time

3. **Deploy Notifications:**
   - Configure email/Slack notifications
   - Get alerts on build failures

## ✨ Quick Reference

### Required Files
- ✅ `netlify.toml` - Netlify configuration
- ✅ `next.config.js` - Next.js configuration
- ✅ `.npmrc` - npm configuration
- ✅ `package.json` - Dependencies and scripts

### Key URLs
- **Netlify Dashboard:** https://app.netlify.com
- **Supabase Dashboard:** https://supabase.com/dashboard
- **MailerSend Dashboard:** https://www.mailersend.com/

### Support Resources
- [Netlify Next.js Plugin Docs](https://docs.netlify.com/integrations/frameworks/nextjs/)
- [Next.js on Netlify](https://www.netlify.com/with/nextjs/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)

---

## 🎯 Deployment Checklist Summary

Before deploying, ensure:
1. ✅ All code is committed and pushed
2. ✅ Environment variables are set in Netlify dashboard
3. ✅ Supabase redirect URLs include your Netlify URL
4. ✅ Database tables are created in Supabase
5. ✅ Email service is configured (MailerSend/SendGrid)

After deploying, verify:
1. ✅ Build succeeds without errors
2. ✅ Site loads correctly
3. ✅ Forms work and send emails
4. ✅ API endpoints respond correctly
5. ✅ Images and assets load properly

---

**Ready to deploy?** Follow this checklist step-by-step! 🚀

