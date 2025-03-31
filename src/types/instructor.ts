export interface Instructor {
  name: string;
  style: string;
  location: string;
  rating: number;
  reviews: number;
  alias: string;
  image: string;
  featured?: boolean;
  price: {
    lower: number;
    upper: number;
  };
} 