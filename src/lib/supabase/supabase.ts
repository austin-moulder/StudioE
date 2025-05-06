import { createClient } from '@supabase/supabase-js';

// Use environment variables for Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// IMPORTANT: Always use the production URL for redirects
const SITE_URL = 'https://www.joinstudioe.com';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Create a single supabase client for interacting with your database
// Force redirects to always go to production URL
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    // The redirect URL will be manually set in each auth function call
  },
  global: {
    headers: {
      'x-application-name': 'studio-e',
    },
  },
});

// Export site URL for use in other files
export { SITE_URL }; 