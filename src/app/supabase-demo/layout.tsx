import { SupabaseAuthProvider } from "@/lib/contexts/SupabaseAuthContext"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Supabase Demo | Studio E",
  description: "Demo of Supabase functionality in Studio E application",
}

export default function SupabaseDemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SupabaseAuthProvider>
      {children}
    </SupabaseAuthProvider>
  )
} 