
export interface TreasuryBalance {
  id: string;
  entity_id: string;
  currency: string;
  amount: number;
  balance_date: string;
  division?: string;
  region?: string;
  created_at: string;
  updated_at: string;
}

export interface TreasuryTransaction {
  id: string;
  entity_id: string;
  bank_name: string;
  amount: number;
  currency: string;
  transaction_date: string;
  description?: string;
  bai_code?: string;
  status: string;
  tags: string[];
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface TreasuryForecast {
  id: string;
  entity_id: string;
  forecast_date: string;
  amount: number;
  currency: string;
  confidence_level?: number;
  forecast_type: string;
  metadata: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface TreasuryTag {
  id: string;
  name: string;
  color: string;
  rule_pattern?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
