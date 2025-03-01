
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuickAccessSection } from "./components/QuickAccessSection";
import { BusinessMetrics } from "./components/BusinessMetrics";
import { FinancialHighlights } from "./components/FinancialHighlights";
import { PerformanceSection } from "./components/PerformanceSection";
import { MetricsSection } from "./components/MetricsSection";
import { EnterpriseServices } from "./components/EnterpriseServices";
import { 
  AlertCircle, 
  ArrowUpRight, 
  Bell, 
  CalendarClock, 
  ChevronRight, 
  CreditCard, 
  DollarSign, 
  FileSpreadsheet, 
  Shield
} from "lucide-react";

export default function CommercialDashboard() {
  // Mock data for alerts
  const alerts = [
    {
      title: "Payment processing approval needed",
      description: "International payment of $45,000 requires approval",
      timestamp: "10 minutes ago",
      priority: "high",
      type: "payment"
    },
    {
      title: "Risk assessment completed",
      description: "Quarterly risk assessment for Corporate account completed",
      timestamp: "2 hours ago",
      priority: "medium",
      type: "risk"
    },
    {
      title: "Cash reserve threshold reached",
      description: "Cash reserves below 15% threshold for Entity XYZ-123",
      timestamp: "6 hours ago",
      priority: "medium",
      type: "liquidity"
    },
    {
      title: "Treasury report available",
      description: "Monthly treasury operations report is ready for review",
      timestamp: "1 day ago",
      priority: "low",
      type: "report"
    }
  ];

  // Mock data for upcoming activities
  const activities = [
    {
      title: "Treasury meeting",
      description: "Weekly review with treasury operations team",
      date: "Today, 2:30 PM",
      type: "meeting"
    },
    {
      title: "Payment batch processing",
      description: "Scheduled ACH batch processing",
      date: "Tomorrow, 6:00 AM",
      type: "process"
    },
    {
      title: "Regulatory filing deadline",
      description: "Quarterly compliance report submission",
      date: "Oct 15, 2023",
      type: "deadline"
    },
    {
      title: "System maintenance",
      description: "Scheduled maintenance window for payment systems",
      date: "Oct 18, 2023, 2:00 AM",
      type: "maintenance"
    }
  ];

  // Monthly performance data for the PerformanceSection component - with correct property names
  const monthlyData = [
    { month: "Jan", earning: 45000, spending: 38000 },
    { month: "Feb", earning: 48000, spending: 42000 },
    { month: "Mar", earning: 51000, spending: 41000 },
    { month: "Apr", earning: 53000, spending: 39000 },
    { month: "May", earning: 56000, spending: 43000 },
    { month: "Jun", earning: 62000, spending: 45000 },
    { month: "Jul", earning: 58000, spending: 47000 },
    { month: "Aug", earning: 61000, spending: 46000 },
    { month: "Sep", earning: 64000, spending: 48000 }
  ];

  // Get icon based on alert type
  const getAlertIcon = (type: string) => {
    switch (type) {
      case "payment": return <CreditCard className="h-4 w-4 text-blue-500" />;
      case "risk": return <Shield className="h-4 w-4 text-red-500" />;
      case "liquidity": return <DollarSign className="h-4 w-4 text-green-500" />;
      case "report": return <FileSpreadsheet className="h-4 w-4 text-purple-500" />;
      default: return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  // Get activity icon based on type
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "meeting": return <CalendarClock className="h-4 w-4 text-blue-500" />;
      case "process": return <RefreshCw className="h-4 w-4 text-green-500" />;
      case "deadline": return <FileText className="h-4 w-4 text-red-500" />;
      case "maintenance": return <Settings className="h-4 w-4 text-orange-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Commercial Banking Dashboard" 
          description="Welcome to your commercial banking portal" 
        />

        {/* Business Metrics */}
        <BusinessMetrics />

        {/* Quick Access */}
        <QuickAccessSection />

        {/* Metrics & Performance */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2 space-y-6">
            <MetricsSection />
            <PerformanceSection monthlyData={monthlyData} />
          </div>
          
          <div className="space-y-6">
            {/* Alerts Section */}
            <Card className="border-amber-100 dark:border-amber-800">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Alerts</CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs h-8 px-2">
                    View all <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Recent alerts requiring your attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`p-2 rounded-full ${
                        alert.priority === 'high' ? 'bg-red-100 dark:bg-red-900/30' : 
                        alert.priority === 'medium' ? 'bg-amber-100 dark:bg-amber-900/30' : 
                        'bg-blue-100 dark:bg-blue-900/30'
                      }`}>
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{alert.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ArrowUpRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Activities */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-medium">Upcoming Activities</CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs h-8 px-2">
                    Calendar <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
                <CardDescription>Scheduled events and deadlines</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-secondary">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{activity.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                        <p className="text-xs text-primary mt-1 font-medium">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Financial Highlights */}
        <FinancialHighlights />

        {/* Enterprise Services */}
        <EnterpriseServices />
      </div>
    </AppLayout>
  );
}

// Importaciones faltantes para iconos
import { RefreshCw, Settings, FileText } from "lucide-react";
