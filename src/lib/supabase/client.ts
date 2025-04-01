import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rnlubphxootnmsurnuvr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJubHVicGh4b290bm1zdXJudXZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzNzg2NTIsImV4cCI6MjA1ODk1NDY1Mn0.t9lao9h_GgHzgiSxYbH789T51Mwj7B-V16tBylfQzxE'

export const supabase = createClient(supabaseUrl, supabaseKey) 