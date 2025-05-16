-- Drop the existing policy that references user_profiles
DROP POLICY IF EXISTS "Allow authors to update their own profiles" ON blog_authors;

-- Create a new policy that uses direct UUID comparison
CREATE POLICY "Allow authors to update their own profiles" 
  ON blog_authors FOR UPDATE TO authenticated USING (
    auth.uid() = blog_authors.id
  ); 