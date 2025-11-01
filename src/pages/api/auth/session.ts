import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../../lib/supabase';

/**
 * API endpoint to check session status
 * This helps synchronize session between client and middleware
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Get session from cookies/headers
    const { data: { session }, error } = await supabase.auth.getSession();

    if (error) {
      return res.status(200).json({ 
        hasSession: false,
        error: error.message 
      });
    }

    return res.status(200).json({ 
      hasSession: !!session,
      user: session?.user ? {
        id: session.user.id,
        email: session.user.email,
      } : null,
    });
  } catch (error) {
    return res.status(200).json({ 
      hasSession: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

