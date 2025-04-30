-- Add is_active column to rental_spaces table
ALTER TABLE rental_spaces ADD COLUMN is_active BOOLEAN DEFAULT NULL;

-- Set existing listings to TRUE (active)
UPDATE rental_spaces SET is_active = TRUE; 