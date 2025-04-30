import { supabase } from './supabase';

export interface RentalSpace {
  id: number;
  name: string;
  description: string;
  address: string;
  pricePerHour: number;
  capacity: number;
  rating: number;
  availableHours: string;
  isFeatured: boolean;
  isActive?: boolean;
  amenities: string[];
  imageUrl: string; // Primary image
  additionalImages?: string[]; // Other images
}

/**
 * Fetches the featured rental space
 * @returns The featured rental space or null if none exists
 */
export async function getFeaturedRentalSpace(): Promise<RentalSpace | null> {
  try {
    // Get the featured space
    const { data: spaceData, error: spaceError } = await supabase
      .from('rental_spaces')
      .select('*')
      .eq('is_featured', true)
      .eq('is_active', true) // Only get active listings
      .single();

    if (spaceError || !spaceData) {
      console.error('Error fetching featured space:', spaceError);
      return null;
    }

    // Get amenities for the space
    const { data: amenitiesData, error: amenitiesError } = await supabase
      .from('rental_space_amenities')
      .select('amenity')
      .eq('rental_space_id', spaceData.id);

    if (amenitiesError) {
      console.error('Error fetching amenities:', amenitiesError);
      return null;
    }

    // Get photos for the space
    const { data: photosData, error: photosError } = await supabase
      .from('rental_space_photos')
      .select('*')
      .eq('rental_space_id', spaceData.id)
      .order('is_primary', { ascending: false });

    if (photosError) {
      console.error('Error fetching photos:', photosError);
      return null;
    }

    // Get primary image and additional images
    const primaryImage = photosData.find(photo => photo.is_primary)?.photo_url || '';
    const additionalImages = photosData
      .filter(photo => !photo.is_primary)
      .map(photo => photo.photo_url);

    // Format the response
    return {
      id: spaceData.id,
      name: spaceData.name,
      description: spaceData.description,
      address: spaceData.address,
      pricePerHour: spaceData.price_per_hour,
      capacity: spaceData.capacity,
      rating: spaceData.rating,
      availableHours: spaceData.available_hours,
      isFeatured: spaceData.is_featured,
      isActive: spaceData.is_active,
      amenities: amenitiesData.map(item => item.amenity),
      imageUrl: primaryImage,
      additionalImages
    };
  } catch (error) {
    console.error('Exception in getFeaturedRentalSpace:', error);
    return null;
  }
}

/**
 * Fetches all rental spaces
 * @param excludeFeatured Whether to exclude the featured space from the results
 * @returns Array of rental spaces
 */
export async function getAllRentalSpaces(excludeFeatured = false): Promise<RentalSpace[]> {
  try {
    let query = supabase.from('rental_spaces').select('*')
      .eq('is_active', true); // Only get active listings
    
    if (excludeFeatured) {
      query = query.eq('is_featured', false);
    }
    
    const { data: spacesData, error: spacesError } = await query;

    if (spacesError || !spacesData) {
      console.error('Error fetching spaces:', spacesError);
      return [];
    }

    // Create an array to store the fully populated rental spaces
    const rentalSpaces: RentalSpace[] = [];

    // Process each space
    for (const space of spacesData) {
      // Get amenities for the space
      const { data: amenitiesData, error: amenitiesError } = await supabase
        .from('rental_space_amenities')
        .select('amenity')
        .eq('rental_space_id', space.id);

      if (amenitiesError) {
        console.error(`Error fetching amenities for space ${space.id}:`, amenitiesError);
        continue;
      }

      // Get photos for the space
      const { data: photosData, error: photosError } = await supabase
        .from('rental_space_photos')
        .select('*')
        .eq('rental_space_id', space.id)
        .order('is_primary', { ascending: false });

      if (photosError) {
        console.error(`Error fetching photos for space ${space.id}:`, photosError);
        continue;
      }

      // Get primary image and additional images
      const primaryImage = photosData.find(photo => photo.is_primary)?.photo_url || '';
      const additionalImages = photosData
        .filter(photo => !photo.is_primary)
        .map(photo => photo.photo_url);

      // Add the fully populated rental space to our array
      rentalSpaces.push({
        id: space.id,
        name: space.name,
        description: space.description,
        address: space.address,
        pricePerHour: space.price_per_hour,
        capacity: space.capacity,
        rating: space.rating,
        availableHours: space.available_hours,
        isFeatured: space.is_featured,
        isActive: space.is_active,
        amenities: amenitiesData.map(item => item.amenity),
        imageUrl: primaryImage,
        additionalImages
      });
    }

    return rentalSpaces;
  } catch (error) {
    console.error('Exception in getAllRentalSpaces:', error);
    return [];
  }
}

/**
 * Fetches a rental space by its ID
 * @param id The ID of the rental space to fetch
 * @returns The rental space or null if not found
 */
export async function getRentalSpaceById(id: number): Promise<RentalSpace | null> {
  try {
    // Get the space
    const { data: spaceData, error: spaceError } = await supabase
      .from('rental_spaces')
      .select('*')
      .eq('id', id)
      .single();

    if (spaceError || !spaceData) {
      console.error(`Error fetching space with ID ${id}:`, spaceError);
      return null;
    }

    // Get amenities for the space
    const { data: amenitiesData, error: amenitiesError } = await supabase
      .from('rental_space_amenities')
      .select('amenity')
      .eq('rental_space_id', id);

    if (amenitiesError) {
      console.error(`Error fetching amenities for space ${id}:`, amenitiesError);
      return null;
    }

    // Get photos for the space
    const { data: photosData, error: photosError } = await supabase
      .from('rental_space_photos')
      .select('*')
      .eq('rental_space_id', id)
      .order('is_primary', { ascending: false });

    if (photosError) {
      console.error(`Error fetching photos for space ${id}:`, photosError);
      return null;
    }

    // Get primary image and additional images
    const primaryImage = photosData.find(photo => photo.is_primary)?.photo_url || '';
    const additionalImages = photosData
      .filter(photo => !photo.is_primary)
      .map(photo => photo.photo_url);

    // Format the response
    return {
      id: spaceData.id,
      name: spaceData.name,
      description: spaceData.description,
      address: spaceData.address,
      pricePerHour: spaceData.price_per_hour,
      capacity: spaceData.capacity,
      rating: spaceData.rating,
      availableHours: spaceData.available_hours,
      isFeatured: spaceData.is_featured,
      isActive: spaceData.is_active,
      amenities: amenitiesData.map(item => item.amenity),
      imageUrl: primaryImage,
      additionalImages
    };
  } catch (error) {
    console.error(`Exception in getRentalSpaceById for ID ${id}:`, error);
    return null;
  }
} 