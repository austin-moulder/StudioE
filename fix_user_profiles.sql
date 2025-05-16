-- 1. Check if the table exists, if not create it
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. If the table exists but doesn't have the full_name column, add it
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'user_profiles'
    AND column_name = 'full_name'
  ) THEN
    ALTER TABLE public.user_profiles ADD COLUMN full_name TEXT;
  END IF;
END $$;

-- 3. Add RLS policies to secure the table
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- 4. Create or replace policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
CREATE POLICY "Users can view their own profile" 
  ON public.user_profiles FOR SELECT 
  USING (auth.uid() = auth_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
CREATE POLICY "Users can update their own profile" 
  ON public.user_profiles FOR UPDATE 
  USING (auth.uid() = auth_id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
CREATE POLICY "Users can insert their own profile" 
  ON public.user_profiles FOR INSERT 
  WITH CHECK (auth.uid() = auth_id);

-- 5. Create or replace the function to handle new users
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

-- 6. Create the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 7. Create profiles for existing users who don't have one
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

-- 8. Update existing profiles that might be missing the full_name
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

-- 9. Check if all users now have profiles with full_name
SELECT 
  u.id as user_id, 
  u.email, 
  p.id as profile_id,
  p.full_name
FROM auth.users u
LEFT JOIN public.user_profiles p ON u.id = p.auth_id
ORDER BY u.created_at; 