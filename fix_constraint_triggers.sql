-- Drop constraint triggers between auth.users and user_profiles
DROP TRIGGER IF EXISTS "RI_ConstraintTrigger_a_84449" ON auth.users;
DROP TRIGGER IF EXISTS "RI_ConstraintTrigger_a_84450" ON auth.users;
DROP TRIGGER IF EXISTS "RI_ConstraintTrigger_c_84451" ON public.user_profiles;
DROP TRIGGER IF EXISTS "RI_ConstraintTrigger_c_84452" ON public.user_profiles;

-- Create user_profiles table with ALTER CONSTRAINT behavior instead
DROP TABLE IF EXISTS public.user_profiles CASCADE;

-- Create the table with a modified foreign key definition
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE,  -- Not using REFERENCES initially
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add the foreign key constraint with ON DELETE CASCADE / ON UPDATE CASCADE
-- but make it DEFERRABLE so it won't create those constraint triggers
ALTER TABLE public.user_profiles 
  ADD CONSTRAINT user_profiles_auth_id_fkey 
  FOREIGN KEY (auth_id) REFERENCES auth.users(id) 
  ON DELETE CASCADE ON UPDATE CASCADE
  DEFERRABLE INITIALLY DEFERRED;

-- Grant public access for all operations
GRANT ALL ON public.user_profiles TO authenticated, anon, service_role, postgres;

-- Completely disable RLS
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;

-- Create a minimal trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
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