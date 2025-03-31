import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://rnlubphxootnmsurnuvr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubHVicGh4b290bm1zdXJudXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNzg2NTIsImV4cCI6MjA1ODk1NDY1Mn0.t9lao9h_GgHzgiSxYbH789T51Mwj7B-V16tBylfQzxE';

// For production, you would typically use environment variables
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey); 