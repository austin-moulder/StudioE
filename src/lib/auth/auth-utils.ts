import { supabase } from '../supabase/supabase';
import { AuthError } from '@supabase/supabase-js';

// PRODUCTION URL - Hard-coded and final
const PRODUCTION_URL = 'https://www.joinstudioe.com';

/**
 * Signs in with Google OAuth
 * Uses a simplified approach to avoid state management issues
 * @returns Promise that resolves when the sign-in process has started
 */
export async function signInWithGoogle() {
  console.log("[Auth] Starting Google sign-in process");

  // Get the current origin for the redirect
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : process.env.NEXT_PUBLIC_SITE_URL || 'https://www.joinstudioe.com';
  
  const redirectTo = `${baseUrl}/auth/callback`;
  console.log(`[Auth] Using redirect URL: ${redirectTo}`);
  
  try {
    // Use a minimal configuration to reduce potential for errors
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
        queryParams: { prompt: 'select_account' }
      }
    });
    
    if (error) {
      console.error('[Auth] Google sign-in error:', error);
      throw error;
    }
    
    console.log("[Auth] Google sign-in initiated successfully");
    return { success: true };
  } catch (error) {
    console.error('[Auth] Google sign-in failed:', error);
    throw error instanceof AuthError ? error : new Error('Failed to sign in with Google');
  }
}

/**
 * Signs in with email magic link
 * Simplified for reliability
 * @param email User's email address
 * @returns Promise that resolves when the magic link has been sent
 */
export async function signInWithMagicLink(email: string) {
  console.log(`[Auth] Sending magic link to ${email}`);
  
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        shouldCreateUser: true,
      }
    });
    
    if (error) {
      console.error("[Auth] Magic link error:", error);
      throw error;
    }
    
    console.log("[Auth] Magic link sent successfully");
    return { success: true, data };
  } catch (error) {
    console.error("[Auth] Magic link failed:", error);
    throw error instanceof AuthError ? error : new Error('Failed to send magic link');
  }
}

/**
 * Signs out the current user
 * Complete rewrite with thorough cleanup
 * @returns Promise that resolves when the sign-out process is complete
 */
export async function signOut(): Promise<boolean> {
  console.log('[Auth] Starting sign out process');
  
  try {
    // Comprehensive approach to clear all auth-related data
    
    // 1. Clear all browser storage first (regardless of server response)
    if (typeof window !== 'undefined') {
      // Generic auth keys that might be used
      const keysToRemove = [
        // Supabase specific
        'supabase.auth.token',
        'supabase.auth.refreshToken',
        'sb-refresh-token',
        'sb-access-token',
        'supabase.auth.provider-state',
        'supabase.auth.code_verifier',
        'supabase.auth.nonce',
        
        // Custom app keys
        'auth.token',
        'auth.refreshToken',
        'auth_success',
        'authRedirectTo',
        'auth_error',
        'authState',
        'user'
      ];
      
      // Clear localStorage
      keysToRemove.forEach(key => {
        try { localStorage.removeItem(key); } catch (e) {}
      });
      
      // Clear sessionStorage
      keysToRemove.forEach(key => {
        try { sessionStorage.removeItem(key); } catch (e) {}
      });
      
      // Clear all cookies (auth cookies might be HttpOnly)
      document.cookie.split(';').forEach(cookie => {
        const name = cookie.trim().split('=')[0];
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax;`;
      });
      
      // Set signout flag
      localStorage.setItem('signedout_timestamp', Date.now().toString());
      
      console.log('[Auth] Cleared client-side storage');
    }
    
    // 2. Call Supabase signOut 
    try {
      await supabase.auth.signOut();
      console.log('[Auth] Successfully signed out from Supabase');
    } catch (error) {
      console.error('[Auth] Supabase sign out error:', error);
      // Continue regardless of server-side errors
    }
    
    // We intentionally don't do the redirect here to allow the calling code
    // to handle it, which provides more flexibility in the UI flow.
    
    return true;
  } catch (e) {
    console.error('[Auth] Unexpected error during sign out:', e);
    return false;
  }
}

/**
 * Gets the current session
 * @returns Promise that resolves with the current session (if any)
 */
export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      console.error('[Auth] Error getting session:', error);
      throw error;
    }
    
    if (data.session) {
      console.log('[Auth] Active session found');
    } else {
      console.log('[Auth] No active session found');
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('[Auth] Session retrieval error:', error);
    return { data: { session: null }, error };
  }
}

/**
 * Gets the current user
 * @returns Promise that resolves with the current user (if any)
 */
export async function getUser() {
  try {
    const { data, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('[Auth] Error getting user:', error);
      throw error;
    }
    
    if (data.user) {
      console.log('[Auth] User found');
    } else {
      console.log('[Auth] No user found');
    }
    
    return { data, error: null };
  } catch (error) {
    console.error('[Auth] User retrieval error:', error);
    return { data: { user: null }, error };
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