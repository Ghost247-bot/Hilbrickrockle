import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  console.error('Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verifyDatabase() {
  console.log('🔍 Verifying database setup...\n');

  const checks = {
    appointments: false,
    contactMessages: false,
    lawyers: false,
    admins: false,
    lawyersData: false,
    foreignKey: false,
  };

  try {
    // Check appointments table
    const { data: appointments, error: aptError } = await supabase
      .from('appointments')
      .select('id')
      .limit(1);

    if (!aptError) {
      checks.appointments = true;
      console.log('✅ Appointments table exists');
    } else {
      console.log('❌ Appointments table error:', aptError.message);
    }

    // Check contact_messages table
    const { data: contacts, error: contactError } = await supabase
      .from('contact_messages')
      .select('id')
      .limit(1);

    if (!contactError) {
      checks.contactMessages = true;
      console.log('✅ Contact messages table exists');
    } else {
      console.log('❌ Contact messages table error:', contactError.message);
    }

    // Check lawyers table
    const { data: lawyers, error: lawyersError } = await supabase
      .from('lawyers')
      .select('lawyer_id, name')
      .eq('status', 'active');

    if (!lawyersError) {
      checks.lawyers = true;
      if (lawyers && lawyers.length > 0) {
        checks.lawyersData = true;
        console.log(`✅ Lawyers table exists with ${lawyers.length} active lawyers`);
        lawyers.forEach(lawyer => {
          console.log(`   - ${lawyer.lawyer_id}: ${lawyer.name}`);
        });
      } else {
        console.log('⚠️  Lawyers table exists but has no active lawyers');
      }
    } else {
      console.log('❌ Lawyers table error:', lawyersError.message);
    }

    // Check admins table
    const { data: admins, error: adminError } = await supabase
      .from('admins')
      .select('id')
      .limit(1);

    if (!adminError) {
      checks.admins = true;
      console.log('✅ Admins table exists');
    } else {
      console.log('⚠️  Admins table error (this is ok if not set up yet):', adminError.message);
    }

    // Check foreign key relationship
    const { data: aptWithLawyer, error: fkError } = await supabase
      .from('appointments')
      .select('lawyer_id')
      .limit(1);

    if (!fkError && 'lawyer_id' in (aptWithLawyer?.[0] || {})) {
      checks.foreignKey = true;
      console.log('✅ Appointments table has lawyer_id column');
    } else {
      console.log('❌ Foreign key check failed - lawyer_id column may be missing');
    }

    // Summary
    console.log('\n📊 Verification Summary:');
    console.log('========================');
    Object.entries(checks).forEach(([key, value]) => {
      const icon = value ? '✅' : '❌';
      console.log(`${icon} ${key}`);
    });

    const allPassed = Object.values(checks).every(check => check);
    
    if (allPassed) {
      console.log('\n🎉 All database checks passed!');
      console.log('Your database is ready to use.');
    } else {
      console.log('\n⚠️  Some checks failed. Please run the database setup script:');
      console.log('scripts/database-setup.sql in Supabase SQL Editor');
    }

  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  }
}

verifyDatabase();

