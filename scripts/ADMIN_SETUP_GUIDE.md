# Admin User Setup Guide

Create admin login: **Rogerbeaudry@yahoo.com** / **Lord471@1761**

## ⚡ Quick Method (Recommended)

### Option A: TypeScript Script (Easiest - Creates Everything)

```bash
npm run create-admin-quick
```

**OR**

```bash
npx ts-node scripts/create-admin-via-api.ts
```

This script:
- ✅ Creates the user in Supabase Auth automatically
- ✅ Adds the user to the admins table
- ✅ No Dashboard needed!

**Requirements:**
- `.env.local` file with:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`

---

### Option B: Supabase Dashboard + SQL (Manual)

#### Step 1: Create User in Supabase Auth Dashboard

1. Go to **Supabase Dashboard**
2. Navigate to **Authentication** → **Users**
3. Click **"Add User"** (or **"Invite User"**)
4. Fill in:
   - **Email**: `Rogerbeaudry@yahoo.com`
   - **Password**: `Lord471@1761`
   - ✅ **Auto Confirm User** (check this)
   - ❌ **Send Invite Email** (uncheck - optional)
5. Click **"Create User"**

#### Step 2: Add User to Admins Table

1. Go to **SQL Editor** in Supabase Dashboard
2. Click **"New Query"**
3. Copy and paste the contents of `scripts/quick-create-admin.sql`
4. Click **"Run"** (or press `Ctrl+Enter`)

---

## ✅ Verification

After setup, verify:

1. **Check in Supabase Dashboard:**
   - **Authentication** → **Users** → Should see the email
   - **Table Editor** → `admins` table → Should see the email

2. **Test Login:**
   - Navigate to: `http://localhost:3000/admin/login`
   - Email: `Rogerbeaudry@yahoo.com`
   - Password: `Lord471@1761`
   - Should redirect to `/admin/dashboard`

---

## 🔧 Troubleshooting

### "User already exists"
- ✅ **This is fine!** The script will automatically link the existing user to admins table
- Just run the script again or use the SQL script

### "Missing environment variables"
- Make sure `.env.local` exists in the project root
- Add:
  ```env
  NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
  ```
- Get your keys from: **Supabase Dashboard** → **Settings** → **API**

### "User not found" (SQL Script)
- The user must be created in Auth first
- Use Option A (TypeScript script) which creates everything automatically
- OR follow Option B Step 1 to create in Dashboard first

### "Permission denied" or "RLS policy violation"
- Make sure you're using the **Service Role Key** (not Anon Key)
- Check that RLS policies exist in `scripts/database-setup.sql`
- Run the database setup script if tables don't exist

### Can't log in after setup
1. Clear browser cache and cookies
2. Verify user exists in both `auth.users` AND `public.admins`
3. Check browser console for errors
4. Verify RLS policies allow authenticated admins to read `admins` table

---

## 📋 Quick Reference

**Email**: Rogerbeaudry@yahoo.com  
**Password**: Lord471@1761  
**Login URL**: `/admin/login`

**Files:**
- `scripts/create-admin-via-api.ts` - Auto-creates everything (recommended)
- `scripts/quick-create-admin.sql` - SQL only (requires user in Auth first)
- `scripts/create-admin-user.ts` - Original script (also works)

---

## 🔐 Security Notes

⚠️ **Important:**
- The Service Role Key has full database access - **keep it secret!**
- Never commit `.env.local` to git
- Change the default password after first login
- Consider enabling 2FA for admin accounts in production

---

## Next Steps

After creating the admin user:
1. Log in at `/admin/login`
2. Test access to admin dashboard
3. Manage lawyers, appointments, and other admin functions
4. **Change password** from the default for security

