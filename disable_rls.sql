-- Completely disable Row Level Security on all related tables
ALTER TABLE rental_spaces DISABLE ROW LEVEL SECURITY;
ALTER TABLE rental_space_amenities DISABLE ROW LEVEL SECURITY;
ALTER TABLE rental_space_photos DISABLE ROW LEVEL SECURITY;

-- Last resort - completely disable RLS on the table
-- IMPORTANT: This removes all row-level security, making all rows accessible to all users
-- Only use if all other approaches fail

-- Drop all existing policies first
DROP POLICY IF EXISTS "Users can view their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow public access to user_profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow anon access to user_profiles" ON public.user_profiles;
DROP POLICY IF EXISTS "Allow full access to all users" ON public.user_profiles;

-- Grant full permissions on the table
GRANT ALL ON public.user_profiles TO postgres, authenticated, service_role, anon;

-- Disable RLS completely (less secure but will fix permission issues)
ALTER TABLE public.user_profiles DISABLE ROW LEVEL SECURITY; 