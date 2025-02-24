export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accounts: {
        Row: {
          account_number: string
          account_type: Database["public"]["Enums"]["account_type"]
          balance: number | null
          business_type: Database["public"]["Enums"]["business_type"] | null
          created_at: string
          currency: string | null
          id: string
          is_active: boolean | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          account_number: string
          account_type: Database["public"]["Enums"]["account_type"]
          balance?: number | null
          business_type?: Database["public"]["Enums"]["business_type"] | null
          created_at?: string
          currency?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          account_number?: string
          account_type?: Database["public"]["Enums"]["account_type"]
          balance?: number | null
          business_type?: Database["public"]["Enums"]["business_type"] | null
          created_at?: string
          currency?: string | null
          id?: string
          is_active?: boolean | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          id: string
          ip_address: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          id?: string
          ip_address?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      bill_payments: {
        Row: {
          account_number: string | null
          amount: number
          created_at: string | null
          currency: string | null
          due_date: string | null
          id: string
          is_recurring: boolean | null
          payment_date: string | null
          provider_name: string
          service_type: string
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          account_number?: string | null
          amount: number
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          id?: string
          is_recurring?: boolean | null
          payment_date?: string | null
          provider_name: string
          service_type: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          account_number?: string | null
          amount?: number
          created_at?: string | null
          currency?: string | null
          due_date?: string | null
          id?: string
          is_recurring?: boolean | null
          payment_date?: string | null
          provider_name?: string
          service_type?: string
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bill_payments_currency_fkey"
            columns: ["currency"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "bill_payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cards: {
        Row: {
          card_number: string | null
          card_status: string | null
          card_type: string
          created_at: string
          cvv: string | null
          expiry_date: string | null
          id: string
          is_virtual: boolean | null
          updated_at: string
          user_id: string
        }
        Insert: {
          card_number?: string | null
          card_status?: string | null
          card_type: string
          created_at?: string
          cvv?: string | null
          expiry_date?: string | null
          id?: string
          is_virtual?: boolean | null
          updated_at?: string
          user_id: string
        }
        Update: {
          card_number?: string | null
          card_status?: string | null
          card_type?: string
          created_at?: string
          cvv?: string | null
          expiry_date?: string | null
          id?: string
          is_virtual?: boolean | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cards_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      check_deposits: {
        Row: {
          account_number: string | null
          amount: number
          back_image_url: string | null
          bank_name: string | null
          check_number: string | null
          created_at: string | null
          currency: string | null
          deposit_date: string | null
          front_image_url: string | null
          id: string
          notes: string | null
          review_date: string | null
          routing_number: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          account_number?: string | null
          amount: number
          back_image_url?: string | null
          bank_name?: string | null
          check_number?: string | null
          created_at?: string | null
          currency?: string | null
          deposit_date?: string | null
          front_image_url?: string | null
          id?: string
          notes?: string | null
          review_date?: string | null
          routing_number?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          account_number?: string | null
          amount?: number
          back_image_url?: string | null
          bank_name?: string | null
          check_number?: string | null
          created_at?: string | null
          currency?: string | null
          deposit_date?: string | null
          front_image_url?: string | null
          id?: string
          notes?: string | null
          review_date?: string | null
          routing_number?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "check_deposits_currency_fkey"
            columns: ["currency"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "check_deposits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      currencies: {
        Row: {
          code: string
          exchange_rate: number | null
          is_active: boolean | null
          last_updated: string | null
          name: string
          symbol: string
        }
        Insert: {
          code: string
          exchange_rate?: number | null
          is_active?: boolean | null
          last_updated?: string | null
          name: string
          symbol: string
        }
        Update: {
          code?: string
          exchange_rate?: number | null
          is_active?: boolean | null
          last_updated?: string | null
          name?: string
          symbol?: string
        }
        Relationships: []
      }
      developer_keys: {
        Row: {
          api_key: string
          created_at: string | null
          environment: string
          id: string
          is_active: boolean | null
          last_used: string | null
          name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          api_key: string
          created_at?: string | null
          environment: string
          id?: string
          is_active?: boolean | null
          last_used?: string | null
          name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          api_key?: string
          created_at?: string | null
          environment?: string
          id?: string
          is_active?: boolean | null
          last_used?: string | null
          name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      financial_products: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          interest_rate: number | null
          max_amount: number | null
          min_amount: number | null
          name: string
          status: string | null
          terms: string | null
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          interest_rate?: number | null
          max_amount?: number | null
          min_amount?: number | null
          name: string
          status?: string | null
          terms?: string | null
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          interest_rate?: number | null
          max_amount?: number | null
          min_amount?: number | null
          name?: string
          status?: string | null
          terms?: string | null
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      kyc_documents: {
        Row: {
          created_at: string
          document_status: string | null
          document_type: string
          document_url: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          document_status?: string | null
          document_type: string
          document_url?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          document_status?: string | null
          document_type?: string
          document_url?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "kyc_documents_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          amount: number | null
          created_at: string | null
          description: string
          id: string
          read: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          description: string
          id?: string
          read?: boolean | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          description?: string
          id?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          birth_date: string | null
          created_at: string
          first_name: string | null
          id: string
          kyc_status: string | null
          last_name: string | null
          phone_number: string | null
          preferred_currency: string | null
          preferred_language: string | null
          role_id: string | null
          status: string | null
          two_fa_enabled: boolean | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          birth_date?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          kyc_status?: string | null
          last_name?: string | null
          phone_number?: string | null
          preferred_currency?: string | null
          preferred_language?: string | null
          role_id?: string | null
          status?: string | null
          two_fa_enabled?: boolean | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          birth_date?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          kyc_status?: string | null
          last_name?: string | null
          phone_number?: string | null
          preferred_currency?: string | null
          preferred_language?: string | null
          role_id?: string | null
          status?: string | null
          two_fa_enabled?: boolean | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          permissions: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          permissions?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          permissions?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      scheduled_savings: {
        Row: {
          amount_per_frequency: number
          created_at: string | null
          currency: string | null
          current_amount: number | null
          destination_wallet_id: string | null
          end_date: string | null
          frequency: string
          id: string
          name: string
          source_wallet_id: string | null
          start_date: string | null
          status: string | null
          target_amount: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount_per_frequency: number
          created_at?: string | null
          currency?: string | null
          current_amount?: number | null
          destination_wallet_id?: string | null
          end_date?: string | null
          frequency: string
          id?: string
          name: string
          source_wallet_id?: string | null
          start_date?: string | null
          status?: string | null
          target_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount_per_frequency?: number
          created_at?: string | null
          currency?: string | null
          current_amount?: number | null
          destination_wallet_id?: string | null
          end_date?: string | null
          frequency?: string
          id?: string
          name?: string
          source_wallet_id?: string | null
          start_date?: string | null
          status?: string | null
          target_amount?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scheduled_savings_currency_fkey"
            columns: ["currency"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "scheduled_savings_destination_wallet_id_fkey"
            columns: ["destination_wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_savings_source_wallet_id_fkey"
            columns: ["source_wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scheduled_savings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          description: string
          id: string
          resolution: string | null
          status: Database["public"]["Enums"]["ticket_status"] | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          description: string
          id?: string
          resolution?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          description?: string
          id?: string
          resolution?: string | null
          status?: Database["public"]["Enums"]["ticket_status"] | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      system_settings: {
        Row: {
          created_at: string | null
          description: string | null
          key: string
          updated_at: string | null
          value: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          key: string
          updated_at?: string | null
          value: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          key?: string
          updated_at?: string | null
          value?: string
        }
        Relationships: []
      }
      time_deposits: {
        Row: {
          amount: number
          auto_renew: boolean | null
          created_at: string | null
          currency: string | null
          id: string
          interest_rate: number
          maturity_date: string | null
          start_date: string | null
          status: string | null
          term_months: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          auto_renew?: boolean | null
          created_at?: string | null
          currency?: string | null
          id?: string
          interest_rate: number
          maturity_date?: string | null
          start_date?: string | null
          status?: string | null
          term_months: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          auto_renew?: boolean | null
          created_at?: string | null
          currency?: string | null
          id?: string
          interest_rate?: number
          maturity_date?: string | null
          start_date?: string | null
          status?: string | null
          term_months?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "time_deposits_currency_fkey"
            columns: ["currency"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "time_deposits_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      transactions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          recipient_address: string | null
          status: string | null
          transaction_type: string
          updated_at: string
          user_id: string
          wallet_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency: string
          id?: string
          recipient_address?: string | null
          status?: string | null
          transaction_type: string
          updated_at?: string
          user_id: string
          wallet_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          recipient_address?: string | null
          status?: string | null
          transaction_type?: string
          updated_at?: string
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      transfer_types: {
        Row: {
          code: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          requirements: Json | null
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          requirements?: Json | null
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          requirements?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      transfers: {
        Row: {
          amount: number
          created_at: string | null
          destination_currency: string
          destination_details: Json
          destination_type: string
          exchange_rate: number
          id: string
          is_recurring: boolean | null
          recipient_bank_info: Json | null
          scheduled_date: string | null
          source_currency: string
          source_wallet_id: string
          status: string | null
          transfer_method: string
          transfer_type_id: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          destination_currency: string
          destination_details: Json
          destination_type: string
          exchange_rate: number
          id?: string
          is_recurring?: boolean | null
          recipient_bank_info?: Json | null
          scheduled_date?: string | null
          source_currency: string
          source_wallet_id: string
          status?: string | null
          transfer_method?: string
          transfer_type_id?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          destination_currency?: string
          destination_details?: Json
          destination_type?: string
          exchange_rate?: number
          id?: string
          is_recurring?: boolean | null
          recipient_bank_info?: Json | null
          scheduled_date?: string | null
          source_currency?: string
          source_wallet_id?: string
          status?: string | null
          transfer_method?: string
          transfer_type_id?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transfers_destination_currency_fkey"
            columns: ["destination_currency"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "transfers_source_currency_fkey"
            columns: ["source_currency"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "transfers_source_wallet_id_fkey"
            columns: ["source_wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transfers_transfer_type_id_fkey"
            columns: ["transfer_type_id"]
            isOneToOne: false
            referencedRelation: "transfer_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "transfers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          business_name: string | null
          company_size: string | null
          created_at: string | null
          id: string
          industry: string | null
          is_active: boolean | null
          profile_type: Database["public"]["Enums"]["profile_type"]
          tax_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          business_name?: string | null
          company_size?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          profile_type: Database["public"]["Enums"]["profile_type"]
          tax_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          business_name?: string | null
          company_size?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          is_active?: boolean | null
          profile_type?: Database["public"]["Enums"]["profile_type"]
          tax_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      wallets: {
        Row: {
          address: string | null
          balance: number | null
          created_at: string
          currency: string
          currency_code: string | null
          id: string
          updated_at: string
          user_id: string
          wallet_type: string
        }
        Insert: {
          address?: string | null
          balance?: number | null
          created_at?: string
          currency: string
          currency_code?: string | null
          id?: string
          updated_at?: string
          user_id: string
          wallet_type: string
        }
        Update: {
          address?: string | null
          balance?: number | null
          created_at?: string
          currency?: string
          currency_code?: string | null
          id?: string
          updated_at?: string
          user_id?: string
          wallet_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallets_currency_code_fkey"
            columns: ["currency_code"]
            isOneToOne: false
            referencedRelation: "currencies"
            referencedColumns: ["code"]
          },
          {
            foreignKeyName: "wallets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      account_type: "savings" | "checking" | "investment" | "credit"
      business_type: "personal" | "business" | "commercial" | "private_banking"
      kyc_status: "pending" | "approved" | "rejected"
      profile_type:
        | "personal"
        | "business"
        | "commercial"
        | "private_banking"
        | "developer"
      ticket_status: "open" | "in_progress" | "closed" | "escalated"
      transaction_status: "pending" | "approved" | "rejected" | "completed"
      transaction_type: "deposit" | "withdrawal" | "transfer" | "payment"
      user_role: "admin" | "user" | "auditor" | "operator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
