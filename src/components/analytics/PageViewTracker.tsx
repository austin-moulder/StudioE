'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { logPageView } from '@/lib/analytics/userActivity';

const TRACKING_THROTTLE_MS = 5000; // 5 seconds minimum between page view logs

export function PageViewTracker() {
  const pathname = usePathname();
  const { user } = useAuth();
  
  // Store the last tracked URL and timestamp to avoid duplicate tracking
  const lastTrackedPathRef = useRef<string | null>(null);
  const lastTrackedTimeRef = useRef<number>(0);
  
  useEffect(() => {
    // Only track if user is logged in
    if (!user || !user.id) return;
    
    // Use only pathname for tracking to reduce excessive records
    const pathToTrack = pathname || '';
    
    // Skip tracking if this path was tracked recently
    const now = Date.now();
    if (
      lastTrackedPathRef.current === pathToTrack && 
      now - lastTrackedTimeRef.current < TRACKING_THROTTLE_MS
    ) {
      return;
    }
    
    // Track the page view
    logPageView(user.id, pathToTrack);
    
    // Update last tracked path and time
    lastTrackedPathRef.current = pathToTrack;
    lastTrackedTimeRef.current = now;
    
  }, [pathname, user]);
  
  // No UI rendering - this is a tracking-only component
  return null;
} 