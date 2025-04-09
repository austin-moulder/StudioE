-- Duplicate Weekly Events SQL Script
-- This script duplicates existing weekly events for the next 4 weeks

-- Function to duplicate a specific event
CREATE OR REPLACE FUNCTION duplicate_event_for_weeks(
  event_id INT,
  weeks_to_duplicate INT
)
RETURNS VOID AS $$
DECLARE
  event_record RECORD;
  new_event_date DATE;
  new_event_date_end DATE;
  weeks_offset INT;
  day_diff INT;
BEGIN
  -- Get the event to duplicate
  SELECT * INTO event_record FROM "EVENT" WHERE id = event_id;
  
  -- If event not found, exit
  IF event_record IS NULL THEN
    RAISE NOTICE 'Event with ID % not found', event_id;
    RETURN;
  END IF;
  
  -- Calculate days difference if end date exists
  day_diff := 0;
  IF event_record.event_date_end IS NOT NULL THEN
    day_diff := event_record.event_date_end::date - event_record.event_date::date;
  END IF;
  
  -- Duplicate for each week
  FOR weeks_offset IN 1..weeks_to_duplicate LOOP
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
    
    RAISE NOTICE 'Created duplicate of event ID % for date %', event_id, new_event_date;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Example usage:
-- SELECT duplicate_event_for_weeks(123, 4); -- Replace 123 with your "Sensual Tuesdays" event ID

-- To duplicate multiple events at once:
/*
DO $$
DECLARE
  event_ids INT[] := ARRAY[123, 456, 789]; -- Replace with your event IDs
  event_id INT;
BEGIN
  FOREACH event_id IN ARRAY event_ids LOOP
    PERFORM duplicate_event_for_weeks(event_id, 4);
  END LOOP;
END $$;
*/

-- To find the ID of "Sensual Tuesdays":
-- SELECT id FROM "EVENT" WHERE title LIKE 'Sensual Tuesdays%';

-- To duplicate all events with "Tuesdays" in the title:
/*
DO $$
DECLARE
  event_record RECORD;
BEGIN
  FOR event_record IN SELECT id FROM "EVENT" WHERE title LIKE '%Tuesdays%' LOOP
    PERFORM duplicate_event_for_weeks(event_record.id, 4);
  END LOOP;
END $$;
*/ 