
export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'processing' | 'failed';
  type: 'wire' | 'ach' | 'swift';
  date: string;
  recipient: string;
}
