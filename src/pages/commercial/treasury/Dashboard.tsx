
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { ChartBar, ChartLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TreasuryDashboard() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Treasury Management</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage your treasury operations
            </p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="cursor-pointer hover:bg-muted/50" onClick={() => navigate("transactions")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartBar className="h-5 w-5" />
                Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                View and manage treasury transactions
              </p>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:bg-muted/50" onClick={() => navigate("cash-flow")}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartLine className="h-5 w-5" />
                Cash Flow
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Monitor and forecast cash flow
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate("transactions")}
              >
                View All Transactions
              </Button>
              <Button 
                className="w-full justify-start" 
                variant="outline"
                onClick={() => navigate("cash-flow")}
              >
                Cash Flow Analysis
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
