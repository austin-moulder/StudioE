"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase/supabase';
import { Provider } from '@supabase/supabase-js';

export default function TestAuth() {
  const [status, setStatus] = useState('Checking environment...');
  const [logs, setLogs] = useState<string[]>([]);
  
  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toISOString().substring(11, 19)}: ${message}`]);
  };
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Log environment info
        addLog(`Current hostname: ${window.location.hostname}`);
        addLog(`Current URL: ${window.location.href}`);
        
        // Check if Supabase is configured correctly
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          setStatus('❌ Missing environment variables');
          addLog('Error: Supabase environment variables are missing');
          return;
        }
        
        addLog(`Supabase URL configured: ${process.env.NEXT_PUBLIC_SUPABASE_URL.substring(0, 15)}...`);
        
        // Get current session if any
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          setStatus('✅ User is authenticated');
          addLog(`Logged in as: ${session.user.email}`);
        } else {
          setStatus('User not authenticated');
          addLog('No active session found');
        }
        
      } catch (error) {
        setStatus('❌ Error checking auth');
        addLog(`Error: ${error instanceof Error ? error.message : String(error)}`);
      }
    };
    
    checkAuth();
  }, []);
  
  const handleGoogleSignIn = async () => {
    try {
      addLog('Initiating Google sign in...');
      
      // Check configuration of signInWithOAuth
      const options = {
        provider: 'google' as Provider,
        options: {
          redirectTo: 'https://www.joinstudioe.com/auth/callback'
        }
      };
      
      addLog(`Will redirect to: ${options.options.redirectTo}`);
      setStatus('Redirecting to Google...');
      
      // Test the redirect
      const { data, error } = await supabase.auth.signInWithOAuth(options);
      
      if (error) {
        addLog(`Auth error: ${error.message}`);
        setStatus('❌ Authentication error');
      }
      
    } catch (error) {
      addLog(`Error: ${error instanceof Error ? error.message : String(error)}`);
      setStatus('❌ Error during sign in');
    }
  };
  
  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Auth Diagnostic Tool</h1>
      
      <div className="bg-gray-100 p-4 rounded-md mb-6">
        <h2 className="text-xl font-semibold mb-2">Status: {status}</h2>
        <button 
          onClick={handleGoogleSignIn}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Test Google Sign In
        </button>
      </div>
      
      <div className="border rounded-md">
        <h3 className="text-lg font-semibold p-3 border-b bg-gray-50">Diagnostic Logs</h3>
        <div className="p-4 bg-black text-green-400 font-mono text-sm h-96 overflow-y-auto">
          {logs.length ? logs.map((log, i) => (
            <div key={i} className="mb-1">{log}</div>
          )) : (
            <div className="text-gray-400">No logs yet...</div>
          )}
        </div>
      </div>
    </div>
  );
} 