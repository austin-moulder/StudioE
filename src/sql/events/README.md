# Event Duplication Scripts

These SQL scripts help you duplicate weekly recurring events in the Supabase database.

## Available Scripts

1. **duplicate_weekly_events.sql**  
   A reusable function that takes an event ID and duplicates it for a specified number of weeks.

2. **duplicate_sensual_tuesdays.sql**  
   Specifically finds and duplicates the "Sensual Tuesdays" event for the next 4 weeks.

3. **duplicate_all_weekly_events.sql**  
   Automatically identifies and duplicates all weekly events (based on day names in title or "weekly" in description) for the next 4 weeks.

4. **add_is_weekly_column.sql** (NEW)  
   Adds an `is_weekly` boolean column to the EVENT table and sets it to TRUE for likely weekly events based on naming patterns.

5. **duplicate_weekly_flag_events.sql** (NEW)  
   Duplicates all events where `is_weekly=TRUE` for the next 4 weeks. This is the recommended approach.

6. **mark_sensual_tuesdays.sql** (NEW)  
   Specifically marks all "Sensual Tuesdays" events as weekly and shows the current events.

## Recommended Workflow

1. First run `add_is_weekly_column.sql` to add the weekly flag to your events table
2. Manually update any weekly events that weren't automatically detected, or use `mark_sensual_tuesdays.sql`
3. Run `duplicate_weekly_flag_events.sql` to duplicate all weekly events

This approach is better than using naming patterns because:
- It's explicit rather than implicit
- It works for events with any name/title
- It allows you to precisely control which events should be duplicated

## How to Use

### Option 1: Using the Supabase SQL Editor

1. Log in to your Supabase dashboard
2. Navigate to the SQL Editor
3. Open one of the script files from this folder
4. Copy and paste the SQL into the editor
5. Run the query

### Option 2: Using the Supabase CLI

If you have the Supabase CLI installed:

```bash
supabase db execute -f src/sql/events/duplicate_weekly_flag_events.sql
```

## Finding Events to Mark as Weekly

To list all your events and decide which ones should be weekly:

```sql
SELECT id, title, event_date, 
       CASE WHEN is_weekly THEN 'Yes' ELSE 'No' END as is_weekly
FROM "EVENT"
ORDER BY event_date DESC;
```

To mark a specific event as weekly:

```sql
UPDATE "EVENT" SET is_weekly = TRUE WHERE id = 123;
```

## Monthly Maintenance

For easy maintenance, run the `duplicate_weekly_flag_events.sql` script once a month to ensure all weekly events are scheduled for the next 4 weeks. 