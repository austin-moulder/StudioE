-- Create class_inquiries table to track user class inquiries

-- Drop table if it exists
DROP TABLE IF EXISTS public.class_inquiries;

-- Create table
CREATE TABLE public.class_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    class_id TEXT NOT NULL,
    class_name TEXT NOT NULL,
    instructor_id TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'booked', 'canceled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index
CREATE INDEX class_inquiries_user_id_idx ON public.class_inquiries(user_id);
CREATE INDEX class_inquiries_class_id_idx ON public.class_inquiries(class_id);
CREATE INDEX class_inquiries_status_idx ON public.class_inquiries(status);

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