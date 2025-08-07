import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
}

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

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Mock user for development
const mockUser: User = {
  id: 'mock-user-id',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'moulder.austin@gmail.com',
  email_confirmed_at: new Date().toISOString(),
  phone: '',
  confirmed_at: new Date().toISOString(),
  last_sign_in_at: new Date().toISOString(),
  app_metadata: {
    provider: 'google',
    providers: ['google']
  },
  user_metadata: {
    avatar_url: 'https://lh3.googleusercontent.com/a/default-user',
    email: 'moulder.austin@gmail.com',
    email_verified: true,
    full_name: 'Austin Moulder',
    iss: 'https://accounts.google.com',
    name: 'Austin Moulder',
    picture: 'https://lh3.googleusercontent.com/a/default-user',
    provider_id: '123456789',
    sub: '123456789'
  },
  identities: [],
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const mockSession: Session = {
  access_token: 'mock-access-token',
  token_type: 'bearer',
  expires_in: 3600,
  expires_at: Math.floor(Date.now() / 1000) + 3600,
  refresh_token: 'mock-refresh-token',
  user: mockUser
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Auto-login with mock user after a short delay
    const timer = setTimeout(() => {
      console.log('Auto-logging in Austin Moulder...');
      setUser(mockUser);
      setSession(mockSession);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const signInWithGoogle = async () => {
    try {
      setError(null);
      setIsLoading(true);
      
      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(mockUser);
      setSession(mockSession);
      console.log('Signed in with Google (mock)');
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithEmail = async (email: string) => {
    try {
      setError(null);
      setIsLoading(true);

      // Simulate loading
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update mock user with provided email
      const updatedUser = { ...mockUser, email };
      const updatedSession = { ...mockSession, user: updatedUser };
      
      setUser(updatedUser);
      setSession(updatedSession);
      
      console.log(`Signed in with email: ${email} (mock)`);
    } catch (error: any) {
      console.error('Email sign-in error:', error);
      setError(error.message || 'Failed to send magic link');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      console.log('Signing out...');
      setUser(null);
      setSession(null);
    } catch (error: any) {
      console.error('Sign out error:', error);
      setError(error.message || 'Failed to sign out');
    }
  };

  const clearError = () => setError(null);

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    error,
    signInWithGoogle,
    signInWithEmail,
    signOut,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
} 