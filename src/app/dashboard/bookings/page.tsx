"use client";

import { useState } from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  
  return (
    <div className="container max-w-6xl mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Bookings</h1>
        <p className="text-gray-500 mt-1">
          Manage your upcoming and past bookings
        </p>
      </div>
      
      <div className="flex border-b border-gray-200 mb-8">
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'upcoming' ? 'text-[#EC407A] border-b-2 border-[#EC407A]' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'past' ? 'text-[#EC407A] border-b-2 border-[#EC407A]' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('past')}
        >
          Past
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'cancelled' ? 'text-[#EC407A] border-b-2 border-[#EC407A]' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('cancelled')}
        >
          Cancelled
        </button>
      </div>
      
      {activeTab === 'upcoming' && (
        <div className="text-center py-20 border-2 border-dashed rounded-lg border-gray-200">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-xl font-medium text-gray-900">No upcoming bookings</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            You don't have any upcoming bookings. Browse our classes and events to book your next dance experience.
          </p>
          <div className="mt-6">
            <Link href="/classes">
              <Button className="bg-[#EC407A] hover:bg-[#D81B60]">
                Explore Classes
              </Button>
            </Link>
          </div>
        </div>
      )}
      
      {activeTab === 'past' && (
        <div className="text-center py-20 border-2 border-dashed rounded-lg border-gray-200">
          <Clock className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-xl font-medium text-gray-900">No past bookings</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Your booking history will appear here after you attend classes or events.
          </p>
        </div>
      )}
      
      {activeTab === 'cancelled' && (
        <div className="text-center py-20 border-2 border-dashed rounded-lg border-gray-200">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <h3 className="text-xl font-medium text-gray-900">No cancelled bookings</h3>
          <p className="mt-2 text-gray-500 max-w-md mx-auto">
            Any bookings you cancel will appear here.
          </p>
        </div>
      )}
    </div>
  );
} 