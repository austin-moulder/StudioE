-- Check if the table exists
SELECT EXISTS (
   SELECT FROM information_schema.tables 
   WHERE table_schema = 'public'
   AND table_name = 'user_profiles'
);

-- If error mentions "relation public.user_profiles does not exist"
-- we need to create an empty version of it to satisfy the dependencies

-- Create a minimal version of the table
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY,
  auth_id UUID UNIQUE REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Grant necessary permissions
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- For complete cleanup later (after fixing dependencies), you can run:
-- DROP TABLE IF EXISTS public.user_profiles; 