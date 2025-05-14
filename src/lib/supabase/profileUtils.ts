import { supabase } from './supabase';
import { User } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';

export interface ProfileData {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  profile_image_url: string | null;
  created_at?: string;
  updated_at?: string;
}

/**
 * Fetch a user's profile data from the user_profiles table
 */
export async function fetchUserProfile(userId: string): Promise<ProfileData | null> {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Exception fetching user profile:', error);
    return null;
  }
}

/**
 * Update a user's profile in both user metadata and the profiles table
 */
export async function updateUserProfile(
  userId: string, 
  profileData: Partial<ProfileData>
) {
  try {
    // First update the user metadata (this will trigger our sync trigger)
    const { error: authError } = await supabase.auth.updateUser({
      data: {
        full_name: profileData.full_name,
        phone: profileData.phone,
        address: profileData.address,
        bio: profileData.bio,
      }
    });

    if (authError) {
      throw authError;
    }

    // Then update the profiles table with any additional fields
    const { error: profileError } = await supabase
      .from('user_profiles')
      .update({
        phone: profileData.phone,
        address: profileData.address,
        bio: profileData.bio,
        profile_image_url: profileData.profile_image_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (profileError) {
      throw profileError;
    }

    return true;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
}

/**
 * Upload a profile image to Supabase storage
 */
export async function uploadProfileImage(
  userId: string,
  file: File
): Promise<string | null> {
  try {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.');
    }

    // Validate file size (5MB max)
    const maxSizeInBytes = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSizeInBytes) {
      throw new Error('File size exceeds 5MB limit.');
    }

    // Generate a unique file name to avoid collisions
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${uuidv4()}.${fileExt}`;
    const filePath = `${fileName}`;

    // Upload the file to the profile_images bucket
    const { error: uploadError } = await supabase.storage
      .from('profile_images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL for the uploaded image
    const { data } = supabase.storage
      .from('profile_images')
      .getPublicUrl(filePath);

    // Update the user's profile with the new image URL
    await updateUserProfile(userId, {
      profile_image_url: data.publicUrl
    });

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading profile image:', error);
    throw error;
  }
}

/**
 * Delete a user's profile image from storage
 */
export async function deleteProfileImage(userId: string, imageUrl: string): Promise<boolean> {
  try {
    // Extract file path from the URL
    const storageUrl = supabase.storage.from('profile_images').getPublicUrl('').data.publicUrl;
    const filePath = imageUrl.replace(storageUrl, '');
    
    // Delete the file from storage
    const { error: deleteError } = await supabase.storage
      .from('profile_images')
      .remove([filePath]);

    if (deleteError) {
      throw deleteError;
    }

    // Update the user's profile to remove the image URL
    await updateUserProfile(userId, {
      profile_image_url: null
    });

    return true;
  } catch (error) {
    console.error('Error deleting profile image:', error);
    throw error;
  }
}

/**
 * Create a new profile for a user
 * (This is normally handled by the database trigger, but can be used as a backup)
 */
export async function createUserProfile(
  user: User,
  profileData?: Partial<ProfileData>
): Promise<ProfileData | null> {
  try {
    const newProfile = {
      id: user.id,
      full_name: user.user_metadata?.full_name || '',
      email: user.email || '',
      phone: profileData?.phone || user.user_metadata?.phone || '',
      address: profileData?.address || user.user_metadata?.address || '',
      bio: profileData?.bio || user.user_metadata?.bio || '',
      profile_image_url: profileData?.profile_image_url || null
    };

    const { data, error } = await supabase
      .from('user_profiles')
      .insert([newProfile])
      .select()
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error creating user profile:', error);
    return null;
  }
} 