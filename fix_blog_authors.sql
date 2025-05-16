-- First check if blog_authors table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'blog_authors'
);

-- Update blog_authors RLS policies (if the table exists)
DO $$
BEGIN
  -- Check if the table exists
  IF EXISTS (SELECT FROM information_schema.tables 
             WHERE table_schema = 'public' 
             AND table_name = 'blog_authors') THEN
    
    -- Drop any existing policies that might reference user_profiles
    DROP POLICY IF EXISTS "Allow authors to update their own profiles" ON blog_authors;
    
    -- Create a new policy that uses direct UUID comparison
    CREATE POLICY "Allow authors to update their own profiles" 
      ON blog_authors FOR UPDATE TO authenticated USING (
        auth.uid()::uuid = blog_authors.id
      );
  END IF;
END $$; 