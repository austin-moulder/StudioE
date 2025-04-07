-- Create the blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  featured_image TEXT,
  category TEXT NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  author_name TEXT NOT NULL,
  author_image TEXT
);

-- Create the blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  icon TEXT,
  post_count INTEGER DEFAULT 0
);

-- Insert some sample categories
INSERT INTO blog_categories (name, icon, post_count) VALUES
  ('Tips & Techniques', '💡', 24),
  ('Dance History', '📚', 18),
  ('Instructor Spotlights', '🌟', 15),
  ('Health & Wellness', '🧘', 12),
  ('Event Recaps', '🎭', 20),
  ('Student Stories', '👥', 16);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, category, published, author_name) VALUES
  (
    '10 Tips for Beginner Ballet Dancers',
    'beginner-ballet-tips',
    'Full content for the article will go here. This is a placeholder for the full content of the article.',
    'Starting ballet as an adult can be intimidating. Here are some tips to help you get started on the right foot.',
    'Tips & Techniques',
    TRUE,
    'Elena Rodriguez'
  ),
  (
    'The History and Evolution of Hip Hop Dance',
    'history-of-hip-hop-dance',
    'Full content for the article will go here. This is a placeholder for the full content of the article.',
    'Explore the rich cultural history of hip hop dance, from its origins in the Bronx to its global influence today.',
    'Dance History',
    TRUE,
    'Marcus Johnson'
  ),
  (
    'Preparing for Your First Dance Competition',
    'first-dance-competition-prep',
    'Full content for the article will go here. This is a placeholder for the full content of the article.',
    'Competition day can be nerve-wracking. Here''s how to prepare mentally and physically for your first dance competition.',
    'Tips & Techniques',
    TRUE,
    'Sofia Chen'
  ),
  (
    'How to Choose the Right Dance Shoes',
    'choosing-dance-shoes',
    'Full content for the article will go here. This is a placeholder for the full content of the article.',
    'Different dance styles require different footwear. Learn how to select the perfect shoes for your dance practice.',
    'Tips & Techniques',
    TRUE,
    'James Wilson'
  ),
  (
    'Instructor Spotlight: Maria Chen''s Journey',
    'instructor-spotlight-maria-chen',
    'Full content for the article will go here. This is a placeholder for the full content of the article.',
    'From taking her first dance class at age 5 to becoming one of our most sought-after instructors, Maria''s story inspires.',
    'Instructor Spotlights',
    TRUE,
    'Editorial Team'
  ),
  (
    'The Mental Health Benefits of Regular Dancing',
    'mental-health-benefits-dancing',
    'Full content for the article will go here. This is a placeholder for the full content of the article.',
    'Beyond physical fitness, dancing offers significant mental health benefits including stress reduction and improved cognitive function.',
    'Health & Wellness',
    TRUE,
    'Dr. Alicia Santos'
  );

-- Create RLS policies
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read published blog posts
CREATE POLICY "Allow public read access to published blog posts" 
ON blog_posts FOR SELECT 
USING (published = true);

-- Allow anyone to read blog categories
CREATE POLICY "Allow public read access to blog categories" 
ON blog_categories FOR SELECT 
USING (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS blog_posts_slug_idx ON blog_posts (slug);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON blog_posts (category);
CREATE INDEX IF NOT EXISTS blog_posts_published_idx ON blog_posts (published);
CREATE INDEX IF NOT EXISTS blog_categories_name_idx ON blog_categories (name); 