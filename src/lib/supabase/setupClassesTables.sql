-- Create the companies table
CREATE TABLE IF NOT EXISTS companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the classes table
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  class_name TEXT NOT NULL,
  instructor TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  series_length INTEGER NOT NULL,
  is_series_start BOOLEAN NOT NULL DEFAULT FALSE,
  class_date DATE NOT NULL,
  day_of_week TEXT NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  is_drop_in BOOLEAN NOT NULL DEFAULT FALSE,
  is_weekly BOOLEAN NOT NULL DEFAULT FALSE,
  instructor_approval_required BOOLEAN NOT NULL DEFAULT FALSE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on company_id for faster queries
CREATE INDEX idx_classes_company_id ON classes(company_id);

-- Insert companies data
INSERT INTO companies (name, contact_name, phone, email, address)
VALUES 
  ('La Mecca', 'Laura Flores', '3128578792', 'info@lameccadancechicago.com', '937 N. Western Ave, Chicago, IL 60622'),
  ('Latin Rhythms', 'Monique Maldonado', '3127332623', 'info@latinrhythms.com', '210 N. Racine Ave, Chicago, IL 60607');

-- Insert sample classes data
INSERT INTO classes (
  company_id, 
  class_name, 
  instructor, 
  price, 
  series_length, 
  is_series_start, 
  class_date, 
  day_of_week, 
  start_time, 
  end_time, 
  is_drop_in, 
  is_weekly, 
  instructor_approval_required, 
  notes
)
VALUES 
  (
    (SELECT id FROM companies WHERE name = 'La Mecca'), 
    'Afro Cuban Fusion', 
    'Adonys Gonzalez', 
    90, 
    4, 
    TRUE, 
    '2025-05-26', 
    'Monday', 
    '19:00', 
    '20:00', 
    FALSE, 
    TRUE, 
    FALSE, 
    NULL
  ),
  (
    (SELECT id FROM companies WHERE name = 'La Mecca'), 
    'Shines/Partnerwork 101', 
    'Laura Flores', 
    90, 
    4, 
    TRUE, 
    '2025-05-27', 
    'Tuesday', 
    '19:00', 
    '20:00', 
    FALSE, 
    TRUE, 
    FALSE, 
    NULL
  ),
  (
    (SELECT id FROM companies WHERE name = 'La Mecca'), 
    'Ladies Styling (La Mecca HQ)', 
    'Destiny Rivera', 
    90, 
    4, 
    TRUE, 
    '2025-05-27', 
    'Tuesday', 
    '20:00', 
    '21:00', 
    FALSE, 
    TRUE, 
    FALSE, 
    NULL
  ),
  (
    (SELECT id FROM companies WHERE name = 'La Mecca'), 
    'Shines/Partnerwork 212', 
    'Laura Flores & Francisco Jr.', 
    90, 
    4, 
    TRUE, 
    '2025-05-28', 
    'Wednesday', 
    '19:00', 
    '20:00', 
    FALSE, 
    TRUE, 
    TRUE, 
    NULL
  ),
  (
    (SELECT id FROM companies WHERE name = 'Latin Rhythms'), 
    'Sensual 1.0.7 Bachata', 
    'Nadia', 
    90, 
    4, 
    TRUE, 
    '2025-05-31', 
    'Saturday', 
    '18:00', 
    '19:00', 
    FALSE, 
    TRUE, 
    TRUE, 
    NULL
  ),
  (
    (SELECT id FROM companies WHERE name = 'Latin Rhythms'), 
    'Intermediate 1.3 Salsa', 
    'Jorge', 
    90, 
    4, 
    TRUE, 
    '2025-05-31', 
    'Saturday', 
    '18:00', 
    '19:00', 
    FALSE, 
    TRUE, 
    FALSE, 
    NULL
  ),
  (
    (SELECT id FROM companies WHERE name = 'Latin Rhythms'), 
    'Body Movement', 
    'Elliot', 
    90, 
    4, 
    TRUE, 
    '2025-05-31', 
    'Saturday', 
    '18:00', 
    '19:00', 
    FALSE, 
    TRUE, 
    FALSE, 
    NULL
  ),
  (
    (SELECT id FROM companies WHERE name = 'Latin Rhythms'), 
    'Basic 1 Salsa', 
    'Blanca', 
    90, 
    4, 
    TRUE, 
    '2025-05-31', 
    'Saturday', 
    '20:10', 
    '21:10', 
    TRUE, 
    TRUE, 
    FALSE, 
    NULL
  );

-- Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access for companies" ON companies
  FOR SELECT USING (true);

CREATE POLICY "Public read access for classes" ON classes
  FOR SELECT USING (true); 