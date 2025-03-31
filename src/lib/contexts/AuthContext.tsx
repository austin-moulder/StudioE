"use client";

import React, { createContext, useEffect, useState, useMemo } from "react";
// Import mock types instead of real Firebase
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
  loading: false,
  signInWithGoogle: async () => {
    console.info("Firebase auth is disabled - using Supabase instead");
  },
  signOut: async () => {
    console.info("Firebase auth is disabled - using Supabase instead");
  },
};

// Create the context with the default value
const AuthContext = createContext<AuthContextType>(defaultContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Use default context value - we're not actually using Firebase
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Simple mock - no actual Firebase operations
  const signInWithGoogle = async (): Promise<void> => {
    console.info("Firebase auth is disabled - using Supabase instead");
    return Promise.resolve();
  };

  const signOutUser = async (): Promise<void> => {
    console.info("Firebase auth is disabled - using Supabase instead");
    return Promise.resolve();
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
