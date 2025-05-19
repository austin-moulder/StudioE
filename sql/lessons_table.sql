-- Create the lessons table
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  student_name TEXT NOT NULL,
  instructor_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  instructor_name TEXT NOT NULL,
  first_time_match BOOLEAN DEFAULT FALSE,
  lesson_start TIMESTAMP WITH TIME ZONE NOT NULL,
  invoiced_date TIMESTAMP WITH TIME ZONE NOT NULL,
  instructor_pay_rate DECIMAL(10, 2) NOT NULL,
  num_hours DECIMAL(5, 2) NOT NULL,
  instructor_pay DECIMAL(10, 2) NOT NULL,
  invoice_notes TEXT,
  homework_notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for the lessons table
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;

-- Create a trigger to update the updated_at field
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_lessons_updated_at
BEFORE UPDATE ON lessons
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Allow users to view their own lessons (as student or instructor)
CREATE POLICY "Users can view their own lessons" ON lessons
FOR SELECT
USING (
  auth.uid() = student_id OR 
  auth.uid() = instructor_id OR
  (
    -- Allow admins to view all lessons
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND account_type = 'admin'
    )
  )
);

-- Allow instructors to create lessons
CREATE POLICY "Instructors can create lessons" ON lessons
FOR INSERT
WITH CHECK (
  auth.uid() = instructor_id AND
  (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() AND (account_type = 'instructor' OR account_type = 'admin')
    )
  )
);

-- Allow instructors to update their own lessons
CREATE POLICY "Instructors can update their own lessons" ON lessons
FOR UPDATE
USING (
  auth.uid() = instructor_id
) 
WITH CHECK (
  auth.uid() = instructor_id
);

-- Allow admins to update any lesson
CREATE POLICY "Admins can update any lesson" ON lessons
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() AND account_type = 'admin'
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM user_profiles 
    WHERE id = auth.uid() AND account_type = 'admin'
  )
);

-- Create index for performance
CREATE INDEX lessons_student_id_idx ON lessons (student_id);
CREATE INDEX lessons_instructor_id_idx ON lessons (instructor_id);
CREATE INDEX lessons_lesson_start_idx ON lessons (lesson_start);
CREATE INDEX lessons_status_idx ON lessons (status);

-- Add comment to table
COMMENT ON TABLE lessons IS 'Stores information about music lessons including instructor payment and status'; 