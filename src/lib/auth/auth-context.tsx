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
  const [isClient, setIsClient] = useState(false);

  // Ensure we're only running on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Set up auth state listener
  useEffect(() => {
    if (!isClient) return;

    // Get the initial session
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user || null);
      } catch (error) {
        console.error('Error getting initial session:', error);
        setError('Failed to initialize authentication.');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Set up the auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user || null);
        setIsLoading(false);
      }
    );

    // Cleanup function
    return () => {
      subscription.unsubscribe();
    };
  }, [isClient]);

  // Implement sign in with Google
  const handleGoogleSignIn = useCallback(async () => {
    try {
      setError(null);
      await signInWithGoogle();
    } catch (error) {
      console.error('Error signing in with Google:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An error occurred during sign in with Google.');
      }
      throw error;
    }
  }, []);

  // Implement sign in with email magic link
  const handleEmailSignIn = useCallback(async (email: string) => {
    try {
      setError(null);
      await signInWithMagicLink(email);
      setError('Check your email for the login link!');
    } catch (error) {
      console.error('Error signing in with email:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An error occurred during sign in with email.');
      }
      throw error;
    }
  }, []);

  // Implement sign out
  const handleSignOut = useCallback(async () => {
    try {
      setError(null);
      await signOutUtil();
    } catch (error) {
      console.error('Error signing out:', error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An error occurred during sign out.');
      }
      throw error;
    }
  }, []);

  // Clear any auth errors
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
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