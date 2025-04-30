-- Create a storage bucket for rental space photos (if it doesn't exist)
CREATE BUCKET IF NOT EXISTS rental_spaces;

-- Set file size limit to 5MB
UPDATE storage.buckets
SET file_size_limit = 5242880, public = true
WHERE id = 'rental_spaces';

-- Allow public access to the storage bucket (completely open access)
-- First, drop any existing policies
DROP POLICY IF EXISTS "Public Read Access for rental_spaces" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Users can upload rental_spaces" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own rental_spaces" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own rental_spaces" ON storage.objects;

-- Create a policy to allow anyone to read objects
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'rental_spaces');

-- Create a policy to allow anyone to upload objects
CREATE POLICY "Public Upload Access"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'rental_spaces');

-- Create a policy to allow anyone to update objects 
CREATE POLICY "Public Update Access"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'rental_spaces')
WITH CHECK (bucket_id = 'rental_spaces');

-- Create a policy to allow anyone to delete objects
CREATE POLICY "Public Delete Access"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'rental_spaces'); 