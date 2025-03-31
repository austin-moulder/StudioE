import { supabase } from './supabase';

/**
 * Fetch the main logo URL from Supabase storage
 */
export const getMainLogoUrl = async (): Promise<string> => {
  try {
    // First attempt to get from logos/main directory
    try {
      const { data, error } = await supabase.storage
        .from('logos')
        .list('main');

      if (!error && data.length > 0) {
        // Find the logo file (assuming it's named logo.png, logo.jpg, or similar)
        const logoFile = data.find(file => 
          file.name.toLowerCase().includes('logo') && 
          !file.name.toLowerCase().includes('favicon')
        );

        if (logoFile) {
          // Get the public URL for the logo
          const { data: urlData } = supabase.storage
            .from('logos')
            .getPublicUrl(`main/${logoFile.name}`);

          return urlData.publicUrl;
        }
      }
    } catch (dirError) {
      console.error('Error with main directory:', dirError);
      // Continue to next approach
    }

    // Try getting from root of logos bucket
    const { data: rootData, error: rootError } = await supabase.storage
      .from('logos')
      .list();

    if (rootError) {
      console.error('Error listing root logos:', rootError.message);
      throw rootError;
    }

    // Find the logo file in the root
    const logoFile = rootData.find(file => 
      file.name.toLowerCase().includes('logo') && 
      !file.name.toLowerCase().includes('favicon')
    );

    if (!logoFile) {
      console.error('No logo file found in logos storage');
      return '/placeholder-logo.svg'; // Fallback to a default logo
    }

    // Get the public URL for the logo
    const { data: urlData } = supabase.storage
      .from('logos')
      .getPublicUrl(logoFile.name);

    return urlData.publicUrl;
  } catch (error) {
    console.error('Error getting logo URL:', error);
    return '/placeholder-logo.svg'; // Fallback to a default logo
  }
}; 