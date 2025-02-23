
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, BarChart3, PieChart, TrendingUp, ArrowUpDown } from "lucide-react";

export default function TreasuryPage() {
  const treasuryServices = [
    {
      title: "Cash Flow Management",
      description: "Monitor and optimize your company's cash flow in real-time",
      icon: TrendingUp,
    },
    {
      title: "Liquidity Analysis",
      description: "Track and manage your liquidity positions across accounts",
      icon: BarChart3,
    },
    {
      title: "Investment Portfolio",
      description: "Manage short-term investments and returns",
      icon: PieChart,
    },
    {
      title: "FX Management",
      description: "Handle foreign exchange operations and exposure",
      icon: ArrowUpDown,
    },
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Treasury Management</h1>
          <p className="text-muted-foreground">
            Optimize your company's liquidity, investments, and risk management
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {treasuryServices.map((service, index) => (
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
