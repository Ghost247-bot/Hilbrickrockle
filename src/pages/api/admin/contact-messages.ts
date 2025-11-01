import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseAdmin } from '../../../lib/supabase';
import { requireAdmin } from '../../../utils/api-auth';
import logger from '../../../utils/logger';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get contact messages
  if (req.method === 'GET') {
    try {
      // Require admin authentication
      await requireAdmin(req);
    } catch (authError: any) {
      const statusCode = authError.statusCode || 401;
      logger.warn('Authentication failed for contact messages', {
        statusCode,
        message: authError.message,
      });
      return res.status(statusCode).json({ 
        error: authError.message || 'Unauthorized' 
      });
    }

    try {
      const { status, limit = '50', offset = '0' } = req.query;
      const supabaseAdmin = getSupabaseAdmin();

      let query = supabaseAdmin
        .from('contact_messages')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (status && typeof status === 'string' && status !== 'all') {
        query = query.eq('status', status);
      }

      const limitNum = parseInt(limit as string, 10);
      const offsetNum = parseInt(offset as string, 10);
      
      // Validate pagination parameters
      if (isNaN(limitNum) || limitNum < 1) {
        logger.warn('Invalid limit parameter', { limit });
        return res.status(400).json({ error: 'Invalid limit parameter' });
      }
      if (isNaN(offsetNum) || offsetNum < 0) {
        logger.warn('Invalid offset parameter', { offset });
        return res.status(400).json({ error: 'Invalid offset parameter' });
      }
      
      query = query.range(offsetNum, offsetNum + limitNum - 1);

      const { data, error, count } = await query;

      if (error) {
        logger.error('Error fetching contact messages', { 
          error: error.message,
          code: error.code,
          details: error.details,
        });
        // Check if table doesn't exist
        if (error.message?.includes('does not exist') || error.code === '42P01' || error.code === 'PGRST116') {
          return res.status(200).json({
            success: true,
            messages: [],
            total: 0,
            message: 'Contact messages table does not exist. Please run the database setup script.',
          });
        }
        return res.status(500).json({ 
          error: 'Failed to fetch contact messages',
          message: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
      }

      return res.status(200).json({
        success: true,
        messages: data || [],
        total: count || 0,
      });
    } catch (error) {
      logger.error('Error handling contact messages request', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      return res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  }

  // Update message status
  if (req.method === 'PATCH') {
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
      const { id, status } = req.body;

      if (!id || !status) {
        return res.status(400).json({ error: 'Missing required fields: id and status' });
      }

      const supabaseAdmin = getSupabaseAdmin();
      // Only update status - let database trigger handle updated_at if it exists
      const { data, error } = await supabaseAdmin
        .from('contact_messages')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        logger.error('Error updating contact message', { 
          error: error.message,
          code: error.code,
          details: error.details,
          id,
          status,
        });
        // Check if table doesn't exist
        if (error.message?.includes('does not exist') || error.code === '42P01' || error.code === 'PGRST116') {
          return res.status(500).json({ 
            error: 'Database table not found',
            message: 'The contact_messages table does not exist. Please run the database setup script.',
          });
        }
        return res.status(500).json({ 
          error: 'Failed to update contact message',
          message: process.env.NODE_ENV === 'development' ? error.message : undefined,
        });
      }

      return res.status(200).json({
        success: true,
        message: data,
      });
    } catch (error) {
      logger.error('Error updating contact message', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

export default handler;

