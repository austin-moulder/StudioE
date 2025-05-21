import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Use environment variables for Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// IMPORTANT: Always use the production URL for redirects when in production
const isProd = process.env.NODE_ENV === 'production';
const SITE_URL = isProd 
  ? 'https://www.joinstudioe.com' 
  : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Verify environment variables are set
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce', // More secure than 'implicit'
    storage: typeof window !== 'undefined' ? window.localStorage : undefined
  },
  global: {
    headers: {
      'x-application-name': 'studio-e',
    },
  },
});

// Export site URL for use in other files
export { SITE_URL }; 