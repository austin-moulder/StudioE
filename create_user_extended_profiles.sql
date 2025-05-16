-- Create extended user profiles table
CREATE TABLE IF NOT EXISTS public.user_extended_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    profile_image_url TEXT,
    dance_style_interests TEXT[],
    availability_for_privates TEXT,
    preferred_learning_style TEXT,
    dance_goals TEXT,
    favorite_song TEXT,
    favorite_artist TEXT,
    dance_motivation TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT user_extended_profiles_user_id_key UNIQUE (user_id)
);

-- Add RLS policies
ALTER TABLE public.user_extended_profiles ENABLE ROW LEVEL SECURITY;

-- Public can read profiles
CREATE POLICY "Public can view user_extended_profiles"
ON public.user_extended_profiles
FOR SELECT
USING (true);

-- Users can only update their own profiles
CREATE POLICY "Users can update their own extended profile"
ON public.user_extended_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Users can only insert their own profiles
CREATE POLICY "Users can insert their own extended profile"
ON public.user_extended_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update the updated_at timestamp
CREATE TRIGGER update_user_extended_profiles_updated_at
BEFORE UPDATE ON public.user_extended_profiles
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Index for faster lookups by user_id
CREATE INDEX user_extended_profiles_user_id_idx ON public.user_extended_profiles (user_id); 