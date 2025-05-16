-- 1. First check if the user_profiles table exists
DO $$
BEGIN
  -- Create the table if it doesn't exist
  IF NOT EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name = 'user_profiles'
  ) THEN
    CREATE TABLE public.user_profiles (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
      full_name TEXT,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  END IF;
  
  -- Add full_name column if it doesn't exist
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'user_profiles'
    AND column_name = 'full_name'
  ) THEN
    ALTER TABLE public.user_profiles ADD COLUMN full_name TEXT;
  END IF;
END $$;

-- 2. Fix permissions by granting access to all roles
GRANT ALL ON public.user_profiles TO postgres, authenticated, service_role, anon;

-- 3. Try to grant permissions to the sequence (might not exist if using UUIDs)
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM pg_sequences
    WHERE schemaname = 'public' 
    AND sequencename = 'user_profiles_id_seq'
  ) THEN
    EXECUTE 'GRANT ALL ON SEQUENCE public.user_profiles_id_seq TO postgres, authenticated, service_role, anon';
  END IF;
END $$;

-- 4. Remove existing RLS policies and enable RLS
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow public access to user_profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow anon access to user_profiles" ON public.user_profiles;

-- 5. Enable RLS but then create permissive policies
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 6. Create open policies for the authentication phase
-- This allows the app to work during login/signup
CREATE POLICY "Allow full access to all users" ON public.user_profiles
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- 7. Create or replace the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (auth_id, full_name)
  VALUES (
    NEW.id, 
    COALESCE(
      NEW.raw_user_meta_data->>'full_name',
      CASE 
        WHEN NEW.raw_user_meta_data->>'first_name' IS NOT NULL AND NEW.raw_user_meta_data->>'last_name' IS NOT NULL
        THEN CONCAT(NEW.raw_user_meta_data->>'first_name', ' ', NEW.raw_user_meta_data->>'last_name')
        ELSE NEW.email
      END
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 8. Set the trigger function to be executable by all
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated, anon, service_role;

-- 9. Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 10. Create profiles for existing users who don't have one
INSERT INTO public.user_profiles (auth_id, full_name)
SELECT 
  u.id,
  COALESCE(
    u.raw_user_meta_data->>'full_name',
    CASE 
      WHEN u.raw_user_meta_data->>'first_name' IS NOT NULL AND u.raw_user_meta_data->>'last_name' IS NOT NULL
      THEN CONCAT(u.raw_user_meta_data->>'first_name', ' ', u.raw_user_meta_data->>'last_name')
      ELSE u.email
    END
  )
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_profiles WHERE auth_id = u.id
);

-- 11. Update existing profiles that might be missing the full_name
UPDATE public.user_profiles p
SET full_name = COALESCE(
  u.raw_user_meta_data->>'full_name',
  CASE 
    WHEN u.raw_user_meta_data->>'first_name' IS NOT NULL AND u.raw_user_meta_data->>'last_name' IS NOT NULL
    THEN CONCAT(u.raw_user_meta_data->>'first_name', ' ', u.raw_user_meta_data->>'last_name')
    ELSE u.email
  END
)
FROM auth.users u
WHERE p.auth_id = u.id AND p.full_name IS NULL;

-- 12. Check the status
SELECT 
  u.id as user_id, 
  u.email, 
  p.id as profile_id,
  p.full_name
FROM auth.users u
LEFT JOIN public.user_profiles p ON u.id = p.auth_id
ORDER BY u.created_at; 