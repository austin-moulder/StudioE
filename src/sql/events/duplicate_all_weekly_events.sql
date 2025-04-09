-- Duplicate All Weekly Events for the next 4 weeks

DO $$
DECLARE
  event_record RECORD;
  new_event_date DATE;
  new_event_date_end DATE;
  weeks_offset INT;
  day_diff INT;
  weekly_events_cursor CURSOR FOR 
    SELECT * FROM "EVENT" 
    WHERE 
      -- Match events with days of the week or "weekly" in title/description
      (title ILIKE '%Monday%' OR 
       title ILIKE '%Tuesday%' OR 
       title ILIKE '%Wednesday%' OR 
       title ILIKE '%Thursday%' OR 
       title ILIKE '%Friday%' OR 
       title ILIKE '%Saturday%' OR 
       title ILIKE '%Sunday%' OR
       title ILIKE '%weekly%' OR
       description ILIKE '%weekly%')
      -- Only consider events that aren't too old
      AND event_date >= CURRENT_DATE - INTERVAL '14 days';
  
  duplicate_count INT := 0;
BEGIN
  -- Loop through all weekly events
  OPEN weekly_events_cursor;
  
  LOOP
    FETCH weekly_events_cursor INTO event_record;
    EXIT WHEN NOT FOUND;
    
    RAISE NOTICE 'Processing event ID % - %', event_record.id, event_record.title;
    
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
      
      duplicate_count := duplicate_count + 1;
    END LOOP;
  END LOOP;
  
  CLOSE weekly_events_cursor;
  
  RAISE NOTICE 'Created % duplicate events for the next 4 weeks', duplicate_count;
END $$; 