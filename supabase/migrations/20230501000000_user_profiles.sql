-- Create a secure schema for our app
CREATE SCHEMA IF NOT EXISTS public;

-- Enable Row Level Security
ALTER TABLE IF EXISTS auth.users ENABLE ROW LEVEL SECURITY;

-- Create storage bucket for profile images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('profile_images', 'profile_images', true)
ON CONFLICT (id) DO NOTHING;

-- Set up access controls for storage
CREATE POLICY "Profile images are publicly accessible." 
ON storage.objects FOR SELECT 
USING (bucket_id = 'profile_images');

CREATE POLICY "Users can upload their own profile images." 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'profile_images' AND 
  (storage.foldername(name))[1] = auth.uid()
);

CREATE POLICY "Users can update their own profile images." 
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'profile_images' AND 
  (storage.foldername(name))[1] = auth.uid()
);

CREATE POLICY "Users can delete their own profile images." 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'profile_images' AND 
  (storage.foldername(name))[1] = auth.uid()
);

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS public.user_profiles (
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

-- Enable RLS on profiles
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

-- Create profile policies
CREATE POLICY "Users can view their own profile." 
ON public.user_profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile." 
ON public.user_profiles FOR UPDATE 
USING (auth.uid() = id);

-- Create or replace the function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'on_auth_user_created' 
  ) THEN
    CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
  END IF;
END $$; 