"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';

// Type definitions for context
type DevAuthContextType = {
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
const DevAuthContext = createContext<DevAuthContextType>({
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
export const useDevAuth = () => useContext(DevAuthContext);

// Create a properly formatted date for mockUser
const mockDate = new Date().toISOString();

// Mock user data - ensure all expected properties are included
const mockUser: User = {
  id: 'dev-user-id-123',
  app_metadata: {
    provider: 'dev',
    providers: ['dev']
  },
  user_metadata: {
    full_name: 'Dev User',
    avatar_url: '',
    phone: '555-123-4567',
    address: '123 Dev Street, Codeville',
    bio: 'This is a development-only user for testing purposes.',
    provider: 'dev'
  },
  aud: 'authenticated',
  created_at: mockDate,
  confirmed_at: mockDate,
  last_sign_in_at: mockDate,
  email: 'dev@example.com',
  email_confirmed_at: mockDate,
  phone: '',
  phone_confirmed_at: null,
  role: 'authenticated',
  updated_at: mockDate,
  identities: [],
  factors: []
} as unknown as User; // Type assertion to handle any potential missing properties

// Mock session data
const mockSession: Session = {
  access_token: 'mock-access-token',
  refresh_token: 'mock-refresh-token',
  expires_in: 3600,
  token_type: 'bearer',
  user: mockUser,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
};

// Provider component that wraps app and provides mock auth
export function DevAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're only running on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Set up mock auth
  useEffect(() => {
    if (!isClient) return;

    // Simulate loading delay
    const timer = setTimeout(() => {
      setUser(mockUser);
      setSession(mockSession);
      setIsLoading(false);
      
      // Log the user for debugging
      console.log("Dev Auth: Mock user loaded", mockUser);
    }, 800);

    return () => clearTimeout(timer);
  }, [isClient]);

  // Mock sign in with Google
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setUser(mockUser);
      setSession(mockSession);
      setError(null);
    } catch (error) {
      setError('Mock auth error');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock sign in with email
  const handleEmailSignIn = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Update the mock user with the provided email
      const updatedUser = {
        ...mockUser,
        email
      };
      
      setUser(updatedUser);
      setSession({
        ...mockSession,
        user: updatedUser
      });
      
      setError('Check your email for the login link! (This is a mock message)');
    } catch (error) {
      setError('Mock auth error');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock sign out
  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      setUser(null);
      setSession(null);
      setError(null);
    } catch (error) {
      setError('Mock sign out error');
    } finally {
      setIsLoading(false);
    }
  };

  // Clear any auth errors
  const clearError = () => {
    setError(null);
  };

  // Memoize the context value
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
    <DevAuthContext.Provider value={value}>
      {children}
    </DevAuthContext.Provider>
  );
} 