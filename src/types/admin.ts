
export interface AdminUser {
  id: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  kyc_status: string;
  user_roles: { role: string }[];
}

export interface AdminTransaction {
  id: string;
  created_at: string;
  transaction_type: string;
  amount: number;
  status: string;
  profiles: {
    first_name: string;
    last_name: string;
  };
}

export interface FinancialProduct {
  id: string;
  name: string;
  type: string;
  description: string;
  interest_rate: number;
  terms: string;
  min_amount: number;
  max_amount: number;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'closed' | 'escalated';
  user_id: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
  resolution?: string;
}

export interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  details: any;
  ip_address: string;
  user_agent: string;
  created_at: string;
}

export interface KYCDocument {
  id: string;
  user_id: string;
  document_type: string;
  document_number: string;
  document_url: string;
  verification_status: 'pending' | 'approved' | 'rejected';
  verified_by?: string;
  verified_at?: string;
  created_at: string;
}
