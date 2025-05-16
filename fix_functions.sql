-- Replace functions that are referencing user_profiles

-- 1. Fix the create_profile_for_new_user function
CREATE OR REPLACE FUNCTION public.create_profile_for_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  -- Just return the NEW record without trying to create a profile
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Fix the sync_user_metadata_with_profile function
CREATE OR REPLACE FUNCTION public.sync_user_metadata_with_profile() 
RETURNS TRIGGER AS $$
BEGIN
  -- Just return the NEW record without trying to sync
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Replace handle_new_user function (although we already did this)
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  -- This is now a no-op function that won't fail
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Make sure all functions are executable
GRANT EXECUTE ON FUNCTION public.create_profile_for_new_user() TO authenticated, anon, service_role, postgres;
GRANT EXECUTE ON FUNCTION public.sync_user_metadata_with_profile() TO authenticated, anon, service_role, postgres;
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated, anon, service_role, postgres; 