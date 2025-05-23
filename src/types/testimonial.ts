export interface Testimonial {
  id: string;
  name: string;
  quote: string;
  style: string;
  type?: string;
  role?: string;
  rating?: number;
  image_url?: string;
  featured: boolean;
  created_at: string;
} 