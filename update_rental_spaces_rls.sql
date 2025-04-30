-- First, drop the existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users with permissions can insert rental spaces" ON rental_spaces;
DROP POLICY IF EXISTS "Authenticated users with permissions can update rental spaces" ON rental_spaces;
DROP POLICY IF EXISTS "Authenticated users with permissions can delete rental spaces" ON rental_spaces;

-- Create new policies that allow any authenticated user to insert rental spaces
CREATE POLICY "Authenticated users can insert rental spaces" 
  ON rental_spaces FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow users to update only their own rental spaces (if you add a user_id column)
-- If you don't have a user_id column yet, you can add one with:
-- ALTER TABLE rental_spaces ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- For now, use admin-only update policy
CREATE POLICY "Admin users can update rental spaces" 
  ON rental_spaces FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_permissions WHERE can_manage_rental_spaces = true))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_permissions WHERE can_manage_rental_spaces = true));

-- For now, use admin-only delete policy
CREATE POLICY "Admin users can delete rental spaces" 
  ON rental_spaces FOR DELETE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_permissions WHERE can_manage_rental_spaces = true));

-- Update similar policies for the related tables
DROP POLICY IF EXISTS "Authenticated users with permissions can insert amenities" ON rental_space_amenities;
CREATE POLICY "Authenticated users can insert amenities" 
  ON rental_space_amenities FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users with permissions can insert photos" ON rental_space_photos;
CREATE POLICY "Authenticated users can insert photos" 
  ON rental_space_photos FOR INSERT
  TO authenticated
  WITH CHECK (true); 