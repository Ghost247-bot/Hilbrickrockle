import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseAdmin } from '../../lib/supabase';
import { withErrorHandler } from '../../middleware/error';
import logger from '../../utils/logger';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    logger.warn('Invalid method for lawyers endpoint', { method: req.method });
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Use admin client for server-side operations to bypass RLS
    const supabaseAdmin = getSupabaseAdmin();
    
    // Fetch active lawyers from Supabase with all fields
    const { data: lawyers, error } = await supabaseAdmin
      .from('lawyers')
      .select('lawyer_id, name, email, phone, practice_areas, bio, experience_years, status, title, image_url, ref_code')
      .eq('status', 'active')
      .order('name', { ascending: true });

    if (error) {
      logger.error('Error fetching lawyers', { 
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      
      // Provide helpful error message if table doesn't exist
      if (error.message?.includes('does not exist') || error.code === '42P01') {
        return res.status(500).json({
          error: 'Database table not found',
          message: 'The lawyers table does not exist in the database. Please run the database setup script in Supabase SQL Editor.',
          details: 'See scripts/database-setup.sql for the table creation script.',
        });
      }
      
      return res.status(500).json({
        error: 'Failed to fetch lawyers',
        message: error.message,
      });
    }

    const lawyerCount = lawyers?.length || 0;
    logger.info('Lawyers fetched successfully', { count: lawyerCount });

    // Log warning if no lawyers found (helpful for debugging)
    if (lawyerCount === 0) {
      logger.warn('No active lawyers found in database', {
        message: 'The lawyers table may be empty or all lawyers have inactive status',
        suggestion: 'Run the database setup script or insert-leadership-team.sql to populate lawyers',
      });
    }

    return res.status(200).json({
      success: true,
      lawyers: lawyers || [],
      count: lawyerCount,
    });
  } catch (error) {
    logger.error('Error handling lawyers request', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'An unexpected error occurred',
    });
  }
}

export default withErrorHandler(handler);

