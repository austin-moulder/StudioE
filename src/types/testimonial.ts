export interface Testimonial {
  id: number;
  name: string;
  quote: string;
  style?: string;
  role?: string;
  image_url?: string;
  rating?: number;
  featured: boolean;
  location?: string;
  type?: string;
  created_at: string;
  updated_at: string;
} 