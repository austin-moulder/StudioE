import { supabase } from './supabase';

/**
 * Fetch the main logo URL from Supabase storage
 */
export const getMainLogoUrl = async (): Promise<string> => {
  try {
    // The direct URL to the Studio E logo
    const directLogoUrl = "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Logos/Studio%20E%20Logo%20-%20Main.png";
    return directLogoUrl;
    
    // If we need to fall back to searching and generating the URL dynamically, we can use this code
    /*
    // Try getting from correct bucket and path
    const { data: logoData, error: logoError } = await supabase.storage
      .from('assetsv1')
      .list('Logos');

    if (logoError) {
      console.error('Error listing logos:', logoError.message);
      return directLogoUrl; // Fall back to the direct URL
    }

    // Find the logo file
    const logoFile = logoData.find(file => 
      file.name.toLowerCase().includes('logo') && 
      file.name.toLowerCase().includes('main')
    );

    if (!logoFile) {
      console.error('No main logo file found in storage');
      return directLogoUrl; // Fall back to the direct URL
    }

    // Get the public URL for the logo
    const { data: urlData } = supabase.storage
      .from('assetsv1')
      .getPublicUrl(`Logos/${logoFile.name}`);

    return urlData.publicUrl;
    */
  } catch (error) {
    console.error('Error getting logo URL:', error);
    return '/placeholder-logo.svg'; // Fallback to a placeholder logo
  }
}; 