-- Check for all triggers that might be using these functions
SELECT tgname, tgrelid::regclass, pg_get_triggerdef(oid)
FROM pg_trigger
WHERE (
  pg_get_triggerdef(oid) LIKE '%create_profile_for_new_user%' OR
  pg_get_triggerdef(oid) LIKE '%sync_user_metadata_with_profile%' OR
  pg_get_triggerdef(oid) LIKE '%handle_new_user%'
);

-- Create a wrapper to drop all triggers that might be related
DO $$
DECLARE
  trigger_rec RECORD;
BEGIN
  FOR trigger_rec IN (
    SELECT tgname, tgrelid::regclass
    FROM pg_trigger
    WHERE (
      pg_get_triggerdef(oid) LIKE '%create_profile_for_new_user%' OR
      pg_get_triggerdef(oid) LIKE '%sync_user_metadata_with_profile%' OR
      pg_get_triggerdef(oid) LIKE '%handle_new_user%'
    )
  )
  LOOP
    EXECUTE 'DROP TRIGGER IF EXISTS ' || quote_ident(trigger_rec.tgname) || ' ON ' || trigger_rec.tgrelid;
  END LOOP;
END;
$$; 