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

    // Filter for image files only
    const imageFiles = data
      .filter(file => !file.id.endsWith('/') && (file.name.endsWith('.jpg') || file.name.endsWith('.png') || file.name.endsWith('.jpeg')))
      .sort((a, b) => {
        // Sort by updated_at in descending order (most recent first)
        const aTime = a.updated_at || '';
        const bTime = b.updated_at || '';
        return new Date(bTime).getTime() - new Date(aTime).getTime();
      });

    // Map of dance styles to search for
    const styleMap: Record<string, string> = {};
    const targetStyles = ['salsa', 'bachata', 'heels', 'choreo'];

    // Find the most recent image for each style
    for (const style of targetStyles) {
      const matchingImage = imageFiles.find(file => 
        file.name.toLowerCase().includes(style.toLowerCase())
      );
      
      if (matchingImage) {
        const url = supabase
          .storage
          .from('assetsv1')
          .getPublicUrl(`Dance_Styles/${matchingImage.name}`).data.publicUrl;
        
        styleMap[style] = url;
      }
    }
    
    return styleMap;
  } catch (error) {
    console.error('Error in getDanceStyleImages:', error);
    return {};
  }
} 