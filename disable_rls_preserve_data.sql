-- Step 1: Disable Row Level Security on all tables
ALTER TABLE rental_spaces DISABLE ROW LEVEL SECURITY;
ALTER TABLE rental_space_amenities DISABLE ROW LEVEL SECURITY;
ALTER TABLE rental_space_photos DISABLE ROW LEVEL SECURITY;

-- Step 2: Set up public storage for rental spaces
-- Create the storage bucket if it doesn't exist
CREATE BUCKET IF NOT EXISTS rental_spaces;

-- Set file size limit to 5MB and make it public
UPDATE storage.buckets
SET file_size_limit = 5242880, public = true
WHERE id = 'rental_spaces';

-- Step 3: Set up public storage policies
-- First, drop any existing restrictive policies
DROP POLICY IF EXISTS "Public Read Access for rental_spaces" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Users can upload rental_spaces" ON storage.objects;
DROP POLICY IF EXISTS "Users can update their own rental_spaces" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete their own rental_spaces" ON storage.objects;

-- Create completely open policies
-- Policy for reading objects
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'rental_spaces');

-- Policy for uploading objects
CREATE POLICY "Public Upload Access"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'rental_spaces');

-- Policy for updating objects
CREATE POLICY "Public Update Access"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'rental_spaces')
WITH CHECK (bucket_id = 'rental_spaces');

-- Policy for deleting objects
CREATE POLICY "Public Delete Access"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'rental_spaces');

-- This SQL preserves all existing data while removing RLS restrictions
-- It makes all tables and storage publicly accessible with no authentication required 