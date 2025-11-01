import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabase';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Test if appointments table exists and has correct structure
    const testData = {
      name: 'Test User',
      email: 'test@example.com',
      date: new Date().toISOString().split('T')[0],
      time: '10:00',
      practice_area: 'Corporate Law',
      message: 'Test message',
      status: 'pending',
    };

    // Try to insert a test record (will rollback)
    const { data, error } = await supabase
      .from('appointments')
      .insert([{ ...testData, created_at: new Date().toISOString() }])
      .select('id')
      .single();

    if (error) {
      // Try to check if it's a column issue
      if (error.message?.includes('column') || error.code === 'PGRST116') {
        return res.status(500).json({
          error: 'Database schema issue',
          message: error.message,
          hint: 'The appointments table may be missing required columns. Run scripts/database-setup.sql in Supabase.',
          details: error.details,
          code: error.code,
        });
      }

      // Check for RLS issues
      if (error.message?.includes('permission denied') || error.message?.includes('RLS')) {
        return res.status(500).json({
          error: 'Database permissions issue',
          message: error.message,
          hint: 'Row Level Security (RLS) may be blocking inserts. Check RLS policies.',
          details: error.details,
          code: error.code,
        });
      }

      return res.status(500).json({
        error: 'Database connection issue',
        message: error.message,
        details: error.details,
        code: error.code,
      });
    }

    // If successful, delete the test record
    if (data?.id) {
      await supabase.from('appointments').delete().eq('id', data.id);
    }

    return res.status(200).json({
      success: true,
      message: 'Database connection and schema are correct',
      tableStructure: 'appointments table exists with correct columns',
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Test failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}

export default handler;

