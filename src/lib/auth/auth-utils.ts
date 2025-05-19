import { supabase } from '../supabase/supabase';

// PRODUCTION URL - Hard-coded and final
const PRODUCTION_URL = 'https://www.joinstudioe.com';

/**
 * Signs in with Google OAuth
 * @returns Promise that resolves when the sign-in process has started
 */
export async function signInWithGoogle() {
  // Force absolute URL for redirect to work properly in production
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://www.joinstudioe.com';
  
  const redirectTo = `${baseUrl}/auth/callback`;
  
  // Generate and store state parameter
  if (typeof window !== 'undefined') {
    // We need to use localStorage to store the provider state since it needs to persist
    // even if the page is closed/refreshed during the OAuth flow
    const providerState = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('supabase.auth.provider-state', providerState);
    
    // For implicit flow - clear any previous verifier to avoid PKCE flow
    localStorage.removeItem('supabase.auth.code_verifier');
    
    // Generate a random nonce for id_token validation
    const nonce = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    localStorage.setItem('supabase.auth.nonce', nonce);
  }
  
  // Prepare query parameters
  const queryParams: Record<string, string> = {
    prompt: 'select_account'
  };
  
  // Add nonce if available
  const nonce = typeof window !== 'undefined' ? localStorage.getItem('supabase.auth.nonce') : null;
  if (nonce) {
    queryParams.nonce = nonce;
  }
  
  // Configure Google OAuth with correct settings
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      skipBrowserRedirect: false,
      queryParams
    }
  });
  
  if (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
}

/**
 * Signs in with email magic link
 * @param email User's email address
 * @returns Promise that resolves when the magic link has been sent
 */
export async function signInWithMagicLink(email: string) {
  return supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
      shouldCreateUser: true,
    }
  });
}

/**
 * Signs out the current user
 * @returns Promise that resolves when the sign-out process is complete
 */
export async function signOut() {
  console.log("Auth utils: Starting sign out process");
  
  // Clear all client storage first, even if server-side logout fails
  if (typeof window !== 'undefined') {
    try {
      // Clear all localStorage
      localStorage.clear();
      
      // Clear all sessionStorage
      sessionStorage.clear();
      
      // Clear cookies
      document.cookie.split(";").forEach(c => {
        document.cookie = c.trim().split("=")[0] + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      });
    } catch (err) {
      console.error("Error clearing storage:", err);
    }
  }
  
  // Attempt Supabase signout
  try {
    await supabase.auth.signOut();
    console.log("Auth utils: Supabase sign out completed");
  } catch (error) {
    console.error("Auth utils: Error during Supabase sign out:", error);
  }
  
  return { error: null };
}

/**
 * Gets the current session
 * @returns Promise that resolves with the current session (if any)
 */
export async function getSession() {
  return supabase.auth.getSession();
}

/**
 * Gets the current user
 * @returns Promise that resolves with the current user (if any)
 */
export async function getUser() {
  return supabase.auth.getUser();
}

/**
 * Store the path for post-authentication redirect
 * Always redirects to dashboard for simplicity
 */
export function storeAuthRedirectPath() {
  if (typeof window !== 'undefined') {
    // Always redirect to dashboard after successful authentication
    localStorage.setItem('authRedirectTo', '/dashboard');
  }
} 