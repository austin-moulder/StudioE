-- recreate_class_inquiries_table.sql
-- Recreate the class_inquiries table with proper UUID data type for class_id

-- First, drop the old table if it exists
DROP TABLE IF EXISTS public.class_inquiries;

-- Create the table with the correct data types
CREATE TABLE public.class_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    class_id UUID NOT NULL REFERENCES public.classes(id) ON DELETE CASCADE,
    class_name TEXT NOT NULL,
    instructor_id TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'booked', 'canceled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX class_inquiries_user_id_idx ON public.class_inquiries(user_id);
CREATE INDEX class_inquiries_class_id_idx ON public.class_inquiries(class_id);
CREATE INDEX class_inquiries_status_idx ON public.class_inquiries(status);

-- Add comments for better documentation
COMMENT ON TABLE public.class_inquiries IS 'Stores user inquiries/RSVPs for dance classes';
COMMENT ON COLUMN public.class_inquiries.class_id IS 'Foreign key reference to the classes table (UUID)';

-- Set up RLS (Row Level Security)
ALTER TABLE public.class_inquiries ENABLE ROW LEVEL SECURITY;

-- Policy for users to read only their own inquiries
CREATE POLICY "Users can view their own inquiries" 
    ON public.class_inquiries 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Policy for users to create their own inquiries
CREATE POLICY "Users can create their own inquiries" 
    ON public.class_inquiries 
    FOR INSERT 
    WITH CHECK (auth.uid() = user_id);

-- Policy for users to update their own inquiries
CREATE POLICY "Users can update their own inquiries" 
    ON public.class_inquiries 
    FOR UPDATE 
    USING (auth.uid() = user_id);

-- Policy for admins to manage all inquiries
CREATE POLICY "Admins can do anything" 
    ON public.class_inquiries 
    USING (
        EXISTS (
            SELECT 1 FROM public.users
            WHERE users.id = auth.uid() AND users.role = 'admin'
        )
    );

-- Grant permissions to authenticated users
GRANT SELECT, INSERT, UPDATE ON public.class_inquiries TO authenticated;

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_class_inquiries_updated_at
BEFORE UPDATE ON public.class_inquiries
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Create a view to help with dashboard metrics for upcoming vs past classes
CREATE OR REPLACE VIEW public.class_inquiry_status AS
SELECT 
    ci.id AS inquiry_id,
    ci.user_id,
    ci.class_id,
    ci.class_name,
    ci.status,
    c.class_date,
    c.end_time,
    CASE 
        WHEN c.class_date < CURRENT_DATE THEN 'past'
        WHEN c.class_date = CURRENT_DATE AND c.end_time < CURRENT_TIME THEN 'past'
        ELSE 'upcoming'
    END AS temporal_status
FROM 
    public.class_inquiries ci
JOIN 
    public.classes c ON ci.class_id = c.id;

-- Create security policy for the view
CREATE POLICY "Users can view their own class inquiry status" 
    ON public.class_inquiry_status 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Grant permissions on the view
GRANT SELECT ON public.class_inquiry_status TO authenticated; 