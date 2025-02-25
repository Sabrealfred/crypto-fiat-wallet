
export interface TagStats {
  tag: string;
  totalAmount: number;
  count: number;
  averageAmount: number;
  monthlyGrowth?: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface MonthlyTagStats {
  month: string;
  [key: string]: number | string;
}
