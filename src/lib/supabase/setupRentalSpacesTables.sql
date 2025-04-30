-- First drop existing tables (if they exist) to avoid conflicts
DROP TABLE IF EXISTS rental_space_amenities;
DROP TABLE IF EXISTS rental_space_photos;
DROP TABLE IF EXISTS rental_spaces;

-- Create rental_spaces table
CREATE TABLE rental_spaces (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  address VARCHAR(255) NOT NULL,
  price_per_hour INTEGER NOT NULL,
  capacity INTEGER NOT NULL,
  rating DECIMAL(2,1) NOT NULL DEFAULT 5.0,
  available_hours VARCHAR(255) NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rental_space_amenities table for the many-to-many relationship
CREATE TABLE rental_space_amenities (
  id SERIAL PRIMARY KEY,
  rental_space_id INTEGER REFERENCES rental_spaces(id) ON DELETE CASCADE,
  amenity VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create rental_space_photos table for the one-to-many relationship
CREATE TABLE rental_space_photos (
  id SERIAL PRIMARY KEY,
  rental_space_id INTEGER REFERENCES rental_spaces(id) ON DELETE CASCADE,
  photo_url VARCHAR(255) NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- IMPORTANT: Do NOT enable Row Level Security for these tables
-- This ensures anyone can read/write without permission issues
-- ALTER TABLE rental_spaces ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE rental_space_amenities ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE rental_space_photos ENABLE ROW LEVEL SECURITY;

-- Insert initial sample data (if needed)
INSERT INTO rental_spaces (name, description, address, price_per_hour, capacity, rating, available_hours, is_featured)
VALUES
  (
    'Studio One Chicago',
    'A premium studio space with excellent acoustics, mirrors, and professional dance floors. Perfect for private lessons and small group classes.',
    '123 W Lake St, Chicago, IL 60601',
    35,
    20,
    4.8,
    'Mon-Fri: 8am-10pm, Sat-Sun: 9am-8pm',
    TRUE
  );

-- Insert sample amenities for first studio
INSERT INTO rental_space_amenities (rental_space_id, amenity)
VALUES
  (1, 'Mirrors'),
  (1, 'Sound System'),
  (1, 'Sprung Floor');

-- Insert sample photos for first studio  
INSERT INTO rental_space_photos (rental_space_id, photo_url, is_primary)
VALUES
  (1, 'https://example.com/studio-photo.jpg', TRUE); 