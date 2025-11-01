-- ============================================
-- SQL Script to Create Admin User
-- ============================================
-- This script creates an admin user in the admins table
-- NOTE: You must first create the user in Supabase Auth via:
-- 1. Supabase Dashboard → Authentication → Add User, OR
-- 2. Run the TypeScript script: scripts/create-admin-user.ts
-- ============================================

-- Step 1: Get the user_id from auth.users for the email
-- Replace 'Rogerbeaudry@yahoo.com' with the actual email
DO $$
DECLARE
    v_user_id uuid;
    v_email text := 'rogerbeaudry@yahoo.com'; -- lowercase for consistency
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
        
        RAISE NOTICE 'Admin user created/updated successfully!';
        RAISE NOTICE 'User ID: %', v_user_id;
        RAISE NOTICE 'Email: %', v_email;
    ELSE
        RAISE EXCEPTION 'User with email % does not exist in auth.users. Please create the user first via Supabase Dashboard (Authentication → Add User) or run the TypeScript script.', v_email;
    END IF;
END $$;

-- Verify the admin was created
SELECT 
    a.id as admin_id,
    a.user_id,
    a.email,
    a.created_at,
    u.email as auth_email,
    u.created_at as user_created_at
FROM public.admins a
LEFT JOIN auth.users u ON a.user_id = u.id
WHERE LOWER(a.email) = 'rogerbeaudry@yahoo.com';

-- ============================================
-- Alternative: Manual Insert (if you know the user_id)
-- ============================================
-- Uncomment and replace USER_ID_HERE with actual UUID from auth.users
/*
INSERT INTO public.admins (user_id, email)
VALUES ('USER_ID_HERE', 'rogerbeaudry@yahoo.com')
ON CONFLICT (user_id) DO UPDATE
SET email = EXCLUDED.email,
    updated_at = timezone('utc', now());
*/

