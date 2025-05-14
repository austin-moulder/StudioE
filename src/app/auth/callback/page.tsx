"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";

// Production URL - hardcoded to ensure consistency
const PRODUCTION_URL = 'https://www.joinstudioe.com';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("Processing your sign-in...");

  // Add debug messages
  const addDebug = (msg: string) => {
    console.log(msg);
    setDebug(prev => [...prev, msg]);
  };

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        addDebug("Auth callback page loaded, processing authentication...");
        
        // Log the current URL and search params for debugging
        addDebug(`Current URL: ${window.location.href}`);
        
        // For PKCE auth flow, code verifier is stored in sessionStorage by Supabase
        // Don't redirect if we're processing a callback as it would lose the code verifier
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const error = params.get('error');
        const errorDescription = params.get('error_description');
        
        // Check for stored code verifier in sessionStorage
        const hasCodeVerifier = sessionStorage.getItem('supabase.auth.code_verifier') !== null;
        addDebug(`Code verifier present: ${hasCodeVerifier}`);
        
        // Handle returned errors first
        if (error) {
          addDebug(`Auth error: ${error}, ${errorDescription}`);
          setError(`Authentication error: ${errorDescription || error}`);
          return;
        }
        
        // Process the auth code if present
        if (code) {
          addDebug(`Found auth code: ${code.substring(0, 5)}...`);
          
          try {
            // Don't redirect mid-auth as it would lose the code verifier 
            // stored in browser sessionStorage
            const { data, error } = await supabase.auth.exchangeCodeForSession(code);
            
            if (error) {
              addDebug(`Error exchanging code: ${error.message}`);
              setError(`Authentication error: ${error.message}`);
              return;
            }
            
            if (data?.session) {
              addDebug("Session established successfully");
              
              // Update to ensure consistent home page redirects
              const handleSuccessfulAuth = () => {
                addDebug("Authentication successful, redirecting to home page");
                // Store the successful login
                localStorage.setItem('auth_success', 'true');
                
                // Use direct location change for most reliable redirect
                window.location.href = "/";
              };
              
              handleSuccessfulAuth();
              return;
            } else {
              addDebug("No session data returned after code exchange");
            }
          } catch (codeError) {
            addDebug(`Exception during code exchange: ${codeError instanceof Error ? codeError.message : String(codeError)}`);
            setError(`Error processing authentication: ${codeError instanceof Error ? codeError.message : String(codeError)}`);
            return;
          }
        } else {
          addDebug("No auth code found in URL");
        }
        
        // Check for hash fragments (OAuth providers like Google)
        const hash = window.location.hash;
        if (hash) {
          addDebug(`Found hash: ${hash.substring(0, 15)}...`);
          
          if (hash.includes('access_token')) {
            addDebug("Hash contains access_token, likely successful OAuth response");
            
            try {
              // Handle the hash fragment - Supabase should automatically process this
              await new Promise(resolve => setTimeout(resolve, 500)); // Small delay to let Supabase process
              
              const { data } = await supabase.auth.getSession();
              if (data?.session) {
                addDebug("Session obtained from hash");
                
                // Update to ensure consistent home page redirects
                const handleSuccessfulAuth = () => {
                  addDebug("Authentication successful, redirecting to home page");
                  // Store the successful login
                  localStorage.setItem('auth_success', 'true');
                  
                  // Use direct location change for most reliable redirect
                  window.location.href = "/";
                };
                
                handleSuccessfulAuth();
                return;
              } else {
                addDebug("No session found after hash processing");
              }
            } catch (hashError) {
              addDebug(`Error processing hash: ${hashError instanceof Error ? hashError.message : String(hashError)}`);
            }
          } else {
            addDebug("Hash does not contain access_token");
          }
        } else {
          addDebug("No hash found in URL");
        }
        
        // Fallback session check
        addDebug("Performing fallback session check");
        const { data } = await supabase.auth.getSession();
        if (data?.session) {
          addDebug("Session found in fallback check");
          
          // Update to ensure consistent home page redirects
          const handleSuccessfulAuth = () => {
            addDebug("Authentication successful, redirecting to home page");
            // Store the successful login
            localStorage.setItem('auth_success', 'true');
            
            // Use direct location change for most reliable redirect
            window.location.href = "/";
          };
          
          handleSuccessfulAuth();
          return;
        } else {
          addDebug("No session found in fallback check");
        }
        
        // If we still don't have a session, show an error
        addDebug("Authentication workflow completed without finding a session");
        setError("Failed to authenticate. Please try signing in again.");
        
      } catch (error) {
        addDebug(`Unexpected error: ${error instanceof Error ? error.message : String(error)}`);
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
          
          {debug.length > 0 && (
            <div className="mb-6 mt-4 border rounded p-3 bg-gray-50 text-xs font-mono overflow-auto max-h-40">
              <p className="font-semibold mb-1">Debug Info:</p>
              {debug.map((msg, i) => (
                <div key={i} className="mb-1">{msg}</div>
              ))}
            </div>
          )}
          
          <button
            onClick={() => window.location.href = "/"}
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
        
        {debug.length > 0 && (
          <div className="mt-6 border rounded p-3 bg-gray-50 text-xs font-mono overflow-auto max-h-40">
            <p className="font-semibold mb-1">Authentication Progress:</p>
            {debug.map((msg, i) => (
              <div key={i} className="mb-1">{msg}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 