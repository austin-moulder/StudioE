"use client";

import { useState } from 'react';
import { Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase/supabase';

interface MagicLinkButtonProps {
  email: string;
  className?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function MagicLinkButton({ 
  email, 
  className = '', 
  onSuccess, 
  onError 
}: MagicLinkButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || email.trim() === '') {
      onError?.(new Error('Please enter your email address'));
      return;
    }
    
    try {
      setIsLoading(true);
      
      // Direct call to supabase auth
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          shouldCreateUser: true,
        }
      });
      
      if (error) throw error;
      
      console.log("Magic link sent successfully");
      onSuccess?.();
    } catch (error) {
      console.error('Magic link error:', error);
      if (error instanceof Error) {
        onError?.(error);
      } else {
        onError?.(new Error('Failed to send magic link'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isLoading}
      className={`flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-[#EC407A] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#EC407A]/90 focus:outline-none focus:ring-2 focus:ring-[#EC407A] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
      type="button"
    >
      {isLoading ? (
        <>
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          <span>Sending...</span>
        </>
      ) : (
        <>
          <Mail className="h-4 w-4" />
          <span>Send Magic Link</span>
        </>
      )}
    </button>
  );
} 