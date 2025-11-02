# ⚡ Quick Netlify Redeployment Guide

## 🚀 Fast Track (3 Steps)

### Step 1: Check Readiness
```bash
npm run check-netlify
```

### Step 2: Commit & Push (or Deploy Manually)
```bash
# Option A: Automatic deployment via Git
git add .
git commit -m "Redeploy to Netlify"
git push origin main

# Option B: Manual trigger
# Go to Netlify Dashboard → Deploys → Trigger deploy
```

### Step 3: Verify
- Monitor build logs in Netlify Dashboard
- Test your site: `https://your-site.netlify.app`
- Check API endpoints: `/api/lawyers`, `/api/test-db-connection`

---

## ✅ Pre-Deployment Checklist

### Quick Verification
- [ ] Code is committed (or ready to commit)
- [ ] Build works locally: `npm run build`
- [ ] Environment variables are set in Netlify dashboard
- [ ] `netlify.toml` exists and is configured
- [ ] `.npmrc` exists with `legacy-peer-deps=true`

### Required Environment Variables in Netlify

**Copy these to Netlify Dashboard → Site Settings → Environment Variables:**

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
SUPABASE_JWT_SECRET
MAILERSEND_API_KEY (or SENDGRID_API_KEY)
MAILERSEND_FROM_EMAIL (or SMTP_FROM)
MAILERSEND_FROM_NAME
NOTIFICATION_EMAIL
ADMIN_EMAIL
NODE_VERSION=18
NPM_CONFIG_LEGACY_PEER_DEPS=true
```

---

## 📋 Configuration Status

Your project is already configured with:
- ✅ `netlify.toml` - Build settings and headers
- ✅ `next.config.js` - Next.js optimization
- ✅ `.npmrc` - Legacy peer deps
- ✅ `@netlify/plugin-nextjs` - Next.js plugin
- ✅ Node 18 specified in config

---

## 🔄 Deployment Options

### Option 1: Automatic (Git Push) ⭐ Recommended
```bash
git push origin main
```
Netlify automatically deploys when you push to main branch.

### Option 2: Manual Trigger
1. Netlify Dashboard → Your Site → Deploys
2. Click "Trigger deploy" → "Deploy site"
3. Select branch → Deploy

### Option 3: Netlify CLI
```bash
netlify deploy --prod
```

---

## 🧪 Post-Deployment Tests

### Critical Tests
```bash
# Homepage
curl https://your-site.netlify.app

# Lawyers API
curl https://your-site.netlify.app/api/lawyers

# Database connection
curl https://your-site.netlify.app/api/test-db-connection
```

### Manual Tests
- [ ] Homepage loads
- [ ] Booking form works (`/booking`)
- [ ] Contact form works (`/contact`)
- [ ] Admin dashboard works (`/admin`)
- [ ] Emails are sent correctly

---

## 🐛 Quick Troubleshooting

### Build Fails?
1. Check build logs in Netlify Dashboard
2. Verify Node version is 18
3. Check for TypeScript errors
4. Ensure all dependencies are in `package.json`

### API Routes Fail?
1. Check function logs: Netlify Dashboard → Functions
2. Verify `SUPABASE_SERVICE_ROLE_KEY` is set
3. Test database connection endpoint

### Environment Variables Not Working?
1. Verify variables are set in Netlify dashboard
2. Check variable names are exact (case-sensitive)
3. Redeploy after adding variables
4. Clear cache if needed

---

## 📚 Full Documentation

For detailed setup instructions, see:
- `NETLIFY_REDEPLOY_SETUP.md` - Complete redeployment guide
- `NETLIFY_DEPLOYMENT_GUIDE.md` - Full deployment guide
- `NETLIFY_ENV_VARIABLES.md` - Environment variables reference

---

**Ready?** Run `npm run check-netlify` and then deploy! 🚀

