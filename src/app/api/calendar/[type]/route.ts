import { NextRequest, NextResponse } from 'next/server';
import { createEvents, EventAttributes } from 'ics';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// Helper function to parse date and time
function parseDateTime(dateStr: string, timeStr: string): [number, number, number, number, number] {
  const date = new Date(dateStr);
  const [hours, minutes] = timeStr.split(':').map(Number);
  
  return [
    date.getFullYear(),
    date.getMonth() + 1, // ics months are 1-indexed
    date.getDate(),
    hours,
    minutes
  ];
}

export async function GET(req: NextRequest, { params }: { params: { type: string } }) {
  const { type } = params;
  
  if (type !== 'events' && type !== 'classes') {
    return NextResponse.json({ error: 'Invalid calendar type' }, { status: 400 });
  }

  try {
    let calendarEvents: EventAttributes[] = [];
    
    if (type === 'events') {
      // Fetch events from Supabase
      const { data: events, error } = await supabase
        .from('EVENT')
        .select('*')
        .eq('approved', true);
        
      if (error) throw error;
      
      if (events && events.length > 0) {
        // Transform Supabase events to iCalendar events
        calendarEvents = events.map(event => {
          // Parse start date/time
          const start = parseDateTime(event.event_date, event.start_time);
          
          // Parse end date/time (use event_date_end if available, otherwise use same date as start)
          const endDate = event.event_date_end || event.event_date;
          const end = parseDateTime(endDate, event.end_time);
          
          return {
            uid: `event-${event.id}@joinstudioe.com`,
            title: event.title,
            description: event.description || 'No description provided',
            location: event.location || 'Studio E Dance Studio, Chicago, IL',
            start,
            end,
            status: 'CONFIRMED',
            busyStatus: 'BUSY',
            organizer: { name: 'Studio E', email: 'studioelatindance@gmail.com' },
            url: `https://joinstudioe.com/events/${event.id}`,
            productId: '-//Studio E//Dance Events//EN'
          } as EventAttributes;
        });
      }
    } else if (type === 'classes') {
      // Handle classes logic here if needed
      // For now we'll just create a sample class
      calendarEvents = [{
        title: 'Sample Dance Class',
        description: 'This is a sample class. Real classes will be added soon.',
        location: 'Studio E Dance Studio, Chicago, IL',
        start: [2025, 5, 15, 18, 0],
        end: [2025, 5, 15, 19, 30],
        status: 'CONFIRMED',
        busyStatus: 'BUSY',
        organizer: { name: 'Studio E', email: 'studioelatindance@gmail.com' },
        url: 'https://joinstudioe.com/classes',
        productId: '-//Studio E//Dance Classes//EN'
      }];
    }

    // Generate iCalendar data
    let icsData = '';
    createEvents(calendarEvents, (error, value) => {
      if (error) {
        console.error('Error generating ICS file:', error);
        throw new Error('Failed to generate calendar data');
      }
      icsData = value || '';
    });

    // Ensure we have proper calendar properties for all calendar applications
    // Get the name for the calendar (used in X-WR-CALNAME)
    const calendarName = type === 'events' ? 'Studio E Dance Events' : 'Studio E Dance Classes';
    
    // Ensure the calendar has a proper header with all required fields
    if (icsData.includes('BEGIN:VCALENDAR')) {
      icsData = icsData.replace(
        'BEGIN:VCALENDAR',
        'BEGIN:VCALENDAR\r\n' +
        'PRODID:-//Studio E//Dance Events Calendar//EN\r\n' +
        'VERSION:2.0\r\n' +
        'CALSCALE:GREGORIAN\r\n' +
        'METHOD:PUBLISH\r\n' +
        `X-WR-CALNAME:${calendarName}\r\n` +
        'X-WR-CALDESC:Calendar for Studio E dance events and classes\r\n' +
        'X-WR-TIMEZONE:America/Chicago'
      );
    }

    // Return iCalendar feed with appropriate headers
    return new NextResponse(icsData, {
      headers: {
        'Content-Type': 'text/calendar; charset=utf-8',
        'Content-Disposition': `attachment; filename="studio-e-${type}.ics"`,
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*' // Allow all domains to access this calendar
      }
    });
  } catch (error) {
    console.error(`Error generating ${type} calendar feed:`, error);
    return NextResponse.json({ error: `Failed to generate ${type} calendar feed` }, { status: 500 });
  }
} 