"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/supabase";

// Production URL - hardcoded to ensure consistency
const PRODUCTION_URL = 'https://www.joinstudioe.com';

/**
 * Helper function to ensure a user profile exists
 * This serves as a client-side fallback for the database trigger
 */
async function ensureUserProfileExists(userId: string, userData: any): Promise<boolean> {
  console.log(`[Auth] Attempting to create user profile for: ${userId}`);
  
  try {
    // First check if profile exists
    const { data: existingProfile, error: checkError } = await supabase
      .from('user_profiles')
      .select('id, auth_id')
      .eq('auth_id', userId)
      .maybeSingle();
    
    if (checkError) {
      console.error('[Auth] Error checking for user profile:', checkError);
      // Continue authentication even if profile check fails
      return false;
    }
    
    // If profile exists, we're done
    if (existingProfile) {
      console.log(`[Auth] User profile already exists with ID: ${existingProfile.id}`);
      return true;
    }
    
    // Get name from user metadata or email
    const fullName = userData.user_metadata?.full_name || 
                     userData.user_metadata?.name || 
                     userData.email ||
                     'New User';
    
    // Profile doesn't exist, create it
    console.log(`[Auth] Creating new user profile for: ${userId} with name: ${fullName}`);
    
    // Only try once to create the profile - don't block auth if it fails
    const { data: createdProfile, error: createError } = await supabase
      .from('user_profiles')
      .insert([{ 
        auth_id: userId,
        full_name: fullName
      }])
      .select();
    
    if (createError) {
      console.error(`[Auth] Error creating profile:`, createError);
      // Continue authentication even if profile creation fails
      return false;
    }
    
    console.log(`[Auth] Successfully created profile with ID: ${createdProfile?.[0]?.id}`);
    return true;
  } catch (error) {
    console.error('[Auth] Exception during profile verification:', error);
    // Continue authentication even if profile creation fails
    return false;
  }
}

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(true);
  const [debug, setDebug] = useState<string[]>([]);

  const addDebug = (message: string) => {
    setDebug(prev => [...prev, message]);
    console.log(`[Auth Callback] ${message}`);
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
                      
                      // Try to create profile but don't block authentication if it fails
                      try {
                        const userId = data.session.user.id;
                        addDebug(`Attempting to create user profile for: ${userId}`);
                        
                        const profileCreated = await ensureUserProfileExists(userId, data.session.user);
                        if (profileCreated) {
                          addDebug(`User profile created successfully for: ${userId}`);
                        } else {
                          addDebug(`Note: Could not create user profile for: ${userId}, but continuing with authentication`);
                        }
                      } catch (profileError) {
                        addDebug(`Profile creation error: ${profileError instanceof Error ? profileError.message : 'Unknown error'}`);
                        // Continue with authentication regardless
                      }
                      
                      // Mark auth as successful to prevent repeated login prompts
                      localStorage.setItem('auth_success', 'true');
                      
                      // Determine redirect path - use stored path or default to homepage
                      const redirectTo = localStorage.getItem('authRedirectTo') || '/dashboard';
                      localStorage.removeItem('authRedirectTo'); // Clear stored redirect
                      
                      // Redirect to the intended page
                      router.push(redirectTo);
                      return;
                    } else {
                      // Try one more approach - exchange the token for a session
                      try {
                        // Attempt to sign in with ID token
                        if (idToken) {
                          const { data: signInData, error: signInError } = 
                            await supabase.auth.signInWithIdToken({
                              provider: 'google',
                              token: idToken,
                            });
                            
                          if (signInError) {
                            addDebug(`ID token sign-in error: ${signInError.message}`);
                          } else if (signInData.session) {
                            addDebug("Successfully recovered session with ID token");
                            
                            // Try to create profile but don't block authentication if it fails
                            try {
                              const userId = signInData.session.user.id;
                              addDebug(`Attempting to create user profile for: ${userId}`);
                              
                              const profileCreated = await ensureUserProfileExists(userId, signInData.session.user);
                              if (profileCreated) {
                                addDebug(`User profile created successfully for: ${userId}`);
                              } else {
                                addDebug(`Note: Could not create user profile for: ${userId}, but continuing with authentication`);
                              }
                            } catch (profileError) {
                              addDebug(`Profile creation error: ${profileError instanceof Error ? profileError.message : 'Unknown error'}`);
                              // Continue with authentication regardless
                            }
                            
                            // Mark auth as successful
                            localStorage.setItem('auth_success', 'true');
                            
                            // Redirect to dashboard or stored path
                            const redirectTo = localStorage.getItem('authRedirectTo') || '/dashboard';
                            localStorage.removeItem('authRedirectTo');
                            router.push(redirectTo);
                            return;
                          }
                        }
                      } catch (tokenSignInError) {
                        addDebug(`ID token sign-in error: ${tokenSignInError instanceof Error ? tokenSignInError.message : 'Unknown error'}`);
                      }
                      
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
            
            // If recovery failed, redirect to login with a helpful message
            addDebug("Recovery failed, redirecting to login page");
            localStorage.setItem('auth_error', 'Session recovery failed. Please try signing in again.');
            router.push('/?auth=failed');
            return;
          } else {
            // Handle other OAuth errors
            localStorage.setItem('auth_error', `Authentication error: ${errorDescription || errorParam}`);
            router.push('/?auth=failed');
            return;
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
          
          // Try to create profile but don't block authentication if it fails
          try {
            const userId = data.session.user.id;
            addDebug(`Attempting to create user profile for: ${userId}`);
            
            const profileCreated = await ensureUserProfileExists(userId, data.session.user);
            if (profileCreated) {
              addDebug(`User profile created successfully for: ${userId}`);
            } else {
              addDebug(`Note: Could not create user profile for: ${userId}, but continuing with authentication`);
            }
          } catch (profileError) {
            addDebug(`Profile creation error: ${profileError instanceof Error ? profileError.message : 'Unknown error'}`);
            // Continue with authentication regardless
          }
          
          // Clear auth-related localStorage items that are no longer needed
          if (typeof window !== 'undefined') {
            localStorage.removeItem('supabase.auth.nonce');
            localStorage.removeItem('supabase.auth.provider-state');
          }
          
          // Mark authentication as successful
          localStorage.setItem('auth_success', 'true');
          
          // Determine where to redirect the user after successful login
          const redirectTo = localStorage.getItem('authRedirectTo') || '/dashboard';
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
              const hashParams = new URLSearchParams(window.location.hash.substring(1));
              const accessToken = hashParams.get('access_token');
              
              if (accessToken) {
                addDebug("Access token found in hash, attempting to exchange for session");
                
                // Try to use the token to explicitly set up a session
                const { data: sessionData, error: sessionError } = 
                  await supabase.auth.setSession({
                    access_token: accessToken,
                    refresh_token: hashParams.get('refresh_token') || '',
                  });
                  
                if (sessionError) {
                  addDebug(`Error setting up session: ${sessionError.message}`);
                  throw sessionError;
                }
                
                if (sessionData.session) {
                  addDebug("Successfully created session from hash tokens");
                  
                  // Try to create profile but don't block authentication if it fails
                  try {
                    const userId = sessionData.session.user.id;
                    addDebug(`Attempting to create user profile for: ${userId}`);
                    
                    const profileCreated = await ensureUserProfileExists(userId, sessionData.session.user);
                    if (profileCreated) {
                      addDebug(`User profile created successfully for: ${userId}`);
                    } else {
                      addDebug(`Note: Could not create user profile for: ${userId}, but continuing with authentication`);
                    }
                  } catch (profileError) {
                    addDebug(`Profile creation error: ${profileError instanceof Error ? profileError.message : 'Unknown error'}`);
                    // Continue with authentication regardless
                  }
                  
                  localStorage.setItem('auth_success', 'true');
                  
                  // Redirect to intended page
                  const redirectTo = localStorage.getItem('authRedirectTo') || '/dashboard';
                  localStorage.removeItem('authRedirectTo');
                  router.push(redirectTo);
                  return;
                }
              }
              
              // If that didn't work, try the general hash handler
              const { data: hashData, error: hashError } = await supabase.auth.getSession();
              
              if (hashError) {
                addDebug(`Error processing hash: ${hashError.message}`);
                throw hashError;
              }
              
              if (hashData.session) {
                addDebug("Session obtained from hash successfully");
                
                // Try to create profile but don't block authentication if it fails
                try {
                  const userId = hashData.session.user.id;
                  addDebug(`Attempting to create user profile for: ${userId}`);
                  
                  const profileCreated = await ensureUserProfileExists(userId, hashData.session.user);
                  if (profileCreated) {
                    addDebug(`User profile created successfully for: ${userId}`);
                  } else {
                    addDebug(`Note: Could not create user profile for: ${userId}, but continuing with authentication`);
                  }
                } catch (profileError) {
                  addDebug(`Profile creation error: ${profileError instanceof Error ? profileError.message : 'Unknown error'}`);
                  // Continue with authentication regardless
                }
                
                localStorage.setItem('auth_success', 'true');
                
                // Determine redirect path
                const redirectTo = localStorage.getItem('authRedirectTo') || '/dashboard';
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
        
        // Set auth error for display on landing page
        localStorage.setItem('auth_error', error instanceof Error ? error.message : 'Authentication failed');
        
        // Wait 2 seconds then redirect to login
        setTimeout(() => {
          router.push('/?auth=failed');
        }, 2000);
      } finally {
        setIsProcessing(false);
      }
    };

    // Execute the auth callback handler when the component mounts
    handleAuthCallback();
  }, [router, searchParams]);

  // Display loading state, error, or debug information
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          {isProcessing ? 'Finalizing Sign In...' : (error ? 'Error' : 'Success!')}
        </h1>
        
        {isProcessing && (
          <div className="flex flex-col items-center justify-center mb-4">
            <div className="w-12 h-12 border-t-2 border-b-2 border-primary rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Please wait while we complete the authentication process...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
            <p className="font-medium">Authentication Error:</p>
            <p>{error}</p>
          </div>
        )}
        
        {!isProcessing && !error && (
          <div className="bg-green-50 text-green-700 p-4 rounded-md mb-4">
            <p>Authentication successful! Redirecting you to your dashboard...</p>
          </div>
        )}
        
        {/* Debug information (only in dev mode) */}
        {process.env.NODE_ENV === 'development' && debug.length > 0 && (
          <div className="mt-8">
            <details>
              <summary className="cursor-pointer font-medium text-gray-700 mb-2">Debug Information</summary>
              <div className="bg-gray-100 p-4 rounded text-xs font-mono overflow-x-auto">
                {debug.map((message, i) => (
                  <div key={i} className="mb-1">
                    {i + 1}. {message}
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
}

// Loading fallback component
function AuthCallbackLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-16 h-16 border-t-4 border-primary border-solid rounded-full animate-spin"></div>
    </div>
  );
}

// Main component with Suspense for improved loading UX
export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<AuthCallbackLoading />}>
      <AuthCallbackContent />
    </Suspense>
  );
} 