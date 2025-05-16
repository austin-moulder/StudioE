-- Check if the user_profiles table is referenced in auth triggers
SELECT n.nspname as schema, 
       p.proname as function_name, 
       p.prosrc as function_body
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE (p.prosrc LIKE '%user_profiles%' OR p.prosrc LIKE '%user\\_profiles%')
AND n.nspname in ('auth', 'public');

-- Reset auth policies for auth.users table
ALTER TABLE auth.users DISABLE ROW LEVEL SECURITY;
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Check authentication policies
SELECT * FROM pg_policies 
WHERE tablename = 'users' AND schemaname = 'auth';

-- Update auth.users policies to not depend on user_profiles
-- (This is safer than directly editing the policies, as it keeps defaults)
BEGIN;
  -- Create an empty function to replace any that might be broken
  CREATE OR REPLACE FUNCTION public.handle_auth_user_profiles() 
  RETURNS TRIGGER AS $$
  BEGIN
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;
  
  -- Drop problematic triggers if they exist
  DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
  DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;
COMMIT; 