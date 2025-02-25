
export type RiskMetric = {
  name: string;
  value: string;
  change: string;
  status: 'good' | 'warning' | 'critical' | 'neutral';
};

export type RiskCategory = {
  title: string;
  description: string;
  icon: any;
  metrics: RiskMetric[];
  lastUpdate?: string;
};

export type AdditionalRisk = {
  title: string;
  description: string;
  icon: any;
};
