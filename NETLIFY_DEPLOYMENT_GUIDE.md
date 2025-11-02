# Netlify Deployment Guide

This guide will walk you through deploying your HilbrickRockle law firm website to Netlify.

## Prerequisites

- A Netlify account ([sign up here](https://app.netlify.com/signup))
- A GitHub/GitLab/Bitbucket repository with your code
- Supabase project credentials
- MailerSend API key (or SendGrid as alternative)

## Step 1: Prepare Your Repository

1. **Ensure all changes are committed:**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Verify your `.gitignore` includes:**
   ```
   .env
   .env.local
   .env*.local
   node_modules
   .next
   dist
   ```

## Step 2: Configure Environment Variables

### Required Environment Variables

Go to your Netlify dashboard → Site settings → Environment variables and add:

#### Supabase Configuration (Required)
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_JWT_SECRET=your_jwt_secret_here
```

#### Email Configuration (Required)
Choose one of the following:

**Option A: MailerSend (Recommended)**
```
MAILERSEND_API_KEY=your_mailersend_api_key_here
MAILERSEND_FROM_EMAIL=noreply@yourdomain.com
MAILERSEND_FROM_NAME=HilbrickRockle Legal
NOTIFICATION_EMAIL=admin@yourdomain.com
```

**Option B: SendGrid (Alternative)**
```
SENDGRID_API_KEY=your-sendgrid-api-key
SMTP_FROM=your-verified-sender@yourdomain.com
```

#### Admin Configuration
```
ADMIN_EMAIL=admin@yourdomain.com
```

#### Node Version
```
NODE_VERSION=18
```

### How to Get Your Values:

1. **Supabase Credentials:**
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Select your project
   - Go to **Settings** → **API**
   - Copy:
     - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
     - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
     - `service_role` `secret` key → `SUPABASE_SERVICE_ROLE_KEY`
   - Go to **Settings** → **API** → **JWT Secret** → `SUPABASE_JWT_SECRET`

2. **MailerSend API Key:**
   - Sign up at [MailerSend](https://www.mailersend.com/)
   - Go to **Settings** → **API Tokens**
   - Create a new token with email sending permissions
   - Copy to `MAILERSEND_API_KEY`

## Step 3: Deploy to Netlify

### Option A: Deploy via Git (Recommended)

1. **Connect Repository:**
   - Log in to [Netlify Dashboard](https://app.netlify.com)
   - Click **"Add new site"** → **"Import an existing project"**
   - Choose your Git provider (GitHub, GitLab, or Bitbucket)
   - Select your repository
   - Select the branch (usually `main` or `master`)

2. **Configure Build Settings:**
   Netlify will auto-detect Next.js, but verify:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next` (automatically handled by plugin)
   - **Node version:** `18`

3. **Add Environment Variables:**
   - Click **"Show advanced"** → **"New variable"**
   - Add all environment variables from Step 2
   - Click **"Deploy site"**

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize Site:**
   ```bash
   netlify init
   ```
   Follow the prompts to:
   - Create a new site or link to an existing one
   - Set build command: `npm run build`
   - Set publish directory: `.next`

4. **Set Environment Variables:**
   ```bash
   netlify env:set NEXT_PUBLIC_SUPABASE_URL "https://your-project.supabase.co"
   netlify env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your_anon_key"
   netlify env:set SUPABASE_SERVICE_ROLE_KEY "your_service_role_key"
   netlify env:set SUPABASE_JWT_SECRET "your_jwt_secret"
   netlify env:set MAILERSEND_API_KEY "your_mailersend_key"
   netlify env:set MAILERSEND_FROM_EMAIL "noreply@yourdomain.com"
   netlify env:set MAILERSEND_FROM_NAME "HilbrickRockle Legal"
   netlify env:set NOTIFICATION_EMAIL "admin@yourdomain.com"
   netlify env:set ADMIN_EMAIL "admin@yourdomain.com"
   ```

5. **Deploy:**
   ```bash
   netlify deploy --prod
   ```

## Step 4: Configure Domain (Optional)

1. **Add Custom Domain:**
   - Go to **Site settings** → **Domain management**
   - Click **"Add custom domain"**
   - Enter your domain name
   - Follow DNS configuration instructions

2. **SSL Certificate:**
   - Netlify automatically provisions SSL certificates via Let's Encrypt
   - Certificates are usually ready within a few minutes

## Step 5: Verify Deployment

### Check Build Logs

1. Go to **Deploys** tab in Netlify dashboard
2. Click on the latest deploy
3. Check the build logs for any errors

### Test Your Site

1. **Visit your site URL:**
   - Production: `https://your-site-name.netlify.app`
   - Or your custom domain if configured

2. **Test Key Features:**
   - ✅ Homepage loads correctly
   - ✅ Booking form works (`/booking`)
   - ✅ Contact form works (`/contact`)
   - ✅ Admin dashboard (`/admin`)
   - ✅ API routes respond correctly

3. **Test API Endpoints:**
   ```bash
   # Test lawyers API
   curl https://your-site.netlify.app/api/lawyers
   
   # Test database connection
   curl https://your-site.netlify.app/api/test-db-connection
   ```

## Step 6: Configure Supabase for Production

### Update Supabase URLs

1. Go to **Supabase Dashboard** → **Settings** → **API**
2. Under **Configuration**, check **Allowed Redirect URLs**
3. Add your Netlify URLs:
   ```
   https://your-site.netlify.app/**
   https://your-site.netlify.app/api/auth/callback
   ```

### Database Setup

Ensure your production database has all required tables:
- Run `scripts/database-setup.sql` in Supabase SQL Editor if not already done
- Verify tables exist:
  - `appointments`
  - `contact_messages`
  - `lawyers`
  - `users`
  - `document_links`
  - etc.

## Troubleshooting

### Build Failures

**Issue: Build fails with "Module not found"**
- Solution: Ensure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Issue: Build fails with TypeScript errors**
- Solution: Check `next.config.js` - `typescript.ignoreBuildErrors` is currently `true`
- Review and fix TypeScript errors, then set to `false`

**Issue: Environment variables not working**
- Solution: Ensure all variables are set in Netlify dashboard
- Variables starting with `NEXT_PUBLIC_` are available in browser
- Other variables are only available in API routes

### Runtime Errors

**Issue: "Supabase environment variables not set"**
- Solution: Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Netlify environment variables

**Issue: API routes return 500 errors**
- Solution: Check Netlify function logs in **Functions** tab
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly

**Issue: Email sending fails**
- Solution: Verify MailerSend API key is correct
- Check MailerSend dashboard for sending domain verification
- Ensure `MAILERSEND_FROM_EMAIL` uses verified domain

### Performance Issues

**Issue: Slow page loads**
- Solution: Check Netlify Analytics (if enabled)
- Review image optimization settings
- Consider enabling Edge Functions for API routes

## Configuration Files

### netlify.toml

Your project already includes a `netlify.toml` with:
- ✅ Next.js plugin configuration
- ✅ Build settings
- ✅ Security headers
- ✅ Cache headers for static assets

### next.config.js

Your `next.config.js` includes:
- ✅ Image optimization for Netlify
- ✅ Supabase domain in allowed patterns
- ✅ Netlify domain in allowed patterns
- ✅ Proper webpack configuration

## Continuous Deployment

Once connected to Git:
- Every push to `main` branch triggers a new deployment
- Pull requests create preview deployments automatically
- Build status is shown in GitHub/GitLab

## Monitoring

1. **Netlify Analytics** (if enabled):
   - View site traffic
   - Monitor performance
   - Check error rates

2. **Function Logs:**
   - Go to **Functions** tab
   - View API route execution logs
   - Debug errors in real-time

3. **Deploy Notifications:**
   - Configure email/Slack notifications for deploys
   - Get alerts on build failures

## Additional Resources

- [Netlify Next.js Plugin Documentation](https://docs.netlify.com/integrations/frameworks/nextjs/)
- [Next.js on Netlify](https://www.netlify.com/with/nextjs/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Supabase Production Best Practices](https://supabase.com/docs/guides/getting-started/local-development)

## Support

If you encounter issues:
1. Check Netlify build/deploy logs
2. Verify environment variables are set correctly
3. Test API routes individually
4. Check Supabase dashboard for database issues
5. Review Netlify function logs for runtime errors

---

**Ready to deploy?** Follow the steps above and your site will be live in minutes! 🚀

