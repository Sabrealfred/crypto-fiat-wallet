
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RefreshCw, ArrowUpRight, ArrowDownRight, AlertTriangle, Info } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { QuickAccessGrid } from "./components/risk-management/QuickAccessGrid";
import { RiskMetricCard } from "./components/risk-management/RiskMetricCard";
import { AdditionalRiskCard } from "./components/risk-management/AdditionalRiskCard";
import { riskCategories, additionalRisks } from "./components/risk-management/data";
import { RiskMetric, RiskCategory } from "./components/risk-management/types";
import { DetailedRiskAnalysis } from "./components/risk-management/DetailedRiskAnalysis";

export default function RiskManagementPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedRiskCategory, setSelectedRiskCategory] = useState<RiskCategory | null>(null);
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

  const handleRiskCategoryClick = (category: RiskCategory) => {
    setSelectedRiskCategory(category);
    setActiveTab("details");
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <CommercialHeader 
          title="Risk Management"
          description="Monitor and manage business risks"
          showBack={true}
        />

        <div className="flex justify-end mb-6">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Metrics
          </Button>
        </div>

        <QuickAccessGrid />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="reports">Risk Reports</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">Overall Risk Score</p>
                    <ArrowUpRight className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold mt-2">76/100</h3>
                  <p className="text-sm mt-2 flex items-center text-green-700 dark:text-green-400">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +3 points from last week
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Active Warnings</p>
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <h3 className="text-2xl font-bold mt-2">12</h3>
                  <p className="text-sm mt-2 flex items-center text-yellow-700 dark:text-yellow-400">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +2 from last week
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="pt-6">
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Most Improved</p>
                    <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mt-2">Liquidity Risk</h3>
                  <p className="text-sm mt-2 flex items-center text-blue-700 dark:text-blue-400">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +8 points improvement
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Main Risk Categories */}
            <div className="grid md:grid-cols-2 gap-6">
              {riskCategories.map((category, index) => (
                <div 
                  key={index} 
                  onClick={() => handleRiskCategoryClick(category)}
                  className="cursor-pointer transition-transform hover:scale-[1.01]"
                >
                  <RiskMetricCard 
                    category={category}
                    getStatusColor={getStatusColor}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Additional Risk Categories</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {additionalRisks.map((risk, index) => (
                  <AdditionalRiskCard 
                    key={index} 
                    risk={risk} 
                    onClick={() => navigate(`/commercial/risk-management/${risk.title.toLowerCase().replace(/\s+/g, '-')}`)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="details">
            {selectedRiskCategory ? (
              <DetailedRiskAnalysis category={selectedRiskCategory} />
            ) : (
              <Card className="p-6">
                <CardContent className="text-center py-12">
                  <h3 className="text-lg font-semibold mb-4">Detailed Risk Analysis</h3>
                  <p className="text-muted-foreground max-w-md mx-auto mb-6">
                    Select a risk category from the Overview tab to view detailed analysis and metrics.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab("overview")}
                  >
                    Go to Overview
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="reports">
            <Card className="p-6">
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold mb-4">Risk Reports</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Generate and view detailed risk reports and assessments.
                </p>
                <Button onClick={() => navigate("/commercial/risk-management/reports")}>
                  View All Reports
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="p-6">
              <CardContent className="text-center py-12">
                <h3 className="text-lg font-semibold mb-4">Risk Management Settings</h3>
                <p className="text-muted-foreground max-w-md mx-auto mb-6">
                  Configure risk thresholds, alerts, and monitoring parameters.
                </p>
                <Button onClick={() => navigate("/commercial/risk-management/settings")}>
                  Configure Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
