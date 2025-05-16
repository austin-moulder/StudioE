import { supabase } from '@/lib/supabase/supabase';
import { UserProfile } from '@/types/user-profile';
import { v4 as uuidv4 } from 'uuid';

/**
 * Get extended profile for a user
 * @param userId User ID from auth
 */
export async function getUserExtendedProfile(userId: string): Promise<UserProfile | null> {
  try {
    const { data, error } = await supabase
      .from('user_extended_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user extended profile:', error);
      return null;
    }
    
    return data;
  } catch (error) {
    console.error('Exception fetching user extended profile:', error);
    return null;
  }
}

/**
 * Create or update a user's extended profile
 * @param profile The profile data to save
 */
export async function saveUserExtendedProfile(profile: Partial<UserProfile>): Promise<UserProfile | null> {
  try {
    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('user_extended_profiles')
      .select('id')
      .eq('user_id', profile.user_id!)
      .single();
    
    let result;
    
    if (existingProfile) {
      // Update existing profile
      const { data, error } = await supabase
        .from('user_extended_profiles')
        .update(profile)
        .eq('id', existingProfile.id)
        .select()
        .single();
      
      if (error) throw error;
      result = data;
    } else {
      // Create new profile
      const { data, error } = await supabase
        .from('user_extended_profiles')
        .insert(profile)
        .select()
        .single();
      
      if (error) throw error;
      result = data;
    }
    
    return result;
  } catch (error) {
    console.error('Exception saving user extended profile:', error);
    return null;
  }
}

/**
 * Upload a profile image to Supabase Storage
 * @param userId User ID
 * @param file Image file to upload
 */
export async function uploadProfileImage(userId: string, file: File): Promise<string | null> {
  try {
    // Create a unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${uuidv4()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;
    
    // Upload the file
    const { data, error } = await supabase
      .storage
      .from('profile_images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) throw error;
    
    // Get the public URL
    const { data: publicUrlData } = supabase
      .storage
      .from('profile_images')
      .getPublicUrl(data?.path || '');
    
    return publicUrlData.publicUrl;
  } catch (error) {
    console.error('Exception uploading profile image:', error);
    return null;
  }
} 