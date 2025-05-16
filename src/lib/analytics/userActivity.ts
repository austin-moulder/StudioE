import { supabase } from '@/lib/supabase/supabase';

export type EventType = 
  | 'session_start' 
  | 'session_end' 
  | 'page_view' 
  | 'feature_interaction'
  | 'instructor_search'
  | 'profile_view'
  | 'booking_initiated'
  | 'booking_completed'
  | 'class_inquiry'
  | 'event_rsvp';

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
 * Generate a stable session ID that persists as long as the same user is active
 * This approach allows us to track session without cookies or local storage
 */
function generateSessionId(userId: string): string {
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  // Create a session ID based on user ID, year and day
  // This will generate a new session ID daily per user
  return `${userId}-${now.getFullYear()}-${dayOfYear}`;
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
 * Log class inquiries
 */
export function logClassInquiry(
  userId: string,
  classId: string,
  className: string,
  instructorId?: string
) {
  return logUserActivity(userId, 'class_inquiry', {
    class_id: classId, // Keep as UUID string, no conversion needed
    class_name: className,
    instructor_id: instructorId,
    timestamp: new Date().toISOString()
  });
}

/**
 * Log event RSVPs
 */
export function logEventRSVP(
  userId: string,
  eventId: number,
  eventName: string
) {
  return logUserActivity(userId, 'event_rsvp', {
    event_id: eventId,
    event_name: eventName,
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