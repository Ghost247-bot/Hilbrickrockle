# 🚀 Quick Setup - Supabase Database

## Your Supabase Project
- **Project URL:** https://ipnypoelihxzwxywpaab.supabase.co
- **Status:** Environment variables updated ✅

## ⚡ One-Time Setup (5 minutes)

### Step 1: Open Supabase SQL Editor

1. Go to: https://supabase.com/dashboard/project/ipnypoelihxzwxywpaab
2. Click **SQL Editor** (left sidebar)
3. Click **New Query**

### Step 2: Run Database Setup

1. Open file: `scripts/database-setup.sql`
2. **Select ALL** content (Ctrl+A / Cmd+A)
3. **Copy** (Ctrl+C / Cmd+C)
4. **Paste** into Supabase SQL Editor
5. Click **Run** button (or Ctrl+Enter)

**✅ Expected:** "Success. No rows returned"

### Step 3: Verify Setup

Run verification:
```bash
npm run verify-db
```

Or test the booking form:
1. `npm run dev`
2. Visit: http://localhost:3000/booking
3. Submit a test booking
4. Check Supabase → Table Editor → `appointments`

---

## ✅ What Gets Created

- **appointments** table - For booking data
- **contact_messages** table - For contact form data  
- **lawyers** table - With 5 sample lawyers (LAW-001 to LAW-005)
- **admins** table - For admin users
- All RLS policies and indexes

---

## 🐛 Troubleshooting

### "relation does not exist"
→ Run the SQL script in Supabase SQL Editor

### "permission denied"
→ SQL script sets up RLS policies automatically

### Booking form still shows 500 error
→ Check browser console for specific error message
→ Visit `/api/test-booking-db` for diagnostics

---

## ✅ After Setup

Once the SQL script runs successfully:
1. ✅ Database tables are ready
2. ✅ Booking form will work
3. ✅ Contact form will work
4. ✅ Emails will be sent via MailerSend
5. ✅ All data stored in Supabase

**You're all set!** 🎉

