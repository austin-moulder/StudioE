-- Create a minimal version of the user_profiles table
-- that just works with the auth system without all the complications

-- Drop the table if it exists to start clean
DROP TABLE IF EXISTS public.user_profiles CASCADE;

-- Create a simple version that should work with minimal requirements
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Grant public access for all operations (no RLS restrictions)
GRANT ALL ON public.user_profiles TO authenticated, anon, service_role, postgres;

-- Make sure sequence permissions are granted if they exist
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM pg_sequences
    WHERE schemaname = 'public' 
    AND sequencename = 'user_profiles_id_seq'
  ) THEN
    EXECUTE 'GRANT ALL ON SEQUENCE public.user_profiles_id_seq TO authenticated, anon, service_role, postgres';
  END IF;
END $$;

-- Disable RLS completely on this table
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;

-- Create a minimal trigger function that won't fail
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  -- Insert a minimal record
  INSERT INTO public.user_profiles (auth_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Make sure function is executable
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated, anon, service_role, postgres;

-- Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create profiles for existing users
INSERT INTO public.user_profiles (auth_id, full_name)
SELECT 
  id,
  COALESCE(raw_user_meta_data->>'full_name', email)
FROM auth.users
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_profiles WHERE auth_id = auth.users.id
); 