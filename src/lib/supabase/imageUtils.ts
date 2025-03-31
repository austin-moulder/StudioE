import { supabase } from '@/lib/supabase/supabase';

export async function getDanceStyleImages(): Promise<Record<string, string>> {
  // Return hardcoded image URLs directly from Supabase
  return {
    salsa: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Salsa_1.jpg",
    bachata: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Bachata_1.jpg",
    heels: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Heels_1.jpg",
    choreo: "https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Dance_Styles/Choreo_1.jpg"
  };
} 