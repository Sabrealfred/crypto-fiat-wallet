
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Shield, LineChart, AlertTriangle, Lock } from "lucide-react";

export default function RiskManagementPage() {
  const riskServices = [
    {
      title: "Market Risk Analysis",
      description: "Monitor and analyze market risk exposure",
      icon: LineChart,
    },
    {
      title: "Credit Risk Assessment",
      description: "Evaluate and manage counterparty risks",
      icon: Shield,
    },
    {
      title: "Operational Risk",
      description: "Identify and mitigate operational risks",
      icon: AlertTriangle,
    },
    {
      title: "Compliance Management",
      description: "Ensure regulatory compliance and reporting",
      icon: Lock,
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Risk Management</h1>
          <p className="text-muted-foreground">
            Comprehensive risk analysis and management tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {riskServices.map((service, index) => (
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
