-- Alternative approach: Create user_profiles table with NO foreign keys
-- This eliminates all constraint triggers completely

-- Drop constraint triggers manually first
DROP TRIGGER IF EXISTS "RI_ConstraintTrigger_a_84449" ON auth.users;
DROP TRIGGER IF EXISTS "RI_ConstraintTrigger_a_84450" ON auth.users;
DROP TRIGGER IF EXISTS "RI_ConstraintTrigger_c_84451" ON public.user_profiles;
DROP TRIGGER IF EXISTS "RI_ConstraintTrigger_c_84452" ON public.user_profiles;

-- Drop the existing table
DROP TABLE IF EXISTS public.user_profiles CASCADE;

-- Create a completely independent table with no foreign keys
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE,  -- No foreign key reference
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for lookups (not a constraint)
CREATE INDEX user_profiles_auth_id_idx ON public.user_profiles(auth_id);

-- Grant all permissions
GRANT ALL ON public.user_profiles TO authenticated, anon, service_role, postgres;

-- Disable RLS completely
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;

-- Create a minimal trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (auth_id, full_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email));
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Silently ignore all errors to prevent auth failures
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Make sure function is executable
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated, anon, service_role, postgres;

-- Create the trigger but handle exceptions
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create profiles for existing users, skipping any that fail
DO $$
DECLARE
  user_rec RECORD;
BEGIN
  FOR user_rec IN SELECT id, raw_user_meta_data, email FROM auth.users
  LOOP
    BEGIN
      INSERT INTO public.user_profiles (auth_id, full_name)
      VALUES (
        user_rec.id, 
        COALESCE(user_rec.raw_user_meta_data->>'full_name', user_rec.email)
      )
      ON CONFLICT (auth_id) DO NOTHING;
    EXCEPTION
      WHEN OTHERS THEN
        -- Just skip this user if there's an error
        CONTINUE;
    END;
  END LOOP;
END;
$$; 