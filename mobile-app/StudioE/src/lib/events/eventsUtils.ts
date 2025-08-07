import { supabase } from '../supabase/client';

export interface UserEvent {
  id: number;
  title: string;
  start_datetime: string;
  image_url: string;
  description?: string;
  location?: string;
  isPast: boolean;
  rsvp_status: string;
}

export async function getUserEvents(userId: string): Promise<UserEvent[]> {
  try {
    console.log('Fetching user events for:', userId);

    // Fetch user RSVP'd events (same query as web app)
    const { data: eventData, error: eventError } = await supabase
      .from('event_rsvp_status')
      .select(`
        *,
        EVENT (*)
      `)
      .eq('user_id', userId);
    
    if (eventError) {
      console.log('Event error (expected if no data):', eventError);
      return [];
    }

    if (!eventData) {
      return [];
    }

    // Process events similar to web app
    const now = new Date();
    const processedEvents = eventData
      .filter((item: any) => item.EVENT)
      .map((item: any) => {
        const event = item.EVENT;
        const eventDate = new Date(event.start_datetime);
        
        return {
          id: event.id,
          title: event.title,
          start_datetime: event.start_datetime,
          image_url: event.image_url || 'https://rnlubphxootnmsurnuvr.supabase.co/storage/v1/object/public/assetsv1/Logos/Studio%20E%20Logo%20-%20Gradient.png',
          description: event.description,
          location: event.location,
          isPast: eventDate < now,
          rsvp_status: item.status || 'confirmed'
        };
      });

    // Sort events: upcoming first, then past events (most recent first)
    processedEvents.sort((a: UserEvent, b: UserEvent) => {
      if (a.isPast && !b.isPast) return 1;
      if (!a.isPast && b.isPast) return -1;
      
      const dateA = new Date(a.start_datetime);
      const dateB = new Date(b.start_datetime);
      
      if (!a.isPast && !b.isPast) {
        // For upcoming events, soonest first
        return dateA.getTime() - dateB.getTime();
      } else {
        // For past events, most recent first
        return dateB.getTime() - dateA.getTime();
      }
    });

    console.log('Processed user events:', processedEvents);
    return processedEvents;
  } catch (error) {
    console.error('Error fetching user events:', error);
    return [];
  }
}

export function formatEventDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

export function formatEventDateShort(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
} 