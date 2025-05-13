"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";

// Production URL - hardcoded to ensure consistency
const PRODUCTION_URL = 'https://www.joinstudioe.com';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("Processing your sign-in...");

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log("Auth callback page loaded, processing authentication...");
        
        // Get the current URL parameters
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        
        // If we're not on the production domain and we have a code, redirect to production
        if (typeof window !== 'undefined') {
          const currentHostname = window.location.hostname;
          const isProduction = currentHostname === 'www.joinstudioe.com' || 
                             currentHostname.includes('joinstudioe.com') ||
                             currentHostname.includes('vercel.app');
          
          if (!isProduction && code) {
            // Redirect to production with the auth code
            const redirectURL = `${PRODUCTION_URL}/auth/callback?code=${code}`;
            window.location.replace(redirectURL);
            return;
          }
        }

        // Process the auth code
        if (code) {
          console.log("Processing auth code from URL");
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            console.error("Error exchanging code for session:", error);
            setError(`Authentication error: ${error.message}`);
            return;
          }
          
          if (data?.session) {
            console.log("Session established successfully");
            // Redirect to home page on the production domain
            window.location.href = `${PRODUCTION_URL}/`;
            return;
          }
        }
        
        // Check for hash fragments (OAuth providers like Google)
        const hash = window.location.hash;
        if (hash) {
          console.log("OAuth redirect detected");
          const { data } = await supabase.auth.getSession();
          if (data?.session) {
            window.location.href = `${PRODUCTION_URL}/`;
            return;
          }
        }
        
        // Fallback session check
        const { data } = await supabase.auth.getSession();
        if (data?.session) {
          window.location.href = `${PRODUCTION_URL}/`;
          return;
        }
        
        // If we still don't have a session, show an error
        setError("Failed to authenticate. Please try signing in again.");
        
      } catch (error) {
        console.error("Error in auth callback:", error);
        setError("An unexpected error occurred. Please try signing in again.");
      }
    };

    handleAuthCallback();
  }, []);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h2>
          <p className="mb-6 text-gray-700">{error}</p>
          <button
            onClick={() => window.location.href = `${PRODUCTION_URL}/`}
            className="w-full rounded-md bg-[#EC407A] py-2 px-4 font-medium text-white hover:bg-[#EC407A]/90"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Signing you in...</h2>
        <p className="mb-6 text-center text-gray-700">{message}</p>
        <div className="flex justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#EC407A] border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
} 