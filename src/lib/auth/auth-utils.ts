import { supabase } from '../supabase/supabase';

// PRODUCTION URL - Hard-coded and final
const PRODUCTION_URL = 'https://www.joinstudioe.com';

/**
 * Signs in with Google OAuth
 * @returns Promise that resolves when the sign-in process has started
 */
export async function signInWithGoogle() {
  // Override URL handling
  if (typeof window !== 'undefined') {
    const loginURL = `${PRODUCTION_URL}/auth/callback?from=google&t=${Date.now()}`;
    localStorage.setItem('redirectAfterAuth', loginURL);
  }

  return supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${PRODUCTION_URL}/auth/callback?provider=google&t=${Date.now()}`,
      queryParams: {
        prompt: 'select_account',
        access_type: 'offline'
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
  // Override URL handling
  if (typeof window !== 'undefined') {
    const loginURL = `${PRODUCTION_URL}/auth/callback?from=email&t=${Date.now()}`;
    localStorage.setItem('redirectAfterAuth', loginURL);
  }

  return supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${PRODUCTION_URL}/auth/callback?provider=email&t=${Date.now()}`,
      shouldCreateUser: true,
    }
  });
}

/**
 * Signs the user out
 * @returns Promise that resolves when sign-out is complete
 */
export async function signOut() {
  // Clear any auth-related localStorage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('redirectAfterAuth');
  }
  
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