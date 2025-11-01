import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseAdmin } from '../../../lib/supabase';
import { withErrorHandler } from '../../../middleware/error';
import { requireAdmin } from '../../../utils/api-auth';
import logger from '../../../utils/logger';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get lawyers
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
      const { status, limit = '100', offset = '0' } = req.query;
      const supabase = getSupabaseAdmin();

      let query = supabase
        .from('lawyers')
        .select('*', { count: 'exact' })
        .order('name', { ascending: true });

      if (status && typeof status === 'string') {
        query = query.eq('status', status);
      }

      const limitNum = parseInt(limit as string, 10);
      const offsetNum = parseInt(offset as string, 10);
      
      query = query.range(offsetNum, offsetNum + limitNum - 1);

      const { data, error, count } = await query;

      if (error) {
        logger.error('Error fetching lawyers', { error: error.message });
        return res.status(500).json({ error: 'Failed to fetch lawyers' });
      }

      return res.status(200).json({
        success: true,
        lawyers: data || [],
        total: count || 0,
      });
    } catch (error) {
      logger.error('Error handling lawyers request', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  }

  // Create lawyer
  if (req.method === 'POST') {
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
      const { lawyer_id, name, email, phone, practice_areas, bio, experience_years, status } = req.body;

      if (!lawyer_id || !name || !email) {
        return res.status(400).json({ error: 'Missing required fields: lawyer_id, name, email' });
      }

      const { data, error } = await supabaseAdmin
        .from('lawyers')
        .insert([{
          lawyer_id,
          name,
          email,
          phone: phone || null,
          practice_areas: practice_areas || [],
          bio: bio || null,
          experience_years: experience_years || null,
          status: status || 'active',
        }])
        .select()
        .single();

      if (error) {
        logger.error('Error creating lawyer', { error: error.message });
        return res.status(500).json({ error: 'Failed to create lawyer', details: error.message });
      }

      return res.status(201).json({
        success: true,
        lawyer: data,
      });
    } catch (error) {
      logger.error('Error creating lawyer', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  }

  // Update lawyer
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
      const { id, ...updateData } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Missing required field: id' });
      }

      // Only update provided fields - let database trigger handle updated_at if it exists
      const { data, error } = await supabaseAdmin
        .from('lawyers')
        .update({ ...updateData })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        logger.error('Error updating lawyer', { error: error.message });
        return res.status(500).json({ error: 'Failed to update lawyer', details: error.message });
      }

      return res.status(200).json({
        success: true,
        lawyer: data,
      });
    } catch (error) {
      logger.error('Error updating lawyer', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  }

  // Delete lawyer
  if (req.method === 'DELETE') {
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
      const { id } = req.query;

      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Missing required field: id' });
      }

      const { error } = await supabaseAdmin
        .from('lawyers')
        .delete()
        .eq('id', id);

      if (error) {
        logger.error('Error deleting lawyer', { error: error.message });
        return res.status(500).json({ error: 'Failed to delete lawyer', details: error.message });
      }

      return res.status(200).json({
        success: true,
        message: 'Lawyer deleted successfully',
      });
    } catch (error) {
      logger.error('Error deleting lawyer', {
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

export default withErrorHandler(handler);

