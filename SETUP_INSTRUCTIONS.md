# Supabase Database Setup Instructions

## Step 1: Update Environment Variables ✅

The environment variables have been updated in `.env.local` with your new Supabase credentials.

## Step 2: Run Database Setup SQL Script

### In Supabase Dashboard:

1. Go to: https://supabase.com/dashboard
2. Select your project (ipnypoelihxzwxywpaab)
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

### Copy and Run This SQL:

Open the file `scripts/database-setup.sql` and copy **ALL** its contents, then:

1. Paste into the SQL Editor
2. Click **Run** (or press `Ctrl+Enter` / `Cmd+Enter`)

**Expected Result:** "Success. No rows returned"

## Step 3: Verify Setup

### Option A: Use Test Endpoint
Visit in browser:
```
http://localhost:3000/api/test-booking-db
```

### Option B: Check Tables Manually

In Supabase Dashboard:
1. Go to **Table Editor**
2. Verify you see these tables:
   - ✅ `appointments`
   - ✅ `contact_messages`
   - ✅ `lawyers` (with 5 sample lawyers)
   - ✅ `admins`

### Option C: Test Booking Form

1. Start dev server: `npm run dev`
2. Visit: http://localhost:3000/booking
3. Fill out and submit the form
4. Check Supabase Table Editor → `appointments` table
5. You should see your booking record

## Step 4: Verify Lawyers Data

1. In Supabase → **Table Editor** → `lawyers`
2. You should see 5 sample lawyers:
   - LAW-001: John Smith
   - LAW-002: Sarah Johnson
   - LAW-003: Michael Chen
   - LAW-004: Emily Davis
   - LAW-005: David Wilson

---

## ✅ Setup Complete Checklist

- [ ] SQL script executed successfully
- [ ] All 4 tables exist (appointments, contact_messages, lawyers, admins)
- [ ] 5 sample lawyers visible in lawyers table
- [ ] Test booking form submission works
- [ ] Booking appears in appointments table
- [ ] Emails are being sent via MailerSend

---

## Troubleshooting

### "Table doesn't exist" error
→ Run the SQL script again in Supabase SQL Editor

### "Permission denied" or "RLS" error
→ The SQL script sets up RLS policies. Make sure it ran completely.

### "Foreign key constraint" error
→ Make sure lawyers table exists before appointments table is created.

### Environment variables not loading
→ Restart your dev server after updating `.env.local`

