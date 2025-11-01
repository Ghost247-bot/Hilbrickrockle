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
    
    // Fetch lawyers from Supabase - try with specific fields first
    let allLawyers: any[] | null = null;
    let queryError: any = null;
    
    // First attempt: fetch with specific fields
    const { data: specificData, error: specificError } = await supabaseAdmin
      .from('lawyers')
      .select('lawyer_id, name, email, phone, practice_areas, bio, experience_years, status, title, image_url, ref_code')
      .order('name', { ascending: true });
    
    if (specificError) {
      queryError = specificError;
      safeLog('warn', 'Error fetching with specific fields, trying with all fields', { 
        error: specificError.message 
      });
      
      // Second attempt: fetch all fields if specific fields failed
      const { data: allData, error: allDataError } = await supabaseAdmin
        .from('lawyers')
        .select('*')
        .order('name', { ascending: true });
      
      if (!allDataError && allData) {
        allLawyers = allData.map((law: any) => ({
          lawyer_id: law.lawyer_id || law.id,
          name: law.name,
          email: law.email,
          phone: law.phone,
          practice_areas: law.practice_areas || [],
          bio: law.bio,
          experience_years: law.experience_years,
          status: law.status || 'active',
          title: law.title,
          image_url: law.image_url,
          ref_code: law.ref_code,
        }));
        queryError = null; // Clear error since we got data
      } else {
        queryError = allDataError || specificError;
      }
    } else {
      allLawyers = specificData;
    }
    
    // Filter to active lawyers only (if status field exists)
    const lawyers = (allLawyers || []).filter((lawyer: any) => {
      // Include lawyer if status is active or status field doesn't exist
      return !lawyer.status || lawyer.status === 'active';
    });
    
    const error = queryError;

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
    
    // Log detailed info for debugging
    safeLog('info', 'Lawyers fetch attempt completed', { 
      count: lawyerCount,
      totalFound: allLawyers?.length || 0,
      hasError: !!error,
      errorMessage: error ? (error as any).message : null
    });

    // Log warning if no lawyers found (helpful for debugging)
    if (lawyerCount === 0 && !error) {
      safeLog('warn', 'No active lawyers found in database', {
        message: 'The lawyers table may be empty or all lawyers have inactive status',
        suggestion: 'Check Supabase Table Editor to verify lawyers exist and have status="active"',
        totalInTable: allLawyers?.length || 0,
      });
    }

    return res.status(200).json({
      success: true,
      lawyers: lawyers || [],
      count: lawyerCount,
      debug: process.env.NODE_ENV === 'development' ? {
        totalInTable: allLawyers?.length || 0,
        filteredCount: lawyerCount,
        error: error ? (error as any).message : null,
      } : undefined,
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

