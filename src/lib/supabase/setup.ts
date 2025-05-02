"use client";

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
export const initSupabaseAdmin = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Supabase URL or Service Role Key is missing');
  }
  
  return createClient(supabaseUrl, supabaseServiceKey);
};

/**
 * Creates the storage buckets needed for the application
 * Run this function from an admin panel or one-time setup script
 */
export const createStorageBuckets = async () => {
  try {
    const supabase = initSupabaseAdmin();
    
    // Create blog_images bucket
    const { data: blogBucketData, error: blogBucketError } = await supabase
      .storage
      .createBucket('blog_images', {
        public: true,
        fileSizeLimit: 5242880, // 5MB in bytes
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp']
      });
    
    if (blogBucketError) throw new Error(`Error creating blog_images bucket: ${blogBucketError.message}`);
    
    // Create profile_images bucket
    const { data: profileBucketData, error: profileBucketError } = await supabase
      .storage
      .createBucket('profile_images', {
        public: true,
        fileSizeLimit: 2097152, // 2MB in bytes
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/webp']
      });
    
    if (profileBucketError) throw new Error(`Error creating profile_images bucket: ${profileBucketError.message}`);
    
    return { 
      success: true, 
      message: 'Storage buckets created successfully',
      data: { blogBucketData, profileBucketData }
    };
  } catch (error) {
    console.error('Error creating storage buckets:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error
    };
  }
};

/**
 * SQL for creating the blog_authors table and relationship with blog_posts
 * 
 * This is provided as a string to be executed in the Supabase SQL editor
 * or using a migration tool
 */
export const getBlogAuthorsTableSQL = () => `
-- Create blog_authors table
CREATE TABLE IF NOT EXISTS blog_authors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  bio TEXT,
  profile_image TEXT,
  email TEXT,
  social_links JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies for blog_authors
ALTER TABLE blog_authors ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read authors
CREATE POLICY "Allow public read access for blog_authors" 
  ON blog_authors FOR SELECT USING (true);

-- Allow anyone to create authors (not just authenticated users)
CREATE POLICY "Allow public creation of blog_authors" 
  ON blog_authors FOR INSERT USING (true);

-- Allow authors to update their own profiles
CREATE POLICY "Allow authors to update their own profiles" 
  ON blog_authors FOR UPDATE TO authenticated USING (
    auth.uid() IN (SELECT auth_id FROM user_profiles WHERE id = blog_authors.id)
  );

-- Modify blog_posts table to reference blog_authors
ALTER TABLE IF EXISTS blog_posts
  DROP COLUMN IF EXISTS author_name,
  DROP COLUMN IF EXISTS author_image;

ALTER TABLE IF EXISTS blog_posts
  ADD COLUMN author_id UUID REFERENCES blog_authors(id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS blog_posts_author_id_idx ON blog_posts(author_id);
`;

/**
 * Function to run the SQL for creating blog_authors table
 * Only to be used in a controlled environment (admin script)
 */
export const createBlogAuthorsTable = async () => {
  try {
    const supabase = initSupabaseAdmin();
    const sql = getBlogAuthorsTableSQL();
    
    const { data, error } = await supabase.rpc('exec_sql', { sql });
    
    if (error) throw error;
    
    return {
      success: true,
      message: 'Blog authors table created successfully',
      data
    };
  } catch (error) {
    console.error('Error creating blog_authors table:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      error
    };
  }
}; 