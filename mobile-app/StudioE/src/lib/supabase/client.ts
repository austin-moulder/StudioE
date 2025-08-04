import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Use the same Supabase credentials as the web app
const supabaseUrl = 'https://rnlubphxootnmsurnuvr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubHVicGh4b290bm1zdXJudXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNzg2NTIsImV4cCI6MjA1ODk1NDY1Mn0.t9lao9h_GgHzgiSxYbH789T51Mwj7B-V16tBylfQzxE';

// Create a singleton instance of the Supabase client for mobile
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: false, // Mobile doesn't use URL-based auth
  }
});

// Re-export createClient function for use in other modules
export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false,
    }
  });
}; 