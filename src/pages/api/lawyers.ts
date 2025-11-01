import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseAdmin } from '../../lib/supabase';
import { withErrorHandler } from '../../middleware/error';

// Safe logger wrapper to prevent errors if logger fails to import
const safeLog = (level: string, message: string, data?: any) => {
  try {
    const logger = require('../../utils/logger').default;
    if (logger && typeof logger[level] === 'function') {
      logger[level](message, data);
    } else {
      console[level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log'](`[${level}] ${message}`, data || '');
    }
  } catch (e) {
    console.log(`[${level}] ${message}`, data || '');
  }
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    safeLog('warn', 'Invalid method for lawyers endpoint', { method: req.method });
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check if Supabase environment variables are set
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      safeLog('error', 'Supabase environment variables not configured', {
        hasUrl: !!supabaseUrl,
        hasAnonKey: !!supabaseAnonKey,
      });
      // Return empty array instead of error - allows booking to proceed
      return res.status(200).json({
        success: true,
        lawyers: [],
        count: 0,
        message: 'Supabase not configured. Lawyer selection is optional.',
      });
    }

    // Use admin client for server-side operations to bypass RLS
    let supabaseAdmin;
    try {
      supabaseAdmin = getSupabaseAdmin();
    } catch (clientError: any) {
      safeLog('error', 'Failed to create Supabase admin client', { error: clientError.message });
      // Return empty array instead of error - allows booking to proceed
      return res.status(200).json({
        success: true,
        lawyers: [],
        count: 0,
        message: 'Database connection error. Lawyer selection is optional.',
      });
    }
    
    // Verify we have a valid client
    if (!supabaseAdmin) {
      safeLog('error', 'Supabase admin client is null');
      return res.status(200).json({
        success: true,
        lawyers: [],
        count: 0,
        message: 'Database connection error. Lawyer selection is optional.',
      });
    }
    
    // Fetch active lawyers from Supabase with all fields
    const { data: lawyers, error } = await supabaseAdmin
      .from('lawyers')
      .select('lawyer_id, name, email, phone, practice_areas, bio, experience_years, status, title, image_url, ref_code')
      .eq('status', 'active')
      .order('name', { ascending: true });

    if (error) {
      safeLog('error', 'Error fetching lawyers', { 
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      
      // Provide helpful error message if table doesn't exist
      if (error.message?.includes('does not exist') || error.code === '42P01' || error.code === 'PGRST116') {
        safeLog('warn', 'Lawyers table does not exist', { code: error.code });
        // Return empty array instead of error - allows booking to proceed
        return res.status(200).json({
          success: true,
          lawyers: [],
          count: 0,
          message: 'No lawyers table found. Lawyer selection is optional.',
        });
      }
      
      // Check if it's a placeholder client error (connection to placeholder URL)
      if (error.message?.includes('placeholder') || error.message?.includes('fetch failed') || error.message?.includes('Failed to fetch')) {
        safeLog('error', 'Placeholder client error or connection failure', { error: error.message });
        // Return empty array instead of error - allows booking to proceed
        return res.status(200).json({
          success: true,
          lawyers: [],
          count: 0,
          message: 'Database connection error. Lawyer selection is optional.',
        });
      }
      
      safeLog('error', 'Database query error', { 
        code: error.code,
        message: error.message,
      });
      
      // Return empty array for any other error - don't break the booking form
      return res.status(200).json({
        success: true,
        lawyers: [],
        count: 0,
        message: 'Unable to load lawyers. Lawyer selection is optional.',
      });
    }

    const lawyerCount = lawyers?.length || 0;
    safeLog('info', 'Lawyers fetched successfully', { count: lawyerCount });

    // Log warning if no lawyers found (helpful for debugging)
    if (lawyerCount === 0) {
      safeLog('warn', 'No active lawyers found in database', {
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
    safeLog('error', 'Error handling lawyers request', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    // Return empty array instead of error - don't break the booking form
    return res.status(200).json({
      success: true,
      lawyers: [],
      count: 0,
      message: 'An error occurred while loading lawyers. Lawyer selection is optional.',
    });
  }
}

export default withErrorHandler(handler);

