# Studio E - Dance Community Platform

## Blog Author System Setup

To enable the improved blog submission system with reusable authors:

1. Access the admin setup page at `/admin/setup` to:
   - Create the required storage buckets (blog_images and profile_images)
   - Get the SQL needed to create the blog_authors table

2. Execute the provided SQL in your Supabase SQL Editor:
   - This will create the blog_authors table
   - Set up the necessary relationships and indexes
   - Configure RLS policies for security

3. The new system allows:
   - Selecting existing authors from a dropdown when creating blog posts
   - Adding new authors on the fly with profile images
   - Consistent author information across multiple posts

## Environment Variables

The following environment variables are required:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (for admin operations only)
```

## Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies used
We are using the following technologies...
- React with Next.js 14 App Router
- TailwindCSS
- Supabase Auth, Storage, and Database
- Multiple AI endpoints including OpenAI, Anthropic, and Replicate using Vercel's AI SDK
