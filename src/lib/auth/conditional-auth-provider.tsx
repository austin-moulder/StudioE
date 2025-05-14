"use client";

import { ReactNode, useState, useEffect } from 'react';
import { AuthProvider } from './auth-context';
import { DevAuthProvider } from './dev-auth-context';

interface ConditionalAuthProviderProps {
  children: ReactNode;
}

export function ConditionalAuthProvider({ children }: ConditionalAuthProviderProps) {
  const [isDevMode, setIsDevMode] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Mark that we're on the client side
    setIsClient(true);
    
    try {
      // Check if we should use the dev auth provider
      // This could be based on localStorage, URL parameter, or environment variable
      const shouldUseDevAuth = 
        process.env.NEXT_PUBLIC_USE_DEV_AUTH === 'true' || 
        localStorage.getItem('use_dev_auth') === 'true' ||
        new URLSearchParams(window.location.search).get('dev_auth') === 'true';
      
      setIsDevMode(shouldUseDevAuth);
      
      // Log for debugging in development
      if (process.env.NODE_ENV === 'development') {
        console.log("Auth mode:", shouldUseDevAuth ? "DEV AUTH" : "REAL AUTH");
      }
    } catch (error) {
      // Safety for any errors accessing localStorage or URLSearchParams
      console.error("Error determining auth mode:", error);
      setIsDevMode(false);
    }
  }, []);

  // During SSR or before client hydration completes, use the real provider
  // This avoids hydration mismatch errors and allows correct client-side takeover
  if (!isClient) {
    return <AuthProvider>{children}</AuthProvider>;
  }

  // After client hydration is complete, use the appropriate provider
  return isDevMode ? (
    <DevAuthProvider>{children}</DevAuthProvider>
  ) : (
    <AuthProvider>{children}</AuthProvider>
  );
} 