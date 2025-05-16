-- fix_class_inquiries_schema.sql
-- Fix the class_inquiries table to properly use class_id as a foreign key reference

-- First, create a backup of the existing table
CREATE TABLE public.class_inquiries_backup AS SELECT * FROM public.class_inquiries;

-- Step 1: Check if the classes table uses UUID as its primary key
DO $$ 
DECLARE 
    id_type TEXT;
BEGIN
    SELECT data_type INTO id_type FROM information_schema.columns 
    WHERE table_name = 'classes' AND column_name = 'id';
    
    IF id_type != 'uuid' THEN
        RAISE EXCEPTION 'The id column in classes table is not of type UUID (found: %)', id_type;
    END IF;
END $$;

-- Step 2: Validate that existing class_id values are valid UUIDs
DO $$ 
DECLARE 
    invalid_records RECORD;
BEGIN
    -- Check for any class_id values that are not valid UUIDs
    SELECT * INTO invalid_records FROM public.class_inquiries 
    WHERE class_id !~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$' LIMIT 1;
    
    IF FOUND THEN
        RAISE EXCEPTION 'Invalid class_id values found that are not valid UUIDs. Please clean the data first.';
    END IF;
END $$;

-- Step 3: Modify the column type to UUID to match the classes table
ALTER TABLE public.class_inquiries 
    ALTER COLUMN class_id TYPE UUID USING class_id::UUID;

-- Step 4: Add foreign key constraint to reference the classes table
ALTER TABLE public.class_inquiries
    ADD CONSTRAINT fk_class_inquiries_classes
    FOREIGN KEY (class_id)
    REFERENCES public.classes(id)
    ON DELETE CASCADE;

-- Step 5: Re-create the index with the proper type
DROP INDEX IF EXISTS class_inquiries_class_id_idx;
CREATE INDEX class_inquiries_class_id_idx ON public.class_inquiries(class_id);

-- Step 6: Comment explaining the change
COMMENT ON COLUMN public.class_inquiries.class_id IS 'Foreign key reference to the classes table (UUID)';

-- Step 7: Create a view to help with dashboard metrics for upcoming vs past classes
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

-- Step 8: Create security policy for the view
CREATE POLICY "Users can view their own class inquiry status" 
    ON public.class_inquiry_status 
    FOR SELECT 
    USING (auth.uid() = user_id);

-- Grant permissions on the view
GRANT SELECT ON public.class_inquiry_status TO authenticated; 