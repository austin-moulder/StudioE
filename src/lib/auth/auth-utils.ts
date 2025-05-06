import { supabase } from '../supabase/supabase';

// Always use production URL - hardcoded to ensure it's never overridden by environment
const PRODUCTION_URL = 'https://www.joinstudioe.com';

/**
 * Signs in with Google OAuth
 * @returns Promise that resolves when the sign-in process has started
 */
export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${PRODUCTION_URL}/auth/callback`,
      queryParams: {
        // Add a timestamp to prevent caching issues
        _t: new Date().getTime().toString()
      }
    }
  });
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
      emailRedirectTo: `${PRODUCTION_URL}/auth/callback?_t=${new Date().getTime()}`,
      shouldCreateUser: true,
    }
  });
}

/**
 * Signs the user out
 * @returns Promise that resolves when sign-out is complete
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