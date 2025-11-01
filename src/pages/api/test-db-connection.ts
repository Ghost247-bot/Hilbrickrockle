import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

/**
 * Test endpoint to verify database connection and schema
 * Visit: http://localhost:3000/api/test-db-connection
 */
async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const results = {
    connection: false,
    tables: {
      appointments: false,
      contact_messages: false,
      lawyers: false,
      admins: false,
    },
    lawyersCount: 0,
    errors: [] as string[],
    message: '',
  };

  try {
    // Test connection by querying appointments
    const { data: aptData, error: aptError } = await supabase
      .from('appointments')
      .select('id')
      .limit(1);

    if (!aptError) {
      results.connection = true;
      results.tables.appointments = true;
    } else {
      results.errors.push(`Appointments: ${aptError.message}`);
    }

    // Test contact_messages
    const { data: contactData, error: contactError } = await supabase
      .from('contact_messages')
      .select('id')
      .limit(1);

    if (!contactError) {
      results.tables.contact_messages = true;
    } else {
      results.errors.push(`Contact messages: ${contactError.message}`);
    }

    // Test lawyers
    const { data: lawyersData, error: lawyersError } = await supabase
      .from('lawyers')
      .select('lawyer_id, name')
      .eq('status', 'active');

    if (!lawyersError) {
      results.tables.lawyers = true;
      results.lawyersCount = lawyersData?.length || 0;
    } else {
      results.errors.push(`Lawyers: ${lawyersError.message}`);
    }

    // Test admins (may not be accessible with anon key, that's ok)
    const { error: adminError } = await supabase
      .from('admins')
      .select('id')
      .limit(1);

    if (!adminError) {
      results.tables.admins = true;
    }

    // Determine overall status
    const allTablesExist = 
      results.tables.appointments && 
      results.tables.contact_messages && 
      results.tables.lawyers;

    if (allTablesExist && results.connection) {
      results.message = '✅ Database connection successful! All tables exist.';
      if (results.lawyersCount > 0) {
        results.message += ` Found ${results.lawyersCount} active lawyers.`;
      } else {
        results.message += ' ⚠️ No lawyers found. Run database-setup.sql to insert sample data.';
      }
      return res.status(200).json(results);
    } else {
      results.message = '⚠️ Database connection successful, but some tables are missing. Run scripts/database-setup.sql in Supabase SQL Editor.';
      return res.status(200).json(results);
    }
  } catch (error) {
    results.errors.push(error instanceof Error ? error.message : 'Unknown error');
    results.message = '❌ Connection failed. Check your Supabase credentials in .env.local';
    return res.status(500).json(results);
  }
}

export default handler;

