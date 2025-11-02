# Fix: Database Issues on Netlify (500 Errors)

## Problems
1. **Booking form** returns 500 error on Netlify
2. **Contact form** returns 500 error on Netlify
3. **Lawyers dropdown** shows "No lawyers available" on Netlify
4. All forms work fine on local server

## Root Cause
Netlify is using the **wrong Supabase environment variables**. Your `.env.local` has the correct Supabase credentials, but Netlify needs to be updated with these values.

**ALL issues have the same root cause: Wrong database connection on Netlify!**

## ✅ Solution: Update Netlify Environment Variables

### Step 1: Go to Netlify Dashboard

1. Log in to [Netlify Dashboard](https://app.netlify.com)
2. Select your site
3. Go to **Site settings** → **Build & deploy** → **Environment** → **Environment variables**

### Step 2: Verify/Update These Variables

**CRITICAL - These must be correct:**

```
NEXT_PUBLIC_SUPABASE_URL=https://ipnypoelihxzwxywpaab.supabase.co
```

```
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlwbnlwb2VsaWh4end4eXdwYWFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MDQwMjAsImV4cCI6MjA3NzI4MDAyMH0.HTQ7q5hGdZ-lonbJ6pCXa79SWNG-8eZd38oTbbJv43U
```

**IMPORTANT: Double-check the URL**
- ✅ CORRECT: `ipnypoelihxzwxywpaab.supabase.co`
- ❌ WRONG: `hesqndgvsszpnmyucfka.supabase.co` (this is the OLD project)

### Step 3: Also Verify These Variables

Make sure you also have these set correctly in Netlify:

```
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlwbnlwb2VsaWh4end4eXdwYWFiIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTcwNDAyMCwiZXhwIjoyMDc3MjgwMDIwfQ.1Hh5i5x4MWixSX9vWH_lb-SKCtnkjsWo68rSH2pgR6k
```

```
MAILERSEND_API_KEY=mlsn.bad9c7b273b631cbaf25a64910dc3f421b4413f78deb917fcd4418d92e11e5cb
```

```
MAILERSEND_FROM_EMAIL=noreply@hilbrickrockle.pro
```

```
MAILERSEND_FROM_NAME=Hilbrick&Rockle Legal
```

```
NOTIFICATION_EMAIL=admin@hilbrickrockle.pro
```

### Step 4: Redeploy

After updating environment variables:

1. Go to **Deploys** in Netlify dashboard
2. Click **Trigger deploy** → **Deploy site**
3. Wait for deployment to complete
4. Test the booking page again

## Verify the Fix

### Test 1: Booking Form ✅
1. Visit your Netlify site
2. Go to the booking page
3. Fill out and submit a test booking
4. Should show success message (no more 500 error)
5. Check lawyers dropdown - should show list of lawyers

### Test 2: Contact Form ✅
1. Visit your Netlify site
2. Go to the contact page
3. Fill out and submit the contact form
4. Should show success message (no more 500 error)

### Test 3: API Endpoints ✅
Visit these URLs directly to test:
- `https://your-site.netlify.app/api/lawyers` - should return JSON with lawyers data
- `https://your-site.netlify.app/api/test-db-connection` - should return success status

If issues persist:

1. Check the Netlify deployment logs for any errors
2. Open browser Developer Tools → Console tab → Network tab
3. Look for any JavaScript or API errors
4. Verify environment variables are set correctly in Netlify dashboard

## Additional Notes

- The correct Supabase project URL is: `ipnypoelihxzwxywpaab.supabase.co`
- The old project URL `hesqndgvsszpnmyucfka.supabase.co` is NOT being used anymore
- Make sure your `.env.local` file is NOT committed to git (it's already in `.gitignore`)
- Always set environment variables in Netlify dashboard, never commit them to git

## Database Verification

If you want to verify lawyers exist in the database:

1. Go to: https://supabase.com/dashboard/project/ipnypoelihxzwxywpaab
2. Click **Table Editor** → **lawyers**
3. You should see 5+ active lawyers listed

If no lawyers exist, run the database setup SQL:

1. Go to **SQL Editor** → **New Query**
2. Open `scripts/database-setup.sql` from your local project
3. Copy all contents and paste into SQL Editor
4. Click **Run**

---
## Summary

This is the **complete fix** for all database-related errors on Netlify:
- ✅ Booking form 500 errors
- ✅ Contact form 500 errors  
- ✅ No lawyers available in dropdown

**All caused by incorrect Supabase environment variables on Netlify.**

**Fix:** Update Netlify environment variables to use the correct Supabase project (`ipnypoelihxzwxywpaab.supabase.co` instead of the old one).

---
**Created:** To fix all database 500 errors on Netlify
**Last Updated:** January 2025

