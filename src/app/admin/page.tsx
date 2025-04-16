"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  return (
    <div className="container mx-auto max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-8">
        {/* Future Admin Modules */}
        <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Instructor Management</h2>
          <p className="text-gray-600 mb-4">Manage instructor profiles, availability, and services.</p>
          <div className="text-sm text-gray-500">Coming soon</div>
        </div>

        <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Event Management</h2>
          <p className="text-gray-600 mb-4">Create and manage events, workshops, and classes.</p>
          <div className="text-sm text-gray-500">Coming soon</div>
        </div>

        <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Blog Management</h2>
          <p className="text-gray-600 mb-4">Create, edit, and publish blog posts and content.</p>
          <div className="text-sm text-gray-500">Coming soon</div>
        </div>
      </div>

      <div className="bg-gray-50 border rounded-lg p-6 my-8">
        <h2 className="text-xl font-semibold mb-4">Admin Dashboard</h2>
        <p className="text-gray-600 mb-4">
          Welcome to the Studio E admin dashboard. This area is currently under development. 
          Soon you'll be able to manage instructors, events, blog posts, and more from here.
        </p>
        <p className="text-gray-600 mb-4">
          For now, this page is accessible only to authorized users. We're building the admin 
          features and will notify you when they're ready for use.
        </p>
      </div>
    </div>
  );
} 