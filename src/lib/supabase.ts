import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Check if we're in build-time or runtime
const isBuildTime = process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_SUPABASE_URL;

// Create a dummy placeholder client for build-time when env vars are missing
// This allows the build to complete without throwing errors
const createPlaceholderClient = (): SupabaseClient => {
  const dummyUrl = 'https://placeholder.supabase.co';
  const dummyKey = 'placeholder-key';
  return createClient(dummyUrl, dummyKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

// Initialize Supabase client with error handling for build-time
let supabaseInstance: SupabaseClient;

// Helper to check if we're in browser environment (SSR-safe)
const isBrowserEnv = (): boolean => {
  if (typeof process === 'undefined' || !process.versions?.node) {
    return true; // Browser environment
  }
  return false; // Node/SSR environment
};

if (!supabaseUrl || !supabaseAnonKey) {
  if (isBuildTime || !isBrowserEnv()) {
    // During build or SSR without env vars, use placeholder to allow build to complete
    console.warn('Supabase environment variables not set. Using placeholder client for build. Make sure to set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your deployment environment.');
    supabaseInstance = createPlaceholderClient();
  } else {
    // Runtime error if env vars are missing (in browser)
    throw new Error('Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local');
  }
} else {
  // Normal initialization with env vars
  // Use localStorage only in browser environment
  const getStorage = () => {
    if (typeof process !== 'undefined' && process.versions?.node) {
      return undefined; // Node/SSR - no localStorage
    }
    try {
      return typeof (globalThis as any).window !== 'undefined' 
        ? (globalThis as any).window.localStorage 
        : undefined;
    } catch {
      return undefined;
    }
  };
    
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: getStorage() as any,
      flowType: 'pkce', // Use PKCE flow for better security
    },
    global: {
      headers: {
        'X-Client-Info': 'admin-dashboard',
      },
    },
  });
}

// Public client for client-side operations (uses anon key)
export const supabase = supabaseInstance;

// Admin client for server-side operations (uses service role key)
// Only available in server-side contexts (API routes)
export const getSupabaseAdmin = (): SupabaseClient => {
  try {
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase environment variables not set. Cannot create admin client.');
      return createPlaceholderClient();
    }

    if (!supabaseServiceRoleKey) {
      console.warn('SUPABASE_SERVICE_ROLE_KEY is not set. Falling back to anon key.');
      // Fall back to anon key if service role key is not available
      return createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      });
    }
    
    return createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  } catch (error) {
    console.error('Error creating Supabase admin client:', error);
    return createPlaceholderClient();
  }
}; 