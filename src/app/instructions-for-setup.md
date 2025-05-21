# Supabase Authentication Setup

## Email Verification Setup

Email verification requires configuration in the Supabase dashboard. Follow these steps:

1. Log in to your Supabase dashboard at https://app.supabase.com
2. Select your project
3. Go to "Authentication" in the left sidebar
4. Click on "Providers" tab
5. Under Email, make sure it's enabled
6. To configure email templates:
   - Click on "Email Templates" tab
   - You can customize the email verification templates

## SMTP Configuration for Email Delivery

To send emails, you need to configure an SMTP server:

1. In the Supabase dashboard, go to "Authentication" → "Email Templates"
2. Click on "Configure SMTP" button
3. Enter your SMTP details:
   - Host (e.g., smtp.gmail.com)
   - Port (e.g., 587 for TLS)
   - Username (your email address)
   - Password (your SMTP password or app password)
   - Sender name (e.g., "Your App Name")
   - Sender email (the email address emails will be sent from)

4. Click "Save" to apply your changes

## Testing Without Email Verification

For development/testing, you can temporarily disable email confirmation:

1. Go to "Authentication" → "Providers" tab
2. Under "Email" settings
3. Uncheck "Confirm email" option
4. Click "Save"

This will allow users to sign up without email verification, but is **not recommended for production**.

## Authentication Flow Setup

For proper authentication flows with redirect URLs:

1. Go to "Authentication" → "URL Configuration"
2. Set the Site URL to your production URL (e.g., https://yourdomain.com)
3. Add redirect URLs for local development (e.g., http://localhost:3000/auth/callback)
4. Save your changes

## Optional: Creating a Test User with SQL

If you need to create a test user directly in the database:

1. Go to "SQL Editor" in the left sidebar
2. Create a new query and execute:

```sql
-- Insert a user with a verified email (replace values as needed)
INSERT INTO auth.users (
  instance_id,
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  confirmation_token,
  recovery_token,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000', -- your Supabase instance ID
  gen_random_uuid(),
  'test@example.com',
  crypt('password123', gen_salt('bf')),
  NOW(),
  '',
  '',
  NOW(),
  NOW()
);
```

Note: Creating users directly with SQL should only be done for testing, not in production. 