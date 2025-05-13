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
        
        // For PKCE auth flow, code verifier is stored in sessionStorage by Supabase
        // Don't redirect if we're processing a callback as it would lose the code verifier
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const error = params.get('error');
        const errorDescription = params.get('error_description');
        
        // Handle returned errors first
        if (error) {
          console.error(`Auth error: ${error}`, errorDescription);
          setError(`Authentication error: ${errorDescription || error}`);
          return;
        }
        
        // Process the auth code if present
        if (code) {
          console.log("Processing auth code from URL");
          
          // Don't redirect mid-auth as it would lose the code verifier 
          // stored in browser sessionStorage
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            console.error("Error exchanging code for session:", error);
            setError(`Authentication error: ${error.message}`);
            return;
          }
          
          if (data?.session) {
            console.log("Session established successfully");
            
            // Store the successful login
            localStorage.setItem('auth_success', 'true');
            
            // Safe to redirect to home now that we have a session
            router.push("/");
            return;
          }
        }
        
        // Check for hash fragments (OAuth providers like Google)
        const hash = window.location.hash;
        if (hash && hash.includes('access_token')) {
          console.log("OAuth redirect with hash detected");
          
          try {
            // Handle the hash fragment - Supabase should automatically process this
            await new Promise(resolve => setTimeout(resolve, 500)); // Small delay to let Supabase process
            
            const { data } = await supabase.auth.getSession();
            if (data?.session) {
              console.log("Session obtained from hash");
              router.push("/");
              return;
            }
          } catch (hashError) {
            console.error("Error processing hash:", hashError);
          }
        }
        
        // Fallback session check
        const { data } = await supabase.auth.getSession();
        if (data?.session) {
          console.log("Session found");
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