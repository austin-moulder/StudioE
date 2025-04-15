-- Create rental_spaces table
CREATE TABLE rental_spaces (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  address VARCHAR(255) NOT NULL,
  price_per_hour INTEGER NOT NULL,
  capacity INTEGER NOT NULL,
  rating DECIMAL(2,1) NOT NULL,
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

-- Enable Row Level Security
ALTER TABLE rental_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_space_amenities ENABLE ROW LEVEL SECURITY;
ALTER TABLE rental_space_photos ENABLE ROW LEVEL SECURITY;

-- Insert data into rental_spaces table
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
  ),
  (
    'Cultural Center Dance Room',
    'Affordable space in Chicago''s Cultural Center. Great for beginner instructors starting their teaching journey.',
    '78 E Washington St, Chicago, IL 60602',
    25,
    15,
    4.2,
    'Mon-Fri: 10am-7pm, Sat: 10am-5pm, Sun: Closed',
    FALSE
  ),
  (
    'Rhythm Room',
    'Intimate space perfect for one-on-one lessons or small groups. Located in Wicker Park.',
    '1560 N Milwaukee Ave, Chicago, IL 60622',
    30,
    8,
    4.6,
    'Mon-Sun: 8am-11pm',
    FALSE
  ),
  (
    'Movement Loft',
    'Spacious loft with natural light and city views. Great for larger classes and workshops.',
    '401 N Morgan St, Chicago, IL 60642',
    50,
    30,
    4.9,
    'Mon-Sun: 7am-12am',
    FALSE
  );

-- Insert data into rental_space_amenities table
INSERT INTO rental_space_amenities (rental_space_id, amenity)
VALUES
  -- Studio One Chicago
  (1, 'Mirrors'),
  (1, 'Sound System'),
  (1, 'Sprung Floor'),
  (1, 'Air Conditioning'),
  (1, 'Waiting Area'),
  
  -- Cultural Center Dance Room
  (2, 'Mirrors'),
  (2, 'Basic Sound System'),
  (2, 'Hardwood Floor'),
  
  -- Rhythm Room
  (3, 'Mirrors'),
  (3, 'Premium Sound'),
  (3, 'Floating Floor'),
  (3, 'Changing Room'),
  
  -- Movement Loft
  (4, 'Floor-to-Ceiling Mirrors'),
  (4, 'Pro Sound System'),
  (4, 'Marley Floor'),
  (4, 'Lounge Area'),
  (4, 'Kitchenette');

-- Insert data into rental_space_photos table
INSERT INTO rental_space_photos (rental_space_id, photo_url, is_primary)
VALUES
  -- Studio One Chicago
  (1, 'studios/studio-one-main.jpg', TRUE),
  (1, 'studios/studio-one-angle1.jpg', FALSE),
  (1, 'studios/studio-one-angle2.jpg', FALSE),
  
  -- Cultural Center Dance Room
  (2, 'studios/cultural-center-main.jpg', TRUE),
  (2, 'studios/cultural-center-angle1.jpg', FALSE),
  
  -- Rhythm Room
  (3, 'studios/rhythm-room-main.jpg', TRUE),
  (3, 'studios/rhythm-room-angle1.jpg', FALSE),
  (3, 'studios/rhythm-room-angle2.jpg', FALSE),
  
  -- Movement Loft
  (4, 'studios/movement-loft-main.jpg', TRUE),
  (4, 'studios/movement-loft-angle1.jpg', FALSE),
  (4, 'studios/movement-loft-angle2.jpg', FALSE),
  (4, 'studios/movement-loft-angle3.jpg', FALSE);

-- Create RLS policies
-- Public can read all rental spaces
CREATE POLICY "Public can view rental spaces" 
  ON rental_spaces FOR SELECT
  USING (true);

-- Public can read all amenities
CREATE POLICY "Public can view amenities" 
  ON rental_space_amenities FOR SELECT
  USING (true);

-- Public can read all photos
CREATE POLICY "Public can view photos" 
  ON rental_space_photos FOR SELECT
  USING (true);

-- Only authenticated users with specific permissions can modify data
CREATE POLICY "Authenticated users with permissions can insert rental spaces" 
  ON rental_spaces FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_permissions WHERE can_manage_rental_spaces = true));

CREATE POLICY "Authenticated users with permissions can update rental spaces" 
  ON rental_spaces FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_permissions WHERE can_manage_rental_spaces = true))
  WITH CHECK (auth.uid() IN (SELECT user_id FROM admin_permissions WHERE can_manage_rental_spaces = true));

CREATE POLICY "Authenticated users with permissions can delete rental spaces" 
  ON rental_spaces FOR DELETE
  TO authenticated
  USING (auth.uid() IN (SELECT user_id FROM admin_permissions WHERE can_manage_rental_spaces = true)); 