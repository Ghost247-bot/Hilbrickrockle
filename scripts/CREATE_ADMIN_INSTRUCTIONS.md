# Creating Admin User - Step by Step Guide

This guide shows you how to create an admin user with the credentials:
- **Email**: Rogerbeaudry@yahoo.com
- **Password**: Lord471@1761

## Method 1: Using TypeScript Script (Recommended)

### Prerequisites
- Node.js installed
- `.env.local` file with your Supabase credentials

### Steps

1. **Make sure your `.env.local` file has:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

2. **Install dependencies if needed:**
   ```bash
   npm install
   ```

3. **Run the script:**
   ```bash
   npx ts-node scripts/create-admin-user.ts
   ```

   Or if ts-node is installed globally:
   ```bash
   ts-node scripts/create-admin-user.ts
   ```

4. **The script will:**
   - Create the user in Supabase Auth
   - Add the user to the `admins` table
   - Display confirmation and login credentials

---

## Method 2: Using Supabase Dashboard + SQL

### Step 1: Create User in Supabase Auth

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Users**
3. Click **Add User** (or **Invite User**)
4. Fill in:
   - **Email**: `Rogerbeaudry@yahoo.com`
   - **Password**: `Lord471@1761`
   - **Auto Confirm User**: ✅ (check this)
   - **Send Invite Email**: ❌ (uncheck if you prefer)
5. Click **Create User**

### Step 2: Add User to Admins Table

1. Go to **SQL Editor** in Supabase Dashboard
2. Click **New Query**
3. Copy and paste the contents of `scripts/create-admin-user.sql`
4. Click **Run** (or press `Ctrl+Enter`)

Alternatively, if you know the User ID:

1. After creating the user, copy the **User UUID** from the user's details page
2. Go to **SQL Editor**
3. Run:
   ```sql
   INSERT INTO public.admins (user_id, email)
   VALUES ('PASTE_USER_ID_HERE', 'rogerbeaudry@yahoo.com')
   ON CONFLICT (user_id) DO UPDATE
   SET email = EXCLUDED.email,
       updated_at = timezone('utc', now());
   ```
   (Replace `PASTE_USER_ID_HERE` with the actual UUID)

---

## Method 3: Using Supabase CLI (Optional)

If you have Supabase CLI installed:

```bash
# Create user via CLI
supabase db execute "scripts/create-admin-user.sql"
```

Note: You'll still need to create the user in Auth first via Dashboard.

---

## Verification

After creating the admin user:

1. **Check in Supabase Dashboard:**
   - Go to **Table Editor** → `admins` table
   - You should see a record with email `rogerbeaudry@yahoo.com`

2. **Test Login:**
   - Navigate to `/admin/login` in your application
   - Use:
     - **Email**: `Rogerbeaudry@yahoo.com`
     - **Password**: `Lord471@1761`
   - You should be redirected to `/admin/dashboard`

---

## Troubleshooting

### "User already exists" Error
- The user already exists in Supabase Auth
- The script will automatically link it to the admins table
- This is safe and normal

### "User does not exist" Error (SQL Method)
- You need to create the user in Supabase Auth first
- Use Method 1 (TypeScript script) or create via Dashboard first

### Can't find Service Role Key
- Go to Supabase Dashboard → **Settings** → **API**
- Find **Service Role** key (⚠️ Keep this secret!)

### Login fails after setup
- Verify the user exists in `auth.users`
- Verify the user exists in `public.admins`
- Check that RLS policies allow authenticated users to read admins table
- Clear browser cache and cookies

---

## Security Notes

⚠️ **Important:**
- The Service Role Key has full database access - keep it secret!
- Change the default password after first login
- Only share admin credentials with trusted personnel
- Consider setting up 2FA for admin accounts

---

## Quick Reference

**Email**: Rogerbeaudry@yahoo.com  
**Password**: Lord471@1761  
**Login URL**: `/admin/login`

