-- Add is_weekly column to EVENT table and set initial values

DO $$
DECLARE
  row_count INT;
BEGIN
  -- Check if the column already exists
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'EVENT'
    AND column_name = 'is_weekly'
  ) THEN
    -- Add the is_weekly column with default value of FALSE
    ALTER TABLE "EVENT" ADD COLUMN is_weekly BOOLEAN DEFAULT FALSE;
    
    RAISE NOTICE 'Added is_weekly column to EVENT table';
  ELSE
    RAISE NOTICE 'is_weekly column already exists';
  END IF;
  
  -- Set is_weekly = TRUE for events that are likely weekly based on name
  UPDATE "EVENT"
  SET is_weekly = TRUE
  WHERE 
    (title ILIKE '%Monday%' OR 
     title ILIKE '%Tuesday%' OR 
     title ILIKE '%Wednesday%' OR 
     title ILIKE '%Thursday%' OR 
     title ILIKE '%Friday%' OR 
     title ILIKE '%Saturday%' OR 
     title ILIKE '%Sunday%' OR
     title ILIKE '%weekly%' OR
     description ILIKE '%weekly%' OR
     description ILIKE '%every week%')
    AND is_weekly = FALSE;
  
  GET DIAGNOSTICS row_count = ROW_COUNT;
  RAISE NOTICE 'Updated % events to is_weekly = TRUE', row_count;
  
  -- Specifically mark "Sensual Tuesdays" as weekly
  UPDATE "EVENT"
  SET is_weekly = TRUE
  WHERE title LIKE 'Sensual Tuesdays%' 
    AND is_weekly = FALSE;
  
  GET DIAGNOSTICS row_count = ROW_COUNT;
  RAISE NOTICE 'Updated % Sensual Tuesdays events to is_weekly = TRUE', row_count;
  
END $$; 