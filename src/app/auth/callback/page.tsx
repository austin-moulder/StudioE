"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";

// Production URL - hardcoded to ensure consistency
const PRODUCTION_URL = 'https://www.joinstudioe.com';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [debug, setDebug] = useState<string[]>([]);

  const addDebug = (message: string) => {
    setDebug(prev => [...prev, message]);
    console.log(message);
  };

  useEffect(() => {
    const handleAuthCallback = async () => {
      setIsProcessing(true);
      addDebug("Auth callback page loaded, processing authentication...");

      try {
        // Get the current URL to examine parameters
        const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
        addDebug(`Current URL: ${currentUrl}`);

        // Check if we're using PKCE (code) or implicit flow (tokens in hash)
        const code = searchParams?.get("code");
        const hasHash = typeof window !== 'undefined' && window.location.hash.length > 1;
        
        if (code) {
          // Code-based auth (PKCE flow)
          addDebug(`Found auth code: ${code.substring(0, 6)}...`);
          
          // Check if code verifier exists
          const codeVerifier = typeof window !== 'undefined' ? 
            localStorage.getItem('supabase.auth.code_verifier') || 
            sessionStorage.getItem('supabase.auth.code_verifier') : 
            null;
          addDebug(`Code verifier present: ${!!codeVerifier}`);
          
          if (!codeVerifier) {
            addDebug("No code verifier found - proceeding with fallback auth method");
            // Handle missing code verifier case - try implicit login
            const { error: tokenError } = await supabase.auth.getSession();
            if (tokenError) {
              throw new Error(`Fallback auth failed: ${tokenError.message}`);
            }
          } else {
            // We have a code verifier, so proceed with PKCE
            const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
            if (exchangeError) {
              addDebug(`Error exchanging code: ${exchangeError.message}`);
              throw exchangeError;
            }
          }
        } else if (hasHash) {
          // Hash-based auth (implicit flow)
          addDebug("Using hash-based authentication (implicit flow)");
          // The Supabase client will automatically process the hash
          const { error: hashError } = await supabase.auth.getSession();
          if (hashError) {
            throw hashError;
          }
        } else {
          // No code or hash found
          addDebug("No auth code or hash fragment found in URL");
          throw new Error("Invalid callback URL. Missing authentication parameters.");
        }

        // Check if we have a session after auth processes
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) {
          addDebug("Authentication completed but no session found");
          throw new Error("Failed to establish a session after authentication.");
        }

        addDebug("Authentication successful, redirecting...");
        
        // Determine redirect path - use stored path or default to homepage
        const redirectTo = localStorage.getItem('authRedirectTo') || '/';
        localStorage.removeItem('authRedirectTo'); // Clear stored redirect
        
        router.push(redirectTo);
      } catch (err) {
        console.error("Auth callback error:", err);
        setError(err instanceof Error ? err.message : "Authentication failed");
        setIsProcessing(false);
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  // If there's an error, display it and debug info
  if (error) {
    return (
      <div className="container max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h2>
        <p className="mb-4">{error}</p>
        <button
          onClick={() => router.push('/login')}
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Return to Login
        </button>
        
        {/* Debug information */}
        <div className="mt-8 p-4 bg-gray-100 rounded-md">
          <h3 className="font-semibold mb-2">Debug Information:</h3>
          <pre className="text-xs overflow-auto max-h-64">
            {debug.map((msg, i) => (
              <div key={i}>{msg}</div>
            ))}
          </pre>
        </div>
      </div>
    );
  }

  // Show loading state
  return (
    <div className="container max-w-md mx-auto mt-12 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
      <p className="mt-4">Completing sign in...</p>
    </div>
  );
}

// Loading state for the Suspense boundary
function AuthCallbackLoading() {
  return (
    <div className="container max-w-md mx-auto mt-12 text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
      <p className="mt-4">Loading authentication...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<AuthCallbackLoading />}>
      <AuthCallbackContent />
    </Suspense>
  );
} 