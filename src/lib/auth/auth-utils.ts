import { supabase } from '../supabase/supabase';

// Production site URL for authentication redirects
const SITE_URL = 'https://www.joinstudioe.com';

/**
 * Signs in with Google OAuth
 * @returns Promise that resolves when the sign-in process has started
 */
export async function signInWithGoogle() {
  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${SITE_URL}/auth/callback`,
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
      emailRedirectTo: `${SITE_URL}/auth/callback`,
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