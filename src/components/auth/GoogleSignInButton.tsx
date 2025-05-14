"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/lib/auth/auth-context';
import { storeAuthRedirectPath } from '@/lib/auth/auth-utils';

interface GoogleSignInButtonProps {
  className?: string;
}

export default function GoogleSignInButton({ className = '' }: GoogleSignInButtonProps) {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      
      // Store current path for redirect after login
      storeAuthRedirectPath();
      
      await signInWithGoogle();
      // Auth redirect will handle the rest
    } catch (error) {
      console.error('Google sign-in error:', error);
      // Dont show error for user-cancelled popup
      if (error instanceof Error && !error.message.includes('popup-closed-by-user')) {
        console.error('Error:', error);
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