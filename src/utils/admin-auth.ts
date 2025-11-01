import { supabase, getSupabaseAdmin } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';

export interface AdminUser {
  id: string;
  user_id: string;
  email: string;
  created_at: string;
}

/**
 * Check if the current user is an admin
 */
export async function isAdmin(): Promise<boolean> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      return false;
    }

    const { data, error } = await supabase
      .from('admins')
      .select('id')
      .eq('email', session.user.email)
      .single();

    if (error || !data) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

/**
 * Get admin user data for the current session
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user?.email) {
      return null;
    }

    const { data, error } = await supabase
      .from('admins')
      .select('*')
      .eq('email', session.user.email)
      .single();

    if (error || !data) {
      return null;
    }

    return data as AdminUser;
  } catch (error) {
    console.error('Error getting admin user:', error);
    return null;
  }
}

/**
 * Server-side admin check (for API routes)
 */
export async function isAdminServerSide(email: string): Promise<boolean> {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { data, error } = await supabaseAdmin
      .from('admins')
      .select('id')
      .eq('email', email)
      .single();

    if (error || !data) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error checking admin status server-side:', error);
    return false;
  }
}

