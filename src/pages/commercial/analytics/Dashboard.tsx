
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOverviewTab } from "./components/tabs/DashboardOverviewTab";
import { PerformanceTab } from "./components/tabs/PerformanceTab";
import { RiskAnalysisTab } from "./components/tabs/RiskAnalysisTab";
import { ForecastingTab } from "./components/tabs/ForecastingTab";

// Named export for the component
export function AnalyticsDashboard() {
  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <CommercialHeader 
          title="Analytics Dashboard"
          description="Monitor key metrics and analyze business performance"
        />

        <Tabs defaultValue="dashboard" className="w-full mt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard">
            <DashboardOverviewTab />
          </TabsContent>
          
          <TabsContent value="performance">
            <PerformanceTab />
          </TabsContent>
          
          <TabsContent value="risk">
            <RiskAnalysisTab />
          </TabsContent>
          
          <TabsContent value="forecasting">
            <ForecastingTab />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

// Default export
export default AnalyticsDashboard;
