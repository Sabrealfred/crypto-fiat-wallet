
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, FileText, Globe, Shield, BarChart3, Users2 } from "lucide-react";
import { Link } from "react-router-dom";

const commercialServices = [
  {
    icon: Building2,
    title: "Treasury Management",
    description: "Manage cash flow, investments and liquidity",
    path: "/commercial/treasury"
  },
  {
    icon: FileText,
    title: "Trade Finance",
    description: "International trade and supply chain financing",
    path: "/commercial/trade-finance"
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Comprehensive risk analysis and hedging solutions",
    path: "/commercial/risk-management"
  },
  {
    icon: Users2,
    title: "Payroll Services",
    description: "Employee payment management and processing",
    path: "/commercial/payroll"
  },
  {
    icon: BarChart3,
    title: "Business Analytics",
    description: "Financial reporting and business intelligence",
    path: "/commercial/analytics"
  },
  {
    icon: Globe,
    title: "Global Banking",
    description: "International banking and forex services",
    path: "/commercial/global-banking"
  }
];

export function CommercialServices() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {commercialServices.map((service, index) => {
        const Icon = service.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{service.description}</CardDescription>
              <Link to={service.path}>
                <Button className="w-full">Access Service</Button>
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
