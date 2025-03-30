"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import SupabaseDemo from "@/components/SupabaseDemo";
import { SupabaseAuthProvider } from "@/lib/contexts/SupabaseAuthContext";

export default function SupabaseDemoPage() {
  return (
    <div className="py-8">
      <div className="container">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Supabase Integration Demo</h1>
          <p className="text-gray-500 mt-2">
            This page demonstrates the integration with Supabase for authentication, database operations, and storage.
          </p>
        </div>
        
        <SupabaseAuthProvider>
          <SupabaseDemo />
        </SupabaseAuthProvider>
        
        <div className="mt-12 bg-gray-50 p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">About This Demo</h2>
          <p className="mb-4">
            This demo shows how to use Supabase as a replacement for Firebase in your application.
            To make this demo work, you need to:
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Create a Supabase project</li>
            <li>Add your Supabase URL and anon key to .env.local</li>
            <li>Create an "instructors" table in your Supabase database</li>
            <li>Set up authentication providers in your Supabase project</li>
          </ol>
          <p className="mt-4">
            For complete instructions, see the SUPABASE_MIGRATION.md file in the project root.
          </p>
        </div>
      </div>
    </div>
  );
} 