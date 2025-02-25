import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { QuickAccessGrid } from "./components/risk-management/QuickAccessGrid";
import { RiskMetricCard } from "./components/risk-management/RiskMetricCard";
import { AdditionalRiskCard } from "./components/risk-management/AdditionalRiskCard";
import { riskCategories, additionalRisks } from "./components/risk-management/data";
import { RiskMetric } from "./components/risk-management/types";

export default function RiskManagementPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Risk metrics updated successfully");
    }, 1500);
  };

  const getStatusColor = (status: RiskMetric['status']) => {
    switch (status) {
      case 'good':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <CommercialHeader 
          title="Risk Management"
          description="Monitor and manage business risks"
          showBack={true}
        />

        <QuickAccessGrid />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="reports">Risk Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {riskCategories.map((category, index) => (
                <RiskMetricCard 
                  key={index}
                  category={category}
                  getStatusColor={getStatusColor}
                />
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Additional Risk Categories</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {additionalRisks.map((risk, index) => (
                  <AdditionalRiskCard key={index} risk={risk} />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details">
            <Card className="p-6">
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">Detailed Risk Analysis</h3>
                <p className="text-muted-foreground">
                  Select a risk category above to view detailed analysis and metrics.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="p-6">
              <CardContent>
                <h3 className="text-lg font-semibold mb-4">Risk Reports</h3>
                <p className="text-muted-foreground">
                  Generate and view detailed risk reports and assessments.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
