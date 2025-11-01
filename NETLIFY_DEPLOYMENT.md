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

## Step 7: Configure Custom Domain with Namecheap

This guide will help you connect your Namecheap domain to your Netlify site.

### Part A: Add Domain to Netlify

1. Log in to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Go to **Site settings** → **Domain management** (or **Domain settings**)
4. Click **"Add custom domain"**
5. Enter your domain name (e.g., `yourdomain.com` or `www.yourdomain.com`)
6. Click **"Verify"**
7. Netlify will show you DNS configuration instructions

### Part B: Configure DNS in Namecheap

#### Option 1: Point to Netlify (Recommended)

**For Root Domain (yourdomain.com):**

1. Log in to your [Namecheap account](https://www.namecheap.com/myaccount/login/)
2. Go to **Domain List** → Click **"Manage"** next to your domain
3. Go to the **Advanced DNS** tab
4. Delete any existing A records for your root domain (if present)

5. **Add A Record:**
   - Click **"Add New Record"**
   - Type: **A Record**
   - Host: `@`
   - Value: Netlify's IP address (usually `75.2.60.5`)
   - TTL: `Automatic` or `30 min`
   - Click **Save** (✓)

6. **Add CNAME Record for www:**
   - Click **"Add New Record"**
   - Type: **CNAME Record**
   - Host: `www`
   - Value: Your Netlify site URL (e.g., `your-site-name.netlify.app`)
   - TTL: `Automatic` or `30 min`
   - Click **Save** (✓)

**Important:** Do NOT include the trailing dot (`.`) in the CNAME value

#### Option 2: Use Netlify DNS (Alternative - Recommended for better control)

1. In Netlify dashboard, go to **Domain settings** → Your domain
2. Click **"Set up Netlify DNS"**
3. Netlify will provide you with nameservers (usually 4 nameservers like `dns1.p01.nsone.net`)
4. Copy these nameservers

5. In Namecheap:
   - Go to **Domain List** → Click **"Manage"** next to your domain
   - Go to **Nameservers** section
   - Select **"Custom DNS"**
   - Enter the nameservers provided by Netlify (one per line)
   - Click **"Save"**

6. Wait for DNS propagation (can take up to 24-48 hours, usually 1-4 hours)

### Part C: Verify and Wait

1. **DNS Propagation Check:**
   - Use online tools like [whatsmydns.net](https://www.whatsmydns.net) to check propagation
   - Enter your domain and check if it points to Netlify

2. **In Netlify:**
   - Go back to **Domain settings**
   - The domain should show "Verified" status
   - SSL certificate will be automatically provisioned (usually within minutes)
   - You'll see a green checkmark when everything is ready

3. **Test Your Domain:**
   - Visit `https://yourdomain.com` (should redirect to your Netlify site)
   - Visit `https://www.yourdomain.com` (should also work)

### Common Namecheap DNS Settings

**For Root Domain (yourdomain.com):**
```
Type    Host    Value                TTL
A       @       75.2.60.5            Automatic
CNAME   www     your-site.netlify.app   Automatic
```

**Or use Netlify Nameservers:**
```
Nameserver 1: dns1.p01.nsone.net
Nameserver 2: dns2.p01.nsone.net
Nameserver 3: dns3.p01.nsone.net
Nameserver 4: dns4.p01.nsone.net
```

### Troubleshooting DNS Issues

**Domain not resolving:**
- Wait 24-48 hours for full DNS propagation
- Clear your browser cache and DNS cache (`ipconfig /flushdns` on Windows)
- Check DNS propagation status at [whatsmydns.net](https://www.whatsmydns.net)

**SSL certificate not provisioning:**
- Ensure DNS is properly configured and propagated
- Wait up to 24 hours for automatic SSL provisioning
- Check domain verification status in Netlify dashboard

**www subdomain not working:**
- Ensure CNAME record points to your Netlify site (not the root domain)
- Make sure there's no conflicting A record for www subdomain
- Verify DNS propagation

**HTTPS redirect not working:**
- Netlify automatically redirects HTTP to HTTPS
- If issues persist, check **Domain settings** → **HTTPS** in Netlify

### Additional Notes

- **DNS Propagation:** Can take 1-48 hours, but usually happens within 1-4 hours
- **SSL Certificate:** Netlify automatically provisions free SSL certificates via Let's Encrypt
- **Subdomains:** You can add additional subdomains in Netlify (e.g., `blog.yourdomain.com`)
- **Email:** If you use email with your domain, keep existing MX records in Namecheap

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

