"use client";

import { useState } from 'react';
import { useAuth } from '@/lib/auth/auth-context';
import { Mail } from 'lucide-react';

interface EmailSignInFormProps {
  className?: string;
}

export default function EmailSignInForm({ className = '' }: EmailSignInFormProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithEmail, error, clearError } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      setIsLoading(true);
      await signInWithEmail(email);
      // Auth context will handle showing the success message
    } catch (error) {
      console.error('Error sending magic link:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Check if the error message is actually a success message
  const isSuccess = error && error.toLowerCase().includes('check your email');

  return (
    <div className={`w-full ${className}`}>
      {isSuccess ? (
        <div className="mb-4 rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Mail className="h-5 w-5 text-green-400" aria-hidden="true" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Check your email</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>We've sent you a magic link. Please check your inbox and click the link to sign in.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#EC407A] focus:ring-[#EC407A] sm:text-sm"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {error && !isSuccess && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center items-center gap-2 rounded-md border border-transparent bg-[#EC407A] px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-[#EC407A]/90 focus:outline-none focus:ring-2 focus:ring-[#EC407A] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
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
          </div>
        </form>
      )}
    </div>
  );
} 