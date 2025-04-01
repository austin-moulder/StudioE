"use client";

import { useEffect, useState } from 'react';
import { testEventTable } from '@/lib/supabase/test';

export default function TestEventsPage() {
  const [events, setEvents] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await testEventTable();
        if (data) {
          setEvents(data);
        } else {
          setError('No events found');
        }
      } catch (err) {
        setError('Error fetching events');
        console.error(err);
      }
    }

    fetchEvents();
  }, []);

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Test Events from Supabase</h1>
      
      {error && (
        <div className="text-red-500 mb-4">
          {error}
        </div>
      )}

      {events.length > 0 ? (
        <div className="grid gap-4">
          {events.map((event, index) => (
            <div key={index} className="p-4 border rounded">
              <pre>{JSON.stringify(event, null, 2)}</pre>
            </div>
          ))}
        </div>
      ) : (
        <div>Loading events...</div>
      )}
    </div>
  );
} 