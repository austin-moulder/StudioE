-- Fix Dashboard Views - Corrected Version
-- This script recreates the views to match what the dashboard expects
-- Using only columns that are likely to exist

-- 1. Fix class_inquiry_status view to match dashboard expectations
DROP VIEW IF EXISTS public.class_inquiry_status CASCADE;

CREATE VIEW public.class_inquiry_status AS
SELECT 
    ci.id,
    ci.class_id,
    ci.user_id,
    ci.status,
    ci.created_at,
    ci.updated_at,
    -- Use created_at as inquiry_date if inquiry_date doesn't exist
    ci.created_at as inquiry_date,
    -- Use updated_at as response_date if response_date doesn't exist  
    ci.updated_at as response_date
FROM class_inquiries ci;

-- 2. Fix event_rsvp_status view to match dashboard expectations  
DROP VIEW IF EXISTS public.event_rsvp_status CASCADE;

CREATE VIEW public.event_rsvp_status AS
SELECT 
    er.id,
    er.event_id,
    er.user_id,
    er.status,
    er.created_at,
    er.updated_at,
    -- Use created_at as rsvp_date if rsvp_date doesn't exist
    er.created_at as rsvp_date
FROM event_rsvps er;

-- 3. Ensure RLS is properly configured on underlying tables
ALTER TABLE class_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies for class_inquiries if they don't exist
DO $$ 
BEGIN
    -- Policy for users to see their own class inquiries
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'class_inquiries' 
        AND policyname = 'Users can view own class inquiries'
    ) THEN
        CREATE POLICY "Users can view own class inquiries" ON public.class_inquiries
        FOR SELECT USING ((SELECT auth.uid()) = user_id::uuid);
    END IF;
    
    -- Policy for users to insert their own class inquiries
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'class_inquiries' 
        AND policyname = 'Users can insert own class inquiries'
    ) THEN
        CREATE POLICY "Users can insert own class inquiries" ON public.class_inquiries
        FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id::uuid);
    END IF;
END $$;

-- 5. Create RLS policies for event_rsvps if they don't exist
DO $$ 
BEGIN
    -- Policy for users to see their own event RSVPs
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'event_rsvps' 
        AND policyname = 'Users can view own event rsvps'
    ) THEN
        CREATE POLICY "Users can view own event rsvps" ON public.event_rsvps
        FOR SELECT USING ((SELECT auth.uid()) = user_id::uuid);
    END IF;
    
    -- Policy for users to insert their own event RSVPs
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'event_rsvps' 
        AND policyname = 'Users can insert own event rsvps'
    ) THEN
        CREATE POLICY "Users can insert own event rsvps" ON public.event_rsvps
        FOR INSERT WITH CHECK ((SELECT auth.uid()) = user_id::uuid);
    END IF;
    
    -- Policy for users to update their own event RSVPs
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'event_rsvps' 
        AND policyname = 'Users can update own event rsvps'
    ) THEN
        CREATE POLICY "Users can update own event rsvps" ON public.event_rsvps
        FOR UPDATE USING ((SELECT auth.uid()) = user_id::uuid);
    END IF;
END $$;

-- 6. Grant appropriate permissions
GRANT SELECT ON public.class_inquiry_status TO authenticated;
GRANT SELECT ON public.event_rsvp_status TO authenticated;

-- 7. Ensure event_reviews has proper RLS policy for auth_id column
DO $$ 
BEGIN
    -- Policy for users to see their own event reviews using auth_id
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'event_reviews' 
        AND policyname = 'Users can view own event reviews by auth_id'
    ) THEN
        CREATE POLICY "Users can view own event reviews by auth_id" ON public.event_reviews
        FOR SELECT USING ((SELECT auth.uid()) = auth_id);
    END IF;
END $$;

-- 8. Create a policy for public read access to EVENT table if needed
DO $$ 
BEGIN
    -- Allow authenticated users to read events (they need this for the dashboard)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'EVENT' 
        AND policyname = 'Authenticated users can view events'
    ) THEN
        CREATE POLICY "Authenticated users can view events" ON public.EVENT
        FOR SELECT TO authenticated
        USING (true);
    END IF;
END $$;

-- 9. Create a policy for public read access to classes table if needed
DO $$ 
BEGIN
    -- Allow authenticated users to read classes (they need this for the dashboard)
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'classes' 
        AND policyname = 'Authenticated users can view classes'
    ) THEN
        CREATE POLICY "Authenticated users can view classes" ON public.classes
        FOR SELECT TO authenticated
        USING (true);
    END IF;
END $$;

-- 10. Check if tables exist and create minimal versions if they don't
DO $$
BEGIN
    -- Check if class_inquiries table exists, if not create a minimal version
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'class_inquiries') THEN
        CREATE TABLE public.class_inquiries (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            class_id UUID,
            user_id UUID REFERENCES auth.users(id),
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        ALTER TABLE class_inquiries ENABLE ROW LEVEL SECURITY;
    END IF;
    
    -- Check if event_rsvps table exists, if not create a minimal version
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'event_rsvps') THEN
        CREATE TABLE public.event_rsvps (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            event_id UUID,
            user_id UUID REFERENCES auth.users(id),
            status TEXT DEFAULT 'pending',
            created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
            updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
        ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;
    END IF;
END $$; 