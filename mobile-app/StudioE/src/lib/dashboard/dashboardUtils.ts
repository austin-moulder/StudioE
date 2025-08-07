import { supabase } from '../supabase/client';

export interface DashboardStats {
  upcomingEvents: number;
  upcomingClasses: number;
  pastEvents: number;
  pastClasses: number;
  reviewsGiven: number;
}

export interface RecentReview {
  id: number;
  rating: number;
  review_text: string;
  event_title: string;
  created_at: string;
}

export interface RecentEvent {
  id: number;
  title: string;
  event_date: string;
  image_url: string;
  start_datetime: string;
}

export async function getDashboardStats(userId: string): Promise<{
  stats: DashboardStats;
  recentReview: RecentReview | null;
  upcomingEvent: RecentEvent | null;
  pastEvent: RecentEvent | null;
}> {
  try {
    // Initialize return object
    const result = {
      stats: {
        upcomingEvents: 0,
        upcomingClasses: 0,
        pastEvents: 0,
        pastClasses: 0,
        reviewsGiven: 0
      },
      recentReview: null as RecentReview | null,
      upcomingEvent: null as RecentEvent | null,
      pastEvent: null as RecentEvent | null
    };

    console.log('Fetching dashboard data for user:', userId);

    // Fetch class data and determine status based on date (same as web app)
    const { data: classData, error: classError } = await supabase
      .from('class_inquiry_status')
      .select('*, classes(class_date)')
      .eq('user_id', userId);
        
    if (classError) {
      console.log('Class error (expected if no data):', classError);
    }
    
    // Process class data with timestamp logic
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    let upcomingClassesCount = 0;
    let pastClassesCount = 0;
    
    if (classData) {
      classData.forEach((item: any) => {
        if (!item.classes?.class_date) return;
        
        // Parse date handling different formats
        let classDate;
        const dateStr = item.classes.class_date;
        const dateParts = (typeof dateStr === 'string' ? dateStr.split('T')[0] : dateStr).split('-');
        
        if (dateParts.length === 3) {
          // Create date with explicit values to avoid timezone issues
          classDate = new Date(
            parseInt(dateParts[0]),     // year
            parseInt(dateParts[1]) - 1, // month (0-indexed)
            parseInt(dateParts[2])      // day
          );
          
          // Compare only the date part
          const classDateOnly = new Date(
            classDate.getFullYear(),
            classDate.getMonth(),
            classDate.getDate()
          );
          
          if (classDateOnly.getTime() < today.getTime()) {
            pastClassesCount++;
          } else {
            upcomingClassesCount++;
          }
        }
      });
    }
    
    // Fetch event data (same as web app)
    const { data: eventData, error: eventError } = await supabase
      .from('event_rsvp_status')
      .select('*, EVENT(id, title, start_datetime, image_url)')
      .eq('user_id', userId);
        
    if (eventError) {
      console.log('Event error (expected if no data):', eventError);
    }
    
    // Process event data with timestamp logic
    let upcomingEventsCount = 0;
    let pastEventsCount = 0;
    let upcomingEventData: RecentEvent | null = null;
    let pastEventData: RecentEvent | null = null;
    
    if (eventData) {
      const sortedEvents = eventData
        .filter((item: any) => item.EVENT?.start_datetime)
        .sort((a: any, b: any) => new Date(a.EVENT.start_datetime).getTime() - new Date(b.EVENT.start_datetime).getTime());
      
      sortedEvents.forEach((item: any) => {
        if (!item.EVENT?.start_datetime) return;
        
        const eventDate = new Date(item.EVENT.start_datetime);
        if (eventDate < now) {
          pastEventsCount++;
          // Get the most recent past event
          if (!pastEventData || eventDate > new Date(pastEventData.start_datetime)) {
            pastEventData = {
              id: item.EVENT.id,
              title: item.EVENT.title,
              event_date: item.EVENT.start_datetime,
              image_url: item.EVENT.image_url,
              start_datetime: item.EVENT.start_datetime
            };
          }
        } else {
          upcomingEventsCount++;
          // Get the next upcoming event
          if (!upcomingEventData) {
            upcomingEventData = {
              id: item.EVENT.id,
              title: item.EVENT.title,
              event_date: item.EVENT.start_datetime,
              image_url: item.EVENT.image_url,
              start_datetime: item.EVENT.start_datetime
            };
          }
        }
      });
    }
    
    // Fetch user reviews and get the most recent one (same as web app)
    const { data: userReviews, error: userReviewsError } = await supabase
      .from('event_reviews')
      .select('id, rating, review_text, created_at, event_id')
      .eq('auth_id', userId)
      .order('created_at', { ascending: false })
      .limit(1);
        
    if (userReviewsError) {
      console.log('Reviews error (expected if no data):', userReviewsError);
    }
    
    // Get event title for the most recent review
    let recentReviewData: RecentReview | null = null;
    if (userReviews && userReviews.length > 0) {
      const review = userReviews[0];
      const { data: eventData, error: eventError } = await supabase
        .from('EVENT')
        .select('title')
        .eq('id', review.event_id)
        .single();
      
      if (!eventError && eventData) {
        recentReviewData = {
          id: review.id,
          rating: review.rating,
          review_text: review.review_text,
          event_title: eventData.title,
          created_at: review.created_at
        };
      }
    }
    
    // Get total reviews count
    const { data: allUserReviews, error: allUserReviewsError } = await supabase
      .from('event_reviews')
      .select('*')
      .eq('auth_id', userId);
    
    if (allUserReviewsError) {
      console.log('All reviews error (expected if no data):', allUserReviewsError);
    }
    
    // Update stats with all data
    result.stats = {
      upcomingClasses: upcomingClassesCount,
      pastClasses: pastClassesCount,
      upcomingEvents: upcomingEventsCount,
      pastEvents: pastEventsCount,
      reviewsGiven: allUserReviews?.length || 0
    };
    
    result.recentReview = recentReviewData;
    result.upcomingEvent = upcomingEventData;
    result.pastEvent = pastEventData;
    
    console.log('Dashboard stats result:', result);
    
    return result;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    
    // Return empty stats on error instead of throwing
    return {
      stats: {
        upcomingEvents: 0,
        upcomingClasses: 0,
        pastEvents: 0,
        pastClasses: 0,
        reviewsGiven: 0
      },
      recentReview: null,
      upcomingEvent: null,
      pastEvent: null
    };
  }
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  });
} 