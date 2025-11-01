import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseAdmin } from '../../../lib/supabase';
import { withErrorHandler } from '../../../middleware/error';
import { requireAdmin } from '../../../utils/api-auth';
import logger from '../../../utils/logger';
import bcrypt from 'bcryptjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get document links
  if (req.method === 'GET') {
    try {
      await requireAdmin(req);
    } catch (authError: any) {
      const statusCode = authError.statusCode || 401;
      return res.status(statusCode).json({ 
        error: authError.message || 'Unauthorized' 
      });
    }

    try {
      const { status, limit = '50', offset = '0' } = req.query;
      const supabase = getSupabaseAdmin();

      let query = supabase
        .from('document_links')
        .select('id, title, description, client_name, client_email, unique_token, document_url, uploaded_document_url, status, expires_at, created_at, updated_at, accessed_at, completed_at', { count: 'exact' })
        .order('created_at', { ascending: false });

      if (status && typeof status === 'string') {
        query = query.eq('status', status);
      }

      const limitNum = parseInt(limit as string, 10);
      const offsetNum = parseInt(offset as string, 10);
      
      query = query.range(offsetNum, offsetNum + limitNum - 1);

      const { data, error, count } = await query;

      if (error) {
        logger.error('Error fetching document links', { error: error.message });
        // Check if table doesn't exist
        if (error.message?.includes('does not exist') || error.code === '42P01') {
          return res.status(200).json({
            success: true,
            documentLinks: [],
            total: 0,
            message: 'Document links table does not exist. Please run the database setup script.',
          });
        }
        return res.status(500).json({ error: 'Failed to fetch document links' });
      }

      return res.status(200).json({
        success: true,
        documentLinks: data || [],
        total: count || 0,
      });
    } catch (error) {
      logger.error('Error handling document links request', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  }

  // Create document link
  if (req.method === 'POST') {
    try {
      await requireAdmin(req);
    } catch (authError: any) {
      const statusCode = authError.statusCode || 401;
      return res.status(statusCode).json({ 
        error: authError.message || 'Unauthorized' 
      });
    }

    try {
      const { 
        title, 
        description, 
        client_name, 
        client_email, 
        password, 
        document_url, 
        expires_at 
      } = req.body;

      if (!title || !password) {
        return res.status(400).json({ error: 'Missing required fields: title and password' });
      }

      // Hash password
      const password_hash = await bcrypt.hash(password, 10);

      const supabaseAdmin = getSupabaseAdmin();
      const token = req.headers.authorization?.replace('Bearer ', '') || '';
      let userId = null;
      
      if (token) {
        const { data: { user } } = await supabaseAdmin.auth.getUser(token);
        userId = user?.id || null;
      }

      const { data, error } = await supabaseAdmin
        .from('document_links')
        .insert([{
          title,
          description: description || null,
          client_name: client_name || null,
          client_email: client_email || null,
          password_hash,
          document_url: document_url || null,
          expires_at: expires_at || null,
          status: 'pending',
          created_by: userId,
        }])
        .select('id, title, description, client_name, client_email, unique_token, document_url, status, expires_at, created_at')
        .single();

      if (error) {
        logger.error('Error creating document link', { error: error.message });
        // Check if table doesn't exist
        if (error.message?.includes('does not exist') || error.code === '42P01') {
          return res.status(500).json({ 
            error: 'Database table not found',
            message: 'The document_links table does not exist. Please run the database setup script.',
            details: 'See scripts/create-document-links-table.sql for the table creation script.',
          });
        }
        return res.status(500).json({ error: 'Failed to create document link', details: error.message });
      }

      return res.status(201).json({
        success: true,
        documentLink: data,
      });
    } catch (error) {
      logger.error('Error creating document link', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  }

  // Update document link
  if (req.method === 'PATCH') {
    try {
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

      // If password is being updated, hash it
      if (updateData.password) {
        updateData.password_hash = await bcrypt.hash(updateData.password, 10);
        delete updateData.password;
      }

      const supabaseAdmin = getSupabaseAdmin();
      // Only update provided fields - let database trigger handle updated_at if it exists
      const { data, error } = await supabaseAdmin
        .from('document_links')
        .update({ ...updateData })
        .eq('id', id)
        .select('id, title, description, client_name, client_email, unique_token, document_url, uploaded_document_url, status, expires_at, created_at, updated_at, accessed_at, completed_at')
        .single();

      if (error) {
        logger.error('Error updating document link', { error: error.message });
        return res.status(500).json({ error: 'Failed to update document link', details: error.message });
      }

      return res.status(200).json({
        success: true,
        documentLink: data,
      });
    } catch (error) {
      logger.error('Error updating document link', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });
      return res.status(500).json({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'An unexpected error occurred',
      });
    }
  }

  // Delete document link
  if (req.method === 'DELETE') {
    try {
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

      const supabaseAdmin = getSupabaseAdmin();
      const { error } = await supabaseAdmin
        .from('document_links')
        .delete()
        .eq('id', id);

      if (error) {
        logger.error('Error deleting document link', { error: error.message });
        return res.status(500).json({ error: 'Failed to delete document link', details: error.message });
      }

      return res.status(200).json({
        success: true,
        message: 'Document link deleted successfully',
      });
    } catch (error) {
      logger.error('Error deleting document link', {
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

