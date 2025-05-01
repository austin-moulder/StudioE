"use client";

import { Button } from "@/components/ui/button";
import SubscribeToCalendar from "@/components/SubscribeToCalendar";

export default function CalendarTestPage() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-8">Calendar Subscription Test Page</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Events Calendar</h2>
          <p className="mb-4">Test the events calendar subscription functionality</p>
          <SubscribeToCalendar feedType="events" />
        </div>
        
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Classes Calendar</h2>
          <p className="mb-4">Test the classes calendar subscription functionality</p>
          <SubscribeToCalendar feedType="classes" />
        </div>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Direct API Links</h2>
        <p className="mb-4">You can also access the calendar feeds directly at:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <a 
              href="/api/calendar/events" 
              target="_blank" 
              className="text-blue-600 hover:underline"
            >
              Events Calendar Feed (/api/calendar/events)
            </a>
          </li>
          <li>
            <a 
              href="/api/calendar/classes" 
              target="_blank" 
              className="text-blue-600 hover:underline"
            >
              Classes Calendar Feed (/api/calendar/classes)
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
} 