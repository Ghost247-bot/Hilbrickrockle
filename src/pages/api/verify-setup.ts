import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseAdmin } from '../../lib/supabase';

/**
 * Comprehensive verification endpoint
 * Checks: Database schema, Supabase connection, and table structure
 * Visit: http://localhost:3000/api/verify-setup
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.setHeader('Content-Type', 'application/json');

  const results = {
    timestamp: new Date().toISOString(),
    environment: {
      hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      hasServiceRoleKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      nodeEnv: process.env.NODE_ENV || 'development',
    },
    connection: {
      status: 'unknown' as 'success' | 'failed' | 'unknown',
      error: null as string | null,
    },
    tables: {
      appointments: {
        exists: false,
        hasCorrectColumns: false,
        columns: [] as string[],
        error: null as string | null,
      },
      contact_messages: {
        exists: false,
        hasCorrectColumns: false,
        columns: [] as string[],
        error: null as string | null,
      },
      lawyers: {
        exists: false,
        count: 0,
        error: null as string | null,
      },
    },
    rls: {
      appointments: {
        enabled: false,
        hasInsertPolicy: false,
      },
      contact_messages: {
        enabled: false,
        hasInsertPolicy: false,
      },
      lawyers: {
        enabled: false,
        hasSelectPolicy: false,
      },
    },
    recommendations: [] as string[],
  };

  try {
    // Check environment variables
    if (!results.environment.hasSupabaseUrl) {
      results.recommendations.push('Missing NEXT_PUBLIC_SUPABASE_URL in environment variables');
    }
    if (!results.environment.hasAnonKey) {
      results.recommendations.push('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY in environment variables');
    }
    if (!results.environment.hasServiceRoleKey) {
      results.recommendations.push('Missing SUPABASE_SERVICE_ROLE_KEY (recommended for admin operations)');
    }

    // Test connection
    const supabaseAdmin = getSupabaseAdmin();
    
    // Check appointments table
    try {
      const { data: aptData, error: aptError } = await supabaseAdmin
        .from('appointments')
        .select('id')
        .limit(1);

      if (!aptError) {
        results.tables.appointments.exists = true;
        results.connection.status = 'success';
        
        // Check for required columns by trying to insert (will rollback)
        const testInsert = {
          name: 'Test Verification',
          email: 'verify@test.com',
          date: new Date().toISOString().split('T')[0],
          time: '10:00',
          practice_area: 'Corporate Law',
          status: 'pending',
        };
        
        const { data: insertData, error: insertError } = await supabaseAdmin
          .from('appointments')
          .insert([testInsert])
          .select('id')
          .single();
        
        if (!insertError && insertData) {
          results.tables.appointments.hasCorrectColumns = true;
          
          // Clean up test record
          await supabaseAdmin
            .from('appointments')
            .delete()
            .eq('id', insertData.id)
            .then(() => {});
        } else {
          results.tables.appointments.error = insertError?.message || 'Insert test failed';
          if (insertError?.message?.includes('column')) {
            results.recommendations.push(`⚠️ Appointments table missing columns: ${insertError.message}`);
          } else if (insertError?.message?.includes('permission') || insertError?.message?.includes('RLS')) {
            results.recommendations.push(`⚠️ RLS policy issue on appointments table: ${insertError.message}`);
          } else {
            results.recommendations.push(`Appointments table column issue: ${insertError?.message}`);
          }
        }
      } else {
        results.tables.appointments.error = aptError.message;
        results.connection.status = 'failed';
        results.connection.error = aptError.message;
        
        if (aptError.message?.includes('does not exist') || aptError.code === 'PGRST205') {
          results.recommendations.push('⚠️ CRITICAL: appointments table does not exist. Run scripts/database-setup.sql in Supabase SQL Editor');
        } else if (aptError.message?.includes('permission denied')) {
          results.recommendations.push('⚠️ Permission denied. Check RLS policies or use service role key');
        }
      }
    } catch (error: any) {
      results.tables.appointments.error = error.message;
      results.connection.status = 'failed';
    }

    // Check contact_messages table
    try {
      const { data: contactData, error: contactError } = await supabaseAdmin
        .from('contact_messages')
        .select('id')
        .limit(1);

      if (!contactError) {
        results.tables.contact_messages.exists = true;
        results.tables.contact_messages.hasCorrectColumns = true;
      } else {
        results.tables.contact_messages.error = contactError.message;
        if (contactError.message?.includes('does not exist')) {
          results.recommendations.push('⚠️ CRITICAL: contact_messages table does not exist. Run scripts/database-setup.sql');
        }
      }
    } catch (error: any) {
      results.tables.contact_messages.error = error.message;
    }

    // Check lawyers table
    try {
      const { data: lawyersData, error: lawyersError } = await supabaseAdmin
        .from('lawyers')
        .select('lawyer_id, name, status')
        .eq('status', 'active');

      if (!lawyersError) {
        results.tables.lawyers.exists = true;
        results.tables.lawyers.count = lawyersData?.length || 0;
        if (results.tables.lawyers.count === 0) {
          results.recommendations.push('ℹ️ No active lawyers found. Add lawyers via scripts/database-setup.sql or admin panel');
        }
      } else {
        results.tables.lawyers.error = lawyersError.message;
        if (lawyersError.message?.includes('does not exist')) {
          results.recommendations.push('⚠️ CRITICAL: lawyers table does not exist. Run scripts/database-setup.sql');
        }
      }
    } catch (error: any) {
      results.tables.lawyers.error = error.message;
    }

    // Overall status
    const allTablesExist = 
      results.tables.appointments.exists &&
      results.tables.contact_messages.exists &&
      results.tables.lawyers.exists;

    if (allTablesExist && results.connection.status === 'success') {
      results.recommendations.unshift('✅ All checks passed! Your database is properly configured.');
    }

  } catch (error: any) {
    results.connection.status = 'failed';
    results.connection.error = error.message;
    results.recommendations.push(`⚠️ Connection test failed: ${error.message}`);
  }

  // Return appropriate status code
  const hasCriticalIssues = results.recommendations.some(r => r.includes('⚠️ CRITICAL'));
  const statusCode = hasCriticalIssues ? 500 : 200;

  return res.status(statusCode).json({
    status: hasCriticalIssues ? 'issues_found' : 'ok',
    results,
    nextSteps: hasCriticalIssues ? [
      '1. Open Supabase Dashboard → SQL Editor',
      '2. Copy contents of scripts/database-setup.sql',
      '3. Paste and run in SQL Editor',
      '4. Refresh this verification endpoint',
    ] : [
      '1. Test booking form at /booking',
      '2. Test contact form at /contact',
      '3. Check admin dashboard at /admin/dashboard',
    ],
  });
}

export default handler;

