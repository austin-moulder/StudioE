-- Create the testimonials table
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  quote TEXT NOT NULL,
  style VARCHAR(255),
  role VARCHAR(255),
  image_url VARCHAR(255),
  rating INTEGER DEFAULT 5,
  featured BOOLEAN DEFAULT false,
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_testimonials_featured ON testimonials(featured);

-- Insert testimonials from Home page
INSERT INTO testimonials (name, quote, style, image_url, featured)
VALUES
  (
    'Sara Clark',
    'Austin is above and beyond! He is an amazing dancer and instructor! Such a FUN and positive experience. He is lovely, happy and very inspiring!',
    'Zumba',
    'https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Testimonials/Sara_Clark.jpeg',
    true
  ),
  (
    'Brianna Hook',
    'They broke down the steps so clearly and answered every question patiently. I left feeling confident, for the first time, that I could implement the basics in leading on the dance floor!',
    'Bachata',
    'https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Testimonials/Briana_Hall.jpeg',
    true
  ),
  (
    'Brandon Hampton',
    'Austin is a creative entrepreneur at his core because he utilizes both out-of-the-box and practical methods for teaching, so that everyone regardless of their learning preference will fully grasp the lesson.',
    'Latin Dance',
    'https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Testimonials/Brandon_Hampton.png',
    true
  );

-- Insert additional testimonials from About page
INSERT INTO testimonials (name, quote, image_url)
VALUES
  (
    'Laurencia O.',
    'Austin is very passionate about Bachata and his enthusiasm is a great motivator in the class. He is very thorough with his lessons and patient with his students! I had a great time in Core 1 Bachata. Austin is very kind and encouraging. I learned a lot of tips and tricks over the 4 weeks and I can''t wait to learn more!',
    '/placeholder.svg'
  ),
  (
    'Becca Yang',
    'Austin & Noushin are a dynamic duo that make an amazing team as instructors. Between teaching and taking workshops and hosting the evening socials, they never once complained about being tired. We appreciate the safe space for asking hard questions and facilitating important conversations within the dance scene and culture. Thank you so much for all the behind-the-scenes blood, sweat and tears to make this event come together!',
    '/placeholder.svg'
  );

-- Insert testimonials from Business Consulting page
INSERT INTO testimonials (name, quote, role)
VALUES
  (
    'Mitzi H.',
    'They have far exceeded any expectation for quantity and quality of solutions to solve the main set of problems our small business is facing. I am overjoyed, hopeful, inspired, refreshed, enthusiastic, and beyond excited.',
    'Small Business Owner'
  ),
  (
    'Rittwik R.',
    'Studio E experts are able to drive really strong participation in the sessions. This speaks a lot about their teaching style and how practically helpful the concepts taught are. I would highly recommend this masterclass series.',
    'Product Manager'
  ),
  (
    'Watunyu S.',
    'Austin''s direct and engaging teaching style made complex ideas easy to grasp. The course''s real-world applications and personalized feedback significantly boosted my skills and confidence. A game-changer for anyone looking to excel.',
    'Head of Technology'
  ),
  (
    'Anthony K.',
    'There are some knowledge that one can only access from experts who have been through the process. If I would have tried navigating this journey alone, I would be have been lost and frustrated. These sessions provide much value than can be quantified.',
    'Real Estate Development Finance Manager'
  );

-- Add the extended quotes from the About page for those testimonials that already exist
UPDATE testimonials 
SET quote = 'Austin is above and beyond! He is an amazing dancer and instructor! Such a FUN and positive experience, you get exercise and he also helps teach us different style of music, which keeps it so interesting, and also some spanish, and just general fun dance moves!! He is lovely, happy and very inspiring, always smiling and his class is very special and excellent!'
WHERE name = 'Sara Clark';

UPDATE testimonials 
SET quote = 'I have been wanting to learn to lead for a long time, but I don''t get the chance to take dance classes very often. As a single parent, it''s also hard to carve out the time to travel to dance, but I am SO glad I set aside this weekend and had the opportunity to take classes with Austin! They broke down the steps so clearly and answered every question patiently with as much repetition as we needed. I left feeling confident, for the first time, that I could implement the basics in leading on the dance floor!'
WHERE name = 'Brianna Hook';

UPDATE testimonials 
SET quote = 'Detailed, Fundamentals-Driven, Accessible to All, Inclusive, Passionate, Fun! Austin is a creative entrepreneur at his core because he utilizes both out-of-the-box and practical methods for teaching, so that everyone regardless of their learning preference will fully grasp the lesson. He has simplified an approach to Latin Dance that any level can utilize to improve their skills.'
WHERE name = 'Brandon Hampton'; 