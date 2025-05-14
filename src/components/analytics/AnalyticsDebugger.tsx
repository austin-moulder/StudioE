"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth/auth-context";
import { supabase } from "@/lib/supabase/supabase";

export function AnalyticsDebugger() {
  const { user } = useAuth();
  const [activities, setActivities] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDebugger, setShowDebugger] = useState(false);

  useEffect(() => {
    // Early return if user is null
    if (!user || !user.id) {
      setActivities([]);
      setIsLoading(false);
      return;
    }

    async function fetchUserActivities() {
      setIsLoading(true);
      try {
        // Ensure user is still valid when function executes
        if (!user || !user.id) {
          setActivities([]);
          return;
        }
        
        const userId = user.id; // Capture user.id in local variable to avoid null reference
        const { data, error } = await supabase
          .from('user_activity')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false })
          .limit(20);
          
        if (error) throw error;
        setActivities(data || []);
      } catch (error) {
        console.error('Error fetching user activities:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUserActivities();
    
    // Set up refresh interval
    const interval = setInterval(fetchUserActivities, 10000);
    
    return () => clearInterval(interval);
  }, [user]);
  
  // Toggle debugger visibility with keypress (Ctrl+Shift+A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        setShowDebugger(prev => !prev);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  
  if (!showDebugger) return null;
  
  // Format the activities for display
  const formatActivity = (activity: any) => {
    const date = new Date(activity.created_at);
    const formattedDate = date.toLocaleTimeString();
    
    return (
      <div key={activity.id} className="border-b border-gray-200 py-2">
        <div className="flex justify-between">
          <span className="font-medium">{activity.event_type}</span>
          <span className="text-xs text-gray-500">{formattedDate}</span>
        </div>
        <div className="text-sm mt-1">
          {activity.page_path && (
            <div className="text-blue-600">Page: {activity.page_path}</div>
          )}
          {activity.metadata && (
            <pre className="text-xs bg-gray-100 p-1 mt-1 rounded overflow-auto max-h-24">
              {JSON.stringify(activity.metadata, null, 2)}
            </pre>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed bottom-0 right-0 w-96 h-96 bg-white border border-gray-300 shadow-lg rounded-tl-lg overflow-hidden z-50 flex flex-col">
      <div className="bg-gray-100 p-2 border-b border-gray-300 flex justify-between items-center">
        <h3 className="font-medium">User Activity Debugger</h3>
        <button 
          onClick={() => setShowDebugger(false)}
          className="text-gray-700 hover:text-gray-900"
        >
          ✕
        </button>
      </div>
      
      <div className="flex-1 overflow-auto p-2">
        {!user ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            Sign in to see your activity
          </div>
        ) : isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : activities.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-500">
            No activity recorded yet
          </div>
        ) : (
          activities.map(formatActivity)
        )}
      </div>
      
      <div className="bg-gray-100 p-2 border-t border-gray-300 text-xs text-gray-500">
        Press Ctrl+Shift+A to toggle this debugger
      </div>
    </div>
  );
} 