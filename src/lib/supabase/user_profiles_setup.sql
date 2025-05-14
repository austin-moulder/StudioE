-- Create the user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  bio TEXT,
  profile_image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create RLS policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON user_profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy: Admins can view all profiles (you'll need to define admin roles)
CREATE POLICY "Admins can view all profiles"
  ON user_profiles
  FOR SELECT
  USING (auth.uid() IN (
    SELECT user_id FROM admin_users
  ));

-- Create trigger for automatic updated_at timestamp management
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_profiles_updated_at
BEFORE UPDATE ON user_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Create a trigger to automatically create a profile when a new user is created
CREATE OR REPLACE FUNCTION create_profile_for_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, email)
  VALUES (
    NEW.id, 
    NEW.raw_user_meta_data->>'full_name', 
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER create_profile_after_user_signup
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_profile_for_new_user();

-- Create a trigger to sync user_metadata with profiles upon update
CREATE OR REPLACE FUNCTION sync_user_metadata_with_profile()
RETURNS TRIGGER AS $$
BEGIN
  -- Update user profiles when metadata changes
  UPDATE public.user_profiles
  SET 
    full_name = NEW.raw_user_meta_data->>'full_name',
    updated_at = now()
  WHERE id = NEW.id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER sync_user_metadata_changes
AFTER UPDATE OF raw_user_meta_data ON auth.users
FOR EACH ROW
EXECUTE FUNCTION sync_user_metadata_with_profile();

-- Profile image storage bucket setup
-- Note: You'll need to execute these commands from the Supabase storage API
-- This is SQL representation for documentation purposes
/*
1. Create a new storage bucket:
   - Name: profile_images
   - Public/Private: Private (access controlled)
   - File size limit: 5MB (adjust as needed)
   - Allowed MIME types: image/jpeg, image/png, image/webp, image/gif

2. Add bucket security policies:
   - Allow users to upload their own profile images
   - Allow users to update their own profile images
   - Allow users to read their own profile images
   - Allow public access to read profile images (if desired)

Storage Bucket RLS Examples:
*/

-- Example bucket RLS policies (to implement via Supabase dashboard or API)

-- Create policy to allow users to upload their own profile images
-- bucket_id = 'profile_images'
-- name = 'Users can upload their own profile images'
-- definition = 'storage.object_name LIKE auth.uid() || ''/%'''
-- operation = 'INSERT'
-- role = 'authenticated'

-- Create policy to allow users to update their own profile images
-- bucket_id = 'profile_images'
-- name = 'Users can update their own profile images'
-- definition = 'storage.object_name LIKE auth.uid() || ''/%'''
-- operation = 'UPDATE'
-- role = 'authenticated'

-- Create policy to allow users to read their own profile images
-- bucket_id = 'profile_images'
-- name = 'Users can read their own profile images'
-- definition = 'storage.object_name LIKE auth.uid() || ''/%'''
-- operation = 'SELECT'
-- role = 'authenticated'

-- Create policy to allow public access to read profile images (if desired)
-- bucket_id = 'profile_images'
-- name = 'Public can read profile images'
-- definition = 'true'
-- operation = 'SELECT'
-- role = 'anon' 