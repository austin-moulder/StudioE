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

/**
 * Create a sample blog post to demonstrate image use in content
 * This is for demonstration purposes only - should not be used in production
 */
export function createSampleBlogPostWithImages(): BlogPost {
  return {
    id: 999,
    title: "How to Add Images to Your Blog Posts",
    slug: "how-to-add-images-to-blog-posts",
    excerpt: "Learn how to format and add beautiful images to your Studio E blog posts using our custom syntax.",
    featured_image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Blog/dance_blog_header.jpg",
    category: "Tips & Techniques",
    published: true,
    created_at: new Date().toISOString(),
    author_name: "Studio E Admin",
    author_image: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Instructors/Austin_Profile_Picture_Standing.jpeg",
    content: `
# Adding Images to Your Blog Posts

When creating content for your dance blog, images can help bring your stories to life. This guide shows you how to add images using our custom syntax.

## Basic Image Syntax

To add an image to your blog post, use our special double exclamation mark syntax followed by square brackets for alt text and parentheses for the image URL and optional parameters:

\`\`\`
!![Alt text for the image](https://example.com/your-image.jpg|width=800,height=500,caption=This is a caption for the image)
\`\`\`

## Example With Parameters

Here's a live example with all parameters:

!![Dancers performing on stage](https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Blog/dance_performance.jpg|width=800,height=500,caption=Professional dancers performing a contemporary routine at Studio E)

## Example Without Caption

You can also omit the caption if you prefer:

!![Dance practice session](https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Blog/dance_practice.jpg|width=800,height=500)

## Using Different Sizes

You can customize the width and height:

!![Close-up of dance shoes](https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Blog/dance_shoes.jpg|width=400,height=300,caption=Close-up of professional dance shoes)

## Tips for Great Blog Images

1. Use high-quality images that are relevant to your content
2. Include descriptive alt text for accessibility
3. Add helpful captions to provide context
4. Consider image dimensions for proper display
5. Optimize images for web to improve loading times

That's it! Now you can add beautiful images to all your Studio E blog posts.
`
  };
} 