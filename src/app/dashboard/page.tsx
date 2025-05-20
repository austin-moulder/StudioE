"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user, session, signOut, isLoading } = useAuth();
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);

  // Redirect if user is not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      router.push("/login");
    } catch (error) {
      console.error("Sign out error:", error);
    } finally {
      setIsSigningOut(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
          <h1 className="mb-6 text-3xl font-bold">Dashboard</h1>
          
          <div className="mb-6 rounded-md bg-gray-50 p-4">
            <h2 className="mb-4 text-xl font-semibold">Your Profile</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium">User ID:</span> {user.id}
              </p>
              <p>
                <span className="font-medium">Last Sign In:</span>{" "}
                {new Date(user.last_sign_in_at || "").toLocaleString()}
              </p>
              <p>
                <span className="font-medium">Provider:</span>{" "}
                {user.app_metadata.provider || "email"}
              </p>
            </div>
          </div>
          
          <Button 
            onClick={handleSignOut}
            disabled={isSigningOut}
          >
            {isSigningOut ? "Signing Out..." : "Sign Out"}
          </Button>
        </div>
      </div>
    </div>
  );
} 