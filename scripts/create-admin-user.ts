/**
 * Script to create an admin user in Supabase
 * 
 * This script creates:
 * 1. A user in Supabase Auth (auth.users)
 * 2. An entry in the admins table linking the user to admin privileges
 * 
 * Usage:
 * 1. Make sure your .env.local file has:
 *    - NEXT_PUBLIC_SUPABASE_URL
 *    - SUPABASE_SERVICE_ROLE_KEY
 * 
 * 2. Run: npm run create-admin
 * 
 * Or: npx ts-node scripts/create-admin-user.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing required environment variables:');
  console.error('   - NEXT_PUBLIC_SUPABASE_URL');
  console.error('   - SUPABASE_SERVICE_ROLE_KEY');
  console.error('');
  console.error('Please set these in your .env.local file or export them before running this script.');
  process.exit(1);
}

// Create admin client with service role key (bypasses RLS)
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createAdminUser() {
  const email = 'Rogerbeaudry@yahoo.com';
  const password = 'Lord471@1761';

  console.log('🔐 Creating admin user...');
  console.log(`   Email: ${email}`);

  try {
    // Step 1: Create user in Supabase Auth
    console.log('\n📝 Step 1: Creating user in Supabase Auth...');
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email
      user_metadata: {
        role: 'admin',
      },
    });

    if (authError) {
      if (authError.message.includes('already exists') || authError.message.includes('already registered')) {
        console.log('⚠️  User already exists in Auth. Checking if admin record exists...');
        
        // Try to find existing user
        const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
        if (listError) {
          throw listError;
        }
        
        const existingUser = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
        if (!existingUser) {
          throw new Error('User exists but could not be found');
        }

        // Step 2: Add to admins table
        console.log('📝 Step 2: Adding user to admins table...');
        const { data: adminRecord, error: adminError } = await supabaseAdmin
          .from('admins')
          .upsert(
            {
              user_id: existingUser.id,
              email: email.toLowerCase(),
            },
            {
              onConflict: 'user_id',
            }
          )
          .select()
          .single();

        if (adminError) {
          throw adminError;
        }

        if (!adminRecord) {
          throw new Error('Failed to create admin record');
        }

        console.log('✅ Admin user already exists and is linked in admins table!');
        console.log(`   User ID: ${existingUser.id}`);
        console.log(`   Email: ${email}`);
        console.log('\n🎉 Setup complete! You can now log in with:');
        console.log(`   Email: ${email}`);
        console.log(`   Password: ${password}`);
        return;
      }
      throw authError;
    }

    if (!authData?.user) {
      throw new Error('Failed to create user: No user data returned');
    }

    console.log('✅ User created in Auth!');
    console.log(`   User ID: ${authData.user.id}`);

    // Step 2: Add to admins table
    console.log('\n📝 Step 2: Adding user to admins table...');
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from('admins')
      .insert({
        user_id: authData.user.id,
        email: email.toLowerCase(),
      })
      .select()
      .single();

    if (adminError) {
      // If admin record already exists, that's okay
      if (adminError.code === '23505') {
        console.log('⚠️  Admin record already exists (this is okay)');
      } else {
        throw adminError;
      }
    } else {
      console.log('✅ Admin record created!');
      console.log(`   Admin ID: ${adminData.id}`);
    }

    console.log('\n🎉 Admin user created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log('\n🔗 You can now log in at: /admin/login');
  } catch (error: any) {
    console.error('\n❌ Error creating admin user:');
    console.error(error.message);
    if (error.details) {
      console.error('Details:', error.details);
    }
    if (error.hint) {
      console.error('Hint:', error.hint);
    }
    process.exit(1);
  }
}

// Run the script
createAdminUser();

