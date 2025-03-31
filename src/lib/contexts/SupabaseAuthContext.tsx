"use client";

import React, { createContext, useEffect, useState, useMemo } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../supabase/supabase";
import { signInWithGoogle, signOut as supabaseSignOut, signInWithMagicLink } from "../supabase/supabaseUtils";

interface SupabaseAuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  authError: string | null;
  clearAuthError: () => void;
}

// Create a default context value
const defaultContextValue: SupabaseAuthContextType = {
  user: null,
  session: null,
  loading: true,
  signInWithGoogle: async () => {
    console.warn("signInWithGoogle was called before SupabaseAuthProvider was initialized");
  },
  signInWithEmail: async () => {
    console.warn("signInWithEmail was called before SupabaseAuthProvider was initialized");
  },
  signOut: async () => {
    console.warn("signOut was called before SupabaseAuthProvider was initialized");
  },
  authError: null,
  clearAuthError: () => {},
};

// Create the context with the default value
const SupabaseAuthContext = createContext<SupabaseAuthContextType>(defaultContextValue);

export function SupabaseAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  // Set isClient to true when running in the browser
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only set up the auth listener when in the browser
  useEffect(() => {
    // Skip if not in client-side environment
    if (!isClient) return;

    try {
      // Initial session check
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user || null);
        setLoading(false);
      });

      // Set up auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          setSession(session);
          setUser(session?.user || null);
          setLoading(false);
        }
      );
      
      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error("Error setting up auth state listener:", error);
      setLoading(false);
    }
  }, [isClient]);

  const clearAuthError = () => {
    setAuthError(null);
  };

  const handleSignInWithGoogle = async (): Promise<void> => {
    // Ensure we're on the client
    if (typeof window === 'undefined') return;
    
    try {
      setAuthError(null);
      await signInWithGoogle();
      // Auth state changes are handled by the listener
    } catch (error) {
      // Don't treat popup closed by user as an error
      if (error instanceof Error && error.message.includes('popup-closed-by-user')) {
        console.log('Sign-in popup was closed by the user');
        return;
      }
      
      console.error("Error signing in with Google", error);
      if (error instanceof Error && error.message.includes('provider is not enabled')) {
        setAuthError("Google login is not enabled. Please use email sign-in instead or contact the administrator to enable Google login.");
      } else {
        setAuthError("An error occurred during sign in. Please try again later.");
      }
    }
  };

  const handleSignInWithEmail = async (email: string): Promise<void> => {
    // Ensure we're on the client
    if (typeof window === 'undefined') return;
    
    try {
      setAuthError(null);
      const { error } = await signInWithMagicLink(email);
      if (error) {
        throw error;
      }
      setAuthError("Check your email for the login link!");
    } catch (error) {
      console.error("Error signing in with email", error);
      if (error instanceof Error) {
        setAuthError(error.message);
      } else {
        setAuthError("An error occurred during email sign in. Please try again later.");
      }
    }
  };

  const handleSignOut = async (): Promise<void> => {
    // Ensure we're on the client
    if (typeof window === 'undefined') return;
    
    try {
      await supabaseSignOut();
      // Auth state changes are handled by the listener
    } catch (error) {
      console.error("Error signing out", error);
      throw error;
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    session,
    loading,
    signInWithGoogle: handleSignInWithGoogle,
    signInWithEmail: handleSignInWithEmail,
    signOut: handleSignOut,
    authError,
    clearAuthError,
  }), [user, session, loading, authError]);

  return (
    <SupabaseAuthContext.Provider value={contextValue}>
      {children}
    </SupabaseAuthContext.Provider>
  );
}

export { SupabaseAuthContext }; 