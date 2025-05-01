import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { Database } from "@/types/supabase"

export function createServerClient() {
  return createServerComponentClient<Database>({ cookies })
}

// Export a function to create a supabase instance for server API routes
export function getSupabaseServerClient() {
  // For API routes, we can't use cookies() directly
  // This is a simplified version that works for API routes without auth
  const { createClient } = require('@supabase/supabase-js')
  
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  )
}

// Export a ready-to-use instance for server components
export const supabase = getSupabaseServerClient() 