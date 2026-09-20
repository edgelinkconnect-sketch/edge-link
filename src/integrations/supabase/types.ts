export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      bookings: {
        Row: {
          admin_notes: string | null
          adults: number
          booking_number: string
          children: number
          children_ages: string | null
          client_id: string | null
          created_at: string
          dietary_requirements: string | null
          email: string
          full_name: string
          id: string
          phone: string
          referral_source: string | null
          special_requests: string | null
          status: string
          tour_id: string
          travel_end: string | null
          travel_start: string | null
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          adults?: number
          booking_number?: string
          children?: number
          children_ages?: string | null
          client_id?: string | null
          created_at?: string
          dietary_requirements?: string | null
          email: string
          full_name: string
          id?: string
          phone: string
          referral_source?: string | null
          special_requests?: string | null
          status?: string
          tour_id: string
          travel_end?: string | null
          travel_start?: string | null
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          adults?: number
          booking_number?: string
          children?: number
          children_ages?: string | null
          client_id?: string | null
          created_at?: string
          dietary_requirements?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string
          referral_source?: string | null
          special_requests?: string | null
          status?: string
          tour_id?: string
          travel_end?: string | null
          travel_start?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      chats: {
        Row: {
          assigned_admin_id: string | null
          category: string
          client_id: string
          created_at: string
          id: string
          last_message_at: string
          status: string
          subject: string | null
        }
        Insert: {
          assigned_admin_id?: string | null
          category: string
          client_id: string
          created_at?: string
          id?: string
          last_message_at?: string
          status?: string
          subject?: string | null
        }
        Update: {
          assigned_admin_id?: string | null
          category?: string
          client_id?: string
          created_at?: string
          id?: string
          last_message_at?: string
          status?: string
          subject?: string | null
        }
        Relationships: []
      }
      experiences: {
        Row: {
          admin_notes: string | null
          approved_at: string | null
          booking_id: string | null
          client_id: string
          experience_date: string
          id: string
          images: string[]
          message: string
          rating: number
          status: string
          submitted_at: string
          tour_id: string
          updated_at: string
        }
        Insert: {
          admin_notes?: string | null
          approved_at?: string | null
          booking_id?: string | null
          client_id: string
          experience_date: string
          id?: string
          images?: string[]
          message: string
          rating: number
          status?: string
          submitted_at?: string
          tour_id: string
          updated_at?: string
        }
        Update: {
          admin_notes?: string | null
          approved_at?: string | null
          booking_id?: string | null
          client_id?: string
          experience_date?: string
          id?: string
          images?: string[]
          message?: string
          rating?: number
          status?: string
          submitted_at?: string
          tour_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "experiences_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experiences_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery: {
        Row: {
          created_at: string
          description: string | null
          id: string
          image_url: string
          is_ai: boolean
          is_featured: boolean
          location: string
          photographer: string | null
          tags: string[]
          title: string
          uploaded_by: string | null
          views: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          image_url: string
          is_ai?: boolean
          is_featured?: boolean
          location: string
          photographer?: string | null
          tags?: string[]
          title: string
          uploaded_by?: string | null
          views?: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          image_url?: string
          is_ai?: boolean
          is_featured?: boolean
          location?: string
          photographer?: string | null
          tags?: string[]
          title?: string
          uploaded_by?: string | null
          views?: number
        }
        Relationships: []
      }
      inquiries: {
        Row: {
          budget_range: string | null
          created_at: string
          destinations: string[]
          email: string
          full_name: string
          group_size: string | null
          heard_from: string | null
          id: string
          phone: string
          special_requirements: string | null
          travel_date: string | null
          trip_duration: string | null
        }
        Insert: {
          budget_range?: string | null
          created_at?: string
          destinations?: string[]
          email: string
          full_name: string
          group_size?: string | null
          heard_from?: string | null
          id?: string
          phone: string
          special_requirements?: string | null
          travel_date?: string | null
          trip_duration?: string | null
        }
        Update: {
          budget_range?: string | null
          created_at?: string
          destinations?: string[]
          email?: string
          full_name?: string
          group_size?: string | null
          heard_from?: string | null
          id?: string
          phone?: string
          special_requirements?: string | null
          travel_date?: string | null
          trip_duration?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          attachment_url: string | null
          chat_id: string
          created_at: string
          delivered_status: boolean
          id: string
          message: string | null
          read_status: boolean
          sender_id: string
          sender_role: string
        }
        Insert: {
          attachment_url?: string | null
          chat_id: string
          created_at?: string
          delivered_status?: boolean
          id?: string
          message?: string | null
          read_status?: boolean
          sender_id: string
          sender_role: string
        }
        Update: {
          attachment_url?: string | null
          chat_id?: string
          created_at?: string
          delivered_status?: boolean
          id?: string
          message?: string | null
          read_status?: boolean
          sender_id?: string
          sender_role?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "chats"
            referencedColumns: ["id"]
          },
        ]
      }
      newsletter_subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string
          id: string
          phone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id: string
          phone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string
          id?: string
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      tours: {
        Row: {
          activity: string | null
          best_time: string | null
          created_at: string
          description: string
          difficulty: string | null
          duration: string
          excluded_services: string | null
          featured_image_url: string
          gallery_image_urls: string[]
          translations: Json
          highlights: string[] | null
          id: string
          included_services: string | null
          itinerary: string
          location: string
          max_group_size: number | null
          name: string
          price: string
          region: string | null
          slug: string | null
          status: string
          updated_at: string
        }
        Insert: {
          activity?: string | null
          best_time?: string | null
          created_at?: string
          description?: string
          difficulty?: string | null
          duration: string
          excluded_services?: string | null
          featured_image_url?: string
          gallery_image_urls?: string[]
          translations?: Json
          highlights?: string[] | null
          id?: string
          included_services?: string | null
          itinerary?: string
          location: string
          max_group_size?: number | null
          name: string
          price: string
          region?: string | null
          slug?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          activity?: string | null
          best_time?: string | null
          created_at?: string
          description?: string
          difficulty?: string | null
          duration?: string
          excluded_services?: string | null
          featured_image_url?: string
          gallery_image_urls?: string[]
          translations?: Json
          highlights?: string[] | null
          id?: string
          included_services?: string | null
          itinerary?: string
          location?: string
          max_group_size?: number | null
          name?: string
          price?: string
          region?: string | null
          slug?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
      journal_posts: {
        Row: {
          id: string
          slug: string
          title: string
          excerpt: string
          body: string
          category: string
          author: string
          read_time: string
          image_url: string
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          title: string
          excerpt?: string
          body?: string
          category?: string
          author?: string
          read_time?: string
          image_url?: string
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          excerpt?: string
          body?: string
          category?: string
          author?: string
          read_time?: string
          image_url?: string
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      journal_likes: {
        Row: { id: string; post_id: string; user_id: string; created_at: string }
        Insert: { id?: string; post_id: string; user_id: string; created_at?: string }
        Update: { id?: string; post_id?: string; user_id?: string; created_at?: string }
        Relationships: []
      }
      journal_comments: {
        Row: { id: string; post_id: string; user_id: string; parent_id: string | null; body: string; created_at: string }
        Insert: { id?: string; post_id: string; user_id: string; parent_id?: string | null; body: string; created_at?: string }
        Update: { id?: string; post_id?: string; user_id?: string; parent_id?: string | null; body?: string; created_at?: string }
        Relationships: []
      }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "client"],
    },
  },
} as const
