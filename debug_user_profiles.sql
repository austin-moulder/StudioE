-- Script to debug the user profiles table and find issues

-- 1. Check if the table exists
SELECT EXISTS (
  SELECT FROM information_schema.tables 
  WHERE table_schema = 'public'
  AND table_name = 'user_profiles'
) as table_exists;

-- 2. Examine the table structure
SELECT 
  column_name, 
  data_type, 
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'user_profiles'
ORDER BY ordinal_position;

-- 3. Check for constraints
SELECT
  tc.constraint_name,
  tc.constraint_type,
  kcu.column_name,
  ccu.table_schema as foreign_table_schema,
  ccu.table_name as foreign_table_name,
  ccu.column_name as foreign_column_name
FROM information_schema.table_constraints as tc
JOIN information_schema.key_column_usage as kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
LEFT JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.table_name = 'user_profiles'
  AND tc.table_schema = 'public'
ORDER BY tc.constraint_name;

-- 4. Check for triggers on the table
SELECT 
  trigger_name,
  event_manipulation,
  action_statement,
  action_timing
FROM information_schema.triggers
WHERE event_object_table = 'user_profiles'
  AND event_object_schema = 'public';

-- 5. Check for RLS policies
SELECT
  polname as policy_name,
  polcmd as command,
  polpermissive as permissive,
  polroles as roles
FROM pg_policy
WHERE polrelid = 'public.user_profiles'::regclass;

-- 6. Check for existing profiles
SELECT COUNT(*) as profile_count FROM public.user_profiles;

-- 7. Check for users without profiles
WITH users_with_profiles AS (
  SELECT u.id
  FROM auth.users u
  JOIN public.user_profiles p ON u.id = p.auth_id
)
SELECT COUNT(*) as users_without_profiles
FROM auth.users u
WHERE NOT EXISTS (
  SELECT 1 FROM users_with_profiles wp WHERE wp.id = u.id
);

-- 8. Check trigger function
SELECT
  pg_get_functiondef('public.handle_new_user'::regproc) as function_definition; 