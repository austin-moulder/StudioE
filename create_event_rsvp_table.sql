-- create_event_rsvp_table.sql
-- Create a new table for event RSVPs with proper UUID data type for event_id

-- First, ensure the uuid-ossp extension is available
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the table with the correct data types
CREATE TABLE IF NOT EXISTS public.event_rsvps (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    event_id INTEGER NOT NULL REFERENCES public."EVENT"(id) ON DELETE CASCADE,
    event_name TEXT NOT NULL,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'attending', 'declined', 'canceled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX event_rsvps_user_id_idx ON public.event_rsvps(user_id);
CREATE INDEX event_rsvps_event_id_idx ON public.event_rsvps(event_id);
CREATE INDEX event_rsvps_status_idx ON public.event_rsvps(status);

-- Add comments for better documentation
COMMENT ON TABLE public.event_rsvps IS 'Stores user RSVPs for events';
COMMENT ON COLUMN public.event_rsvps.event_id IS 'Foreign key reference to the EVENT table';

-- Set up RLS (Row Level Security)
ALTER TABLE public.event_rsvps ENABLE ROW LEVEL SECURITY;

-- Policy for users to read only their own RSVPs
CREATE POLICY "Users can view their own event RSVPs" 
    ON public.event_rsvps 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Policy for users to create their own RSVPs
CREATE POLICY "Users can create their own event RSVPs" 
    ON public.event_rsvps 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own RSVPs
CREATE POLICY "Users can update their own event RSVPs" 
    ON public.event_rsvps 
    FOR UPDATE 
    USING (auth.uid() = user_id);

-- Policy for admins to manage all RSVPs
CREATE POLICY "Admins can manage all event RSVPs" 
    ON public.event_rsvps 
    FOR ALL 
    USING (auth.uid() IN (
        SELECT id FROM auth.users 
        WHERE raw_user_meta_data->>'role' = 'admin'
    ));

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON public.event_rsvps TO authenticated;

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_event_rsvps_updated_at
BEFORE UPDATE ON public.event_rsvps
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create a view to help with dashboard metrics for upcoming vs past events
CREATE OR REPLACE VIEW public.event_rsvp_status AS
SELECT 
    er.id,
    er.user_id,
    er.event_id,
    er.event_name,
    er.status,
    er.created_at,
    er.updated_at,
    e.event_date,
    e.event_date_end,
    e.end_time,
    CASE 
        WHEN e.event_date_end IS NOT NULL THEN
            CASE 
                WHEN e.event_date_end < CURRENT_DATE THEN 'past'
                ELSE 'upcoming'
            END
        ELSE
            CASE 
                WHEN e.event_date < CURRENT_DATE THEN 'past'
                WHEN e.event_date = CURRENT_DATE AND e.end_time < CURRENT_TIME THEN 'past'
                ELSE 'upcoming'
            END
    END AS temporal_status
FROM 
    public.event_rsvps er
JOIN 
    public."EVENT" e ON er.event_id = e.id;

-- Add RLS policy for the view
ALTER VIEW public.event_rsvp_status ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own event statuses" 
    ON public.event_rsvp_status
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Grant permissions to authenticated users
GRANT SELECT ON public.event_rsvp_status TO authenticated; 