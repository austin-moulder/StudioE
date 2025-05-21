"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import GoogleSignInButton from "@/components/auth/GoogleSignInButton";
import MagicLinkButton from "@/components/auth/MagicLinkButton";

function SignUpPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'error' | 'success'; message: string } | null>(null);

  // Check for error in URL params
  useEffect(() => {
    const errorParam = searchParams?.get("error");
    if (errorParam) {
      setStatus({ type: 'error', message: decodeURIComponent(errorParam) });
    }
  }, [searchParams]);

  // Handle success and error for authentication
  const handleSuccess = () => {
    setStatus({ type: 'success', message: "Check your email for the login link!" });
  };

  const handleError = (error: Error) => {
    setStatus({ type: 'error', message: error.message || "Authentication failed" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        {/* Show status messages */}
        {status && (
          <Alert variant={status.type === 'error' ? "destructive" : undefined}>
            <AlertDescription>
              {status.message}
            </AlertDescription>
          </Alert>
        )}

        {/* Magic Link Form */}
        <div className="mt-8 space-y-6">
          <div className="rounded-md">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <MagicLinkButton 
              email={email}
              onSuccess={handleSuccess}
              onError={handleError}
            />
          </div>
        </div>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Google Sign Up */}
        <div>
          <GoogleSignInButton 
            onSuccess={handleSuccess}
            onError={handleError}
          />
        </div>

        {/* Sign in link */}
        <div className="mt-4 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:text-primary/80">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    }>
      <SignUpPageContent />
    </Suspense>
  );
} 