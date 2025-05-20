"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // Exchange the code for a session
    const handleAuthCallback = async () => {
      try {
        // Get the session - Supabase will automatically exchange the code
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth callback error:", error.message);
          // Redirect to login page with error
          router.push(`/login?error=${encodeURIComponent(error.message)}`);
          return;
        }
        
        if (data?.session) {
          console.log("Auth successful, redirecting to dashboard");
          // Redirect to dashboard or home page on successful auth
          router.push("/dashboard");
        } else {
          console.error("No session found");
          router.push("/login?error=No session found");
        }
      } catch (error) {
        console.error("Unexpected error in auth callback:", error);
        router.push("/login?error=Authentication failed");
      }
    };

    handleAuthCallback();
  }, [router]);

  // Show a simple loading state while processing
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="flex flex-col items-center">
          <h1 className="mb-4 text-2xl font-bold">Completing sign in...</h1>
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
        </div>
      </div>
    </div>
  );
} 