
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Wallet,
  LineChart,
  DollarSign,
  CreditCard,
  FileText,
  Receipt,
  Building2,
} from "lucide-react";

const services = [
  {
    title: "Treasury Management",
    icon: DollarSign,
    description: "Manage cash flow and financial operations",
    path: "/commercial/treasury"
  },
  {
    title: "Fund Management",
    icon: LineChart,
    description: "Investment portfolio and fund administration",
    path: "/commercial/fund-management"
  },
  {
    title: "Operations",
    icon: Building2,
    description: "Manage business operations",
    path: "/commercial/operations"
  },
  {
    title: "Corporate Cards",
    icon: CreditCard,
    description: "Manage business credit cards",
    path: "/commercial/cards"
  },
  {
    title: "Invoice Management",
    icon: FileText,
    description: "Process and track invoices",
    path: "/commercial/invoices"
  },
  {
    title: "Payroll Services",
    icon: Receipt,
    description: "Employee payment management",
    path: "/commercial/payroll"
  }
];

export function EnterpriseServices() {
  const navigate = useNavigate();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {services.map((service) => (
        <Button
          key={service.title}
          variant="outline"
          className="h-auto p-4 flex flex-col items-center gap-2 hover:bg-primary/5"
          onClick={() => navigate(service.path)}
        >
          <service.icon className="h-8 w-8 mb-2" />
          <h3 className="font-semibold">{service.title}</h3>
          <p className="text-sm text-muted-foreground text-center">
            {service.description}
          </p>
        </Button>
      ))}
    </div>
  );
}
