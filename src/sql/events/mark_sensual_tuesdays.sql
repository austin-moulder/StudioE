-- Mark Sensual Tuesdays events as weekly

DO $$
DECLARE
  row_count INT;
BEGIN
  -- Ensure the is_weekly column exists
  IF NOT EXISTS (
    SELECT FROM information_schema.columns 
    WHERE table_name = 'EVENT'
    AND column_name = 'is_weekly'
  ) THEN
    -- Add the is_weekly column with default value of FALSE
    ALTER TABLE "EVENT" ADD COLUMN is_weekly BOOLEAN DEFAULT FALSE;
    RAISE NOTICE 'Added is_weekly column to EVENT table';
  END IF;
  
  -- Mark all "Sensual Tuesdays" events as weekly
  UPDATE "EVENT"
  SET is_weekly = TRUE
  WHERE title LIKE 'Sensual Tuesdays%' 
    AND is_weekly IS DISTINCT FROM TRUE;
  
  GET DIAGNOSTICS row_count = ROW_COUNT;
  RAISE NOTICE 'Marked % Sensual Tuesdays events as weekly', row_count;
  
  -- Show all Sensual Tuesdays events
  RAISE NOTICE 'Current Sensual Tuesdays events:';
  FOR r IN (
    SELECT id, title, event_date, is_weekly
    FROM "EVENT"
    WHERE title LIKE 'Sensual Tuesdays%'
    ORDER BY event_date
  ) LOOP
    RAISE NOTICE 'ID: %, Date: %, Title: %, Weekly: %', 
      r.id, r.event_date, r.title, r.is_weekly;
  END LOOP;
  
END $$; 