"use client";

import { useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase/supabase';

interface GoogleSignInButtonProps {
  className?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function GoogleSignInButton({ 
  className = '',
  onSuccess,
  onError
}: GoogleSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      
      // Direct call to supabase auth
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: { prompt: 'select_account' }
        }
      });
      
      if (error) throw error;
      
      // OAuth flow will handle the redirect
      onSuccess?.();
    } catch (error) {
      console.error('Google sign-in error:', error);
      // Don't show error for user-cancelled popup
      if (error instanceof Error && !error.message.includes('popup-closed-by-user')) {
        onError?.(error instanceof Error ? error : new Error('Failed to sign in with Google'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className={`flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#EC407A] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      type="button"
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-[#EC407A]"></div>
      ) : (
        <Image 
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
          alt="Google Logo" 
          width={18} 
          height={18} 
        />
      )}
      {isLoading ? 'Signing in...' : 'Sign in with Google'}
    </button>
  );
} 