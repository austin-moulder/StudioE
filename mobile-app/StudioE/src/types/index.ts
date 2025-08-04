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

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

// Mobile-specific types
export interface MobileNavigationProps {
  navigation: any;
  route: any;
}

export interface TabIconProps {
  focused: boolean;
  color: string;
  size: number;
} 