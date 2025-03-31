import { supabase } from '@/lib/supabase/supabase';

export async function getDanceStyleImages(): Promise<Record<string, string>> {
  try {
    const { data, error } = await supabase
      .storage
      .from('assetsv1')
      .list('Dance_Styles');

    if (error) {
      console.error('Error fetching dance style images:', error);
      return {};
    }

    // Transform the data into a more usable format
    const imageMap = data
      .filter(file => !file.id.endsWith('/') && file.name.endsWith('.jpg') || file.name.endsWith('.png') || file.name.endsWith('.jpeg'))
      .reduce((acc, file) => {
        // Extract the dance style name from the filename
        // Assuming filenames are like "Salsa.jpg", "Bachata.jpg", etc.
        const styleName = file.name.split('.')[0];
        
        // Create the public URL
        const url = supabase
          .storage
          .from('assetsv1')
          .getPublicUrl(`Dance_Styles/${file.name}`).data.publicUrl;
        
        acc[styleName.toLowerCase()] = url;
        return acc;
      }, {} as Record<string, string>);
    
    return imageMap;
  } catch (error) {
    console.error('Error in getDanceStyleImages:', error);
    return {};
  }
} 