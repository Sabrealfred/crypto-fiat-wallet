
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Globe, FileText, ShieldCheck, Building } from "lucide-react";

export default function TradeFinancePage() {
  const tradeServices = [
    {
      title: "Letters of Credit",
      description: "Issue and manage international letters of credit",
      icon: FileText,
    },
    {
      title: "Trade Guarantees",
      description: "Secure your international trade operations",
      icon: ShieldCheck,
    },
    {
      title: "Import/Export Financing",
      description: "Access working capital for international trade",
      icon: Globe,
    },
    {
      title: "Supply Chain Finance",
      description: "Optimize your supply chain financing",
      icon: Building,
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Trade Finance</h1>
          <p className="text-muted-foreground">
            Comprehensive solutions for international trade operations
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tradeServices.map((service, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  {service.title}
                </CardTitle>
                <service.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {service.description}
                </p>
                <Button variant="outline" className="w-full">
                  Access Service
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
