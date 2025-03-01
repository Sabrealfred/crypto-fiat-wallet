
import { Button } from "@/components/ui/button";
import { QuickActionCard } from "./QuickActionCard";
import { 
  Globe, 
  RefreshCw, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  BarChart4,
  Bell,
  Download
} from "lucide-react";

// Quick actions data
const quickActions = [
  {
    title: "FX Operations",
    icon: Globe,
    path: "/commercial/treasury/fx",
    description: "Manage foreign exchange"
  },
  {
    title: "Cash Pooling",
    icon: RefreshCw,
    path: "/commercial/treasury/cash-flow",
    description: "Optimize liquidity"
  },
  {
    title: "Payment Processing",
    icon: CreditCard,
    path: "/commercial/payment-processor",
    description: "Process transactions"
  },
  {
    title: "Balance Explorer",
    icon: DollarSign,
    path: "/commercial/treasury/balances",
    description: "View all accounts"
  },
  {
    title: "Reconciliation",
    icon: TrendingUp,
    path: "/commercial/treasury/transactions",
    description: "Match transactions"
  },
  {
    title: "Cash Forecasting",
    icon: BarChart4,
    path: "/commercial/treasury/forecast",
    description: "Predict future flows"
  },
  {
    title: "Risk Management",
    icon: Bell,
    path: "/commercial/risk-management",
    description: "Monitor exposure"
  },
  {
    title: "Reporting",
    icon: Download,
    path: "/commercial/treasury/reports",
    description: "Generate reports"
  }
];

export const MyDaySection = () => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">My Day</h3>
        <Button variant="outline" size="sm">View All</Button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.slice(0, 8).map((action) => (
          <QuickActionCard 
            key={action.title}
            title={action.title}
            icon={action.icon}
            path={action.path}
            description={action.description}
          />
        ))}
      </div>
    </div>
  );
};
