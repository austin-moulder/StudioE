"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";

// Production site URL - hardcoded to ensure consistency
const PRODUCTION_URL = 'https://www.joinstudioe.com';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log("Auth callback page loaded, processing authentication...");
        
        // Check if we're on localhost but should redirect to production
        if (typeof window !== 'undefined' && 
            window.location.hostname === 'localhost' && 
            !window.location.search.includes('no_redirect')) {
          // Get the current URL parameters
          const params = new URLSearchParams(window.location.search);
          const fullUrl = `${PRODUCTION_URL}${window.location.pathname}${window.location.search ? 
            `${window.location.search}&no_redirect=true` : '?no_redirect=true'}`;
          
          console.log(`Redirecting from localhost to production: ${fullUrl}`);
          window.location.href = fullUrl;
          return;
        }
        
        // Check for auth code in URL (magic link authentication)
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        
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
            router.push("/"); // Redirect to home page
            return;
          }
        }
        
        // Check for hash fragments (OAuth providers like Google)
        const hash = window.location.hash;
        if (hash) {
          console.log("OAuth redirect detected");
          // The auth state change listener in AuthProvider will handle this
          const { data } = await supabase.auth.getSession();
          if (data?.session) {
            router.push("/");
            return;
          }
        }
        
        // If we get here, try a fallback session check
        const { data } = await supabase.auth.getSession();
        if (data?.session) {
          router.push("/");
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
  }, [router]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
          <h2 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h2>
          <p className="mb-6 text-gray-700">{error}</p>
          <button
            onClick={() => router.push("/")}
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
        <p className="mb-6 text-center text-gray-700">Please wait while we complete the authentication process.</p>
        <div className="flex justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#EC407A] border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
} 