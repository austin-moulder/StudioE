import { NextRequest, NextResponse } from 'next/server';
import { createEvents, EventAttributes } from 'ics';

// Function to construct iCalendar feed for all events
export async function GET(req: NextRequest) {
  try {
    // Create a simple test event
    const testEvent: EventAttributes = {
      title: 'Test Studio E Event',
      description: 'This is a test event for the Studio E calendar feed',
      location: 'Studio E Dance Studio, Chicago, IL',
      start: [2025, 5, 15, 18, 0], // May 15, 2025, 6:00 PM
      end: [2025, 5, 15, 21, 0],   // May 15, 2025, 9:00 PM
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      organizer: { name: 'Studio E', email: 'studioelatindance@gmail.com' },
      productId: 'Studio-E/Events',
      url: 'https://joinstudioe.com/events'
    };

    // Generate iCalendar data
    let icsData = '';
    createEvents([testEvent], (error, value) => {
      if (error) {
        console.error('Error generating ICS file:', error);
        throw new Error('Failed to generate calendar data');
      }
      icsData = value || '';
    });

    // Return iCalendar feed with appropriate headers
    return new NextResponse(icsData, {
      headers: {
        'Content-Type': 'text/calendar',
        'Content-Disposition': 'attachment; filename="studio-e-events.ics"'
      }
    });
  } catch (error) {
    console.error('Error generating calendar feed:', error);
    return NextResponse.json({ error: 'Failed to generate calendar feed' }, { status: 500 });
  }
} 