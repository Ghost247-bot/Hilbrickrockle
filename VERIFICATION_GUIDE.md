# Setup Verification Guide

This guide helps you verify that your database and API are properly configured.

## Quick Verification (3 Steps)

### Step 1: Verify Database Schema ✅

Run the verification endpoint:
```bash
# Visit in browser or use curl
http://localhost:3000/api/verify-setup
```

Or use curl:
```bash
curl http://localhost:3000/api/verify-setup
```

**What to check:**
- ✅ `appointments` table exists
- ✅ `contact_messages` table exists  
- ✅ `lawyers` table exists
- ✅ All required columns are present

**If tables are missing:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click **SQL Editor** → **New Query**
4. Open `scripts/database-setup.sql`
5. Copy ALL contents
6. Paste and click **Run**
7. Refresh verification endpoint

---

### Step 2: Check Supabase Connection ✅

**Environment Variables Check:**

Verify these are set in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

**How to find your keys:**
1. Go to Supabase Dashboard → Your Project
2. Click **Settings** (gear icon) → **API**
3. Copy:
   - **URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** (click "Reveal") → `SUPABASE_SERVICE_ROLE_KEY`

**Test Connection:**
```bash
# The verification endpoint will test this automatically
# Or manually test:
curl http://localhost:3000/api/test-booking-db
```

**If connection fails:**
- Check `.env.local` file exists in project root
- Verify keys are correct (no extra spaces)
- Restart your dev server after changing env vars
- Check Supabase project is active (not paused)

---

### Step 3: Test Booking Flow ✅

**Manual Testing:**

1. **Start your dev server:**
   ```bash
   npm run dev
   ```

2. **Visit booking page:**
   ```
   http://localhost:3000/booking
   ```

3. **Fill out the form:**
   - Name: Test User
   - Email: test@example.com
   - Date: Any future date
   - Time: Any time
   - Practice Area: Corporate Law
   - (Optional) Select a lawyer

4. **Submit and check:**
   - ✅ Should see success message
   - ✅ No JSON parsing errors in console
   - ✅ Error messages are user-friendly (if any)

5. **Check Supabase:**
   - Go to Supabase Dashboard → **Table Editor**
   - Open `appointments` table
   - You should see your test booking

**Expected Behavior:**

✅ **Success:**
- Form submits successfully
- Success message appears
- Data appears in Supabase table
- Email sent (if MailerSend configured)

❌ **If errors occur:**
- Error message should be clear and helpful
- No "Unexpected token '<'" errors
- Console shows detailed error (not HTML)

---

## Automated Testing

### Full Verification Script

Run this comprehensive check:

```bash
# Check verification endpoint
curl http://localhost:3000/api/verify-setup | jq

# Test booking database connection
curl http://localhost:3000/api/test-booking-db | jq

# Test lawyers API
curl http://localhost:3000/api/lawyers | jq
```

### What Each Test Checks

**`/api/verify-setup`:**
- ✅ Environment variables
- ✅ Database connection
- ✅ Table existence
- ✅ Column structure
- ✅ RLS policies

**`/api/test-booking-db`:**
- ✅ Appointments table exists
- ✅ Can insert records
- ✅ Schema is correct

**`/api/lawyers`:**
- ✅ Lawyers table accessible
- ✅ Returns lawyer list

---

## Common Issues & Solutions

### Issue: "Could not find the table 'public.appointments'"

**Solution:**
```sql
-- Run in Supabase SQL Editor
-- Copy from: scripts/database-setup.sql (lines 10-30)
```

### Issue: "Permission denied" or RLS errors

**Solution:**
```sql
-- Run in Supabase SQL Editor
-- Copy RLS policies from: scripts/database-setup.sql (lines 132-143)
```

### Issue: "Missing environment variables"

**Solution:**
1. Create `.env.local` in project root
2. Copy from `.env.example`
3. Fill in your Supabase credentials
4. Restart dev server

### Issue: "TypeError: fetch failed"

**Solution:**
- Check Supabase URL is correct
- Verify project is not paused
- Check network connection
- Ensure dev server is running

---

## Verification Checklist

Before going to production, verify:

- [ ] All environment variables set
- [ ] Database tables exist (verify via `/api/verify-setup`)
- [ ] Booking form works (`/booking`)
- [ ] Contact form works (`/contact`)
- [ ] Error messages are user-friendly
- [ ] No console errors
- [ ] Data appears in Supabase tables
- [ ] Admin dashboard accessible (`/admin/dashboard`)

---

## Next Steps After Verification

1. ✅ **Add real lawyers** via Supabase dashboard or SQL
2. ✅ **Configure MailerSend** for email notifications
3. ✅ **Set up admin users** via `/admin` panel
4. ✅ **Test email sending** (check spam folder)
5. ✅ **Review RLS policies** for security

---

## Need Help?

Check these files:
- `DATABASE_SETUP.md` - Database setup instructions
- `scripts/database-setup.sql` - Complete SQL script
- `scripts/fix-appointments-table.sql` - Fix common table issues

Visit verification endpoint:
```
http://localhost:3000/api/verify-setup
```

