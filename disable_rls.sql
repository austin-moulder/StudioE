-- Completely disable Row Level Security on all related tables
ALTER TABLE rental_spaces DISABLE ROW LEVEL SECURITY;
ALTER TABLE rental_space_amenities DISABLE ROW LEVEL SECURITY;
ALTER TABLE rental_space_photos DISABLE ROW LEVEL SECURITY; 