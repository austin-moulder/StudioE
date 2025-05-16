-- Check for auth-related functions that might reference user_profiles
SELECT n.nspname as schema, 
       p.proname as function_name, 
       p.prosrc as function_body
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE (p.prosrc LIKE '%user_profiles%' OR p.prosrc LIKE '%user\\_profiles%')
AND n.nspname in ('auth', 'public');

-- Check for views that might reference user_profiles
SELECT schemaname, viewname, definition
FROM pg_views
WHERE definition LIKE '%user_profiles%';

-- Check for auth hooks in pg_function_info
SELECT obj_description(p.oid) as description, p.proname, p.prosrc
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'auth' 
AND (obj_description(p.oid) LIKE '%hook%' OR p.proname LIKE '%hook%');

-- Check for remaining triggers that might reference user_profiles
SELECT tgname, tgrelid::regclass, pg_get_triggerdef(oid)
FROM pg_trigger
WHERE pg_get_triggerdef(oid) LIKE '%user_profiles%';

-- Check for any stored procedures in the auth schema
SELECT p.proname as procedure_name, p.prosrc as procedure_body
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname = 'auth'
AND p.prosrc LIKE '%user_profiles%';

-- Check for any event triggers
SELECT evtname, evtevent, evtfoid::regproc
FROM pg_event_trigger
WHERE evtfoid::regproc::text IN (
  SELECT p.proname::text
  FROM pg_proc p
  JOIN pg_namespace n ON p.pronamespace = n.oid
  WHERE p.prosrc LIKE '%user_profiles%'
);

-- Look for any rules that might reference user_profiles
SELECT r.rulename, d.relname, r.ev_enabled, pg_get_ruledef(r.oid)
FROM pg_rewrite r
JOIN pg_class d ON r.ev_class = d.oid
WHERE pg_get_ruledef(r.oid) LIKE '%user_profiles%'; 