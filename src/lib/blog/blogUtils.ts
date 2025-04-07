import { supabase } from '@/lib/supabase/supabase';
import { BlogPost, BlogCategory } from '@/types/blog';

/**
 * Get all blog posts
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching blog posts:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching blog posts:', error);
    return [];
  }
}

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
 * Get blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();
    
    if (error) {
      console.error('Error fetching blog post by slug:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Exception fetching blog post by slug:', error);
    return null;
  }
}

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
export async function getBlogPostsByCategory(category: string): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('category', category)
      .eq('published', true)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching blog posts by category:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception fetching blog posts by category:', error);
    return [];
  }
}

/**
 * Search blog posts
 */
export async function searchBlogPosts(searchTerm: string): Promise<BlogPost[]> {
  try {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .or(`title.ilike.%${searchTerm}%,content.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error searching blog posts:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Exception searching blog posts:', error);
    return [];
  }
} 