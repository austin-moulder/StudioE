// Shared types between web and mobile apps

// User types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  user_metadata?: any;
}

// Instructor types
export interface Instructor {
  id: string;
  name: string;
  bio: string;
  imageUrl: string;
  danceStyles: string[];
  featured: boolean;
  location: string;
  rating: number;
  reviews: number;
  totalStudents: number;
  instructor_profiles?: any;
  price: {
    lower: number;
    upper: number;
  };
}

// Event types
export interface Event {
  id: string;
  title: string;
  description?: string;
  start_datetime: string;
  image_url?: string;
  location?: string;
}

// Class types
export interface Class {
  id: string;
  title: string;
  description?: string;
  class_date: string;
  instructor_id?: string;
  style?: string;
  company_id?: string;
  company?: Company;
}

export interface Company {
  id: string;
  name: string;
  logo_url?: string;
}

// Dashboard types
export interface DashboardStats {
  upcomingEvents: number;
  upcomingClasses: number;
  pastEvents: number;
  pastClasses: number;
  reviewsGiven: number;
}

// Review types
export interface Review {
  id: number;
  rating: number;
  review_text: string;
  event_title: string;
  created_at: string;
}

// Testimonial types
export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  style: string;
  type?: string;
  rating?: number;
  image_url?: string;
  featured: boolean;
  created_at: string;
}

// Blog types
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  featured_image: string;
  slug: string;
  category: string;
  created_at: string;
  content: string;
  published: boolean;
  author_name: string;
  author_image: string;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Navigation types for mobile
export interface NavigationParams {
  Home: undefined;
  Events: undefined;
  Classes: undefined;
  Instructors: undefined;
  Profile: undefined;
  Login: undefined;
} 