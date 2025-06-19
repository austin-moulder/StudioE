import { supabase } from './supabase';

export interface SavedInstructor {
  id: string;
  user_id: string;
  instructor_id: string;
  created_at: string;
  instructor?: {
    id: string;
    name: string;
    image_url: string;
    location: string;
    rating: number;
    reviews_count: number;
    style: string;
    price_lower: number;
    price_upper: number;
  };
}

/**
 * Check if user has saved a specific instructor
 */
export async function isInstructorSaved(userId: string, instructorId: string): Promise<boolean> {
  try {
    // Ensure instructor_id is treated as string
    const instructorIdString = instructorId.toString();
    
    const { data, error } = await supabase
      .from('saved_instructors')
      .select('id')
      .eq('user_id', userId)
      .eq('instructor_id', instructorIdString)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      console.error('Error checking if instructor is saved:', error);
      return false;
    }

    return !!data;
  } catch (error) {
    console.error('Exception checking if instructor is saved:', error);
    return false;
  }
}

/**
 * Save an instructor for a user
 */
export async function saveInstructor(userId: string, instructorId: string): Promise<boolean> {
  try {
    // Ensure instructor_id is stored as string
    const instructorIdString = instructorId.toString();
    
    const { error } = await supabase
      .from('saved_instructors')
      .insert({
        user_id: userId,
        instructor_id: instructorIdString
      });

    if (error) {
      console.error('Error saving instructor:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Exception saving instructor:', error);
    return false;
  }
}

/**
 * Remove a saved instructor for a user
 */
export async function unsaveInstructor(userId: string, instructorId: string): Promise<boolean> {
  try {
    // Ensure instructor_id is treated as string
    const instructorIdString = instructorId.toString();
    
    const { error } = await supabase
      .from('saved_instructors')
      .delete()
      .eq('user_id', userId)
      .eq('instructor_id', instructorIdString);

    if (error) {
      console.error('Error unsaving instructor:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Exception unsaving instructor:', error);
    return false;
  }
}

/**
 * Get all saved instructors for a user
 */
export async function getSavedInstructors(userId: string): Promise<SavedInstructor[]> {
  try {
    // First, get the saved instructor records
    const { data: savedData, error: savedError } = await supabase
      .from('saved_instructors')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (savedError) {
      // If table doesn't exist, return empty array instead of throwing
      if (savedError.code === '42P01') { // Table does not exist
        console.warn('saved_instructors table does not exist. Please run the database setup script.');
        return [];
      }
      console.error('Error fetching saved instructors:', savedError);
      return [];
    }

    if (!savedData || savedData.length === 0) {
      return [];
    }

    // Get all instructor IDs
    const instructorIds = savedData.map(saved => saved.instructor_id);

    // Fetch instructor details for all saved instructors
    const { data: instructorsData, error: instructorsError } = await supabase
      .from('instructors')
      .select(`
        id,
        name,
        image_url,
        location,
        rating,
        reviews_count,
        style,
        price_lower,
        price_upper
      `)
      .in('id', instructorIds);

    if (instructorsError) {
      console.error('Error fetching instructor details:', instructorsError);
      // Return saved data without instructor details
      return savedData.map(saved => ({
        ...saved,
        instructor: undefined
      }));
    }

    // Combine saved data with instructor details
    const result = savedData.map(saved => {
      // Handle both string and number ID formats
      const instructor = instructorsData?.find(inst => 
        inst.id == saved.instructor_id || // Loose equality to handle string/number conversion
        inst.id.toString() === saved.instructor_id.toString()
      );
      
      return {
        ...saved,
        instructor: instructor ? {
          id: instructor.id,
          name: instructor.name,
          image_url: instructor.image_url,
          location: instructor.location,
          rating: instructor.rating || 0,
          reviews_count: instructor.reviews_count || 0,
          style: instructor.style,
          price_lower: instructor.price_lower || 0,
          price_upper: instructor.price_upper || 0
        } : undefined
      };
    });

    return result;
  } catch (error) {
    console.error('Exception fetching saved instructors:', error);
    return [];
  }
}

/**
 * Toggle save status for an instructor
 */
export async function toggleSaveInstructor(userId: string, instructorId: string): Promise<boolean> {
  try {
    const isSaved = await isInstructorSaved(userId, instructorId);
    
    if (isSaved) {
      return await unsaveInstructor(userId, instructorId);
    } else {
      return await saveInstructor(userId, instructorId);
    }
  } catch (error) {
    console.error('Exception toggling save instructor:', error);
    return false;
  }
} 