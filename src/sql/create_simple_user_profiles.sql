-- Simple script to create a user_profiles table without foreign key constraints
-- Makes it easier for new users to sign up without database errors

-- Drop existing table if it exists
DROP TABLE IF EXISTS public.user_profiles CASCADE;

-- Create new user_profiles table
CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE, -- No foreign key constraint to auth.users
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for auth_id lookups
CREATE INDEX IF NOT EXISTS user_profiles_auth_id_idx ON public.user_profiles(auth_id);

-- Disable Row Level Security to simplify permissions
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY;

-- Grant all permissions to authenticated users
GRANT ALL ON public.user_profiles TO authenticated, anon, service_role;

-- Create a trigger function to automatically create a profile for new users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  user_full_name text;
  user_email text;
  user_avatar text;
BEGIN
  -- Extract user info from metadata with fallbacks
  user_full_name := COALESCE(
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name',
    CASE 
      WHEN NEW.raw_user_meta_data->>'first_name' IS NOT NULL AND NEW.raw_user_meta_data->>'last_name' IS NOT NULL
      THEN CONCAT(NEW.raw_user_meta_data->>'first_name', ' ', NEW.raw_user_meta_data->>'last_name')
      ELSE NEW.email
    END
  );
  
  user_email := NEW.email;
  user_avatar := NEW.raw_user_meta_data->>'avatar_url';
  
  -- Insert with conflict handling (for idempotency)
  INSERT INTO public.user_profiles (auth_id, full_name, email, avatar_url)
  VALUES (NEW.id, user_full_name, user_email, user_avatar)
  ON CONFLICT (auth_id) DO UPDATE 
  SET 
    full_name = EXCLUDED.full_name,
    email = EXCLUDED.email,
    avatar_url = EXCLUDED.avatar_url,
    updated_at = NOW();
    
  -- Return the new user
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't prevent auth from completing
    RAISE LOG 'Error creating user profile for %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Make sure function is executable by everyone
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated, anon, service_role, postgres;

-- Create or replace the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create profiles for existing users without profiles
DO $$
BEGIN
  INSERT INTO public.user_profiles (auth_id, full_name, email, avatar_url)
  SELECT 
    id, 
    COALESCE(
      raw_user_meta_data->>'full_name',
      raw_user_meta_data->>'name',
      CASE 
        WHEN raw_user_meta_data->>'first_name' IS NOT NULL AND raw_user_meta_data->>'last_name' IS NOT NULL
        THEN CONCAT(raw_user_meta_data->>'first_name', ' ', raw_user_meta_data->>'last_name')
        ELSE email
      END
    ),
    email,
    raw_user_meta_data->>'avatar_url'
  FROM auth.users
  WHERE NOT EXISTS (
    SELECT 1 FROM public.user_profiles WHERE auth_id = auth.users.id
  );
END $$; 