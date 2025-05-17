-- Add auth_id column to event_reviews table if it doesn't exist
ALTER TABLE IF EXISTS public.event_reviews
ADD COLUMN IF NOT EXISTS auth_id UUID REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for performance
CREATE INDEX IF NOT EXISTS event_reviews_auth_id_idx ON public.event_reviews(auth_id);

-- Add comment for documentation
COMMENT ON COLUMN public.event_reviews.auth_id IS 'Foreign key reference to auth.users table to track which user submitted the review';

-- Set up RLS policies for the auth_id column
CREATE POLICY IF NOT EXISTS "Users can see reviews they submitted" 
    ON public.event_reviews 
    FOR SELECT 
    USING (auth.uid() = auth_id OR auth_id IS NULL);

-- Update RLS policy for inserting reviews with auth_id
CREATE OR REPLACE POLICY "Users can create reviews with their auth_id" 
    ON public.event_reviews 
    FOR INSERT 
    WITH CHECK (auth.uid() = auth_id OR auth_id IS NULL);

-- Create view for user reviews lookup
CREATE OR REPLACE VIEW public.user_event_reviews AS
SELECT 
    er.id,
    er.event_id,
    er.auth_id,
    er.user_name,
    er.rating,
    er.review_text,
    er.created_at,
    er.is_approved,
    e.title as event_title,
    e.event_date,
    e.image_url as event_image_url
FROM 
    public.event_reviews er
JOIN 
    public."EVENT" e ON er.event_id = e.id
WHERE
    er.auth_id IS NOT NULL;

-- Add RLS to view
ALTER VIEW IF EXISTS public.user_event_reviews ENABLE ROW LEVEL SECURITY;

-- Create policy for users to only see their own reviews in the view
CREATE POLICY IF NOT EXISTS "Users can only see their own reviews" 
    ON public.user_event_reviews
    FOR SELECT 
    USING (auth.uid() = auth_id);

-- Grant permissions to authenticated users
GRANT SELECT ON public.user_event_reviews TO authenticated; 