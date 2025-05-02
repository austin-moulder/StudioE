import { createClient } from '@supabase/supabase-js'
import { BlogCategory } from '@/types/blog'
import { supabase } from '@/lib/supabase/supabase';

/**
 * Updated BlogPost interface to include author information
 */
export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image?: string;
  category?: string;
  author_id?: string;
  author?: BlogAuthor;
  created_at: string;
  updated_at: string;
  published: boolean;
}

/**
 * Get all blog posts with author information
 */
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:author_id (
          id,
          name,
          profile_image
        )
      `)
      .eq('published', true)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

/**
 * Get featured blog posts
 */
export async function getFeaturedBlogPosts(limit = 3): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) {
      console.error('Error fetching featured blog posts:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching featured blog posts:', error);
    return [];
  }
}

/**
 * Get a single blog post by slug with full author information
 */
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:author_id (
          id,
          name,
          bio,
          profile_image,
          email,
          social_links
        )
      `)
      .eq('slug', slug)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
};

/**
 * Get blog categories
 */
export async function getBlogCategories(): Promise<BlogCategory[]> {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name', { ascending: true });
    
    if (error) {
      console.error('Error fetching blog categories:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching blog categories:', error);
    return [];
  }
}

/**
 * Get blog posts by category
 */
export const getBlogPostsByCategory = async (category: string): Promise<BlogPost[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:author_id (
          id,
          name,
          profile_image
        )
      `)
      .eq('published', true)
      .eq('category', category)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching blog posts by category:', error);
    return [];
  }
};

/**
 * Search blog posts
 */
export const searchBlogPosts = async (searchTerm: string): Promise<BlogPost[]> => {
  try {
    // First try to search directly in Supabase
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        author:author_id (
          id,
          name,
          profile_image
        )
      `)
      .eq('published', true)
      .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error searching blog posts:', error);
    return [];
  }
};

/**
 * Helper function to generate the correct markdown syntax for images
 * @param altText Alternative text for the image (for accessibility)
 * @param imageUrl Full URL to the image
 * @param options Optional parameters (width, height, caption)
 * @returns Formatted markdown for the image
 */
export function generateImageMarkdown(
  altText: string, 
  imageUrl: string, 
  options?: { 
    width?: number; 
    height?: number; 
    caption?: string;
  }
): string {
  // Set default options
  const width = options?.width || 800;
  const height = options?.height || 500;
  
  // Build metadata string
  let metadata = `width=${width},height=${height}`;
  
  // Add caption if provided
  if (options?.caption) {
    metadata += `,caption=${options.caption}`;
  }
  
  // Return the formatted markdown
  return `!![${altText}](${imageUrl}|${metadata})`;
}

/**
 * Get the public URL for a file in Supabase Storage
 * @param bucket The storage bucket (e.g., 'assetsv1')
 * @param path The path to the file (e.g., 'Blog/image.jpg')
 * @returns The full public URL to the file
 */
export function getSupabaseStorageUrl(bucket: string, path: string): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  if (!supabaseUrl) {
    console.error('Supabase URL is not defined in environment variables');
    return '';
  }
  
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`;
}

export interface BlogAuthor {
  id: string;
  name: string;
  bio?: string;
  profile_image?: string;
  email?: string;
  social_links?: Record<string, string>;
  created_at: string;
  updated_at: string;
}

export const getBlogAuthors = async (): Promise<BlogAuthor[]> => {
  try {
    const { data, error } = await supabase
      .from('blog_authors')
      .select('*')
      .order('name');
    
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching blog authors:', error);
    return [];
  }
};

export const getBlogAuthorById = async (id: string): Promise<BlogAuthor | null> => {
  try {
    const { data, error } = await supabase
      .from('blog_authors')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching blog author:', error);
    return null;
  }
};

export const createBlogAuthor = async (author: Omit<BlogAuthor, 'id' | 'created_at' | 'updated_at'>) => {
  try {
    const { data, error } = await supabase
      .from('blog_authors')
      .insert([author])
      .select()
      .single();
    
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error creating blog author:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred' 
    };
  }
}; 