"use client";

import { useSupabaseAuth } from "@/lib/hooks/useSupabaseAuth";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

// List of admin emails
const ADMIN_EMAILS = ['moulder.austin@gmail.com'];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, session } = useSupabaseAuth();
  const [mounted, setMounted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check if user is an admin when user state changes
    if (user?.email) {
      const userIsAdmin = ADMIN_EMAILS.includes(user.email);
      setIsAdmin(userIsAdmin);
      console.log(`User ${user.email} admin status:`, userIsAdmin);
    }

    console.log("Auth state in Admin Layout:", { 
      user: user?.email,
      userObj: user, 
      loading, 
      mounted,
      session: session?.user?.email
    });
  }, [user, loading, mounted, session]);

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading authentication state...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    console.log("No user detected in admin layout");
    return (
      <div className="container max-w-4xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Access Required</h1>
        <p className="mb-8 text-gray-600">
          You need to be logged in to access this area.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  // If user is authenticated but not an admin
  if (!isAdmin) {
    console.log(`User ${user.email} is not an admin`);
    return (
      <div className="container max-w-4xl mx-auto py-16 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Access Restricted</h1>
        <p className="mb-8 text-gray-600">
          Your account ({user.email}) doesn't have admin permissions. 
          Please contact the site administrator if you believe this is an error.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  console.log("User authenticated successfully as admin:", user.email);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b bg-white shadow-sm">
        <div className="container max-w-5xl mx-auto py-4 px-4">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Manage your website content</p>
        </div>
      </div>
      
      <div className="container max-w-5xl mx-auto py-6 px-4">
        <div className="flex flex-wrap gap-4 mb-8">
          <Link
            href="/admin"
            className="px-4 py-2 bg-white rounded-md border hover:bg-gray-50 text-sm"
          >
            Dashboard
          </Link>
          {/* More links will be added here as admin sections are developed */}
        </div>
        
        <main>{children}</main>
      </div>
    </div>
  );
} 