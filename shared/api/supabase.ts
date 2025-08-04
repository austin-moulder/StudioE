import { createClient } from '@supabase/supabase-js';

// Supabase configuration - these should be environment variables
export const SUPABASE_CONFIG = {
  url: 'https://rnlubphxootnmsurnuvr.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubHVicGh4b290bm1zdXJudXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MTI3ODQsImV4cCI6MjA1MDQ4ODc4NH0.yXSG8U0mCKXdY7lrQFqJwxGGOKLQ3YrIGzFGdUYJhL8'
};

// Create Supabase client with platform-specific options
export function createSupabaseClient(options?: {
  autoRefreshToken?: boolean;
  persistSession?: boolean;
  detectSessionInUrl?: boolean;
}) {
  const defaultOptions = {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      ...options
    }
  };

  return createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, defaultOptions);
}

// Web-specific client (with session URL detection)
export const createWebSupabaseClient = () => createSupabaseClient({
  detectSessionInUrl: true
});

// Mobile-specific client (without session URL detection)
export const createMobileSupabaseClient = () => createSupabaseClient({
  detectSessionInUrl: false
}); 