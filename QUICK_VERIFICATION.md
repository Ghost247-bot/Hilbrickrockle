# Quick Verification Steps

## 🚀 All-in-One Verification

Visit this URL in your browser (while dev server is running):
```
http://localhost:3000/api/verify-setup
```

This endpoint checks **everything** automatically:
- ✅ Environment variables
- ✅ Database connection  
- ✅ Table existence
- ✅ Schema correctness
- ✅ RLS policies

---

## 📋 Manual Checklist

### Step 1: Verify Database Schema ✅

**Quick Check:**
```bash
# Visit in browser:
http://localhost:3000/api/verify-setup
```

**What it checks:**
- `appointments` table exists
- `contact_messages` table exists
- `lawyers` table exists
- All required columns present

**If tables missing:**
1. Go to Supabase Dashboard → SQL Editor
2. Copy contents of `scripts/database-setup.sql`
3. Paste and run
4. Refresh verification endpoint

---

### Step 2: Check Supabase Connection ✅

**Verify `.env.local` has:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
```

**Test connection:**
- Visit: `http://localhost:3000/api/verify-setup`
- Check "connection.status" field

**Get your keys:**
- Supabase Dashboard → Settings → API

---

### Step 3: Test Booking Flow ✅

**Test the form:**
1. Visit: `http://localhost:3000/booking`
2. Fill out form
3. Submit
4. Check for:
   - ✅ Success message (not error)
   - ✅ No "Unexpected token" errors in console
   - ✅ Data appears in Supabase `appointments` table

**Expected result:**
- Form submits successfully
- Clear error messages (if any issues)
- No JSON parsing crashes

---

## 🔧 Quick Fixes

### If verification shows "table does not exist"
→ Run `scripts/database-setup.sql` in Supabase SQL Editor

### If verification shows "permission denied"
→ Check RLS policies in `scripts/database-setup.sql`

### If booking form shows JSON error
→ Already fixed! Errors now show clear messages

### If environment variables missing
→ Copy from `.env.example` to `.env.local` and fill in values

---

## 📊 Verification Endpoints

| Endpoint | What it Checks |
|----------|---------------|
| `/api/verify-setup` | Complete setup verification |
| `/api/test-booking-db` | Appointments table specifically |
| `/api/lawyers` | Lawyers table accessibility |

---

## ✅ Success Indicators

When everything is working:
- ✅ `/api/verify-setup` returns `"status": "ok"`
- ✅ Booking form submits without errors
- ✅ Contact form submits without errors
- ✅ No console errors
- ✅ Data visible in Supabase tables

---

**Need detailed help?** See `VERIFICATION_GUIDE.md`

