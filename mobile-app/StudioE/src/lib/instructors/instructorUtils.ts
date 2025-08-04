import { Instructor } from "../../types/instructor";
import { supabase } from '../supabase/client';

/**
 * Gets all unique dance styles from the instructors list
 */
export async function getUniqueDanceStyles(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .select('style')
      .eq('active', true);
    
    if (error) {
      console.error('Error fetching instructor styles:', error);
      return [];
    }

    const stylesSet = new Set<string>();
    
    data?.forEach(instructor => {
      // Split styles by comma or ampersand and trim whitespace
      const styles = instructor.style.split(/[,&]/).map((style: string) => style.trim());
      styles.forEach((style: string) => stylesSet.add(style));
    });
    
    return Array.from(stylesSet).sort();
  } catch (error) {
    console.error('Exception fetching instructor styles:', error);
    return [];
  }
}

/**
 * Returns the count of instructors rounded down to the nearest 10
 */
export async function getInstructorCount(): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('instructors')
      .select('*', { count: 'exact', head: true })
      .eq('active', true);
    
    if (error) {
      console.error('Error counting instructors:', error);
      return 0;
    }

    // Round down to the nearest 10
    return Math.floor((count || 0) / 10) * 10;
  } catch (error) {
    console.error('Exception counting instructors:', error);
    return 0;
  }
}

/**
 * Get all instructors with optional filtering by style
 */
export async function getAllInstructors(styleFilter?: string): Promise<Instructor[]> {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .select(`
        *,
        instructor_profiles(total_students)
      `)
      .eq('active', true);
    
    if (error) {
      console.error('Error fetching instructors:', error);
      return [];
    }

    // Transform the data to match our Instructor type
    let instructors = (data || []).map(instructor => ({
      id: instructor.id,
      name: instructor.name,
      bio: instructor.bio,
      imageUrl: instructor.image_url,
      danceStyles: instructor.style.split(/[,&]/).map((style: string) => style.trim()),
      featured: instructor.is_featured,
      location: instructor.location,
      rating: instructor.rating || 0,
      reviews: instructor.reviews || 0,
      totalStudents: instructor.instructor_profiles?.total_students || 0,
      instructor_profiles: instructor.instructor_profiles,
      price: {
        lower: instructor.price_lower || 0,
        upper: instructor.price_upper || 0
      }
    }));

    // Filter by style if provided
    if (styleFilter) {
      const stylePattern = new RegExp(styleFilter, 'i');
      instructors = instructors.filter(instructor => 
        instructor.danceStyles.some((style: string) => stylePattern.test(style))
      );
    }
    
    // Sort to prioritize featured instructors and those with profiles
    return instructors.sort((a, b) => {
      // Prioritize featured instructors
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then prioritize instructors with profiles
      const aHasProfile = a.instructor_profiles !== null && a.instructor_profiles !== undefined;
      const bHasProfile = b.instructor_profiles !== null && b.instructor_profiles !== undefined;
      
      if (aHasProfile && !bHasProfile) return -1;
      if (!aHasProfile && bHasProfile) return 1;
      
      // Finally sort by rating
      return b.rating - a.rating;
    });
  } catch (error) {
    console.error('Exception fetching instructors:', error);
    return [];
  }
}

/**
 * Get featured instructors
 */
export async function getFeaturedInstructors(limit = 3): Promise<Instructor[]> {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .select(`
        *,
        instructor_profiles(total_students)
      `)
      .eq('is_featured', true)
      .eq('active', true)
      .limit(limit);
    
    if (error) {
      console.error('Error fetching featured instructors:', error);
      return [];
    }

    // Transform the data to match our Instructor type
    const instructors = (data || []).map(instructor => ({
      id: instructor.id,
      name: instructor.name,
      bio: instructor.bio,
      imageUrl: instructor.image_url,
      danceStyles: instructor.style.split(/[,&]/).map((style: string) => style.trim()),
      featured: instructor.is_featured,
      location: instructor.location,
      rating: instructor.rating || 0,
      reviews: instructor.reviews || 0,
      totalStudents: instructor.instructor_profiles?.total_students || 0,
      instructor_profiles: instructor.instructor_profiles,
      price: {
        lower: instructor.price_lower || 0,
        upper: instructor.price_upper || 0
      }
    }));
    
    // Sort to prioritize instructors with profiles
    return instructors.sort((a, b) => {
      // Prioritize instructors with profiles
      const aHasProfile = a.instructor_profiles !== null && a.instructor_profiles !== undefined;
      const bHasProfile = b.instructor_profiles !== null && b.instructor_profiles !== undefined;
      
      if (aHasProfile && !bHasProfile) return -1;
      if (!aHasProfile && bHasProfile) return 1;
      
      // If both have same profile status, sort by rating
      return b.rating - a.rating;
    });
  } catch (error) {
    console.error('Exception fetching featured instructors:', error);
    return [];
  }
}

/**
 * Get the count of instructors for a specific dance style
 */
export async function getInstructorCountByStyle(style: string): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .select('*')
      .eq('active', true);
    
    if (error) {
      console.error(`Error fetching instructors for style ${style}:`, error);
      return 0;
    }

    // Filter instructors whose style includes the requested style (case insensitive)
    const stylePattern = new RegExp(style, 'i');
    const matchingInstructors = data.filter(instructor => 
      stylePattern.test(instructor.style)
    );
    
    return matchingInstructors.length;
  } catch (error) {
    console.error(`Exception counting instructors for style ${style}:`, error);
    return 0;
  }
} 