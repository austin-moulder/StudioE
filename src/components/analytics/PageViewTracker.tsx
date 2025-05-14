'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import { logPageView } from '@/lib/analytics/userActivity';

const TRACKING_THROTTLE_MS = 5000; // 5 seconds minimum between page view logs

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  
  // Store the last tracked URL and timestamp to avoid duplicate tracking
  const lastTrackedPathRef = useRef<string | null>(null);
  const lastTrackedTimeRef = useRef<number>(0);
  
  useEffect(() => {
    // Only track if user is logged in
    if (!user || !user.id) return;
    
    // Construct full URL with query params
    const query = searchParams?.toString();
    const fullPath = query ? `${pathname}?${query}` : pathname;
    
    // Skip tracking if this path was tracked recently
    const now = Date.now();
    if (
      lastTrackedPathRef.current === fullPath && 
      now - lastTrackedTimeRef.current < TRACKING_THROTTLE_MS
    ) {
      return;
    }
    
    // Track the page view
    logPageView(user.id, fullPath || '');
    
    // Update last tracked path and time
    lastTrackedPathRef.current = fullPath;
    lastTrackedTimeRef.current = now;
    
  }, [pathname, searchParams, user]);
  
  // No UI rendering - this is a tracking-only component
  return null;
} 