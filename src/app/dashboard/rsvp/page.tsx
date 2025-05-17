"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function RSVPRedirectPage() {
  useEffect(() => {
    redirect("/dashboard/events");
  }, []);

  // This will not be rendered as the redirect will happen,
  // but we include it for fallback
  return (
    <div className="container max-w-5xl mx-auto py-16 px-4 text-center">
      <div className="w-12 h-12 border-4 border-[#EC407A] border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600">Redirecting to Events & Workshops page...</p>
    </div>
  );
} 