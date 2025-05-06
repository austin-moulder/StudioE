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
        
        // STEP 1: Force redirect to production if we're not already there
        if (typeof window !== 'undefined') {
          const currentHostname = window.location.hostname;
          const isProduction = 
            currentHostname === 'www.joinstudioe.com' || 
            currentHostname.includes('joinstudioe.com') ||
            currentHostname.includes('vercel.app');
                              
          if (!isProduction) {
            // Get the current path and search params
            const currentPath = window.location.pathname;
            const searchParams = new URLSearchParams(window.location.search);
            
            // The code parameter is what we need to preserve for authentication
            const code = searchParams.get('code');
            
            // If we have a code and we're not already in a redirect loop
            if (code && !searchParams.has('redirected')) {
              // Create a new search params object with just the code
              const redirectParams = new URLSearchParams();
              redirectParams.append('code', code);
              redirectParams.append('redirected', 'true');
              
              const redirectURL = `${PRODUCTION_URL}${currentPath}?${redirectParams.toString()}`;
              console.log(`Redirecting to production domain: ${redirectURL}`);
              
              // Set a message before redirect
              setMessage("Redirecting to production environment...");
              
              // Perform an immediate redirect
              window.location.replace(redirectURL);
              return;
            }
          }
          
          // STEP 2: Check if we have a stored redirect URL from the auth utils
          const storedRedirect = localStorage.getItem('redirectAfterAuth');
          if (storedRedirect && !isProduction) {
            console.log(`Using stored redirect: ${storedRedirect}`);
            localStorage.removeItem('redirectAfterAuth');
            window.location.replace(storedRedirect);
            return;
          }
        }
        
        // STEP 3: Process auth callback
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
        
        // STEP 4: Check for hash fragments (OAuth providers like Google)
        const hash = window.location.hash;
        if (hash) {
          console.log("OAuth redirect detected");
          const { data } = await supabase.auth.getSession();
          if (data?.session) {
            router.push("/");
            return;
          }
        }
        
        // STEP 5: Fallback session check
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
        <p className="mb-6 text-center text-gray-700">{message}</p>
        <div className="flex justify-center">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#EC407A] border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
} 