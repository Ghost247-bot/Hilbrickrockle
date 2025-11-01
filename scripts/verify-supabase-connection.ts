import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyConnection() {
  console.log('🔍 Verifying Supabase connection...\n');
  console.log(`URL: ${supabaseUrl}`);
  console.log(`Key: ${supabaseKey.substring(0, 20)}...\n`);

  try {
    // Test connection by querying a table (won't fail if table doesn't exist)
    const { data, error } = await supabase
      .from('appointments')
      .select('id')
      .limit(1);

    if (error) {
      if (error.message?.includes('relation') || error.message?.includes('does not exist')) {
        console.log('⚠️  Connection successful, but appointments table not found.');
        console.log('📝 Action required: Run scripts/database-setup.sql in Supabase SQL Editor\n');
        return false;
      } else if (error.message?.includes('permission denied') || error.message?.includes('RLS')) {
        console.log('⚠️  Connection successful, but RLS policies may need adjustment.');
        console.log('📝 Action required: Check RLS policies in Supabase\n');
        return false;
      } else {
        console.log('❌ Connection error:', error.message);
        return false;
      }
    }

    console.log('✅ Supabase connection successful!');
    console.log('✅ Appointments table exists and is accessible\n');
    return true;
  } catch (error) {
    console.error('❌ Connection failed:', error);
    return false;
  }
}

verifyConnection().then((success) => {
  if (success) {
    console.log('🎉 Database is ready to use!');
  } else {
    console.log('\n📋 Next Steps:');
    console.log('1. Go to Supabase Dashboard → SQL Editor');
    console.log('2. Copy and paste contents of scripts/database-setup.sql');
    console.log('3. Click Run');
    console.log('4. Run this verification again: npm run verify-db\n');
  }
  process.exit(success ? 0 : 1);
});

