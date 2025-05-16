-- Add the missing full_name column to user_profiles table
ALTER TABLE public.user_profiles 
ADD COLUMN IF NOT EXISTS full_name TEXT;

-- Update existing profiles with full_name from auth.users if available
UPDATE public.user_profiles p
SET full_name = u.raw_user_meta_data->>'full_name'
FROM auth.users u
WHERE p.auth_id = u.id 
AND u.raw_user_meta_data->>'full_name' IS NOT NULL;

-- Alternatively, use first and last name if there's no full_name
UPDATE public.user_profiles p
SET full_name = CONCAT(u.raw_user_meta_data->>'first_name', ' ', u.raw_user_meta_data->>'last_name')
FROM auth.users u
WHERE p.auth_id = u.id 
AND p.full_name IS NULL
AND u.raw_user_meta_data->>'first_name' IS NOT NULL
AND u.raw_user_meta_data->>'last_name' IS NOT NULL;

-- Fall back to email if no name is available
UPDATE public.user_profiles p
SET full_name = u.email
FROM auth.users u
WHERE p.auth_id = u.id 
AND p.full_name IS NULL; 