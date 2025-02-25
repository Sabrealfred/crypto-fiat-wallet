
export interface TagStats {
  tag: string;
  totalAmount: number;
  count: number;
  averageAmount: number;
  monthlyGrowth?: number;
  percentageChange?: number;
  trend?: 'up' | 'down' | 'stable';
}

export interface MonthlyTagStats {
  month: string;
  [key: string]: number | string;
}

export interface ComparisonStats {
  currentPeriod: number;
  previousPeriod: number;
  percentageChange: number;
}
