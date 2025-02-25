
import { LucideIcon } from "lucide-react";

export type RiskMetric = {
  name: string;
  value: string;
  change: string;
  status: 'good' | 'warning' | 'critical' | 'neutral';
};

export type RiskCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
  metrics: RiskMetric[];
  lastUpdate?: string;
};

export type AdditionalRisk = {
  title: string;
  description: string;
  icon: LucideIcon;
};
