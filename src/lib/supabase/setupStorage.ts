import { supabase } from './supabase';

/**
 * Ensures the necessary storage buckets exist and have the correct permissions
 */
export const setupStorageBuckets = async () => {
  try {
    // Check if the events bucket exists
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('Error listing buckets:', error);
      throw error;
    }
    
    // Check if events bucket exists
    const eventsBucket = buckets?.find(bucket => bucket.name === 'events');
    
    // Create the events bucket if it doesn't exist
    if (!eventsBucket) {
      console.log('Creating events storage bucket...');
      const { error: createError } = await supabase.storage.createBucket('events', {
        public: true, // Make files publicly accessible
        fileSizeLimit: 5 * 1024 * 1024, // 5MB limit
      });
      
      if (createError) {
        console.error('Error creating events bucket:', createError);
        throw createError;
      }
      
      console.log('Events bucket created successfully');
    } else {
      console.log('Events bucket already exists');
      
      // Update bucket to ensure it's public
      const { error: updateError } = await supabase.storage.updateBucket('events', {
        public: true,
        fileSizeLimit: 5 * 1024 * 1024, // 5MB limit
      });
      
      if (updateError) {
        console.error('Error updating events bucket:', updateError);
      }
    }
    
    // Check if rental_spaces bucket exists
    const rentalSpacesBucket = buckets?.find(bucket => bucket.name === 'rental_spaces');
    
    // Create the rental_spaces bucket if it doesn't exist
    if (!rentalSpacesBucket) {
      console.log('Creating rental_spaces storage bucket...');
      const { error: createError } = await supabase.storage.createBucket('rental_spaces', {
        public: true, // Make files publicly accessible
        fileSizeLimit: 5 * 1024 * 1024, // 5MB limit
      });
      
      if (createError) {
        console.error('Error creating rental_spaces bucket:', createError);
        throw createError;
      }
      
      console.log('Rental spaces bucket created successfully');
    } else {
      console.log('Rental spaces bucket already exists');
      
      // Update bucket to ensure it's public
      const { error: updateError } = await supabase.storage.updateBucket('rental_spaces', {
        public: true,
        fileSizeLimit: 5 * 1024 * 1024, // 5MB limit
      });
      
      if (updateError) {
        console.error('Error updating rental_spaces bucket:', updateError);
      }
    }
    
    return true;
  } catch (error) {
    console.error('Error setting up storage buckets:', error);
    return false;
  }
};

export default setupStorageBuckets; 