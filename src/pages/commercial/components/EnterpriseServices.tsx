
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  DollarSign,
  FileText,
  BarChart,
  Users,
  Globe,
  ShieldCheck,
  CreditCard,
  Briefcase,
  ArrowRight
} from "lucide-react";

export function EnterpriseServices() {
  const navigate = useNavigate();

  const services = [
    {
      title: "Treasury",
      description: "Manage treasury operations",
      icon: Building2,
      items: [
        { name: "Dashboard", path: "/commercial/treasury" },
        { name: "Cash Flow", path: "/commercial/treasury/cash-flow" },
        { name: "Transactions", path: "/commercial/treasury/transactions" },
        { name: "Investments", path: "/commercial/treasury/investments" },
        { name: "FX Operations", path: "/commercial/treasury/fx" }
      ]
    },
    {
      title: "Operations",
      description: "Commercial operations management",
      icon: BarChart,
      items: [
        { name: "Payroll", path: "/commercial/payroll" },
        { name: "Invoices", path: "/commercial/invoices" },
        { name: "Expenses", path: "/commercial/expenses" },
        { name: "Trade Finance", path: "/commercial/trade-finance" },
        { name: "Risk Management", path: "/commercial/risk-management" },
        { name: "Payment Processor", path: "/commercial/payment-processor" }
      ]
    },
    {
      title: "Fund Management",
      description: "Investment and portfolio management",
      icon: DollarSign,
      items: [
        { name: "Dashboard", path: "/commercial/fund-management" },
        { name: "Portfolios", path: "/commercial/fund-management/portfolios" },
        { name: "AI Portfolios", path: "/commercial/fund-management/portfolios/ai" }
      ]
    }
  ];

  return (
    <div className="grid gap-4">
      {services.map((service) => (
        <Card key={service.title} className="glass-card transition-all hover:shadow-lg">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <service.icon className="h-5 w-5 text-primary" />
              {service.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{service.description}</p>
          </CardHeader>
          <CardContent>
            <div className="grid gap-2">
              {service.items.map((item) => (
                <Button
                  key={item.path}
                  variant="outline"
                  className="w-full justify-between hover:bg-primary hover:text-primary-foreground transition-colors"
                  onClick={() => navigate(item.path)}
                >
                  <span>{item.name}</span>
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
