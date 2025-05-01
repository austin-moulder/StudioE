import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = createClient(supabaseUrl, supabaseKey)

// Types
export interface Class {
  id: string
  class_name: string
  instructor: string
  price: number
  series_length: number
  is_series_start: boolean
  class_date: string
  day_of_week: string
  start_time: string
  end_time: string
  is_drop_in: boolean
  is_weekly: boolean
  instructor_approval_required: boolean
  notes: string | null
  company_id: string
  company: Company
  is_active: boolean
}

export interface Company {
  id: string
  name: string
  contact_name: string
  phone: string
  email: string
  address: string
}

/**
 * Get all classes with their company information
 */
export async function getAllClasses(): Promise<Class[]> {
  try {
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        company:company_id (*)
      `)
      .order('class_date', { ascending: true })

    if (error) {
      console.error('Error fetching classes:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Exception fetching classes:', error)
    return []
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
        company:company_id (*)
      `)
      .eq('company_id', companyId)
      .order('class_date', { ascending: true })

    if (error) {
      console.error('Error fetching classes by company:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Exception fetching classes by company:', error)
    return []
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
      .order('name', { ascending: true })

    if (error) {
      console.error('Error fetching companies:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Exception fetching companies:', error)
    return []
  }
}

/**
 * Get classes by dance style
 * This function infers the dance style from the class name
 */
export async function getClassesByStyle(style: string): Promise<Class[]> {
  try {
    const { data, error } = await supabase
      .from('classes')
      .select(`
        *,
        company:company_id (*)
      `)
      .order('class_date', { ascending: true })

    if (error) {
      console.error('Error fetching classes by style:', error)
      return []
    }

    if (!data) return []

    // Filter classes by the dance style
    const styleMap: Record<string, string[]> = {
      salsa: ['salsa', 'cuban', 'mambo', 'on1', 'on2', 'shine'],
      bachata: ['bachata', 'sensual'],
      kizomba: ['kizomba', 'semba', 'urban kiz'],
      zouk: ['zouk', 'brazilian zouk'],
      afro: ['afro', 'cuban', 'afro-cuban', 'afrobeats'],
    }

    const keywords = styleMap[style.toLowerCase()]
    if (!keywords) return data

    return data.filter(classItem => {
      const className = classItem.class_name.toLowerCase()
      return keywords.some(keyword => className.includes(keyword))
    })
  } catch (error) {
    console.error('Exception fetching classes by style:', error)
    return []
  }
} 