'use client'

import { ReactNode, useEffect } from 'react'
import { AuthProvider } from './auth/AuthContext'
import setupStorageBuckets from './supabase/setupStorage'

export function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Set up storage buckets on client-side initialization
    setupStorageBuckets()
      .then(success => {
        if (success) {
          console.log('Supabase storage buckets initialized');
        }
      })
      .catch(error => {
        console.error('Failed to initialize storage buckets:', error);
      });
  }, []);
  
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
} 