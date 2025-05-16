-- Find all RLS policies that reference user_profiles
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM
  pg_policies
WHERE
  qual::text LIKE '%user_profiles%' OR 
  with_check::text LIKE '%user_profiles%';

-- Check for any blog_authors table policies that might reference user_profiles
SELECT
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM
  pg_policies
WHERE
  tablename = 'blog_authors';

-- Drop any problematic RLS policies on blog_authors
DROP POLICY IF EXISTS "Allow authors to update their own profiles" ON blog_authors;

-- Create a new policy for blog_authors that doesn't reference user_profiles
CREATE POLICY "Allow authors to update their own profiles" 
  ON blog_authors FOR UPDATE TO authenticated USING (
    auth.uid()::uuid = id
  ); 