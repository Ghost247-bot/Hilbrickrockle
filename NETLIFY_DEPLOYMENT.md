# Netlify Deployment Guide

This guide will help you deploy your Next.js application to Netlify.

## Prerequisites

1. A Netlify account (sign up at [netlify.com](https://netlify.com))
2. Your repository hosted on GitHub, GitLab, or Bitbucket
3. Supabase project set up with all required tables
4. MailerSend account (or alternative email service)

## Step 1: Prepare Your Repository

1. Ensure all your changes are committed:
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

## Step 2: Create a New Site on Netlify

1. Log in to [Netlify Dashboard](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect to your Git provider (GitHub, GitLab, or Bitbucket)
4. Select your repository
5. Netlify will auto-detect Next.js and use the `netlify.toml` configuration

## Step 3: Configure Build Settings

Netlify should auto-detect these settings from `netlify.toml`, but verify:

- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: 18.x (set in netlify.toml)

## Step 4: Set Environment Variables ⚠️ CRITICAL

**⚠️ IMPORTANT: Without these environment variables, your build will fail!**

1. In your Netlify site dashboard, go to **Site settings** → **Build & deploy** → **Environment** → **Environment variables**
2. Click **"Add variable"** for each variable below
3. **These must be set before your first deployment**

### Required Variables (MUST SET BEFORE BUILD)

**Critical for Build Success:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

**Required for Full Functionality:**
```
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_JWT_SECRET=your_jwt_secret_here
MAILERSEND_API_KEY=your_mailersend_api_key_here
MAILERSEND_FROM_EMAIL=noreply@yourdomain.com
MAILERSEND_FROM_NAME=Your Legal Firm Name
NOTIFICATION_EMAIL=admin@yourdomain.com
ADMIN_EMAIL=admin@yourdomain.com
```

**Note:** The build will now complete even without env vars (using placeholder), but the app won't function properly. Always set at least `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` for production.

### How to Get Supabase Keys

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ Keep secret!)
   - **JWT Secret** → `SUPABASE_JWT_SECRET`

### How to Get MailerSend Key

1. Go to [MailerSend](https://www.mailersend.com/)
2. Sign in to your account
3. Navigate to **Settings** → **API Tokens**
4. Create a new token or copy existing one
5. Add to `MAILERSEND_API_KEY`

## Step 5: Deploy

1. After setting environment variables, Netlify will automatically trigger a new deployment
2. Or manually trigger: **Deploys** → **Trigger deploy** → **Deploy site**
3. Monitor the build logs in real-time
4. Wait for deployment to complete

## Step 6: Verify Deployment

1. Visit your site URL (format: `https://your-site-name.netlify.app`)
2. Test key functionality:
   - ✅ Homepage loads
   - ✅ Navigation works
   - ✅ Contact form submits
   - ✅ Booking system works
   - ✅ Admin dashboard (if applicable)
   - ✅ API routes respond correctly

## Step 7: Configure Custom Domain (Optional)

1. In Netlify dashboard, go to **Domain settings**
2. Click **"Add custom domain"**
3. Enter your domain name
4. Follow DNS configuration instructions
5. Netlify will automatically provision SSL certificate

## Troubleshooting

### Build Fails

**Error: Missing dependencies**
- Ensure `package.json` includes all dependencies
- Check build logs for specific missing packages

**Error: Build timeout**
- Netlify free tier has 15-minute build limit
- Consider upgrading or optimizing build

**Error: Missing Supabase environment variables / Build fails during page data collection**
- **Symptoms**: Build fails at "Collecting page data" for admin pages with error about missing Supabase env vars
- **Solution**: 
  1. Go to **Site settings** → **Build & deploy** → **Environment** → **Environment variables**
  2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (required)
  3. Ensure variable names match exactly (case-sensitive, including `NEXT_PUBLIC_` prefix)
  4. Redeploy after adding variables
- **Note**: With the latest code changes, builds will complete even without env vars (using placeholder), but admin pages won't work. Always set env vars for production.

### API Routes Not Working

**Issue: API routes return 404**
- The `@netlify/plugin-nextjs` handles this automatically
- If issues persist, check that the plugin is installed

**Issue: Database connection fails**
- Verify `NEXT_PUBLIC_SUPABASE_URL` and keys are correct
- Check Supabase project is active
- Ensure RLS policies allow connections from your domain

### Images Not Loading

**Issue: Images broken**
- Check image paths are correct
- Verify `next.config.js` has proper image domains
- Ensure images are in `public/` folder or properly referenced

### Email Not Sending

**Issue: Contact/booking emails not received**
- Verify `MAILERSEND_API_KEY` is set correctly
- Check MailerSend domain verification status
- Review MailerSend dashboard for delivery logs

## Performance Optimization

### Recommended Netlify Settings

1. **Enable Edge Functions** (if needed):
   - Go to **Functions** in dashboard
   - Configure edge function regions

2. **Enable Image Optimization**:
   - Already configured in `next.config.js`
   - Netlify handles Next.js image optimization automatically

3. **Enable Form Handling** (if not using API routes):
   - Go to **Forms** in dashboard
   - Configure form notifications

## Continuous Deployment

Netlify automatically deploys when you push to your main branch. To customize:

1. Go to **Site settings** → **Build & deploy**
2. Configure branch to deploy (default: `main`)
3. Set deploy contexts if needed (production, staging, etc.)

## Security Checklist

- ✅ Environment variables are set in Netlify (not committed to git)
- ✅ `SUPABASE_SERVICE_ROLE_KEY` is secret and only in Netlify
- ✅ `.env.local` is in `.gitignore`
- ✅ Security headers configured in `netlify.toml`
- ✅ HTTPS enforced (automatic with Netlify)

## Additional Resources

- [Netlify Next.js Documentation](https://docs.netlify.com/integrations/frameworks/nextjs/)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)

## Support

If you encounter issues:
1. Check Netlify build logs
2. Review Next.js documentation
3. Verify environment variables
4. Test locally with production environment variables

---

**Note**: Remember to never commit `.env.local` or any files containing secrets to your repository.

