-- Create the instructor_applications table
CREATE TABLE instructor_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  is_interested TEXT NOT NULL DEFAULT 'yes',
  teaching_styles TEXT[], -- Array of teaching styles
  teaching_info TEXT,
  goals TEXT,
  teaching_locations TEXT[], -- Array of teaching locations
  referral_source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'pending' -- pending, approved, rejected
);

-- Enable Row Level Security (RLS)
ALTER TABLE instructor_applications ENABLE ROW LEVEL SECURITY;

-- Create policy that only allows authenticated users to insert their own application
CREATE POLICY "Users can insert their own applications"
  ON instructor_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy that only allows admin users to view applications
CREATE POLICY "Only admins can view applications"
  ON instructor_applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users
    WHERE auth.uid() IN (SELECT user_id FROM admin_users)
  ));

-- Create policy that only allows admin users to update applications
CREATE POLICY "Only admins can update applications"
  ON instructor_applications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users
    WHERE auth.uid() IN (SELECT user_id FROM admin_users)
  ));

-- Create an index on email for faster lookups
CREATE INDEX instructor_applications_email_idx ON instructor_applications (email);

-- Create trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_instructor_applications_timestamp
BEFORE UPDATE ON instructor_applications
FOR EACH ROW
EXECUTE FUNCTION update_modified_column(); 