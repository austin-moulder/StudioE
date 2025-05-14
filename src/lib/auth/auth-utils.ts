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
  
  // For implicit flow - clear any previous verifier to avoid PKCE flow
  if (typeof window !== 'undefined') {
    localStorage.removeItem('supabase.auth.code_verifier');
  }
  
  // Configure Google OAuth with correct settings
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo,
      skipBrowserRedirect: false,
      queryParams: {
        prompt: 'select_account',
        response_type: 'token id_token' // Force implicit flow
      }
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
  return supabase.auth.signOut();
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
 * Store the current path for post-authentication redirect
 */
export function storeAuthRedirectPath() {
  if (typeof window !== 'undefined') {
    const currentPath = window.location.pathname;
    if (currentPath !== '/login' && currentPath !== '/auth/callback') {
      localStorage.setItem('authRedirectTo', currentPath);
    }
  }
} 