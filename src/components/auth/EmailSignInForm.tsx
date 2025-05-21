"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/hooks/useAuth';

interface EmailSignInFormProps {
  className?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export default function EmailSignInForm({
  className = '',
  onSuccess,
  onError
}: EmailSignInFormProps) {
  const { signInWithEmail, signInWithMagicLink } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useMagicLink, setUseMagicLink] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (useMagicLink) {
        // Sign in with magic link (passwordless)
        const { error } = await signInWithMagicLink(email);
        if (error) throw error;
        
        // Show success message since magic link is sent to email
        setShowSuccessMessage(true);
        
        if (onSuccess) onSuccess();
      } else {
        // Sign in with email and password
        const { error } = await signInWithEmail(email, password);
        if (error) throw error;
        
        if (onSuccess) onSuccess();
      }
    } catch (error) {
      console.error('Email sign-in error:', error);
      if (onError && error instanceof Error) {
        onError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMethod = () => {
    setUseMagicLink(!useMagicLink);
    setShowSuccessMessage(false);
  };

  return (
    <div className={`w-full ${className}`}>
      {showSuccessMessage ? (
        <div className="rounded-md bg-green-50 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">
                Check your email for a sign-in link!
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#EC407A] focus:outline-none focus:ring-1 focus:ring-[#EC407A]"
            />
          </div>
          
          {!useMagicLink && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#EC407A] focus:outline-none focus:ring-1 focus:ring-[#EC407A]"
              />
            </div>
          )}
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md border border-transparent bg-[#EC407A] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#D81B60] focus:outline-none focus:ring-2 focus:ring-[#EC407A] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isLoading
                ? 'Signing in...'
                : useMagicLink
                  ? 'Send Sign-in Link'
                  : 'Sign in'
              }
            </button>
          </div>
          
          <div className="text-center">
            <button
              type="button"
              onClick={toggleAuthMethod}
              className="text-sm text-[#EC407A] hover:text-[#D81B60] focus:outline-none"
            >
              {useMagicLink
                ? 'Use password to sign in'
                : 'Sign in without password'
              }
            </button>
          </div>
        </form>
      )}
    </div>
  );
} 