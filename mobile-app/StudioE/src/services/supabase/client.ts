import { createClient } from '@supabase/supabase-js';

// Shared Supabase configuration
const SUPABASE_CONFIG = {
  url: 'https://rnlubphxootnmsurnuvr.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubHVicGh4b290bm1zdXJudXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5MTI3ODQsImV4cCI6MjA1MDQ4ODc4NH0.yXSG8U0mCKXdY7lrQFqJwxGGOKLQ3YrIGzFGdUYJhL8'
};

// Create mobile-optimized Supabase client
export const supabase = createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false  // Mobile apps don't need URL session detection
  }
});

export default supabase; 