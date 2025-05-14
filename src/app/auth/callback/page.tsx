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

        // Check for error parameters in URL
        const errorParam = searchParams?.get("error");
        const errorDescription = searchParams?.get("error_description");
        
        if (errorParam) {
          addDebug(`Error detected in URL: ${errorParam}`);
          if (errorDescription) {
            addDebug(`Error description: ${errorDescription}`);
          }
          
          if (errorParam === 'invalid_request' && errorDescription?.includes('OAuth state parameter missing')) {
            addDebug("OAuth state parameter missing error detected - attempting recovery");
            
            // Extract token from hash if available (common with implicit flow errors)
            if (window.location.hash && window.location.hash.includes('access_token')) {
              addDebug("Access token found in hash fragment - attempting to process manually");

              try {
                // Directly set session using tokens in the hash
                const hashParams = new URLSearchParams(window.location.hash.substring(1));
                const accessToken = hashParams.get('access_token');
                const expiresIn = hashParams.get('expires_in');
                const refreshToken = hashParams.get('refresh_token');
                const idToken = hashParams.get('id_token');
                
                addDebug(`Access token found: ${accessToken?.substring(0, 10)}...`);
                
                if (accessToken) {
                  // Try to get user information from Google using the access token
                  const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                      Authorization: `Bearer ${accessToken}`
                    }
                  });
                  
                  if (response.ok) {
                    const userData = await response.json();
                    addDebug(`Successfully fetched user data: ${userData.email}`);
                    
                    // Force session refresh to try to recover
                    const { data, error } = await supabase.auth.getSession();
                    
                    if (data.session) {
                      addDebug("Session recovered successfully");
                      
                      // Determine redirect path - use stored path or default to homepage
                      const redirectTo = localStorage.getItem('authRedirectTo') || '/';
                      localStorage.removeItem('authRedirectTo'); // Clear stored redirect
                      
                      // Redirect to the intended page
                      router.push(redirectTo);
                      return;
                    } else {
                      throw new Error("Failed to recover session after OAuth state error");
                    }
                  } else {
                    addDebug("Failed to fetch user info with access token");
                  }
                }
              } catch (tokenError) {
                addDebug(`Token recovery error: ${tokenError instanceof Error ? tokenError.message : 'Unknown error'}`);
              }
            }
            
            // If recovery failed, redirect to login
            addDebug("Recovery failed, redirecting to login page");
            throw new Error(`Authentication error: ${errorDescription}`);
          } else {
            // Handle other OAuth errors
            throw new Error(`Authentication error: ${errorDescription || errorParam}`);
          }
        }

        // Get from hash if no error (normal flow)
        addDebug("Attempting to get session from URL");
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          addDebug(`Error getting session: ${error.message}`);
          throw error;
        }

        if (data.session) {
          addDebug("Session obtained successfully");
          
          // Clear auth-related localStorage items that are no longer needed
          if (typeof window !== 'undefined') {
            localStorage.removeItem('supabase.auth.nonce');
            localStorage.removeItem('supabase.auth.provider-state');
          }
          
          // Determine where to redirect the user after successful login
          const redirectTo = localStorage.getItem('authRedirectTo') || '/';
          localStorage.removeItem('authRedirectTo'); // Clear stored redirect path
          
          addDebug(`Redirecting to: ${redirectTo}`);
          router.push(redirectTo);
        } else {
          addDebug("No session found, falling back to hash parsing");
          
          // Fallback for hash fragment authentication
          if (window.location.hash) {
            addDebug(`Hash fragment found: ${window.location.hash.substring(0, 20)}...`);
            try {
              // This will attempt to extract session from hash fragment
              const { data: hashData, error: hashError } = await supabase.auth.getSession();
              
              if (hashError) {
                addDebug(`Error processing hash: ${hashError.message}`);
                throw hashError;
              }
              
              if (hashData.session) {
                addDebug("Session obtained from hash successfully");
                
                // Determine redirect path
                const redirectTo = localStorage.getItem('authRedirectTo') || '/';
                localStorage.removeItem('authRedirectTo');
                
                addDebug(`Redirecting to: ${redirectTo}`);
                router.push(redirectTo);
              } else {
                addDebug("No session found in hash");
                throw new Error("Authentication failed - no session created");
              }
            } catch (hashProcessError) {
              addDebug(`Hash processing error: ${hashProcessError instanceof Error ? hashProcessError.message : 'Unknown error'}`);
              throw hashProcessError;
            }
          } else {
            addDebug("No hash fragment and no session - authentication failed");
            throw new Error("Authentication failed - no session created");
          }
        }
      } catch (error) {
        addDebug(`Authentication error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        setError(error instanceof Error ? error.message : 'Authentication failed');
        
        // Wait 3 seconds then redirect to login
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthCallback();
  }, [router, searchParams]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication</h1>
          {isProcessing ? (
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-gray-600">Processing your sign-in...</p>
            </div>
          ) : error ? (
            <div className="text-red-500">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
              <p className="text-sm mt-2">Redirecting you to login...</p>
            </div>
          ) : (
            <p className="text-gray-600">Completing authentication...</p>
          )}
        </div>
        
        {/* Debug section - only shown in development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-6 p-3 bg-gray-100 rounded text-xs text-gray-800 max-h-60 overflow-auto">
            <h3 className="font-bold mb-1">Debug Info:</h3>
            {debug.map((msg, i) => (
              <div key={i} className="mb-1">
                {msg}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
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