// Supabase Database Types - Auto-generated
// This file contains TypeScript types for all Supabase tables

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
      leads: {
        Row: {
          id: string
          email: string
          brand_name: string | null
          no_brand: boolean
          revenue_model: string
          other_revenue_model: string | null
          decision_profile: string
          website: string | null
          instagram: string | null
          linkedin: string | null
          struggle: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          brand_name?: string | null
          no_brand?: boolean
          revenue_model: string
          other_revenue_model?: string | null
          decision_profile: string
          website?: string | null
          instagram?: string | null
          linkedin?: string | null
          struggle: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          brand_name?: string | null
          no_brand?: boolean
          revenue_model?: string
          other_revenue_model?: string | null
          decision_profile?: string
          website?: string | null
          instagram?: string | null
          linkedin?: string | null
          struggle?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      diagnoses: {
        Row: {
          id: string
          lead_id: string
          title: string
          description: string
          visibility_score: number
          conversion_score: number
          processes_score: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          lead_id: string
          title: string
          description: string
          visibility_score: number
          conversion_score: number
          processes_score: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          lead_id?: string
          title?: string
          description?: string
          visibility_score?: number
          conversion_score?: number
          processes_score?: number
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "diagnoses_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "leads"
            referencedColumns: ["id"]
          }
        ]
      }
      recommendations: {
        Row: {
          id: string
          diagnosis_id: string
          recommendation: string
          priority: number
          created_at: string
        }
        Insert: {
          id?: string
          diagnosis_id: string
          recommendation: string
          priority?: number
          created_at?: string
        }
        Update: {
          id?: string
          diagnosis_id?: string
          recommendation?: string
          priority?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendations_diagnosis_id_fkey"
            columns: ["diagnosis_id"]
            isOneToOne: false
            referencedRelation: "diagnoses"
            referencedColumns: ["id"]
          }
        ]
      }
      grounding_sources: {
        Row: {
          id: string
          recommendation_id: string
          title: string
          uri: string
          created_at: string
        }
        Insert: {
          id?: string
          recommendation_id: string
          title: string
          uri: string
          created_at?: string
        }
        Update: {
          id?: string
          recommendation_id?: string
          title?: string
          uri?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "grounding_sources_recommendation_id_fkey"
            columns: ["recommendation_id"]
            isOneToOne: false
            referencedRelation: "recommendations"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      save_lead_with_diagnosis: {
        Args: {
          p_email: string
          p_brand_name: string
          p_no_brand: boolean
          p_revenue_model: string
          p_other_revenue_model: string
          p_decision_profile: string
          p_website: string
          p_instagram: string
          p_linkedin: string
          p_struggle: string
          p_diagnosis_title: string
          p_diagnosis_description: string
          p_visibility_score: number
          p_conversion_score: number
          p_processes_score: number
          p_recommendations?: string[]
          p_sources?: Json
        }
        Returns: Array<{
          lead_id: string
          diagnosis_id: string
        }>
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
        Database["public"]["Views"])
    ? (Database["public"]["Tables"] &
        Database["public"]["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
    ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
    ? Database["public"]["Enums"][PublicEnumNameOrOptions]
    : never
