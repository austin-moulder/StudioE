-- Create the ambassador_applications table
CREATE TABLE ambassador_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  interest_reason TEXT,
  skills TEXT,
  no_conflicts BOOLEAN NOT NULL,
  conflicts_explanation TEXT,
  referral_source TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  status TEXT DEFAULT 'pending' -- pending, approved, rejected
);

-- Enable Row Level Security (RLS)
ALTER TABLE ambassador_applications ENABLE ROW LEVEL SECURITY;

-- Create policy that only allows authenticated users to insert their own application
CREATE POLICY "Users can insert their own applications"
  ON ambassador_applications
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Create policy that only allows admin users to view applications
CREATE POLICY "Only admins can view applications"
  ON ambassador_applications
  FOR SELECT
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users
    WHERE auth.uid() IN (SELECT user_id FROM admin_users)
  ));

-- Create policy that only allows admin users to update applications
CREATE POLICY "Only admins can update applications"
  ON ambassador_applications
  FOR UPDATE
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() FROM auth.users
    WHERE auth.uid() IN (SELECT user_id FROM admin_users)
  ));

-- Create an index on email for faster lookups
CREATE INDEX ambassador_applications_email_idx ON ambassador_applications (email);

-- Create trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ambassador_applications_timestamp
BEFORE UPDATE ON ambassador_applications
FOR EACH ROW
EXECUTE FUNCTION update_modified_column(); 