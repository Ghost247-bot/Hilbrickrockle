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
    // Check if Supabase environment variables are set
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      logger.error('Supabase environment variables not configured', {
        hasUrl: !!supabaseUrl,
        hasAnonKey: !!supabaseAnonKey,
      });
      return res.status(500).json({
        error: 'Configuration error',
        message: 'Supabase environment variables are not set. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.',
        details: 'Contact your administrator or check the deployment environment variables.',
      });
    }

    // Use admin client for server-side operations to bypass RLS
    const supabaseAdmin = getSupabaseAdmin();
    
    // Verify we have a valid client
    if (!supabaseAdmin) {
      logger.error('Failed to create Supabase admin client');
      return res.status(500).json({
        error: 'Database configuration error',
        message: 'Failed to initialize database connection. Please check your environment variables.',
      });
    }
    
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
      if (error.message?.includes('does not exist') || error.code === '42P01' || error.code === 'PGRST116') {
        logger.warn('Lawyers table does not exist', { code: error.code });
        // Return empty array instead of error - allows booking to proceed
        return res.status(200).json({
          success: true,
          lawyers: [],
          count: 0,
          message: 'No lawyers table found. Please run the database setup script.',
        });
      }
      
      // Check if it's a placeholder client error (connection to placeholder URL)
      if (error.message?.includes('placeholder') || error.message?.includes('fetch failed')) {
        logger.error('Placeholder client error or connection failure', { error: error.message });
        return res.status(500).json({
          error: 'Database connection error',
          message: 'Unable to connect to the database. Please check your Supabase configuration.',
          details: 'Verify that NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set correctly.',
        });
      }
      
      logger.error('Database query error', { 
        code: error.code,
        message: error.message,
      });
      
      return res.status(500).json({
        error: 'Failed to fetch lawyers',
        message: error.message || 'Database query failed',
        code: error.code,
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

