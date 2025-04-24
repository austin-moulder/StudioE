export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      newsletter_signups: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          zipcode: string
          phone_number: string
          received_guide: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name: string
          last_name: string
          email: string
          zipcode: string
          phone_number: string
          received_guide?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          zipcode?: string
          phone_number?: string
          received_guide?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          quote: string
          style: string
          type?: string
          rating?: number
          image_url?: string
          featured: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          quote: string
          style: string
          type?: string
          rating?: number
          image_url?: string
          featured?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          quote?: string
          style?: string
          type?: string
          rating?: number
          image_url?: string
          featured?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 