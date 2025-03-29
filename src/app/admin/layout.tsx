"use client";

import { useAuth } from "@/lib/hooks/useAuth";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  // Show loading state
  if (loading) {
    return (
      <div className="container max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
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
            href="/admin/photos"
            className="px-4 py-2 bg-white rounded-md border hover:bg-gray-50 text-sm"
          >
            Photo Management
          </Link>
          <Link
            href="/admin/upload"
            className="px-4 py-2 bg-white rounded-md border hover:bg-gray-50 text-sm"
          >
            Upload Files
          </Link>
          <Link
            href="/debug"
            className="px-4 py-2 bg-white rounded-md border hover:bg-gray-50 text-sm"
          >
            Debug Storage
          </Link>
          {/* Add more admin navigation links as needed */}
        </div>
        
        <main>{children}</main>
      </div>
    </div>
  );
} 