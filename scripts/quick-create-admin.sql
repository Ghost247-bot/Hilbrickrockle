-- ============================================
-- QUICK CREATE ADMIN USER
-- ============================================
-- This script provides BOTH methods in one file
-- Run this AFTER creating the user in Supabase Auth Dashboard
-- ============================================

-- METHOD 1: If user already exists in auth.users
-- This will find the user and add them to admins table
DO $$
DECLARE
    v_user_id uuid;
    v_email text := 'rogerbeaudry@yahoo.com';
BEGIN
    -- Find the user in auth.users
    SELECT id INTO v_user_id
    FROM auth.users
    WHERE LOWER(email) = LOWER(v_email)
    LIMIT 1;

    -- If user exists, add to admins table
    IF v_user_id IS NOT NULL THEN
        -- Insert or update admin record
        INSERT INTO public.admins (user_id, email)
        VALUES (v_user_id, v_email)
        ON CONFLICT (user_id) DO UPDATE
        SET email = EXCLUDED.email,
            updated_at = timezone('utc', now());
        
        RAISE NOTICE '✅ Admin user created/updated successfully!';
        RAISE NOTICE '   User ID: %', v_user_id;
        RAISE NOTICE '   Email: %', v_email;
    ELSE
        RAISE NOTICE '';
        RAISE NOTICE '⚠️  User with email % does not exist in auth.users.', v_email;
        RAISE NOTICE '';
        RAISE NOTICE '📋 TO CREATE THE USER:';
        RAISE NOTICE '';
        RAISE NOTICE '   Option 1 - Via Supabase Dashboard (Recommended):';
        RAISE NOTICE '   1. Go to Supabase Dashboard → Authentication → Users';
        RAISE NOTICE '   2. Click "Add User" or "Invite User"';
        RAISE NOTICE '   3. Email: Rogerbeaudry@yahoo.com';
        RAISE NOTICE '   4. Password: Lord471@1761';
        RAISE NOTICE '   5. Check "Auto Confirm User"';
        RAISE NOTICE '   6. Click "Create User"';
        RAISE NOTICE '   7. Then run this script again';
        RAISE NOTICE '';
        RAISE NOTICE '   Option 2 - Via TypeScript Script:';
        RAISE NOTICE '   1. Make sure .env.local has NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY';
        RAISE NOTICE '   2. Run: npm run create-admin';
        RAISE NOTICE '   3. Then run this SQL script again';
        RAISE NOTICE '';
        RAISE EXCEPTION 'User not found. Please create the user first (see instructions above).';
    END IF;
END $$;

-- METHOD 2: Manual insert (use this if you know the user_id)
-- Uncomment and replace USER_ID_HERE with the actual UUID
/*
-- First, get the user_id:
SELECT id, email, created_at 
FROM auth.users 
WHERE LOWER(email) = 'rogerbeaudry@yahoo.com';

-- Then use that ID here:
INSERT INTO public.admins (user_id, email)
VALUES ('USER_ID_HERE', 'rogerbeaudry@yahoo.com')
ON CONFLICT (user_id) DO UPDATE
SET email = EXCLUDED.email,
    updated_at = timezone('utc', now());
*/

-- Verify the admin was created
SELECT 
    '✅ Admin Created!' as status,
    a.id as admin_id,
    a.user_id,
    a.email as admin_email,
    a.created_at as admin_created_at,
    u.email as auth_email,
    u.created_at as user_created_at
FROM public.admins a
LEFT JOIN auth.users u ON a.user_id = u.id
WHERE LOWER(a.email) = 'rogerbeaudry@yahoo.com';

-- ============================================
-- INSTRUCTIONS:
-- ============================================
-- STEP 1: Create user in Supabase Auth Dashboard
--   1. Go to Supabase Dashboard
--   2. Navigate to Authentication → Users
--   3. Click "Add User" or "Invite User"
--   4. Email: Rogerbeaudry@yahoo.com
--   5. Password: Lord471@1761
--   6. Check "Auto Confirm User"
--   7. Click "Create User"
--
-- STEP 2: Run this SQL script
--   1. Go to SQL Editor in Supabase Dashboard
--   2. Copy and paste this entire file
--   3. Click "Run"
--
-- STEP 3: Verify
--   - Check the output shows the admin record
--   - Log in at /admin/login with the credentials above
-- ============================================

