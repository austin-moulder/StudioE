-- Duplicate Sensual Tuesdays for the next 4 weeks

-- First, find the ID of the Sensual Tuesdays event
DO $$
DECLARE
  sensual_tuesday_id INT;
BEGIN
  -- Get the ID of the latest Sensual Tuesdays event
  SELECT id INTO sensual_tuesday_id 
  FROM "EVENT" 
  WHERE title LIKE 'Sensual Tuesdays%'
  ORDER BY event_date DESC 
  LIMIT 1;
  
  -- If event not found, exit
  IF sensual_tuesday_id IS NULL THEN
    RAISE NOTICE 'Sensual Tuesdays event not found';
    RETURN;
  END IF;
  
  RAISE NOTICE 'Found Sensual Tuesdays event with ID %', sensual_tuesday_id;
  
  -- Duplicate for the next 4 weeks
  DECLARE
    event_record RECORD;
    new_event_date DATE;
    new_event_date_end DATE;
    weeks_offset INT;
    day_diff INT;
  BEGIN
    -- Get the event to duplicate
    SELECT * INTO event_record FROM "EVENT" WHERE id = sensual_tuesday_id;
    
    -- Calculate days difference if end date exists
    day_diff := 0;
    IF event_record.event_date_end IS NOT NULL THEN
      day_diff := event_record.event_date_end::date - event_record.event_date::date;
    END IF;
    
    -- Duplicate for each week
    FOR weeks_offset IN 1..4 LOOP
      -- Calculate new dates (7 days per week)
      new_event_date := event_record.event_date::date + (7 * weeks_offset);
      
      IF event_record.event_date_end IS NOT NULL THEN
        new_event_date_end := new_event_date + day_diff;
      ELSE
        new_event_date_end := NULL;
      END IF;
      
      -- Insert the new event
      INSERT INTO "EVENT" (
        title,
        description,
        event_date,
        event_date_end,
        start_time,
        end_time,
        location,
        price,
        image_url,
        is_featured,
        status,
        event_type,
        spots_left,
        cta_url
      ) VALUES (
        event_record.title,
        event_record.description,
        new_event_date,
        new_event_date_end,
        event_record.start_time,
        event_record.end_time,
        event_record.location,
        event_record.price,
        event_record.image_url,
        event_record.is_featured,
        event_record.status,
        event_record.event_type,
        event_record.spots_left,
        event_record.cta_url
      );
      
      RAISE NOTICE 'Created duplicate of Sensual Tuesdays for date %', new_event_date;
    END LOOP;
  END;
END $$; 