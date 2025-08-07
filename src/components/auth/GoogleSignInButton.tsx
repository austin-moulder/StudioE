"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/lib/hooks/useAuth';

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
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      
      // Call the Supabase OAuth function - this will redirect to Google
      const { error } = await signInWithGoogle();
      if (error) throw error;
      
      // This will only run if there's no redirect (which shouldn't happen)
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Google sign-in error:', error);
      
      // Don't show error for user-cancelled popup
      if (error instanceof Error && !error.message.includes('popup-closed-by-user')) {
        if (onError) onError(error as Error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className={`flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#EC407A] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      type="button"
      aria-label="Sign in with Google"
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