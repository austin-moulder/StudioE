import { generateImageMarkdown, getSupabaseStorageUrl } from '@/lib/blog/blogUtils';

/**
 * INSTRUCTIONS: HOW TO USE IMAGES IN BLOG POSTS
 * 
 * You can copy the example code below and paste it into your blog post content in Supabase.
 * Replace the bucket, path, alt text, and caption with your own values.
 */

// Example 1: Standard image with caption
const example1 = () => {
  const imageUrl = getSupabaseStorageUrl('assetsv1', 'Blog/your-image-name.jpg');
  const markdown = generateImageMarkdown(
    'Dance class in session', 
    imageUrl, 
    {
      width: 800,
      height: 500,
      caption: 'Students learning new choreography at Studio E'
    }
  );
  return markdown;
  // Output: !![Dance class in session](https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Blog/your-image-name.jpg|width=800,height=500,caption=Students learning new choreography at Studio E)
};

// Example 2: Image without caption
const example2 = () => {
  const imageUrl = getSupabaseStorageUrl('assetsv1', 'Blog/another-image.jpg');
  const markdown = generateImageMarkdown(
    'Dance performance', 
    imageUrl, 
    {
      width: 600,
      height: 400
    }
  );
  return markdown;
  // Output: !![Dance performance](https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Blog/another-image.jpg|width=600,height=400)
};

// Example 3: Using a full URL directly (if you're not using Supabase storage)
const example3 = () => {
  const markdown = generateImageMarkdown(
    'External dance image', 
    'https://example.com/images/dance-photo.jpg', 
    {
      width: 800,
      height: 500,
      caption: 'Photo from an external source'
    }
  );
  return markdown;
  // Output: !![External dance image](https://example.com/images/dance-photo.jpg|width=800,height=500,caption=Photo from an external source)
};

/**
 * IMPORTANT: When adding images to your blog post content, make sure:
 * 
 * 1. The image exists in your Supabase bucket
 * 2. The path is correct (case-sensitive)
 * 3. The alt text is descriptive for accessibility
 * 4. The width and height match the image's aspect ratio
 */

// For copying directly into your blog content, use this format:
// !![Alt text](https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Blog/your-image.jpg|width=800,height=500,caption=Your caption text) 