"use client";

import React, { createContext, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { 
  User, 
  Session, 
  AuthError, 
  AuthResponse, 
  OAuthResponse
} from "@supabase/supabase-js";
import { supabase } from "../supabase/client";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signInWithGoogle: () => Promise<OAuthResponse>;
  signInWithEmail: (email: string, password: string) => Promise<AuthResponse>;
  signInWithMagicLink: (email: string) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  error: string | null;
  setError: (error: string | null) => void;
}

// Create the context with null as default (will check in useAuth hook)
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Set up the auth state listener
  useEffect(() => {
    // Skip if not in client-side environment
    if (typeof window === 'undefined') return;

    // Initial session check
    const setupAuth = async () => {
      setIsLoading(true);
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
        setUser(session?.user || null);

        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          (event, session) => {
            console.log(`[AuthContext] Auth state change: ${event}`);
            setSession(session);
            setUser(session?.user || null);
            
            // Handle specific auth events
            if (event === 'SIGNED_IN' && session) {
              // You could redirect here, or let components handle it
              console.log('User signed in:', session.user.email);
            } else if (event === 'SIGNED_OUT') {
              console.log('User signed out');
            }
          }
        );
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Error setting up auth:", error);
        setError(error instanceof Error ? error.message : "Authentication error");
      } finally {
        setIsLoading(false);
      }
    };
    
    setupAuth();
  }, []);

  // Google OAuth sign in
  const signInWithGoogle = async (): Promise<OAuthResponse> => {
    setError(null);
    try {
      return await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
    } catch (error) {
      console.error("Error signing in with Google:", error);
      setError(error instanceof Error ? error.message : "Google sign-in failed");
      throw error;
    }
  };

  // Email/password sign in
  const signInWithEmail = async (email: string, password: string): Promise<AuthResponse> => {
    setError(null);
    try {
      return await supabase.auth.signInWithPassword({
        email,
        password
      });
    } catch (error) {
      console.error("Error signing in with email:", error);
      setError(error instanceof Error ? error.message : "Email sign-in failed");
      throw error;
    }
  };

  // Magic link sign in
  const signInWithMagicLink = async (email: string): Promise<AuthResponse> => {
    setError(null);
    try {
      return await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          shouldCreateUser: true
        }
      });
    } catch (error) {
      console.error("Error sending magic link:", error);
      setError(error instanceof Error ? error.message : "Failed to send magic link");
      throw error;
    }
  };

  // Sign out
  const signOut = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Force redirect to login page
      router.push('/login');
    } catch (error) {
      console.error("Error signing out:", error);
      setError(error instanceof Error ? error.message : "Sign-out failed");
      throw error;
    }
  };

  // Create memoized context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    session,
    isLoading,
    signInWithGoogle,
    signInWithEmail,
    signInWithMagicLink,
    signOut,
    error,
    setError
  }), [user, session, isLoading, error]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext };
