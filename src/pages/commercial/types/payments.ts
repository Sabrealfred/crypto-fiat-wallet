
export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'processing' | 'failed' | 'reconciled';
  type: 'wire' | 'ach' | 'swift' | 'rtp' | 'internal';
  date: string;
  recipient: string;
  reference?: string;
  description?: string;
  baiCode?: string;
  bankName?: string;
  entityId?: string;
  division?: string;
  region?: string;
  tags?: string[];
  reconciled?: boolean;
  reconciledDate?: string;
  valueDate?: string;
}

export interface PaymentTag {
  id: string;
  name: string;
  color: string;
  rules?: PaymentTagRule[];
}

export interface PaymentTagRule {
  id: string;
  field: 'amount' | 'currency' | 'recipient' | 'description' | 'bankName' | 'baiCode';
  operator: 'equals' | 'contains' | 'startsWith' | 'endsWith' | 'greaterThan' | 'lessThan';
  value: string;
}

export interface Entity {
  id: string;
  name: string;
  type: 'subsidiary' | 'division' | 'department';
  parentId?: string;
  metadata?: Record<string, any>;
}

export interface CashPosition {
  accountId: string;
  accountName: string;
  currentBalance: number;
  projectedBalance: number;
  currency: string;
  status: 'excess' | 'deficit' | 'balanced';
}

export interface Forecast {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  data: ForecastDataPoint[];
  modelType: 'ml' | 'manual' | 'hybrid';
  accuracy?: number;
}

export interface ForecastDataPoint {
  date: string;
  amount: number;
  confidence?: number;
}
