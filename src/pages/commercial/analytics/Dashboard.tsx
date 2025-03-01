
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardOverviewTab } from "./components/tabs/DashboardOverviewTab";
import { PerformanceTab } from "./components/tabs/PerformanceTab";
import { RiskAnalysisTab } from "./components/tabs/RiskAnalysisTab";
import { ForecastingTab } from "./components/tabs/ForecastingTab";
import { AnomalyDetectionTab } from "./components/tabs/AnomalyDetectionTab";
import { DataAutomationTab } from "./components/tabs/DataAutomationTab";
import { 
  Bell, 
  AlertTriangle, 
  AlertCircle, 
  Brain, 
  BarChart3, 
  PieChart, 
  LineChart, 
  ArrowRight, 
  Zap, 
  Database
} from "lucide-react";
import { useState } from "react";

// Alerts data
const alerts = [
  {
    title: "Anomaly Detected",
    description: "Unusual pattern in cash flow detected",
    timestamp: "2 hours ago",
    type: "anomaly"
  },
  {
    title: "Risk Threshold Exceeded",
    description: "Market risk exposure above threshold",
    type: "risk",
    timestamp: "5 hours ago"
  },
  {
    title: "AI Model Updated",
    description: "Forecasting model has been recalibrated",
    type: "ai",
    timestamp: "1 day ago"
  },
  {
    title: "Forecast Accuracy Improved",
    description: "5% improvement in prediction accuracy",
    type: "forecast",
    timestamp: "2 days ago"
  }
];

// Named export for the component
export function AnalyticsDashboard() {
  const [activeAlertsFilter, setActiveAlertsFilter] = useState<string>("all");
  
  // Filter alerts based on the selected filter
  const filteredAlerts = activeAlertsFilter === "all" 
    ? alerts 
    : alerts.filter(alert => alert.type === activeAlertsFilter);

  // Function to render the alert icon based on the alert type
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "anomaly": 
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "risk": 
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "ai": 
        return <Brain className="h-5 w-5 text-blue-500" />;
      case "forecast": 
        return <BarChart3 className="h-5 w-5 text-green-500" />;
      default: 
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6">
        <CommercialHeader 
          title="Analytics Dashboard"
          description="Advanced business intelligence and AI-powered analytics"
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
          <div className="lg:col-span-3">
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="mb-4 w-full justify-start overflow-x-auto">
                <TabsTrigger value="dashboard">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
                <TabsTrigger value="forecasting">AI Forecasting</TabsTrigger>
                <TabsTrigger value="anomaly">Anomaly Detection</TabsTrigger>
                <TabsTrigger value="automation">Data Automation</TabsTrigger>
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
              
              <TabsContent value="anomaly">
                <AnomalyDetectionTab />
              </TabsContent>
              
              <TabsContent value="automation">
                <DataAutomationTab />
              </TabsContent>
            </Tabs>
          </div>

          {/* Alerts sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Bell className="h-5 w-5 text-amber-500" />
                    Recent Alerts
                  </CardTitle>
                  <Badge variant="outline" className="text-xs px-2 py-0">
                    {filteredAlerts.length} New
                  </Badge>
                </div>
                <CardDescription>Notifications and important alerts</CardDescription>
              </CardHeader>
              <CardContent className="px-6">
                <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
                  <Button 
                    variant={activeAlertsFilter === "all" ? "secondary" : "outline"} 
                    size="sm"
                    onClick={() => setActiveAlertsFilter("all")}
                    className="whitespace-nowrap"
                  >
                    All
                  </Button>
                  <Button 
                    variant={activeAlertsFilter === "anomaly" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setActiveAlertsFilter("anomaly")}
                    className="whitespace-nowrap"
                  >
                    Anomalies
                  </Button>
                  <Button 
                    variant={activeAlertsFilter === "risk" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setActiveAlertsFilter("risk")}
                    className="whitespace-nowrap"
                  >
                    Risks
                  </Button>
                  <Button 
                    variant={activeAlertsFilter === "ai" ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setActiveAlertsFilter("ai")}
                    className="whitespace-nowrap"
                  >
                    AI Updates
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {filteredAlerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-3 border-b pb-4 last:border-0">
                      <div className="p-2 rounded-full bg-secondary">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{alert.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                        <p className="text-xs text-primary mt-1 font-medium">{alert.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button variant="outline" className="w-full" size="sm">
                  View All Alerts
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>

            {/* Analytics Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-medium">Analytics Tools</CardTitle>
                <CardDescription>Quick access to analytics features</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: PieChart, label: "Data Explorer", href: "/commercial/analytics/data-explorer" },
                    { icon: LineChart, label: "Trend Analysis", href: "/commercial/analytics/trend-visualization" },
                    { icon: Brain, label: "ML Models", href: "/commercial/analytics/ml-models" },
                    { icon: Zap, label: "Predictive Analysis", href: "/commercial/analytics/predictive-analysis" },
                    { icon: Database, label: "Data Connectors", href: "/commercial/analytics/data-connectors" },
                    { icon: BarChart3, label: "Report Builder", href: "/commercial/analytics/report-builder" }
                  ].map((tool, index) => (
                    <Button key={index} variant="outline" className="flex-col h-auto py-4 px-2" asChild>
                      <a href={tool.href}>
                        <tool.icon className="h-5 w-5 mb-1" />
                        <span className="text-xs">{tool.label}</span>
                      </a>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// Default export
export default AnalyticsDashboard;
