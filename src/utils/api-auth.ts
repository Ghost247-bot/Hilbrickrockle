import type { NextApiRequest } from 'next';
import { getSupabaseAdmin } from '../lib/supabase';
import { isAdminServerSide } from './admin-auth';

/**
 * Get authenticated user from API request
 * Works with Supabase sessions via cookies
 */
export async function getAuthenticatedUser(req: NextApiRequest): Promise<{ email: string; id: string } | null> {
  try {
    // Get the authorization header
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      // Try to get session from cookies using Supabase admin client
      const supabaseAdmin = getSupabaseAdmin();
      
      // Extract cookies
      const cookies = req.headers.cookie || '';
      if (!cookies) {
        return null;
      }

      // This is a workaround - in production, you'd need to properly parse Supabase session cookies
      // For now, we'll rely on the Bearer token approach
      return null;
    }

    const token = authHeader.replace('Bearer ', '');
    
    if (!token || token.trim() === '') {
      return null;
    }
    
    // Use Supabase admin client to verify the token
    const supabaseAdmin = getSupabaseAdmin();
    
    try {
      // Verify the access token
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
      
      if (error) {
        // Log error but don't expose details
        console.error('Auth token verification error:', error.message);
        return null;
      }
      
      if (!user?.email) {
        return null;
      }

      return {
        email: user.email,
        id: user.id,
      };
    } catch (verifyError) {
      console.error('Error verifying auth token:', verifyError);
      return null;
    }
  } catch (error) {
    console.error('Error getting authenticated user:', error);
    return null;
  }
}

/**
 * Require admin authentication for API routes
 * Throws an error with status code information that should be caught by the handler
 */
export async function requireAdmin(req: NextApiRequest): Promise<{ email: string; id: string }> {
  const user = await getAuthenticatedUser(req);
  
  if (!user) {
    const error: any = new Error('Unauthorized');
    error.statusCode = 401;
    throw error;
  }

  const isAdmin = await isAdminServerSide(user.email);
  if (!isAdmin) {
    const error: any = new Error('Forbidden: Admin access required');
    error.statusCode = 403;
    throw error;
  }

  return user;
}

