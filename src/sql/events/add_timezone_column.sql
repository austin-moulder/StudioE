-- Add timezone column to EVENT table
ALTER TABLE "EVENT"
ADD COLUMN timezone TEXT DEFAULT 'America/Chicago';

-- Update existing records to use the default timezone
UPDATE "EVENT"
SET timezone = 'America/Chicago'
WHERE timezone IS NULL;

-- Add a comment to the column
COMMENT ON COLUMN "EVENT".timezone IS 'The timezone of the event (e.g., America/Chicago)';

-- Add a check constraint to ensure valid timezone values
ALTER TABLE "EVENT"
ADD CONSTRAINT valid_timezone CHECK (
    timezone IN (
        'America/Chicago',
        'America/New_York',
        'America/Denver',
        'America/Los_Angeles',
        'America/Anchorage',
        'Pacific/Honolulu'
    )
); 