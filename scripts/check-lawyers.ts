/**
 * Script to check if lawyers exist in the database
 * Run with: npx ts-node scripts/check-lawyers.ts
 */

import { getSupabaseAdmin } from '../src/lib/supabase';

async function checkLawyers() {
  console.log('Checking lawyers in database...\n');

  try {
    const supabaseAdmin = getSupabaseAdmin();

    // Get all lawyers (including inactive)
    const { data: allLawyers, error: allError } = await supabaseAdmin
      .from('lawyers')
      .select('lawyer_id, name, email, status, practice_areas')
      .order('lawyer_id');

    if (allError) {
      console.error('❌ Error fetching lawyers:', allError.message);
      console.error('   Code:', allError.code);
      console.error('   Details:', allError.details);
      console.error('   Hint:', allError.hint);
      return;
    }

    // Get only active lawyers
    const { data: activeLawyers, error: activeError } = await supabaseAdmin
      .from('lawyers')
      .select('lawyer_id, name, email, status, practice_areas')
      .eq('status', 'active')
      .order('name');

    if (activeError) {
      console.error('❌ Error fetching active lawyers:', activeError.message);
      return;
    }

    console.log(`📊 Database Status:`);
    console.log(`   Total lawyers: ${allLawyers?.length || 0}`);
    console.log(`   Active lawyers: ${activeLawyers?.length || 0}`);
    console.log(`   Inactive lawyers: ${(allLawyers?.length || 0) - (activeLawyers?.length || 0)}\n`);

    if ((allLawyers?.length || 0) === 0) {
      console.log('⚠️  No lawyers found in database!\n');
      console.log('💡 Solution:');
      console.log('   1. Go to Supabase SQL Editor');
      console.log('   2. Run scripts/quick-insert-lawyers.sql');
      console.log('   OR');
      console.log('   3. Run scripts/insert-leadership-team.sql\n');
      return;
    }

    if ((activeLawyers?.length || 0) === 0) {
      console.log('⚠️  No ACTIVE lawyers found in database!\n');
      console.log('💡 Solution:');
      console.log('   Either:');
      console.log('   1. Update existing lawyers status to "active"');
      console.log('   2. Run scripts/quick-insert-lawyers.sql to add active lawyers\n');
      
      console.log('📋 Current lawyers (all statuses):');
      allLawyers?.forEach((lawyer) => {
        console.log(`   - ${lawyer.lawyer_id}: ${lawyer.name} (${lawyer.status})`);
      });
      return;
    }

    console.log('✅ Active lawyers found:\n');
    activeLawyers?.forEach((lawyer, index) => {
      console.log(`   ${index + 1}. ${lawyer.name} (${lawyer.lawyer_id})`);
      console.log(`      Email: ${lawyer.email}`);
      console.log(`      Practice Areas: ${lawyer.practice_areas?.join(', ') || 'None'}`);
      console.log('');
    });

    console.log('✅ The booking form should display these lawyers correctly.');
  } catch (error) {
    console.error('❌ Unexpected error:', error instanceof Error ? error.message : error);
    if (error instanceof Error && error.stack) {
      console.error('\nStack trace:');
      console.error(error.stack);
    }
  }
}

// Run the check
checkLawyers()
  .then(() => {
    console.log('\n✅ Check complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Check failed:', error);
    process.exit(1);
  });

