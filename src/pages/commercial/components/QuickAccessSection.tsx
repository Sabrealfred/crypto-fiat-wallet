
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { LucideIcon, ArrowRight, History, LineChart, DollarSign, CreditCard, ShieldCheck, Brain, Database, Code } from "lucide-react";

interface QuickAccessLink {
  title: string;
  icon: LucideIcon;
  path: string;
  description: string;
}

export function QuickAccessSection() {
  const navigate = useNavigate();
  
  const quickAccessLinks: QuickAccessLink[] = [
    {
      title: "Transaction History",
      icon: History,
      path: "/commercial/history",
      description: "View and manage all transactions"
    },
    {
      title: "Cash Flow Analysis",
      icon: LineChart,
      path: "/commercial/treasury/cash-flow",
      description: "Monitor and analyze your cash flow"
    },
    {
      title: "Portfolio Analysis",
      icon: DollarSign,
      path: "/commercial/fund-management/portfolios",
      description: "Manage investment portfolios"
    },
    {
      title: "Payment Processing",
      icon: CreditCard,
      path: "/commercial/payment-processor",
      description: "Process payments and transfers"
    },
    {
      title: "Risk Assessment",
      icon: ShieldCheck,
      path: "/commercial/risk-management/assessment",
      description: "View and manage risk assessments"
    },
    {
      title: "Machine Learning Models",
      icon: Brain,
      path: "/commercial/analytics/ml-models",
      description: "Access ML models and predictions"
    },
    {
      title: "Multi-bank Integration",
      icon: Database,
      path: "/commercial/operations/integration",
      description: "Manage bank connections"
    },
    {
      title: "Developer Portal",
      icon: Code,
      path: "/developer/dashboard",
      description: "Access developer tools and APIs"
    }
  ];

  return (
    <section className="mt-8 fade-in animation-delay-300">
      <div className="flex items-center gap-2 mb-4">
        <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-semibold">Quick Access</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickAccessLinks.map((link, index) => (
          <Card 
            key={index} 
            className="hover:shadow-md transition-all border-blue-100 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"
            onClick={() => navigate(link.path)}
          >
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/40 mb-3">
                <link.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-medium text-blue-900 dark:text-blue-100">{link.title}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{link.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
