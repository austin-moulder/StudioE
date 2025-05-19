import { supabase } from '../supabase/supabase';

// PRODUCTION URL - Hard-coded and final
const PRODUCTION_URL = 'https://www.joinstudioe.com';

/**
 * Signs in with Google OAuth
 * @returns Promise that resolves when the sign-in process has started
 */
export async function signInWithGoogle() {
  console.log("Auth utils: Starting Google sign-in process");
  
  // Force absolute URL for redirect to work properly in production
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://www.joinstudioe.com';
  
  const redirectTo = `${baseUrl}/auth/callback`;
  console.log(`Auth utils: Redirect URL set to ${redirectTo}`);
  
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
    
    // Store redirect path
    localStorage.setItem('authRedirectTo', '/dashboard');
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
  
  try {
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
    
    console.log("Auth utils: Google sign-in initiated successfully");
  } catch (error) {
    console.error('Google sign-in failed:', error);
    throw error;
  }
}

/**
 * Signs in with email magic link
 * @param email User's email address
 * @returns Promise that resolves when the magic link has been sent
 */
export async function signInWithMagicLink(email: string) {
  console.log(`Auth utils: Sending magic link to ${email}`);
  
  try {
    // Store redirect path
    if (typeof window !== 'undefined') {
      localStorage.setItem('authRedirectTo', '/dashboard');
    }
    
    const result = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        shouldCreateUser: true,
      }
    });
    
    if (result.error) {
      console.error("Magic link error:", result.error);
      throw result.error;
    }
    
    console.log("Auth utils: Magic link sent successfully");
    return result;
  } catch (error) {
    console.error("Magic link sending failed:", error);
    throw error;
  }
}

/**
 * Signs out the current user
 * @returns Promise that resolves when the sign-out process is complete
 */
export async function signOut(): Promise<boolean> {
  console.log('[Auth] Starting sign out process');
  
  try {
    // Clear all client storage first, even if server-side logout fails
    const itemsToRemove = [
      'supabase.auth.token',
      'supabase.auth.refreshToken',
      'sb-refresh-token',
      'sb-access-token',
      'auth.token',
      'auth.refreshToken',
      'auth_success',
      'authRedirectTo',
      'auth_error',
      'authState'
    ];
    
    // Clear localStorage
    itemsToRemove.forEach(item => {
      try {
        localStorage.removeItem(item);
      } catch (e) {
        console.error(`[Auth] Error removing ${item} from localStorage:`, e);
      }
    });
    
    // Clear sessionStorage
    itemsToRemove.forEach(item => {
      try {
        sessionStorage.removeItem(item);
      } catch (e) {
        console.error(`[Auth] Error removing ${item} from sessionStorage:`, e);
      }
    });
    
    // Attempt to sign out from Supabase - don't wait
    try {
      await supabase.auth.signOut();
      console.log('[Auth] Successfully signed out from Supabase');
    } catch (supabaseError) {
      console.error('[Auth] Error signing out from Supabase:', supabaseError);
      // Continue with local cleanup regardless
    }
    
    return true;
  } catch (e) {
    console.error('[Auth] Error during sign out:', e);
    return false;
  }
}

/**
 * Gets the current session
 * @returns Promise that resolves with the current session (if any)
 */
export async function getSession() {
  try {
    const result = await supabase.auth.getSession();
    if (result.data.session) {
      console.log("Auth utils: Session found for user", result.data.session.user.id);
    } else {
      console.log("Auth utils: No active session found");
    }
    return result;
  } catch (error) {
    console.error("Error getting session:", error);
    throw error;
  }
}

/**
 * Gets the current user
 * @returns Promise that resolves with the current user (if any)
 */
export async function getUser() {
  try {
    const result = await supabase.auth.getUser();
    if (result.data.user) {
      console.log("Auth utils: User found", result.data.user.id);
    } else {
      console.log("Auth utils: No user found");
    }
    return result;
  } catch (error) {
    console.error("Error getting user:", error);
    throw error;
  }
}

/**
 * Store the path for post-authentication redirect
 * Always redirects to dashboard for simplicity
 */
export function storeAuthRedirectPath() {
  if (typeof window !== 'undefined') {
    // Always redirect to dashboard after successful authentication
    localStorage.setItem('authRedirectTo', '/dashboard');
    console.log("Auth utils: Set redirect path to /dashboard");
  }
} 