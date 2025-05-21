"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";
import Link from "next/link";
import Image from "next/image";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import EmailSignInForm from "@/components/auth/EmailSignInForm";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
}

function LoginContent() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [error, setError] = useState<string | null>(null);
  
  // Check for error in URL params
  useEffect(() => {
    const errorParam = searchParams?.get("error");
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }
  }, [searchParams]);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && !isLoading) {
      router.push("/dashboard");
    }
  }, [user, isLoading, router]);

  const handleAuthError = (error: Error) => {
    setError(error.message);
  };

  const handleAuthSuccess = () => {
    setError(null);
    // The redirect will be handled by the callback or auth state change
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-[#EC407A]"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex justify-center">
            <Link href="/" className="inline-block">
              <Image
                src="/studio-e-logo.png" 
                alt="Studio E Logo"
                width={120}
                height={120}
                priority
              />
            </Link>
          </div>
          
          <div className="mt-8">
            <div className="mt-6">
              <h2 className="text-2xl font-bold text-center text-gray-900">
                Sign in to your account
              </h2>
              
              {error && (
                <div className="mt-4 rounded-md bg-red-50 p-4">
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
              
              <div className="mt-6">
                <GoogleSignInButton 
                  className="mb-4"
                  onSuccess={handleAuthSuccess}
                  onError={handleAuthError}
                />
                
                <div className="relative mt-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-gray-50 px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <EmailSignInForm 
                    onSuccess={handleAuthSuccess}
                    onError={handleAuthError}
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="font-medium text-[#EC407A] hover:text-[#D81B60]">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-[#EC407A] to-[#D81B60]"></div>
      </div>
    </div>
  );
} 