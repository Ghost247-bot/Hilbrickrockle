# Connecting Namecheap Domain to Netlify

Quick reference guide for connecting your Namecheap domain to your Netlify-hosted website.

## Quick Setup (5 minutes)

### Step 1: Add Domain in Netlify
1. Netlify Dashboard → Your Site → **Domain settings**
2. Click **"Add custom domain"**
3. Enter your domain: `yourdomain.com`
4. Note the DNS instructions Netlify provides

### Step 2: Configure DNS in Namecheap

**Method A: Point to Netlify (Easiest)**

1. Namecheap Dashboard → **Domain List** → Click **"Manage"**
2. Go to **Advanced DNS** tab
3. Add these records:

```
A Record:
Host: @
Value: 75.2.60.5
TTL: Automatic

CNAME Record:
Host: www
Value: your-site-name.netlify.app
TTL: Automatic
```

4. Click **Save** (✓) for each record

**Method B: Use Netlify Nameservers (Recommended)**

1. In Netlify: **Domain settings** → Click **"Set up Netlify DNS"**
2. Copy the 4 nameservers provided
3. In Namecheap:
   - **Domain List** → **Manage** → **Nameservers**
   - Select **"Custom DNS"**
   - Paste the 4 nameservers (one per line)
   - Click **Save**

### Step 3: Wait and Verify

- **Wait:** 1-4 hours for DNS propagation (can take up to 48 hours)
- **Check:** Visit [whatsmydns.net](https://www.whatsmydns.net) to verify propagation
- **Netlify:** Check domain status shows "Verified" with SSL certificate

## Verification Checklist

- ✅ Domain added in Netlify
- ✅ DNS records configured in Namecheap
- ✅ DNS propagated (check with whatsmydns.net)
- ✅ Domain verified in Netlify dashboard
- ✅ SSL certificate provisioned (green checkmark)
- ✅ Site accessible at `https://yourdomain.com`
- ✅ `www` subdomain redirects correctly

## Common Issues

**Issue: Domain not resolving**
- **Fix:** Wait longer (DNS can take 24-48 hours)
- **Check:** Verify DNS records are correct in Namecheap

**Issue: SSL certificate pending**
- **Fix:** Ensure DNS is fully propagated first
- **Wait:** SSL provisioning can take up to 24 hours

**Issue: www subdomain not working**
- **Fix:** Add CNAME record pointing `www` to your Netlify site URL
- **Check:** Ensure no conflicting A record for www

## Namecheap DNS Record Examples

### For yourdomain.com (Root Domain)
```
Type: A Record
Host: @
Value: 75.2.60.5
TTL: Automatic

Type: CNAME Record
Host: www
Value: your-site-name.netlify.app
TTL: Automatic
```

### Alternative: Use Netlify Nameservers
```
Nameserver 1: dns1.p01.nsone.net
Nameserver 2: dns2.p01.nsone.net
Nameserver 3: dns3.p01.nsone.net
Nameserver 4: dns4.p01.nsone.net
```

**Note:** Actual nameservers may vary. Use the ones provided by Netlify in your dashboard.

## Need Help?

- [Netlify DNS Documentation](https://docs.netlify.com/domains-https/netlify-dns/)
- [Namecheap DNS Guide](https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-to-configure-dns-records-for-your-domain/)
- Check DNS propagation: [whatsmydns.net](https://www.whatsmydns.net)

---

**Pro Tip:** Using Netlify nameservers (Method B) gives you better control and faster DNS updates. Netlify also provides free DNS hosting with your domain.

