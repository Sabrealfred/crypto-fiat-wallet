
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
  Briefcase
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
    <div className="space-y-6">
      {services.map((service) => (
        <Card key={service.title}>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <service.icon className="h-5 w-5" />
              {service.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
            <div className="grid gap-2">
              {service.items.map((item) => (
                <Button
                  key={item.path}
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate(item.path)}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
