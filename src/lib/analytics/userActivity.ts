import { supabase } from '@/lib/supabase/supabase';

export type EventType = 
  | 'session_start' 
  | 'session_end' 
  | 'page_view' 
  | 'feature_interaction'
  | 'instructor_search'
  | 'profile_view'
  | 'booking_initiated'
  | 'booking_completed';

export interface ActivityMetadata {
  page_path?: string;
  feature_name?: string;
  search_term?: string;
  instructor_id?: string;
  time_spent?: number;
  device_info?: {
    userAgent: string;
    screenSize: string;
  };
  [key: string]: any;
}

/**
 * Logs user activity in Supabase
 */
export async function logUserActivity(
  userId: string, 
  eventType: EventType, 
  metadata?: ActivityMetadata
) {
  try {
    if (!userId) return;
    
    const { error } = await supabase
      .from('user_activity')
      .insert({
        user_id: userId,
        event_type: eventType,
        metadata,
        page_path: metadata?.page_path || null,
        session_id: generateSessionId(userId)
      });
      
    if (error) {
      console.error('Error logging user activity:', error);
    }
  } catch (error) {
    console.error('Exception logging user activity:', error);
  }
}

/**
 * Generates a consistent session ID for the current browser session
 */
function generateSessionId(userId: string): string {
  // Get existing session ID from localStorage or create a new one
  if (typeof window !== 'undefined') {
    let sessionId = localStorage.getItem('studio_e_session_id');
    if (!sessionId) {
      sessionId = `${userId}-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
      localStorage.setItem('studio_e_session_id', sessionId);
    }
    return sessionId;
  }
  return `${userId}-${Date.now()}`;
}

/**
 * Log page view events
 */
export function logPageView(userId: string, path: string) {
  return logUserActivity(userId, 'page_view', { 
    page_path: path,
    timestamp: new Date().toISOString()
  });
}

/**
 * Log feature interactions
 */
export function logFeatureInteraction(
  userId: string, 
  featureName: string, 
  additionalData?: Record<string, any>
) {
  return logUserActivity(userId, 'feature_interaction', {
    feature_name: featureName,
    ...additionalData
  });
}

/**
 * Log instructor search
 */
export function logInstructorSearch(
  userId: string,
  searchTerm: string,
  filters?: Record<string, any>
) {
  return logUserActivity(userId, 'instructor_search', {
    search_term: searchTerm,
    filters,
    timestamp: new Date().toISOString()
  });
}

/**
 * Log profile views
 */
export function logProfileView(
  userId: string,
  instructorId: string
) {
  return logUserActivity(userId, 'profile_view', {
    instructor_id: instructorId,
    timestamp: new Date().toISOString()
  });
}

/**
 * Get user's browser and device info
 */
export function getDeviceInfo(): ActivityMetadata['device_info'] {
  if (typeof window === 'undefined') return undefined;
  
  return {
    userAgent: navigator.userAgent,
    screenSize: `${window.innerWidth}x${window.innerHeight}`
  };
} 