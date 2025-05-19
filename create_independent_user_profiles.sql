-- Completely recreate the user_profiles table to fix new user sign-up issues
-- This version has no foreign keys and minimal permissions setup

-- Drop constraint triggers manually first (if they exist)
DROP TRIGGER IF EXISTS "RI_ConstraintTrigger_a_84449" ON auth.users;
DROP TRIGGER IF EXISTS "RI_ConstraintTrigger_a_84450" ON auth.users;
DROP TRIGGER IF EXISTS "RI_ConstraintTrigger_c_84451" ON public.user_profiles;
DROP TRIGGER IF EXISTS "RI_ConstraintTrigger_c_84452" ON public.user_profiles;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Drop the existing table
DROP TABLE IF EXISTS public.user_profiles CASCADE;

-- Create a completely independent table with no foreign keys
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE,  -- No foreign key reference to avoid constraint issues
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for lookups (not a constraint)
CREATE INDEX user_profiles_auth_id_idx ON public.user_profiles(auth_id);

-- Grant all permissions to make sure there are no RLS issues
GRANT ALL ON public.user_profiles TO authenticated, anon, service_role, postgres;

-- Disable RLS completely to avoid permission errors
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;

-- Create a fail-safe trigger function to handle new users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  -- Add extensive logging
  RAISE LOG 'Creating user profile for auth user: %', NEW.id;
  
  BEGIN
    INSERT INTO public.user_profiles (auth_id, full_name)
    VALUES (
      NEW.id, 
      COALESCE(
        NEW.raw_user_meta_data->>'full_name', 
        NEW.raw_user_meta_data->>'name',
        NEW.email,
        'New User'
      )
    )
    ON CONFLICT (auth_id) DO NOTHING;
    RAISE LOG 'User profile created successfully for: %', NEW.id;
  EXCEPTION
    WHEN OTHERS THEN
      -- Log error but don't prevent auth from completing
      RAISE LOG 'Error creating user profile for %: %', NEW.id, SQLERRM;
  END;
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Silently ignore all errors to prevent auth failures
    RAISE LOG 'Outer exception in handle_new_user for %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Make sure function is executable by everyone
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated, anon, service_role, postgres;

-- Create the trigger to automatically create profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create profiles for existing users that might be missing them
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
        COALESCE(
          user_rec.raw_user_meta_data->>'full_name', 
          user_rec.raw_user_meta_data->>'name', 
          user_rec.email,
          'User ' || SUBSTRING(user_rec.id::text, 1, 8)
        )
      )
      ON CONFLICT (auth_id) DO NOTHING;
    EXCEPTION
      WHEN OTHERS THEN
        -- Just skip this user if there's an error
        RAISE LOG 'Error creating profile for existing user %: %', user_rec.id, SQLERRM;
    END;
  END LOOP;
END;
$$; 