export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featured_image: string;
  category: string;
  published: boolean;
  created_at: string;
  author_name: string;
  author_image?: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  icon?: string;
  post_count: number;
} 