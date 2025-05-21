"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get URL hash and handle it
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Auth callback error:", error.message);
          throw error;
        }
        
        if (data?.session) {
          console.log("Authentication successful, redirecting to dashboard");
          
          // Get user profile info or store additional data if needed
          // Fetch any needed data before redirecting
          
          // Redirect to dashboard
          router.push("/dashboard");
        } else {
          throw new Error("No session found");
        }
      } catch (error) {
        console.error("Error in auth callback:", error);
        setError(error instanceof Error ? error.message : "Authentication failed");
        
        // After a delay, redirect to login with error
        setTimeout(() => {
          const errorMsg = encodeURIComponent(error instanceof Error ? error.message : "Authentication failed");
          router.push(`/login?error=${errorMsg}`);
        }, 2000);
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="flex flex-col items-center">
          {error ? (
            <>
              <h1 className="mb-4 text-2xl font-bold text-red-600">Authentication Error</h1>
              <p className="mb-4 text-center text-gray-600">{error}</p>
              <p className="text-sm text-gray-500">Redirecting you to login page...</p>
            </>
          ) : (
            <>
              <h1 className="mb-4 text-2xl font-bold">Completing sign in...</h1>
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-[#EC407A]"></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
} 