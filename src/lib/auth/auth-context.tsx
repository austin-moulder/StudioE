"use client";

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../supabase/supabase';
import { signInWithGoogle, signInWithMagicLink, signOut as signOutUtil } from './auth-utils';

// Type definitions for context
type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  isLoading: true,
  error: null,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signOut: async () => {},
  clearError: () => {},
});

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps app and makes auth object available
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Set up auth state listener
  useEffect(() => {
    if (typeof window === 'undefined') return;

    console.log("[Auth Context] Setting up auth state listener");
    
    // Get initial session
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          console.log("[Auth Context] Initial session found for user", data.session.user.id);
          setSession(data.session);
          setUser(data.session.user);
        } else {
          console.log("[Auth Context] No initial session found");
          setSession(null);
          setUser(null);
        }
      } catch (error) {
        console.error('[Auth Context] Error getting initial session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log(`[Auth Context] Auth state change: ${event}`);
        
        if (session) {
          console.log(`[Auth Context] User ${session.user.id} is now ${event}`);
          setSession(session);
          setUser(session.user);
        } else {
          console.log(`[Auth Context] No session after ${event} event`);
          setSession(null);
          setUser(null);
        }
        
        setIsLoading(false);
        
        // Handle specific events
        if (event === 'SIGNED_OUT') {
          console.log('[Auth Context] User signed out - clearing state');
          // Make sure we clear state
          setSession(null);
          setUser(null);
        }
      }
    );

    // Cleanup function
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Implement sign in with Google
  const handleGoogleSignIn = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      console.log('[Auth Context] Starting Google sign-in process');
      await signInWithGoogle();
      // Auth state changes will be handled by the listener
    } catch (error) {
      console.error('[Auth Context] Google sign-in error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to sign in with Google. Please try again.');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Implement sign in with email magic link
  const handleEmailSignIn = useCallback(async (email: string) => {
    try {
      setError(null);
      setIsLoading(true);
      console.log(`[Auth Context] Sending magic link to ${email}`);
      await signInWithMagicLink(email);
      
      // This is a success message for magic link
      setError('Check your email for the login link!');
    } catch (error) {
      console.error('[Auth Context] Magic link error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to send magic link. Please try again.');
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Implement sign out
  const handleSignOut = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      console.log("[Auth Context] Signing out user");
      
      // Call the sign out utility
      await signOutUtil();
      
      // We don't need to manually update state since the auth listener will handle it
      // and signOutUtil now includes a redirect that will reset the app state
    } catch (error) {
      console.error('[Auth Context] Sign out error:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Failed to sign out. Please try again.');
      }
    }
  }, []);

  // Clear any auth errors
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Context value
  const value = {
    user,
    session,
    isLoading,
    error,
    signInWithGoogle: handleGoogleSignIn,
    signInWithEmail: handleEmailSignIn,
    signOut: handleSignOut,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 