
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Wallet,
  DollarSign,
  CreditCard,
  FileText,
  Receipt,
  RefreshCw,
  Settings,
  ShieldCheck,
  Users,
  BarChart,
  Landmark
} from "lucide-react";

const operationSections = [
  {
    title: "Account Management",
    icon: Building2,
    items: [
      { name: "Commercial Accounts", path: "/commercial/operations/accounts", progress: 40 },
      { name: "Business Services", path: "/commercial/operations/services", progress: 35 },
      { name: "Account Settings", path: "/commercial/operations/settings", progress: 50 }
    ]
  },
  {
    title: "Financial Operations",
    icon: DollarSign,
    items: [
      { name: "Payment Processing", path: "/commercial/payment-processor", progress: 70 },
      { name: "Liquidity Management", path: "/commercial/operations/liquidity", progress: 45 },
      { name: "Cash Management", path: "/commercial/operations/cash", progress: 60 }
    ]
  },
  {
    title: "Risk & Compliance",
    icon: ShieldCheck,
    items: [
      { name: "Risk Assessment", path: "/commercial/risk-management", progress: 55 },
      { name: "Compliance Reports", path: "/commercial/operations/compliance", progress: 30 },
      { name: "Audit Logs", path: "/commercial/operations/audit", progress: 40 }
    ]
  },
  {
    title: "Reports & Analytics",
    icon: BarChart,
    items: [
      { name: "Performance Reports", path: "/commercial/operations/reports", progress: 50 },
      { name: "Business Analytics", path: "/commercial/operations/analytics", progress: 45 },
      { name: "Custom Reports", path: "/commercial/operations/custom-reports", progress: 25 }
    ]
  }
];

const metrics = [
  { title: "Active Accounts", value: "234", icon: Users, change: "+12% vs last month" },
  { title: "Daily Transactions", value: "1,423", icon: RefreshCw, change: "+5% vs last month" },
  { title: "Total Volume", value: "$2.4M", icon: DollarSign, change: "+8% vs last month" },
  { title: "Efficiency Rate", value: "94%", icon: Settings, change: "+2% vs last month" }
];

export default function OperationsDashboard() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Operations Dashboard"
          description="Manage and monitor your business operations"
          showBack={true}
        />

        {/* Metrics Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric) => (
            <Card key={metric.title}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
                    <p className="text-sm text-green-500 mt-1">{metric.change}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-primary/10">
                    <metric.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Operation Sections */}
        {operationSections.map((section) => (
          <div key={section.title} className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <section.icon className="h-5 w-5" />
              <h2 className="text-lg font-semibold">{section.title}</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {section.items.map((item) => (
                <Card 
                  key={item.name}
                  className="cursor-pointer hover:bg-accent transition-colors"
                  onClick={() => navigate(item.path)}
                >
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-2">{item.name}</h3>
                    <div className="w-full bg-secondary h-2 rounded-full">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {item.progress}% completado
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
