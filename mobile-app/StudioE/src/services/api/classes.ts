import { supabase } from '../supabase/client';
import { Class, ApiResponse } from '../../types';

// Mobile classes API service
export class ClassesService {
  async getAllClasses(): Promise<ApiResponse<Class[]>> {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          companies!company_id (*)
        `)
        .order('class_date', { ascending: true });

      if (error) {
        console.error('Error fetching classes:', error);
        return { success: false, error: error.message };
      }

      // Map the joined data to match Class interface
      const classes = data?.map((item: any) => ({
        ...item,
        company: item.companies
      })) || [];

      return { success: true, data: classes };
    } catch (error) {
      console.error('Unexpected error fetching classes:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }

  async getClassesByStyle(style: string): Promise<ApiResponse<Class[]>> {
    try {
      const { data, error } = await supabase
        .from('classes')
        .select(`
          *,
          companies!company_id (*)
        `)
        .eq('style', style)
        .order('class_date', { ascending: true });

      if (error) {
        console.error('Error fetching classes by style:', error);
        return { success: false, error: error.message };
      }

      const classes = data?.map((item: any) => ({
        ...item,
        company: item.companies
      })) || [];

      return { success: true, data: classes };
    } catch (error) {
      console.error('Unexpected error fetching classes by style:', error);
      return { success: false, error: 'An unexpected error occurred' };
    }
  }
}

// Export singleton instance
export const classesService = new ClassesService(); 