-- First, drop the existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users with permissions can insert rental spaces" ON rental_spaces;
DROP POLICY IF EXISTS "Authenticated users with permissions can update rental spaces" ON rental_spaces;
DROP POLICY IF EXISTS "Authenticated users with permissions can delete rental spaces" ON rental_spaces;
DROP POLICY IF EXISTS "Authenticated users can insert rental spaces" ON rental_spaces;
DROP POLICY IF EXISTS "Admin users can update rental spaces" ON rental_spaces;
DROP POLICY IF EXISTS "Admin users can delete rental spaces" ON rental_spaces;

-- Create new policies that allow ANYONE to insert rental spaces (not just authenticated users)
CREATE POLICY "Public can insert rental spaces" 
  ON rental_spaces FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

-- Also allow public read
CREATE POLICY "Public can view rental spaces" 
  ON rental_spaces FOR SELECT
  USING (true);

-- For now, keep admin-only update policy
CREATE POLICY "Admin users can update rental spaces" 
  ON rental_spaces FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_permissions WHERE can_manage_rental_spaces = true))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_permissions WHERE can_manage_rental_spaces = true));

-- For now, keep admin-only delete policy
CREATE POLICY "Admin users can delete rental spaces" 
  ON rental_spaces FOR DELETE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_permissions WHERE can_manage_rental_spaces = true));

-- Update similar policies for the related tables
DROP POLICY IF EXISTS "Authenticated users with permissions can insert amenities" ON rental_space_amenities;
DROP POLICY IF EXISTS "Authenticated users can insert amenities" ON rental_space_amenities;

-- Allow public to insert amenities
CREATE POLICY "Public can insert amenities" 
  ON rental_space_amenities FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

-- Allow public to read amenities
CREATE POLICY "Public can view amenities" 
  ON rental_space_amenities FOR SELECT
  USING (true);

-- Update photo policies
DROP POLICY IF EXISTS "Authenticated users with permissions can insert photos" ON rental_space_photos;
DROP POLICY IF EXISTS "Authenticated users can insert photos" ON rental_space_photos;

-- Allow public to insert photos
CREATE POLICY "Public can insert photos" 
  ON rental_space_photos FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

-- Allow public to read photos
CREATE POLICY "Public can view photos" 
  ON rental_space_photos FOR SELECT
  USING (true); 