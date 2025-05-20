-- Script to fix user creation trigger without foreign key constraints
-- This ensures new users can be created successfully

-- First, drop the existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create an improved trigger function with robust error handling
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  profile_exists boolean;
  user_full_name text;
BEGIN
  -- Check if this user already has a profile to prevent duplicates
  SELECT EXISTS (
    SELECT 1 FROM public.user_profiles WHERE auth_id = NEW.id
  ) INTO profile_exists;
  
  -- If profile exists, exit early with success
  IF profile_exists THEN
    RAISE LOG 'User profile already exists for %', NEW.id;
    RETURN NEW;
  END IF;
  
  -- Extract user full name from metadata using COALESCE for fallbacks
  user_full_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    CASE 
      WHEN NEW.raw_user_meta_data->>'first_name' IS NOT NULL AND NEW.raw_user_meta_data->>'last_name' IS NOT NULL
      THEN CONCAT(NEW.raw_user_meta_data->>'first_name', ' ', NEW.raw_user_meta_data->>'last_name')
      ELSE COALESCE(NEW.email, 'New User')
    END
  );
  
  RAISE LOG 'Creating user profile for % with name: %', NEW.id, user_full_name;
  
  -- Wrapped in a BEGIN/EXCEPTION block for error handling
  BEGIN
    INSERT INTO public.user_profiles (auth_id, full_name)
    VALUES (NEW.id, user_full_name)
    ON CONFLICT (auth_id) DO NOTHING;
    
    RAISE LOG 'Successfully created user profile for %', NEW.id;
  EXCEPTION
    WHEN OTHERS THEN
      -- Log error but don't prevent auth from completing
      RAISE LOG 'Error creating user profile for %: %', NEW.id, SQLERRM;
  END;
  
  -- Always return NEW to allow auth to complete
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Catch any outer exceptions and log them
    RAISE LOG 'Outer exception in handle_new_user for %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to all necessary roles
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated, anon, service_role, postgres;

-- Create the trigger with AFTER INSERT to run after user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Check if we need to fix the user_profiles table structure
DO $$
BEGIN
  -- Check if auth_id is the correct type and has a unique constraint
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'user_profiles'
    AND column_name = 'auth_id'
    AND udt_name = 'uuid'
  ) THEN
    -- The table is misconfigured, we need to fix it
    RAISE LOG 'Fixing user_profiles table structure';
    
    -- Drop the table and recreate it
    DROP TABLE IF EXISTS public.user_profiles CASCADE;
    
    CREATE TABLE public.user_profiles (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      auth_id UUID UNIQUE, -- No foreign key constraint
      full_name TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
    
    -- Create index for lookups
    CREATE INDEX IF NOT EXISTS user_profiles_auth_id_idx ON public.user_profiles(auth_id);
    
    -- Disable RLS
    ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;
    
    RAISE LOG 'Successfully recreated user_profiles table';
  END IF;
END $$; 