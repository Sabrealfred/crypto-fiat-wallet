
export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  type: 'wire' | 'ach' | 'swift';
  date: string;
  recipient: string;
}

export interface PaymentProcessor {
  processBatch: (payments: Payment[]) => Promise<void>;
  processPayment: (payment: Payment) => Promise<void>;
  getPaymentStatus: (id: string) => Promise<string>;
  reconcilePayments: (startDate: Date, endDate: Date) => Promise<void>;
}
