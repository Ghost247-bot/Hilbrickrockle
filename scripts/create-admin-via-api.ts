/**
 * Quick Script to Create Admin User via API
 * 
 * This script uses Supabase Admin API to create the user directly.
 * No need to create in Dashboard first!
 * 
 * Usage:
 * 1. Make sure .env.local has:
 *    - NEXT_PUBLIC_SUPABASE_URL
 *    - SUPABASE_SERVICE_ROLE_KEY
 * 
 * 2. Run: npx ts-node scripts/create-admin-via-api.ts
 */

import { config } from 'dotenv';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing environment variables in .env.local:');
  console.error('   NEXT_PUBLIC_SUPABASE_URL');
  console.error('   SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createAdmin() {
  const email = 'Rogerbeaudry@yahoo.com';
  const password = 'Lord471@1761';

  console.log('🔐 Creating admin user...\n');

  try {
    // Step 1: Create user in Supabase Auth
    console.log('📝 Step 1: Creating user in Supabase Auth...');
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        role: 'admin',
        name: 'Admin User',
      },
    });

    if (authError) {
      if (authError.message.includes('already exists') || authError.message.includes('already registered')) {
        console.log('⚠️  User already exists in Auth. Looking up existing user...\n');
        
        // Find existing user
        const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers();
        if (listError) throw listError;
        
        const existingUser = users.find(u => u.email?.toLowerCase() === email.toLowerCase());
        if (!existingUser) {
          throw new Error('User exists but could not be found');
        }

        console.log('✅ Found existing user!');
        console.log(`   User ID: ${existingUser.id}\n`);

        // Step 2: Add to admins table
        console.log('📝 Step 2: Adding to admins table...');
        const { data: adminRecord, error: adminError } = await supabaseAdmin
          .from('admins')
          .upsert({
            user_id: existingUser.id,
            email: email.toLowerCase(),
          }, {
            onConflict: 'user_id',
          })
          .select()
          .single();

        if (adminError) throw adminError;
        
        if (!adminRecord) {
          throw new Error('Failed to create admin record');
        }

        console.log('✅ Admin record linked successfully!\n');
        console.log('🎉 Setup complete!\n');
        console.log('📋 Login Credentials:');
        console.log(`   Email: ${email}`);
        console.log(`   Password: ${password}`);
        console.log('\n🔗 Login at: http://localhost:3000/admin/login\n');
        return;
      }
      throw authError;
    }

    if (!authData?.user) {
      throw new Error('Failed to create user');
    }

    console.log('✅ User created in Auth!');
    console.log(`   User ID: ${authData.user.id}\n`);

    // Step 2: Add to admins table
    console.log('📝 Step 2: Adding to admins table...');
    const { data: adminRecord, error: adminError } = await supabaseAdmin
      .from('admins')
      .insert({
        user_id: authData.user.id,
        email: email.toLowerCase(),
      })
      .select()
      .single();

    if (adminError) {
      // If already exists, that's okay
      if (adminError.code === '23505') {
        console.log('⚠️  Admin record already exists (that\'s okay)');
      } else {
        throw adminError;
      }
    } else {
      console.log('✅ Admin record created!');
      if (adminRecord) {
        console.log(`   Admin ID: ${adminRecord.id}`);
      }
    }

    console.log('\n🎉 Admin user created successfully!\n');
    console.log('📋 Login Credentials:');
    console.log(`   Email: ${email}`);
    console.log(`   Password: ${password}`);
    console.log('\n🔗 Login at: http://localhost:3000/admin/login\n');
  } catch (error: any) {
    console.error('\n❌ Error:');
    console.error(error.message);
    if (error.details) console.error('Details:', error.details);
    process.exit(1);
  }
}

createAdmin();

