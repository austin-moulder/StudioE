"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function TestLoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<string[]>([]);

  // Add debug log
  const addLog = (message: string) => {
    setDebug(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  // Direct implementation of Google sign-in
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      addLog("Google sign-in button clicked");
      setError(null);

      addLog("Getting window origin: " + window.location.origin);
      const redirectUrl = `${window.location.origin}/auth/callback`;
      addLog("Redirect URL set to: " + redirectUrl);

      // Direct call to Supabase OAuth
      addLog("Calling supabase.auth.signInWithOAuth directly");
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        }
      });

      if (error) {
        addLog("Error from Supabase: " + error.message);
        throw error;
      }

      addLog("Sign-in initiated successfully");
      addLog(JSON.stringify(data, null, 2));
      
    } catch (err: any) {
      addLog("Error caught: " + err.message);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Test Google Sign-in</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <Button 
        onClick={handleGoogleLogin}
        disabled={loading}
        className="max-w-xs"
      >
        {loading ? "Loading..." : "Sign in with Google (Direct)"}
      </Button>

      <div className="mt-8">
        <h2 className="font-bold mb-2">Debug Logs:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96 text-xs">
          {debug.map((log, i) => (
            <div key={i}>{log}</div>
          ))}
        </pre>
      </div>
    </div>
  );
} 