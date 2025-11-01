/**
 * Test script to verify the /api/lawyers endpoint is working
 * Run with: npx ts-node scripts/test-lawyers-api.ts
 */

async function testLawyersAPI() {
  console.log('Testing /api/lawyers endpoint...\n');

  try {
    // Get the base URL from environment or use default
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const apiUrl = `${baseUrl}/api/lawyers`;

    console.log(`📍 Testing: ${apiUrl}\n`);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log(`📊 Response Status: ${response.status} ${response.statusText}`);
    console.log(`🔗 Response URL: ${response.url}`);
    console.log(`↩️  Redirected: ${response.redirected}\n`);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Error Response:');
      console.error(errorText);
      
      if (response.status === 500) {
        console.error('\n💡 Possible causes:');
        console.error('   1. Database connection issue');
        console.error('   2. SUPABASE_SERVICE_ROLE_KEY not set');
        console.error('   3. Lawyers table doesn\'t exist');
        console.error('   4. RLS policy blocking access');
      }
      return;
    }

    const data: any = await response.json();
    
    console.log('✅ Response Data:');
    console.log(JSON.stringify(data, null, 2));
    console.log('');

    if (data.success) {
      const count = data.lawyers?.length || data.count || 0;
      console.log(`📈 Lawyers found: ${count}`);
      
      if (count === 0) {
        console.log('\n⚠️  No lawyers in response!');
        console.log('\n💡 Solution:');
        console.log('   1. Run scripts/comprehensive-lawyers-setup.sql in Supabase SQL Editor');
        console.log('   2. Or run scripts/quick-insert-lawyers.sql');
        console.log('   3. Verify lawyers exist in database with active status');
      } else {
        console.log('\n✅ Lawyers list:');
        data.lawyers?.forEach((lawyer: any, index: number) => {
          console.log(`   ${index + 1}. ${lawyer.name} (${lawyer.lawyer_id}) - ${lawyer.title || 'No title'}`);
          console.log(`      Practice Areas: ${lawyer.practice_areas?.join(', ') || 'None'}`);
        });
        console.log('\n✅ API endpoint is working correctly!');
      }
    } else {
      console.error('❌ API returned success: false');
      console.error('Error:', data.error);
      console.error('Message:', data.message);
    }
  } catch (error) {
    console.error('❌ Request failed:');
    
    if (error instanceof TypeError && error.message === 'fetch failed') {
      console.error('   Network error - is the Next.js dev server running?');
      console.error('   Start it with: npm run dev');
    } else {
      console.error('   Error:', error instanceof Error ? error.message : error);
      if (error instanceof Error && error.stack) {
        console.error('\nStack trace:');
        console.error(error.stack);
      }
    }
  }
}

// Run the test
testLawyersAPI()
  .then(() => {
    console.log('\n✅ Test complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Test failed:', error);
    process.exit(1);
  });

