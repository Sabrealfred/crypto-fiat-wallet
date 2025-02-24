
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
      accounts: {
        Row: {
          account_number: string
          balance: number
          created_at: string
          currency: string
          id: string
          is_active: boolean
          updated_at: string
          user_id: string
        }
        Insert: {
          account_number: string
          balance?: number
          created_at?: string
          currency?: string
          id?: string
          is_active?: boolean
          updated_at?: string
          user_id?: string
        }
        Update: {
          account_number?: string
          balance?: number
          created_at?: string
          currency?: string
          id?: string
          is_active?: boolean
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          address: string | null
          birth_date: string | null
          phone_number: string | null
          kyc_status: string | null
          preferred_currency: string | null
          preferred_language: string | null
          two_fa_enabled: boolean | null
          role_id: string | null
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name?: string | null
          last_name?: string | null
          address?: string | null
          birth_date?: string | null
          phone_number?: string | null
          kyc_status?: string | null
          preferred_currency?: string | null
          preferred_language?: string | null
          two_fa_enabled?: boolean | null
          role_id?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          address?: string | null
          birth_date?: string | null
          phone_number?: string | null
          kyc_status?: string | null
          preferred_currency?: string | null
          preferred_language?: string | null
          two_fa_enabled?: boolean | null
          role_id?: string | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          profile_type: string
          business_name: string | null
          tax_id: string | null
          industry: string | null
          company_size: string | null
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          profile_type: string
          business_name?: string | null
          tax_id?: string | null
          industry?: string | null
          company_size?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          profile_type?: string
          business_name?: string | null
          tax_id?: string | null
          industry?: string | null
          company_size?: string | null
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      currencies: {
        Row: {
          code: string
          name: string
          symbol: string
          exchange_rate: number
          is_active: boolean
          last_updated: string
        }
        Insert: {
          code: string
          name: string
          symbol: string
          exchange_rate?: number
          is_active?: boolean
          last_updated?: string
        }
        Update: {
          code?: string
          name?: string
          symbol?: string
          exchange_rate?: number
          is_active?: boolean
          last_updated?: string
        }
        Relationships: []
      }
      transactions: {
        Row: {
          id: string
          user_id: string
          wallet_id: string
          amount: number
          currency: string
          transaction_type: string
          status: string
          recipient_address: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          wallet_id: string
          amount: number
          currency: string
          transaction_type: string
          status?: string
          recipient_address: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          wallet_id?: string
          amount?: number
          currency?: string
          transaction_type?: string
          status?: string
          recipient_address?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          id: string
          user_id: string
          currency: string
          currency_code: string
          balance: number
          wallet_type: string
          address: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          currency: string
          currency_code: string
          balance?: number
          wallet_type: string
          address?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          currency?: string
          currency_code?: string
          balance?: number
          wallet_type?: string
          address?: string
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          type: string
          amount: number | null
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          type: string
          amount?: number | null
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          type?: string
          amount?: number | null
          read?: boolean
          created_at?: string
        }
        Relationships: []
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
