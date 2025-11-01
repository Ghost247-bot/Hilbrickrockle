# Quick Fix: No Lawyers in Booking Form

## 🚀 Fastest Solution

1. **Open Supabase Dashboard** → **SQL Editor**
2. **Open** `scripts/comprehensive-lawyers-setup.sql` 
3. **Copy ALL contents** from that file
4. **Paste into Supabase SQL Editor**
5. **Click Run** (or press `Ctrl+Enter`)
6. **Refresh your booking page**

That's it! ✅

---

## 🔍 If That Doesn't Work

### Check 1: Verify Lawyers Were Inserted
In Supabase SQL Editor, run:
```sql
SELECT lawyer_id, name, status 
FROM public.lawyers 
WHERE status = 'active' 
ORDER BY lawyer_id;
```

You should see 9 lawyers. If not, run the comprehensive setup script again.

### Check 2: Test API Endpoint
```bash
npx ts-node scripts/test-lawyers-api.ts
```

### Check 3: Check Browser Console
1. Open booking page
2. Press `F12` to open DevTools
3. Go to **Console** tab
4. Look for errors or logs showing:
   - "Fetching lawyers from /api/lawyers..."
   - "Lawyers data received:"
   - "Number of lawyers:"

### Check 4: Verify Environment Variables
Make sure `.env.local` has:
```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Then **restart your dev server**:
```bash
# Stop server (Ctrl+C) then:
npm run dev
```

---

## 📋 What Each Script Does

| Script | When to Use |
|--------|-------------|
| `comprehensive-lawyers-setup.sql` | **Use this first** - Sets up everything from scratch |
| `quick-insert-lawyers.sql` | Quick fix if table already exists |
| `insert-leadership-team.sql` | Alternative with same leadership team |
| `check-lawyers.ts` | Diagnostic - check what's in database |
| `test-lawyers-api.ts` | Diagnostic - test API endpoint |

---

## ✅ Success Indicators

After running the fix, you should see:
- ✅ 9 lawyers in the dropdown on booking page
- ✅ No "No lawyers available" message
- ✅ Lawyers have names, titles, and practice areas

If you still see issues, check the troubleshooting section in `scripts/FIX_NO_LAWYERS.md`.

