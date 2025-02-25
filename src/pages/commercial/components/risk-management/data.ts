
import { 
  Shield, 
  LineChart, 
  AlertTriangle, 
  Lock, 
  TrendingUp, 
  DollarSign, 
  Users,
  Building2,
  Scale,
  FileWarning,
} from "lucide-react";
import { RiskCategory, AdditionalRisk } from "./types";

export const riskCategories: RiskCategory[] = [
  {
    title: "Market Risk Analysis",
    description: "Monitor and analyze market risk exposure",
    icon: LineChart,
    lastUpdate: "2024-03-15T14:30:00",
    metrics: [
      { name: "VaR (Value at Risk)", value: "2.3M", change: "+0.5%", status: 'warning' },
      { name: "Position Limit Usage", value: "67%", change: "-3%", status: 'good' },
      { name: "Market Volatility Index", value: "18.4", change: "+2.1", status: 'warning' }
    ]
  },
  {
    title: "Credit Risk Assessment",
    description: "Evaluate and manage counterparty risks",
    icon: Shield,
    lastUpdate: "2024-03-15T14:30:00",
    metrics: [
      { name: "Total Exposure", value: "12.8M", change: "+1.2%", status: 'warning' },
      { name: "Default Probability", value: "0.8%", change: "-0.1%", status: 'good' },
      { name: "Credit Rating Distribution", value: "A+", change: "stable", status: 'good' }
    ]
  },
  {
    title: "Operational Risk",
    description: "Identify and mitigate operational risks",
    icon: AlertTriangle,
    lastUpdate: "2024-03-15T14:30:00",
    metrics: [
      { name: "Incident Rate", value: "0.05%", change: "-0.02%", status: 'good' },
      { name: "System Uptime", value: "99.9%", change: "+0.1%", status: 'good' },
      { name: "Control Effectiveness", value: "94%", change: "+2%", status: 'good' }
    ]
  },
  {
    title: "Compliance Management",
    description: "Ensure regulatory compliance and reporting",
    icon: Lock,
    lastUpdate: "2024-03-15T14:30:00",
    metrics: [
      { name: "Compliance Score", value: "96%", change: "+1%", status: 'good' },
      { name: "Open Findings", value: "3", change: "-2", status: 'warning' },
      { name: "Regulatory Reports", value: "100%", change: "stable", status: 'good' }
    ]
  }
];

export const additionalRisks: AdditionalRisk[] = [
  {
    title: "Liquidity Risk",
    description: "Monitor and manage liquidity positions",
    icon: DollarSign,
  },
  {
    title: "Counterparty Risk",
    description: "Track and assess trading partner risks",
    icon: Users,
  },
  {
    title: "Country Risk",
    description: "Evaluate geographical exposure risks",
    icon: Building2,
  },
  {
    title: "Legal & Regulatory Risk",
    description: "Monitor compliance and legal exposure",
    icon: Scale,
  },
  {
    title: "Model Risk",
    description: "Validate and monitor risk models",
    icon: FileWarning,
  },
  {
    title: "Trading Risk",
    description: "Monitor trading activities and limits",
    icon: TrendingUp,
  }
];
