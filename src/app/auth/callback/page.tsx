"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // The page URL contains the session tokens as query parameters after a successful login
    const handleAuthCallback = async () => {
      try {
        // Get the URL hash if present (some auth providers use hash fragments)
        const hash = window.location.hash;
        
        console.log("Starting auth callback handling");
        
        if (hash && hash.includes("access_token")) {
          // If we have a hash, it's likely an access token
          console.log("Hash found with access token");
          const { data, error } = await supabase.auth.getSession();
          
          if (error) {
            console.error("Error getting session from hash:", error.message);
            setError(`Authentication error: ${error.message}`);
            return;
          }
          
          if (data?.session) {
            console.log("Session established successfully from hash");
            router.push("/");
            return;
          }
        }
        
        // Check URL parameters for the special code from magic link
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        
        if (code) {
          console.log("Auth callback code found:", code);
          
          // Exchange the code for a session
          const { data, error } = await supabase.auth.exchangeCodeForSession(code);
          
          if (error) {
            console.error("Error exchanging code for session:", error.message);
            setError(`Authentication error: ${error.message}`);
            return;
          }
          
          if (data?.session) {
            console.log("Session successfully established");
            // Redirect back to home page after authentication is complete
            router.push("/");
            return;
          }
        }
        
        // Fallback - try to get the session normally
        console.log("Attempting fallback session retrieval");
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error with fallback session retrieval:", error.message);
          setError(`Authentication error: ${error.message}`);
          return;
        }
        
        if (data?.session) {
          console.log("Fallback session retrieval successful");
          router.push("/");
          return;
        }
        
        // If we get here, something went wrong but we don't know what
        console.error("Unknown authentication error");
        setError("Unable to authenticate. Please try signing in again.");
        
      } catch (err) {
        console.error("Unexpected error during auth callback:", err);
        setError("An unexpected error occurred. Please try signing in again.");
      }
    };

    handleAuthCallback();
  }, [router]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
            <p className="mt-2 text-gray-600">{error}</p>
            <button 
              onClick={() => router.push("/")}
              className="mt-4 px-4 py-2 bg-[#EC407A] text-white rounded hover:bg-[#EC407A]/90"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Signing you in...</h1>
          <p className="mt-2 text-gray-600">Please wait while we complete the authentication process.</p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EC407A]"></div>
        </div>
      </div>
    </div>
  );
} 