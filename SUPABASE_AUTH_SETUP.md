# Supabase Authentication Setup

This document provides instructions for setting up authentication in your Studio E application using Supabase.

## Prerequisites

1. Supabase account
2. Supabase project created
3. Vercel account (for deployment)

## Environment Variables

Make sure these environment variables are set in your Vercel deployment and .env.local file:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Database Setup

Run the SQL script to create the user profiles table and trigger:

1. Go to your Supabase project
2. Navigate to the SQL Editor
3. Copy the contents of `src/sql/create_simple_user_profiles.sql`
4. Run the query

This will:
- Create a `user_profiles` table without foreign key constraints
- Set up a trigger to automatically create profiles for new users
- Create profiles for existing users
- Grant necessary permissions

## Google OAuth Setup

To enable Google Sign-In:

1. Go to your [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or use an existing one
3. Configure OAuth consent screen
4. Create OAuth credentials (Web application)
5. Add authorized redirect URIs:
   - `https://[your-supabase-project].supabase.co/auth/v1/callback`
   - `https://[your-domain.com]/auth/callback`
   - `http://localhost:3000/auth/callback` (for local development)
6. In Supabase:
   - Go to Authentication > Providers > Google
   - Enable Google authentication
   - Enter your Client ID and Client Secret from Google
   - Save changes

## Email Authentication Setup

For email-based authentication:

1. In Supabase, go to Authentication > Providers > Email
2. Configure as needed (password, magic link, etc.)
3. If using magic links, set up SMTP settings:
   - Go to Authentication > Email Templates
   - Configure SMTP settings with your email provider

## Testing

1. Start your application locally:
   ```
   npm run dev
   ```
2. Visit `http://localhost:3000/login`
3. Try signing in with email and Google

## Deployment

Deploy to Vercel:

1. Push your changes to GitHub
2. In Vercel, import your project
3. Set the environment variables
4. Deploy

After deployment, update the OAuth redirect URIs in Google Cloud Console to include your production URL.

## Troubleshooting

If you encounter database errors when creating new users:

1. Check Supabase logs (Database > Logs)
2. Ensure the trigger function is correctly created
3. Verify permissions are set correctly
4. Run the SQL script again if needed

For issues with Google authentication:
1. Verify the redirect URIs are correctly set
2. Check that client ID and secret are correct
3. Ensure cookies are not being blocked by the browser

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2) 