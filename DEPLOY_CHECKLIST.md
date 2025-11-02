# Netlify Deployment Checklist

Use this checklist before and after deploying to Netlify.

## Pre-Deployment Checklist

### Code Preparation
- [ ] All code is committed to Git
- [ ] `.env` and `.env.local` are in `.gitignore`
- [ ] No sensitive data is committed to the repository
- [ ] TypeScript errors are resolved (or ignored in config)
- [ ] All dependencies are in `package.json`
- [ ] Build runs successfully locally: `npm run build`

### Environment Variables Preparation
- [ ] Supabase URL and keys are ready
- [ ] Email service API key is ready (MailerSend or SendGrid)
- [ ] Admin email address is determined
- [ ] All email addresses use verified domains

### Repository Setup
- [ ] Code is pushed to Git repository (GitHub/GitLab/Bitbucket)
- [ ] Main branch is up to date
- [ ] Repository is accessible from Netlify

## Netlify Configuration Checklist

### Initial Setup
- [ ] Netlify account created
- [ ] Site created and connected to Git repository
- [ ] Build command set to: `npm run build`
- [ ] Publish directory set to: `.next` (handled by plugin)

### Environment Variables
Add all of these in Netlify Dashboard → Site settings → Environment variables:

**Supabase (Required)**
- [ ] `NEXT_PUBLIC_SUPABASE_URL`
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] `SUPABASE_SERVICE_ROLE_KEY` ⚠️
- [ ] `SUPABASE_JWT_SECRET` ⚠️

**Email (Required - Choose one)**
- [ ] `MAILERSEND_API_KEY` ⚠️ (if using MailerSend)
- [ ] `MAILERSEND_FROM_EMAIL`
- [ ] `MAILERSEND_FROM_NAME`
- [ ] OR `SENDGRID_API_KEY` ⚠️ (if using SendGrid)
- [ ] OR `SMTP_FROM`

**Other (Required)**
- [ ] `NOTIFICATION_EMAIL`
- [ ] `ADMIN_EMAIL`
- [ ] `NODE_VERSION=18`

### Build Configuration
- [ ] Node version set to 18
- [ ] `@netlify/plugin-nextjs` is in `devDependencies` ✅ (already done)
- [ ] `netlify.toml` is configured ✅ (already done)

## First Deployment

### Deploy Steps
- [ ] Click "Deploy site" in Netlify dashboard
- [ ] Monitor build logs for errors
- [ ] Wait for deployment to complete (usually 2-5 minutes)

### Post-Deployment Verification

**Build Verification**
- [ ] Build completed without errors
- [ ] No TypeScript errors in logs
- [ ] No missing dependency warnings

**Site Functionality**
- [ ] Homepage loads: `https://your-site.netlify.app`
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Navigation works

**API Routes**
- [ ] `/api/lawyers` returns data
- [ ] `/api/test-db-connection` works
- [ ] Database connection successful

**Forms**
- [ ] Booking form works (`/booking`)
- [ ] Contact form works (`/contact`)
- [ ] Form submissions save to database
- [ ] Confirmation emails are sent

**Admin Features** (if applicable)
- [ ] Admin login works (`/admin`)
- [ ] Admin dashboard loads
- [ ] Admin can access appointment data

## Supabase Configuration

### Database Setup
- [ ] All tables created (run `scripts/database-setup.sql`)
- [ ] Sample data inserted (lawyers, etc.)
- [ ] Row Level Security (RLS) configured if needed

### Supabase URLs
- [ ] Redirect URLs added in Supabase Dashboard:
  - `https://your-site.netlify.app/**`
  - `https://your-site.netlify.app/api/auth/callback`

### API Settings
- [ ] CORS configured for Netlify domain
- [ ] API rate limits set appropriately

## Email Service Configuration

### MailerSend (if using)
- [ ] Domain verified in MailerSend dashboard
- [ ] API token has correct permissions
- [ ] From email uses verified domain
- [ ] Test email sent successfully

### SendGrid (if using)
- [ ] Sender verified in SendGrid
- [ ] API key has mail send permissions
- [ ] Test email sent successfully

## Custom Domain Setup (Optional)

### Domain Configuration
- [ ] Custom domain added in Netlify
- [ ] DNS records configured:
  - A record or CNAME pointing to Netlify
  - Or use Netlify DNS nameservers
- [ ] SSL certificate provisioned (automatic)
- [ ] Domain verified and active

### Domain Verification
- [ ] Site accessible via custom domain
- [ ] HTTPS working (SSL certificate active)
- [ ] All pages load via custom domain

## Performance & Optimization

### Performance Checks
- [ ] Lighthouse score above 70
- [ ] Images optimized
- [ ] Static assets cached properly
- [ ] API routes respond quickly

### Monitoring
- [ ] Netlify Analytics enabled (optional)
- [ ] Error tracking configured (optional)
- [ ] Deployment notifications set up

## Security Checklist

### Security Headers
- [ ] Security headers configured in `netlify.toml` ✅ (already done)
- [ ] HTTPS enforced
- [ ] No sensitive data in client-side code

### Secrets Management
- [ ] All secrets in Netlify environment variables
- [ ] No secrets in Git repository
- [ ] Service role keys kept secure

## Final Verification

### End-to-End Testing
- [ ] User can book an appointment
- [ ] User receives confirmation email
- [ ] Admin receives notification email
- [ ] Contact form submission works
- [ ] All navigation links work
- [ ] Mobile responsiveness verified

### Documentation
- [ ] Deployment guide documented
- [ ] Environment variables documented
- [ ] Team members have access to Netlify dashboard

## Troubleshooting Common Issues

### If Build Fails
- [ ] Check build logs in Netlify dashboard
- [ ] Verify Node version (should be 18)
- [ ] Check for missing dependencies
- [ ] Verify TypeScript config allows build errors

### If Site Doesn't Load
- [ ] Check deployment status
- [ ] Verify publish directory
- [ ] Check function logs
- [ ] Verify environment variables are set

### If API Routes Fail
- [ ] Check function logs
- [ ] Verify Supabase credentials
- [ ] Test database connection
- [ ] Check CORS settings

### If Emails Don't Send
- [ ] Verify email API key
- [ ] Check MailerSend/SendGrid dashboard
- [ ] Verify domain verification
- [ ] Test with curl or Postman

## Post-Deployment

### Continuous Deployment
- [ ] Automatic deploys enabled on Git push
- [ ] Preview deployments working for PRs
- [ ] Team notified of deployments

### Backup & Recovery
- [ ] Database backups configured in Supabase
- [ ] Code repository backed up
- [ ] Environment variables documented securely

---

**Status Legend:**
- ✅ = Already configured
- ⚠️ = Keep secret, never commit
- [ ] = Action required

**Ready to deploy?** Complete all items in "Pre-Deployment" and "Netlify Configuration" sections first!

