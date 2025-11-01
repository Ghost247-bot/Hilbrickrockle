# Fix: No Lawyers Showing in Booking Form

## Problem
The booking form shows "No lawyers available at the moment" even though the API endpoint is working correctly.

## Quick Fix (Recommended)

**Run the comprehensive setup script in Supabase:**

1. Open **Supabase Dashboard** → **SQL Editor**
2. Click **New Query**
3. Copy **ALL** contents from `scripts/comprehensive-lawyers-setup.sql`
4. Paste and click **Run** (or press `Ctrl+Enter`)
5. **Refresh your booking page**

This script will:
- ✅ Create the lawyers table if needed
- ✅ Set up correct RLS policies
- ✅ Insert 9 active lawyers
- ✅ Verify everything is working

## Diagnosis Options

### Option 1: Quick Check Script
Run the diagnostic script to check if lawyers exist:

```bash
npx ts-node scripts/check-lawyers.ts
```

This will tell you:
- How many lawyers are in the database
- How many are active
- What their statuses are

### Option 2: Test API Endpoint
Test if the API is working:

```bash
npx ts-node scripts/test-lawyers-api.ts
```

This will check:
- If the `/api/lawyers` endpoint is accessible
- What data it returns
- If there are any errors

### Option 3: Manual Database Check
1. Go to your Supabase Dashboard
2. Navigate to **Table Editor** → `lawyers` table
3. Check if there are any rows and their `status` values

## Solutions

### Solution 1: Comprehensive Setup (Best Option)
**Use this if you're not sure what's wrong:**

1. Open Supabase Dashboard → SQL Editor
2. Run `scripts/comprehensive-lawyers-setup.sql`
3. This ensures everything is set up correctly

### Solution 2: Quick Insert (If Table Already Exists)
If the table exists but is empty:

1. Open Supabase Dashboard → SQL Editor
2. Run `scripts/quick-insert-lawyers.sql`
3. This inserts lawyers and fixes RLS policies

### Solution 2: Activate Existing Lawyers
If lawyers exist but are inactive:

```sql
-- Update all lawyers to active status
UPDATE public.lawyers 
SET status = 'active' 
WHERE status IN ('inactive', 'on_leave');
```

### Solution 3: Verify RLS Policies
If lawyers exist and are active but still not showing, check RLS policies:

```sql
-- Check if RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' AND tablename = 'lawyers';

-- Verify the public read policy exists
SELECT * FROM pg_policies 
WHERE tablename = 'lawyers' AND schemaname = 'public';
```

If the policy doesn't exist, run:

```sql
-- Recreate the public read policy
DROP POLICY IF EXISTS "Allow public to read active lawyers" ON public.lawyers;
CREATE POLICY "Allow public to read active lawyers"
  ON public.lawyers FOR SELECT
  TO public
  USING (status = 'active');
```

## Verification

After running the fix:

1. **Refresh the booking page** in your browser
2. **Check the browser console** for any errors
3. **Run the diagnostic script again**:
   ```bash
   npx ts-node scripts/check-lawyers.ts
   ```

The booking form should now show the list of available lawyers in the dropdown.

## Troubleshooting

### Still not working?

1. **Check API Response**: Open browser DevTools → Network tab → Look for `/api/lawyers` request
   - Status should be `200`
   - Response should have a `lawyers` array

2. **Check Server Logs**: Look at your Next.js server console for warnings about "No active lawyers found"

3. **Verify Database Connection**: 
   - Check `.env.local` has correct `SUPABASE_SERVICE_ROLE_KEY`
   - The key must have service role permissions (bypasses RLS)

4. **Check Table Exists**:
   ```sql
   SELECT EXISTS (
     SELECT FROM information_schema.tables 
     WHERE table_schema = 'public' 
     AND table_name = 'lawyers'
   );
   ```

## Related Files
- `scripts/quick-insert-lawyers.sql` - Quick insert script
- `scripts/insert-leadership-team.sql` - Full leadership team insert
- `scripts/check-lawyers.ts` - Diagnostic script
- `scripts/migrations/001_create_lawyers_table.sql` - Table creation migration

