-- List all policies that might reference user_profiles
SELECT * FROM pg_policies 
WHERE policydef::text LIKE '%user_profiles%' 
   OR policydef::text LIKE '%user\\_profiles%';

-- Drop all RLS policies on blog_authors to be safe
DROP POLICY IF EXISTS "Allow public read access for blog_authors" ON blog_authors;
DROP POLICY IF EXISTS "Allow public creation of blog_authors" ON blog_authors;
DROP POLICY IF EXISTS "Allow authors to update their own profiles" ON blog_authors;
DROP POLICY IF EXISTS "Allow authenticated users to update their own profiles" ON blog_authors;

-- Recreate policies without user_profiles references
-- Allow anyone to read authors
CREATE POLICY "Allow public read access for blog_authors" 
  ON blog_authors FOR SELECT USING (true);

-- Allow anyone to create authors
CREATE POLICY "Allow public creation of blog_authors" 
  ON blog_authors FOR INSERT USING (true);

-- Allow authors to update their own profiles (using direct UUID comparison)
CREATE POLICY "Allow authors to update their own profiles" 
  ON blog_authors FOR UPDATE TO authenticated USING (
    auth.uid()::uuid = blog_authors.id
  );

-- Check for any auth triggers that might reference user_profiles
SELECT tgname, tgrelid::regclass, pg_get_triggerdef(oid)
FROM pg_trigger
WHERE pg_get_triggerdef(oid) LIKE '%user_profiles%';

-- Check auth.users for any references
SELECT * FROM pg_matviews 
WHERE definition LIKE '%user_profiles%';

-- Check auth function definitions for references to user_profiles
SELECT routine_name, routine_definition
FROM information_schema.routines 
WHERE routine_definition LIKE '%user_profiles%'
AND specific_schema = 'public';

-- Check for functions that might still be referencing the user_profiles table
SELECT proname, prosrc
FROM pg_proc p 
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'public' 
  AND prosrc LIKE '%user_profiles%'; 