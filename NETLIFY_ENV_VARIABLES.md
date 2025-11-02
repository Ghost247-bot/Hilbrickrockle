# Netlify Environment Variables Reference

Quick reference for all environment variables needed for Netlify deployment.

## Required Variables

Copy these into Netlify Dashboard → Site settings → Environment variables

### Supabase Configuration

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
SUPABASE_JWT_SECRET=your_jwt_secret_here
```

**Where to find:**
- Supabase Dashboard → Settings → API
- `NEXT_PUBLIC_SUPABASE_URL`: Project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `anon` `public` key
- `SUPABASE_SERVICE_ROLE_KEY`: `service_role` `secret` key (keep secret!)
- `SUPABASE_JWT_SECRET`: Settings → API → JWT Secret

### Email Configuration

**Option A: MailerSend (Recommended)**
```bash
MAILERSEND_API_KEY=your_mailersend_api_key_here
MAILERSEND_FROM_EMAIL=noreply@yourdomain.com
MAILERSEND_FROM_NAME=HilbrickRockle Legal
NOTIFICATION_EMAIL=admin@yourdomain.com
```

**Option B: SendGrid (Alternative)**
```bash
SENDGRID_API_KEY=your-sendgrid-api-key
SMTP_FROM=your-verified-sender@yourdomain.com
```

### Admin Configuration

```bash
ADMIN_EMAIL=admin@yourdomain.com
```

### Build Configuration

```bash
NODE_VERSION=18
NPM_CONFIG_LEGACY_PEER_DEPS=true
```

## Variable Types

### Public Variables (Available in Browser)
Variables starting with `NEXT_PUBLIC_` are exposed to the browser:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Private Variables (Server-Side Only)
These are only available in API routes and server-side code:
- `SUPABASE_SERVICE_ROLE_KEY` ⚠️ **Keep Secret!**
- `SUPABASE_JWT_SECRET` ⚠️ **Keep Secret!**
- `MAILERSEND_API_KEY` ⚠️ **Keep Secret!**
- `SENDGRID_API_KEY` ⚠️ **Keep Secret!**
- `ADMIN_EMAIL`
- `NOTIFICATION_EMAIL`

## Quick Copy-Paste for Netlify Dashboard

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_JWT_SECRET=
MAILERSEND_API_KEY=
MAILERSEND_FROM_EMAIL=
MAILERSEND_FROM_NAME=HilbrickRockle Legal
NOTIFICATION_EMAIL=
ADMIN_EMAIL=
NODE_VERSION=18
NPM_CONFIG_LEGACY_PEER_DEPS=true
```

## Verification Checklist

After setting variables in Netlify:

- [ ] All Supabase variables are set
- [ ] Email service variables are set (MailerSend OR SendGrid)
- [ ] Admin email is set
- [ ] Node version is set to 18
- [ ] Variables marked with ⚠️ are kept secret (not in public repo)

## Testing Variables

After deployment, test that variables are working:

1. **Test Supabase Connection:**
   ```
   https://your-site.netlify.app/api/test-db-connection
   ```

2. **Test Booking Form:**
   - Go to `/booking`
   - Submit a test booking
   - Check email inbox for confirmation

3. **Test Contact Form:**
   - Go to `/contact`
   - Submit a test message
   - Verify in Supabase `contact_messages` table

## Security Notes

- ⚠️ Never commit `.env` or `.env.local` files to Git
- ⚠️ Never expose service role keys or API keys in client-side code
- ⚠️ Use `NEXT_PUBLIC_` prefix only for variables that need to be in the browser
- ⚠️ Rotate keys if accidentally exposed

## Troubleshooting

**"Environment variable not found" errors:**
- Check variable names match exactly (case-sensitive)
- Ensure variables are set in Netlify dashboard
- Redeploy after adding new variables
- For `NEXT_PUBLIC_` variables, clear browser cache

**"Service role key" errors in API routes:**
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set in Netlify (not just local `.env`)
- Check Netlify function logs for detailed errors

**Email sending fails:**
- Verify API key is correct
- Check MailerSend/SendGrid dashboard for domain verification
- Ensure `FROM_EMAIL` uses verified domain

