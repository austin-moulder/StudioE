"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types/supabase"

export const createClient = () => {
  return createClientComponentClient<Database>()
}

// Export a ready-to-use instance for utilities
export const supabase = createClientComponentClient<Database>() 