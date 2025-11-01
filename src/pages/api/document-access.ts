import type { NextApiRequest, NextApiResponse } from 'next';
import { getSupabaseAdmin } from '../../lib/supabase';
import { withErrorHandler } from '../../middleware/error';
import logger from '../../utils/logger';
import bcrypt from 'bcryptjs';

// POST - Verify password and get document access
async function verifyPassword(req: NextApiRequest, res: NextApiResponse) {
  const supabaseAdmin = getSupabaseAdmin();
  
  const { token, password } = req.body;
  
  if (!token || !password) {
    return res.status(400).json({ error: 'Token and password are required' });
  }
  
  // Fetch document link by token
  const { data: link, error } = await supabaseAdmin
    .from('document_links')
    .select('*')
    .eq('unique_token', token)
    .single();
  
  if (error || !link) {
    logger.error('Document link not found', { token });
    return res.status(404).json({ error: 'Document link not found' });
  }
  
  // Check if expired
  if (link.expires_at && new Date(link.expires_at) < new Date()) {
    await supabaseAdmin
      .from('document_links')
      .update({ status: 'expired' })
      .eq('id', link.id);
    
    return res.status(410).json({ error: 'Document link has expired' });
  }
  
  // Verify password
  const isValidPassword = await bcrypt.compare(password, link.password_hash);
  
  if (!isValidPassword) {
    logger.warn('Invalid password attempt', { token });
    return res.status(401).json({ error: 'Invalid password' });
  }
  
  // Update accessed_at timestamp
  await supabaseAdmin
    .from('document_links')
    .update({ accessed_at: new Date().toISOString() })
    .eq('id', link.id);
  
  // Return document data (without password hash)
  const { password_hash, ...linkData } = link;
  
  logger.info('Document access granted', { token });
  
  return res.status(200).json({ 
    message: 'Access granted',
    link: linkData 
  });
}

// POST - Upload client document
async function uploadClientDocument(req: NextApiRequest, res: NextApiResponse) {
  const supabaseAdmin = getSupabaseAdmin();
  
  const { token, uploaded_document_url } = req.body;
  
  if (!token || !uploaded_document_url) {
    return res.status(400).json({ error: 'Token and uploaded document URL are required' });
  }
  
  // Update document link with uploaded document
  const { data, error } = await supabaseAdmin
    .from('document_links')
    .update({ 
      uploaded_document_url,
      status: 'completed',
      completed_at: new Date().toISOString()
    })
    .eq('unique_token', token)
    .select()
    .single();
  
  if (error) {
    logger.error('Error uploading client document', { error: error.message });
    return res.status(500).json({ error: 'Failed to upload document' });
  }
  
  logger.info('Client document uploaded', { token });
  
  return res.status(200).json({ 
    message: 'Document uploaded successfully',
    link: data 
  });
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { action } = req.body;
    
    if (action === 'verify') {
      return verifyPassword(req, res);
    } else if (action === 'upload') {
      return uploadClientDocument(req, res);
    } else {
      return res.status(400).json({ error: 'Invalid action' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}

export default withErrorHandler(handler);

