-- Run this script AFTER removing any dependencies on user_profiles

-- First list and drop any foreign keys that reference user_profiles
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (
    SELECT conname, conrelid::regclass AS tab
    FROM pg_constraint
    WHERE confrelid = 'public.user_profiles'::regclass
  )
  LOOP
    EXECUTE 'ALTER TABLE ' || r.tab || ' DROP CONSTRAINT ' || r.conname;
  END LOOP;
END $$;

-- Drop triggers that might reference user_profiles
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_deleted ON auth.users;

-- Drop any foreign keys FROM user_profiles to other tables
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (
    SELECT conname
    FROM pg_constraint
    WHERE conrelid = 'public.user_profiles'::regclass
    AND contype = 'f'
  )
  LOOP
    EXECUTE 'ALTER TABLE public.user_profiles DROP CONSTRAINT ' || r.conname;
  END LOOP;
END $$;

-- Drop any policies on the table
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (
    SELECT policyname
    FROM pg_policies
    WHERE tablename = 'user_profiles'
  )
  LOOP
    EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON public.user_profiles';
  END LOOP;
END $$;

-- Finally drop the table
DROP TABLE IF EXISTS public.user_profiles; 