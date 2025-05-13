
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
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          full_name: string | null
          avatar_url: string | null
          location: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          location?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          location?: string | null
        }
      }
      consultations: {
        Row: {
          id: string
          farmer_id: string
          consultant_id: string | null
          status: 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          topic: string
          created_at: string
          updated_at: string
          scheduled_for: string | null
          notes: string | null
        }
        Insert: {
          id?: string
          farmer_id: string
          consultant_id?: string | null
          status?: 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          topic: string
          created_at?: string
          updated_at?: string
          scheduled_for?: string | null
          notes?: string | null
        }
        Update: {
          id?: string
          farmer_id?: string
          consultant_id?: string | null
          status?: 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
          topic?: string
          created_at?: string
          updated_at?: string
          scheduled_for?: string | null
          notes?: string | null
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: 'admin' | 'consultant' | 'farmer'
        }
        Insert: {
          id?: string
          user_id: string
          role: 'admin' | 'consultant' | 'farmer'
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'admin' | 'consultant' | 'farmer'
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
      app_role: 'admin' | 'consultant' | 'farmer'
      consultation_status: 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
