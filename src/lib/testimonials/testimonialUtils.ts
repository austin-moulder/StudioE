import { supabase } from '@/lib/supabase/client'
import { Testimonial } from '@/types/testimonial'

/**
 * Fetches all testimonials
 */
export async function getAllTestimonials(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .or('type.is.null,type.eq.dance') // Include null and dance testimonials
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
  
  return data || []
}

/**
 * Fetches featured testimonials
 * @param limit - Number of testimonials to return
 */
export async function getFeaturedTestimonials(limit = 3): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('featured', true)
    .or('type.is.null,type.eq.dance') // Include null and dance testimonials
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching featured testimonials:', error)
    return []
  }
  
  return data || []
}

/**
 * Fetches testimonials by style
 * @param style - The dance style
 * @param limit - Number of testimonials to return
 */
export async function getTestimonialsByStyle(style: string, limit = 3): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('style', style)
    .or('type.is.null,type.eq.dance') // Include null and dance testimonials
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching testimonials by style:', error)
    return []
  }
  
  return data || []
}

/**
 * Fetches testimonials for business consulting
 * @param limit - Number of testimonials to return
 */
export async function getBusinessTestimonials(limit = 4): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .eq('type', 'business') // Only get business testimonials
    .order('created_at', { ascending: false })
    .limit(limit)
  
  if (error) {
    console.error('Error fetching business testimonials:', error)
    return []
  }
  
  return data || []
}

/**
 * Fetches all testimonials for admin use (no type filtering)
 */
export async function getAllTestimonialsAdmin(): Promise<Testimonial[]> {
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching all testimonials for admin:', error)
    return []
  }
  
  return data || []
} 