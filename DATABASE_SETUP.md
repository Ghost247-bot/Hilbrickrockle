# Database Setup - Step by Step

## Quick Start (5 minutes)

### Step 1: Open Supabase SQL Editor

1. Go to: https://supabase.com/dashboard
2. Select your project (Haryawn)
3. Click **SQL Editor** in the left sidebar
4. Click **New Query**

### Step 2: Run Database Setup Script

1. Open the file: `scripts/database-setup.sql`
2. **Copy ALL the contents**
3. Paste into Supabase SQL Editor
4. Click **Run** (or press `Ctrl+Enter`)

You should see: "Success. No rows returned"

### Step 3: Verify Setup

Run the verification script:

```bash
npm run verify-db
```

Or manually check:
- Go to Supabase Dashboard → **Table Editor**
- You should see 4 tables: `appointments`, `contact_messages`, `lawyers`, `admins`

---

## What Gets Created

### Tables
1. **appointments** - Stores booking/appointment data
2. **contact_messages** - Stores contact form submissions
3. **lawyers** - Stores lawyer information (with 5 sample lawyers)
4. **admins** - Stores admin user data

### Features
- ✅ Automatic timestamps (`created_at`, `updated_at`)
- ✅ Row Level Security (RLS) enabled
- ✅ Public access for form submissions
- ✅ Foreign key relationships
- ✅ Indexes for performance

---

## Sample Data

The script automatically inserts 5 sample lawyers:

| Lawyer ID | Name           | Practice Areas                    |
|-----------|----------------|-----------------------------------|
| LAW-001   | John Smith     | Corporate Law, M&A                |
| LAW-002   | Sarah Johnson  | Real Estate, Tax Law              |
| LAW-003   | Michael Chen   | Employment Law, Litigation        |
| LAW-004   | Emily Davis    | Tax Law, Corporate Law            |
| LAW-005   | David Wilson   | Real Estate, M&A                  |

You can modify or add more lawyers through the Supabase dashboard.

---

## Troubleshooting

### "relation does not exist" error
- Make sure you're running the script in the correct Supabase project
- Check that you have proper permissions

### Foreign key constraint error
- Run the lawyers table creation first
- The script handles this automatically, but if you get errors, run sections separately

### RLS blocking queries
- The script sets up proper RLS policies
- Public can INSERT to appointments/contact_messages
- Public can SELECT active lawyers
- Authenticated users can READ/UPDATE records

---

## Next Steps After Setup

1. ✅ Test booking form: Visit `/booking` and submit a test appointment
2. ✅ Test contact form: Visit `/contact` and submit a message
3. ✅ Check emails: Verify MailerSend is sending confirmation emails
4. ✅ View data: Check Supabase Table Editor to see your records

---

## Manual Table Checks

If you want to manually verify tables:

```sql
-- Check all tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_type = 'BASE TABLE';

-- Check lawyers
SELECT lawyer_id, name, practice_areas, status 
FROM public.lawyers;

-- Check appointments structure
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'appointments';
```

---

## Adding More Lawyers

You can add lawyers via SQL:

```sql
INSERT INTO public.lawyers (lawyer_id, name, email, practice_areas, bio, experience_years)
VALUES 
  ('LAW-006', 'Jane Doe', 'jane.doe@haryawn.com', 
   ARRAY['Intellectual Property'], 
   'Expert in IP law and patent applications', 7);
```

Or use the Supabase dashboard Table Editor for a visual interface.

