-- Create a storage bucket for rental space photos
CREATE BUCKET IF NOT EXISTS rental_spaces;

-- Set file size limit to 5MB
UPDATE storage.buckets
SET file_size_limit = 5242880
WHERE id = 'rental_spaces';

-- Create a policy to allow public read access
CREATE POLICY "Public Read Access for rental_spaces"
ON storage.objects
FOR SELECT
USING (bucket_id = 'rental_spaces');

-- Create a policy to allow authenticated users to upload
CREATE POLICY "Authenticated Users can upload rental_spaces"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'rental_spaces');

-- Create a policy to allow users to update their own objects
CREATE POLICY "Users can update their own rental_spaces"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'rental_spaces' AND auth.uid() = owner)
WITH CHECK (bucket_id = 'rental_spaces');

-- Create a policy to allow users to delete their own objects
CREATE POLICY "Users can delete their own rental_spaces"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'rental_spaces' AND auth.uid() = owner); 