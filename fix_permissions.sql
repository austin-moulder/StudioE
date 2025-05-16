-- Fix permissions for user_profiles table
GRANT ALL ON public.user_profiles TO postgres, authenticated, service_role, anon;

-- Create a policy that allows public access
DROP POLICY IF EXISTS "Allow public access to user_profiles" ON public.user_profiles;
CREATE POLICY "Allow public access to user_profiles" ON public.user_profiles
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Also grant permission to the sequence
GRANT ALL ON SEQUENCE public.user_profiles_id_seq TO postgres, authenticated, service_role, anon;

-- Create a policy for the anon role specifically
DROP POLICY IF EXISTS "Allow anon access to user_profiles" ON public.user_profiles;
CREATE POLICY "Allow anon access to user_profiles" ON public.user_profiles
  FOR ALL
  TO anon
  USING (true)
  WITH CHECK (true); 