"use client";

import React, { createContext, useEffect, useState, useMemo } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut, UserCredential } from "firebase/auth";
import { User } from "firebase/auth";
import { auth } from "../firebase/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

// Create a default context value
const defaultContextValue: AuthContextType = {
  user: null,
  loading: true,
  signInWithGoogle: async () => {
    console.warn("signInWithGoogle was called before AuthProvider was initialized");
  },
  signOut: async () => {
    console.warn("signOut was called before AuthProvider was initialized");
  },
};

// Create the context with the default value
const AuthContext = createContext<AuthContextType>(defaultContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when running in the browser
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only set up the auth listener when in the browser
  useEffect(() => {
    // Skip if not in client-side environment
    if (!isClient) return;

    try {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user);
        setLoading(false);
      });
      
      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up auth state listener:", error);
      setLoading(false);
    }
  }, [isClient]);

  const signInWithGoogle = async (): Promise<void> => {
    // Ensure we're on the client
    if (typeof window === 'undefined') return;
    
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      // We don't need to return the UserCredential since it's handled by the onAuthStateChanged listener
    } catch (error) {
      console.error("Error signing in with Google", error);
      throw error;
    }
  };

  const signOutUser = async (): Promise<void> => {
    // Ensure we're on the client
    if (typeof window === 'undefined') return;
    
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
      throw error;
    }
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    user,
    loading,
    signInWithGoogle,
    signOut: signOutUser,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
