
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { TreasuryBalance, TreasuryForecast } from "@/types/treasury";
import { BarChart3, TrendingUp, PieChart, ArrowDownUp } from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";

const TreasuryDashboard = () => {
  const { data: balances = [] } = useQuery({
    queryKey: ['treasury-balances'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('treasury_balances')
        .select('*')
        .order('balance_date', { ascending: false });
      
      if (error) throw error;
      return data as TreasuryBalance[];
    }
  });

  const { data: forecasts = [] } = useQuery({
    queryKey: ['treasury-forecasts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('treasury_forecasts')
        .select('*')
        .order('forecast_date', { ascending: true })
        .limit(5);
      
      if (error) throw error;
      return data as TreasuryForecast[];
    }
  });

  const modules = [
    {
      title: "Cash Flow Analysis",
      description: "Monitor cash flow and liquidity positions",
      icon: TrendingUp,
      route: "/commercial/treasury/cash-flow"
    },
    {
      title: "Transactions",
      description: "View and manage treasury transactions",
      icon: BarChart3,
      route: "/commercial/treasury/transactions"
    },
    {
      title: "Investment Management",
      description: "Manage short-term investments",
      icon: PieChart,
      route: "/commercial/treasury/investments"
    },
    {
      title: "FX Operations",
      description: "Manage foreign exchange positions",
      icon: ArrowDownUp,
      route: "/commercial/treasury/fx"
    }
  ];

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Treasury Management</h1>
          <p className="text-muted-foreground mt-2">
            Monitor and manage your organization's treasury operations
          </p>
        </div>

        {/* Balance Summary */}
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          {balances.slice(0, 3).map((balance) => (
            <Card key={balance.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Balance ({balance.currency})
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: balance.currency
                  }).format(balance.amount)}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Treasury Modules */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((module, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  {module.title}
                </CardTitle>
                <module.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {module.description}
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.location.href = module.route}
                >
                  Access Module
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

export default TreasuryDashboard;
