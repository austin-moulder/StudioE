-- Create profiles for existing users who don't have one
INSERT INTO public.user_profiles (auth_id)
SELECT id FROM auth.users
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_profiles WHERE auth_id = auth.users.id
);

-- Check if all users now have profiles
SELECT 
  u.id as user_id, 
  u.email, 
  p.id as profile_id 
FROM auth.users u
LEFT JOIN public.user_profiles p ON u.id = p.auth_id
ORDER BY u.created_at; 