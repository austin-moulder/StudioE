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
  price: {
    lower: number;
    upper: number;
  };
} 