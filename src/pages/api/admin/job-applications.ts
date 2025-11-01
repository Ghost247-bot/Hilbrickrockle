import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseAdmin } from '../../../lib/supabase';
import { withErrorHandler } from '../../../middleware/error';
import { requireAdmin } from '../../../utils/api-auth';
import logger from '../../../utils/logger';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get job applications
  if (req.method === 'GET') {
    try {
      // Require admin authentication
      await requireAdmin(req);
    } catch (authError: any) {
      const statusCode = authError.statusCode || 401;
      return res.status(statusCode).json({ 
        error: authError.message || 'Unauthorized' 
      });
    }

    try {
      const { status, limit = '50', offset = '0', position } = req.query;
      const supabaseAdmin = getSupabaseAdmin();

      let query = supabaseAdmin
        .from('job_applications')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (status && typeof status === 'string' && status !== 'all') {
        query = query.eq('status', status);
      }

      if (position && typeof position === 'string') {
        query = query.eq('position', position);
      }

      const limitNum = parseInt(limit as string, 10);
      const offsetNum = parseInt(offset as string, 10);
      
      query = query.range(offsetNum, offsetNum + limitNum - 1);

      const { data, error, count } = await query;

      if (error) {
        logger.error('Error fetching job applications', { 
          error: error.message,
          code: error.code,
          details: error.details,
        });
        // Check if table doesn't exist
        if (error.message?.includes('does not exist') || error.code === '42P01' || error.code === 'PGRST116') {
          return res.status(200).json({
            success: true,
            applications: [],
            total: 0,
            message: 'Job applications table does not exist. Please run the database setup script.',
          });
        }
        return res.status(500).json({ 
          error: 'Failed to fetch job applications',
          message: error.message,
        });
      }

      return res.status(200).json({
        success: true,
        applications: data || [],
        total: count || 0,
      });
    } catch (error: any) {
      logger.error('Error handling job applications request', {
        error: error.message,
        stack: error.stack,
      });
      return res.status(500).json({
        error: 'Failed to fetch job applications',
        message: error.message,
      });
    }
  }

  // Update job application status
  if (req.method === 'PUT') {
    try {
      await requireAdmin(req);
    } catch (authError: any) {
      const statusCode = authError.statusCode || 401;
      return res.status(statusCode).json({ 
        error: authError.message || 'Unauthorized' 
      });
    }

    try {
      const { id, status, notes } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Application ID is required' });
      }

      const supabaseAdmin = getSupabaseAdmin();
      const updateData: any = {
        updated_at: new Date().toISOString(),
      };

      if (status) {
        updateData.status = status;
      }

      if (notes !== undefined) {
        updateData.notes = notes;
      }

      const { data, error } = await supabaseAdmin
        .from('job_applications')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        logger.error('Error updating job application', {
          error: error.message,
          applicationId: id,
        });
        return res.status(500).json({
          error: 'Failed to update job application',
          message: error.message,
        });
      }

      return res.status(200).json({
        success: true,
        application: data,
      });
    } catch (error: any) {
      logger.error('Error handling job application update', {
        error: error.message,
        stack: error.stack,
      });
      return res.status(500).json({
        error: 'Failed to update job application',
        message: error.message,
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default withErrorHandler(handler);

