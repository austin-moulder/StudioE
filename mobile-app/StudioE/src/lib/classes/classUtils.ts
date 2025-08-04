import { Class, Company } from "../../types/class";
import { supabase } from '../supabase/client';

/**
 * Get all classes with their company information
 */
export async function getAllClasses(): Promise<Class[]> {
  try {
    console.log('Fetching classes from Supabase...');
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        companies!company_id (*)
      `)
      .order('class_date', { ascending: true });

    if (error) {
      console.error('Error fetching classes:', error);
      return [];
    }

    console.log('Raw data from Supabase:', data?.length || 0, 'records');

    // Further sort by date and start time for more precise ordering
    const sortedData = data?.sort((a, b) => {
      // First sort by date
      const dateA = new Date(a.class_date);
      const dateB = new Date(b.class_date);
      
      const dateDiff = dateA.getTime() - dateB.getTime();
      if (dateDiff !== 0) return dateDiff;
      
      // If same date, sort by start time
      const [hoursA, minutesA] = a.start_time.split(':').map(Number);
      const [hoursB, minutesB] = b.start_time.split(':').map(Number);
      
      // Compare hours first
      if (hoursA !== hoursB) return hoursA - hoursB;
      
      // If hours are the same, compare minutes
      return minutesA - minutesB;
    }) || [];

    // Map the joined data to match our interface
    const mappedData = sortedData.map(item => ({
      ...item,
      company: item.companies
    }));

    console.log('Final mapped data:', mappedData.length, 'classes');
    return mappedData;
  } catch (error) {
    console.error('Exception fetching classes:', error);
    return [];
  }
}

/**
 * Get classes for a specific company
 */
export async function getClassesByCompany(companyId: string): Promise<Class[]> {
  try {
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        companies!company_id (*)
      `)
      .eq('company_id', companyId)
      .order('class_date', { ascending: true });

    if (error) {
      console.error('Error fetching classes by company:', error);
      return [];
    }

    // Map the joined data to match our interface
    const mappedData = data?.map(item => ({
      ...item,
      company: item.companies
    })) || [];

    return mappedData;
  } catch (error) {
    console.error('Exception fetching classes by company:', error);
    return [];
  }
}

/**
 * Get all companies
 */
export async function getAllCompanies(): Promise<Company[]> {
  try {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching companies:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Exception fetching companies:', error);
    return [];
  }
} 