"use client";

import { useEffect } from 'react';

// Production URL - hardcoded to ensure consistency
const PRODUCTION_URL = 'https://www.joinstudioe.com';

export default function RootRedirectHandler() {
  useEffect(() => {
    // Check if we're on localhost with a code parameter
    if (typeof window !== 'undefined') {
      const currentHostname = window.location.hostname;
      const isLocalhost = 
        currentHostname === 'localhost' || 
        currentHostname.includes('127.0.0.1');
        
      // Check if we have an auth code
      const params = new URLSearchParams(window.location.search);
      const code = params.get('code');
      
      // If we're on localhost and have a code, redirect to production
      if (isLocalhost && code) {
        console.log("Auth code detected on localhost, redirecting to production");
        const redirectParams = new URLSearchParams();
        redirectParams.append('code', code);
        
        // Create the redirect URL
        const redirectURL = `${PRODUCTION_URL}/?${redirectParams.toString()}`;
        window.location.replace(redirectURL);
      }
    }
  }, []);
  
  // This component doesn't render anything, it just handles redirects
  return null;
} 