import { NextRequest, NextResponse } from 'next/server';
import { createEvents, EventAttributes } from 'ics';

export async function GET(req: NextRequest, { params }: { params: { type: string } }) {
  const { type } = params;
  
  if (type !== 'events' && type !== 'classes') {
    return NextResponse.json({ error: 'Invalid calendar type' }, { status: 400 });
  }

  try {
    // Create a simple test event based on the type
    const testEvent: EventAttributes = {
      title: type === 'events' ? 'Test Studio E Event' : 'Test Studio E Class',
      description: `This is a test ${type === 'events' ? 'event' : 'class'} for the Studio E calendar feed`,
      location: 'Studio E Dance Studio, Chicago, IL',
      start: [2025, 5, 15, 18, 0], // May 15, 2025, 6:00 PM
      end: [2025, 5, 15, 21, 0],   // May 15, 2025, 9:00 PM
      status: 'CONFIRMED',
      busyStatus: 'BUSY',
      organizer: { name: 'Studio E', email: 'studioelatindance@gmail.com' },
      productId: `Studio-E/${type === 'events' ? 'Events' : 'Classes'}`,
      url: 'https://joinstudioe.com/' + type
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
        'Content-Disposition': `attachment; filename="studio-e-${type}.ics"`
      }
    });
  } catch (error) {
    console.error(`Error generating ${type} calendar feed:`, error);
    return NextResponse.json({ error: `Failed to generate ${type} calendar feed` }, { status: 500 });
  }
} 