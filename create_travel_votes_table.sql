-- Drop the table if it exists (comment this out in production)
DROP TABLE IF EXISTS "TRAVEL_DESTINATION_VOTES";

-- Create a new table for travel destination votes
CREATE TABLE "TRAVEL_DESTINATION_VOTES" (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  mexico_city_rank INTEGER NOT NULL CHECK (mexico_city_rank BETWEEN 1 AND 8),
  colombia_rank INTEGER NOT NULL CHECK (colombia_rank BETWEEN 1 AND 8),
  korea_rank INTEGER NOT NULL CHECK (korea_rank BETWEEN 1 AND 8),
  puerto_rico_rank INTEGER NOT NULL CHECK (puerto_rico_rank BETWEEN 1 AND 8),
  italy_rank INTEGER NOT NULL CHECK (italy_rank BETWEEN 1 AND 8),
  cuba_rank INTEGER NOT NULL CHECK (cuba_rank BETWEEN 1 AND 8),
  spain_rank INTEGER NOT NULL CHECK (spain_rank BETWEEN 1 AND 8),
  guatemala_rank INTEGER NOT NULL CHECK (guatemala_rank BETWEEN 1 AND 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  
  -- Constraint to ensure each rank is unique per vote entry
  CONSTRAINT unique_ranks_per_vote CHECK (
    mexico_city_rank != colombia_rank AND
    mexico_city_rank != korea_rank AND
    mexico_city_rank != puerto_rico_rank AND
    mexico_city_rank != italy_rank AND
    mexico_city_rank != cuba_rank AND
    mexico_city_rank != spain_rank AND
    mexico_city_rank != guatemala_rank AND
    
    colombia_rank != korea_rank AND
    colombia_rank != puerto_rico_rank AND
    colombia_rank != italy_rank AND
    colombia_rank != cuba_rank AND
    colombia_rank != spain_rank AND
    colombia_rank != guatemala_rank AND
    
    korea_rank != puerto_rico_rank AND
    korea_rank != italy_rank AND
    korea_rank != cuba_rank AND
    korea_rank != spain_rank AND
    korea_rank != guatemala_rank AND
    
    puerto_rico_rank != italy_rank AND
    puerto_rico_rank != cuba_rank AND
    puerto_rico_rank != spain_rank AND
    puerto_rico_rank != guatemala_rank AND
    
    italy_rank != cuba_rank AND
    italy_rank != spain_rank AND
    italy_rank != guatemala_rank AND
    
    cuba_rank != spain_rank AND
    cuba_rank != guatemala_rank AND
    
    spain_rank != guatemala_rank
  )
);

-- Add comment to table
COMMENT ON TABLE "TRAVEL_DESTINATION_VOTES" IS 'Stores user votes for Studio E travel destinations';

-- Enable Row Level Security (RLS)
ALTER TABLE "TRAVEL_DESTINATION_VOTES" ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert but only admins to select/delete
CREATE POLICY "Allow public inserts" ON "TRAVEL_DESTINATION_VOTES"
  FOR INSERT TO authenticated, anon
  WITH CHECK (true);

-- Create policy to allow admins to view all votes
CREATE POLICY "Allow admin select" ON "TRAVEL_DESTINATION_VOTES"
  FOR SELECT TO authenticated
  USING (true);  -- In production, restrict this to admin users 