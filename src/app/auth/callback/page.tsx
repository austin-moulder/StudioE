"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    // The page URL contains the session tokens as query parameters after a successful login
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error getting auth session:", error.message);
      }
      
      // Redirect back to home page after authentication is complete
      router.push("/");
    };

    handleAuthCallback();
  }, [router]);

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