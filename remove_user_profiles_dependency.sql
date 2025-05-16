-- 1. First remove the trigger that creates user_profiles entries
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Create an empty version of the function that doesn't try to create profiles
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  -- This function no longer creates user_profiles entries
  -- It just returns the NEW record without doing anything
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Check for any other triggers that might reference user_profiles
SELECT tgname, tgrelid::regclass, pg_get_triggerdef(oid)
FROM pg_trigger
WHERE pg_get_triggerdef(oid) LIKE '%user_profiles%'; 