# Migrating from Firebase to Supabase

This guide will help you migrate your application from Firebase to Supabase. This is a gradual process, so you can migrate parts of your application while keeping others on Firebase until you're ready to fully switch.

## What is Supabase?

Supabase is an open-source Firebase alternative that provides all the backend features you need to build a product:

- PostgreSQL Database
- Authentication
- Storage
- Realtime subscriptions
- Edge Functions
- Vector database for AI applications

## Setup Steps

### 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign up or log in
2. Create a new project
3. Name your project and set up a secure password
4. Choose a region close to your users
5. Wait for your database to be provisioned (usually takes a few minutes)

### 2. Get Your API Keys

1. In your Supabase project dashboard, go to Settings > API
2. Note down the:
   - **Project URL** (for `NEXT_PUBLIC_SUPABASE_URL`)
   - **anon/public** key (for `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

### 3. Set Up Environment Variables

1. Create a `.env.local` file in your project root (or copy from `.env.local.example`)
2. Add your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### 4. Create Tables in Supabase

For each collection in Firebase, you'll need to create a corresponding table in Supabase:

1. Go to the SQL Editor in your Supabase dashboard
2. Create tables with the appropriate schema

Example SQL for creating an instructors table:

```sql
CREATE TABLE instructors (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  style TEXT,
  location TEXT,
  price_lower NUMERIC DEFAULT 50,
  price_upper NUMERIC DEFAULT 70,
  rating NUMERIC DEFAULT 5.0,
  reviews INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add some sample data
INSERT INTO instructors (name, style, location, price_lower, price_upper, rating, reviews, featured)
VALUES 
  ('Jocelyn V.', 'Heels & Reggaeton', 'Chicago, IL', 50, 70, 4.9, 127, true),
  ('Del D.', 'Salsa & Social Dancing', 'Chicago, IL', 65, 85, 4.7, 82, true),
  ('Brian M.', 'Bachata & Sensual', 'Barcelona, Spain', 60, 80, 5.0, 156, false);
```

### 5. Migrate Your Authentication System

1. Set up authentication in Supabase dashboard:
   - Go to Authentication > Providers
   - Enable the providers you need (Email, Google, etc.)
2. For Google Auth, you'll need to:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create OAuth credentials (if you haven't already for Firebase)
   - Add Supabase redirect URL: `https://[YOUR_PROJECT_REFERENCE].supabase.co/auth/v1/callback`

### 6. Start Using Supabase in Your Application

Begin using the Supabase client instead of Firebase. Use our utilities:

- For authentication: `useSupabaseAuth` hook
- For database: `fetchData`, `insertData`, `updateData`, `deleteData` functions
- For storage: `uploadFile`, `getFileUrl`, `deleteFile` functions

### 7. Testing the Migration

1. Try the SupabaseDemo component to ensure your setup is working:
   - Create a route to display the demo component
   - Test CRUD operations
   - Test authentication

### 8. Gradual Migration Strategy

1. Start with new features using Supabase
2. Migrate one feature at a time, testing thoroughly
3. Run Firebase and Supabase in parallel during the transition
4. Once all features are migrated, remove Firebase

## File Structure

The Supabase implementation is organized as follows:

- `src/lib/supabase/supabase.ts` - Client initialization
- `src/lib/supabase/supabaseUtils.ts` - Utility functions for common operations
- `src/lib/contexts/SupabaseAuthContext.tsx` - Authentication context
- `src/lib/hooks/useSupabaseAuth.ts` - Hook to access auth context
- `src/components/SupabaseDemo.tsx` - Example component showing usage

## API Differences to Note

- **Authentication**:
  - Firebase uses `onAuthStateChanged` → Supabase uses `onAuthStateChange`
  - Firebase stores user in memory → Supabase can use cookie-based sessions

- **Database**:
  - Firebase uses NoSQL collections → Supabase uses PostgreSQL tables
  - Firebase has realtime by default → Supabase requires realtime subscription setup

- **Storage**:
  - Firebase uses bucket/path → Supabase uses bucket/path too, similar API

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/start)
- [Supabase Auth Helpers for Next.js](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Firebase to Supabase Migration Guide](https://supabase.com/docs/guides/migrations/firebase-to-supabase) 