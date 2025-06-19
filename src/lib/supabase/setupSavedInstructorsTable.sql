-- Create saved_instructors table
CREATE TABLE IF NOT EXISTS saved_instructors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  instructor_id TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure a user can only save an instructor once
  UNIQUE(user_id, instructor_id)
);

-- Enable Row Level Security
ALTER TABLE saved_instructors ENABLE ROW LEVEL SECURITY;

-- Create policies for saved_instructors
-- Users can only see and modify their own saved instructors
CREATE POLICY "Users can view their own saved instructors" 
  ON saved_instructors FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own saved instructors" 
  ON saved_instructors FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own saved instructors" 
  ON saved_instructors FOR DELETE 
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS saved_instructors_user_id_idx ON saved_instructors(user_id);
CREATE INDEX IF NOT EXISTS saved_instructors_instructor_id_idx ON saved_instructors(instructor_id);
CREATE INDEX IF NOT EXISTS saved_instructors_created_at_idx ON saved_instructors(created_at);

-- Add trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_saved_instructors_updated_at 
  BEFORE UPDATE ON saved_instructors 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 