"use client";

import { useState, useEffect } from "react";

export default function TestEnvPage() {
  const [publicVars, setPublicVars] = useState<Record<string, string>>({});
  const [windowInfo, setWindowInfo] = useState<Record<string, any>>({});

  useEffect(() => {
    // Collect all NEXT_PUBLIC_ environment variables
    const envVars: Record<string, string> = {};
    Object.keys(process.env).forEach(key => {
      if (key.startsWith('NEXT_PUBLIC_')) {
        // Mask sensitive values but show if they exist
        const value = process.env[key] || '';
        if (key.includes('KEY') || key.includes('SECRET')) {
          envVars[key] = value ? `[SET - ${value.length} chars]` : '[NOT SET]';
        } else {
          envVars[key] = value || '[NOT SET]';
        }
      }
    });
    setPublicVars(envVars);

    // Collect window information
    if (typeof window !== 'undefined') {
      setWindowInfo({
        origin: window.location.origin,
        href: window.location.href,
        protocol: window.location.protocol,
        host: window.location.host,
        hostname: window.location.hostname,
        port: window.location.port || '(default)',
        userAgent: navigator.userAgent,
        cookieEnabled: navigator.cookieEnabled,
        localStorage: typeof localStorage !== 'undefined',
        sessionStorage: typeof sessionStorage !== 'undefined',
      });
    }
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen p-8 space-y-6">
      <h1 className="text-2xl font-bold">Environment & Configuration Test</h1>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Public Environment Variables</h2>
        <div className="bg-gray-100 p-4 rounded">
          {Object.keys(publicVars).length > 0 ? (
            <pre className="text-sm">
              {Object.entries(publicVars).map(([key, value]) => (
                <div key={key}>{key}: {value}</div>
              ))}
            </pre>
          ) : (
            <p className="text-red-500">No NEXT_PUBLIC_ environment variables found</p>
          )}
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Window & Browser Information</h2>
        <div className="bg-gray-100 p-4 rounded">
          <pre className="text-sm">
            {Object.entries(windowInfo).map(([key, value]) => (
              <div key={key}>{key}: {typeof value === 'object' ? JSON.stringify(value) : String(value)}</div>
            ))}
          </pre>
        </div>
      </div>
      
      <div className="flex space-x-4">
        <a 
          href="/test-login" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Test Login
        </a>
        <a 
          href="/login" 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Go to Main Login
        </a>
      </div>
    </div>
  );
} 