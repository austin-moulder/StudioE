import { Instructor } from "@/types/instructor";
import { supabase } from '@/lib/supabase/supabase';

/**
 * Gets all unique dance styles from the instructors list
 */
export async function getUniqueDanceStyles(): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('instructors')
      .select('style');
    
    if (error) {
      console.error('Error fetching instructor styles:', error);
      return [];
    }

    const stylesSet = new Set<string>();
    
    data?.forEach(instructor => {
      // Split styles by comma or ampersand and trim whitespace
      const styles = instructor.style.split(/[,&]/).map(style => style.trim());
      styles.forEach(style => stylesSet.add(style));
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
      .select('*', { count: 'exact', head: true });
    
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
 * Returns the count of unique dance styles rounded down to the nearest 10
 */
export async function getDanceStyleCount(): Promise<number> {
  try {
    const styles = await getUniqueDanceStyles();
    // Round down to the nearest 10
    return Math.floor(styles.length / 10) * 10;
  } catch (error) {
    console.error('Exception counting dance styles:', error);
    return 0;
  }
} 