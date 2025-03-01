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
  Shield,
  RefreshCw,
  Settings,
  FileText
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
      case "report": return <FileSpreadsheet className="h-4 w-4 text-blue-500" />;
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
      <div className="max-w-7xl mx-auto">
        <CommercialHeader 
          title="Commercial Banking Portal" 
          description="Comprehensive overview of your enterprise operations" 
        />

        {/* Key Performance Indicators */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Key Performance Indicators</h2>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="text-blue-600 border-blue-200 hover:bg-blue-50">Financial</Button>
              <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 hover:bg-gray-50">Risk</Button>
              <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 hover:bg-gray-50">Global Markets</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Cash Position</p>
                    <h3 className="text-2xl font-bold">$8.4M</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    $
                  </div>
                </div>
                <div className="text-xs text-green-500 font-medium">+2.5% ↑</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Monthly Turnover</p>
                    <h3 className="text-2xl font-bold">$12.1M</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <RefreshCw className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-xs text-green-500 font-medium">+4.1% ↑</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Available Credit</p>
                    <h3 className="text-2xl font-bold">$15M</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <CreditCard className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-xs text-green-500 font-medium">+2% ↑</div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardContent className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">YTD Performance</p>
                    <h3 className="text-2xl font-bold">+8.7%</h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <ChevronRight className="h-5 w-5" />
                  </div>
                </div>
                <div className="text-xs text-green-500 font-medium">+1.2% ↑</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Financial Highlights & Performance */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2">
            <Card className="w-full h-full shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Financial Highlights - Monthly Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <FinancialHighlights />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="w-full h-full shadow-md">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Area Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center my-4">
                  <div className="w-full max-w-[240px]">
                    <PerformanceSection monthlyData={monthlyData} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Access Section */}
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <ChevronRight className="h-4 w-4 text-blue-500 mr-2" />
            <h2 className="text-lg font-medium">Quick Access</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-3">
                  <CreditCard className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-blue-600">Transaction History</h3>
                <p className="text-xs text-gray-500 mt-1">View and manage all transactions</p>
              </CardContent>
            </Card>
            
            <Card className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-3">
                  <DollarSign className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-blue-600">Cash Flow Analysis</h3>
                <p className="text-xs text-gray-500 mt-1">Monitor and analyze your cash flow</p>
              </CardContent>
            </Card>
            
            <Card className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-3">
                  <RefreshCw className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-blue-600">Portfolio Analysis</h3>
                <p className="text-xs text-gray-500 mt-1">Manage investment portfolios</p>
              </CardContent>
            </Card>
            
            <Card className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-3">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-blue-600">Payment Processing</h3>
                <p className="text-xs text-gray-500 mt-1">Process payments and transfers</p>
              </CardContent>
            </Card>
            
            <Card className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-3">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-blue-600">Risk Assessment</h3>
                <p className="text-xs text-gray-500 mt-1">View and manage risk assessments</p>
              </CardContent>
            </Card>
            
            <Card className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-3">
                  <Settings className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-blue-600">Machine Learning Models</h3>
                <p className="text-xs text-gray-500 mt-1">Access ML models and predictions</p>
              </CardContent>
            </Card>
            
            <Card className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-3">
                  <FileSpreadsheet className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-blue-600">Multi-bank Integration</h3>
                <p className="text-xs text-gray-500 mt-1">Manage bank connections</p>
              </CardContent>
            </Card>
            
            <Card className="hover:border-blue-300 hover:shadow-md transition-all cursor-pointer">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 mb-3">
                  <ArrowUpRight className="h-6 w-6" />
                </div>
                <h3 className="font-medium text-blue-600">Developer Portal</h3>
                <p className="text-xs text-gray-500 mt-1">Access developer tools and APIs</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Notifications and Tasks */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <Bell className="h-4 w-4 text-blue-500 mr-2" />
                <CardTitle className="text-lg font-medium">Recent Notifications & Alerts</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alerts.map((alert, index) => (
                  <div key={index} className="flex items-start gap-3 border-b pb-3 last:border-0">
                    <div className={`p-2 rounded-full ${
                      alert.priority === 'high' ? 'bg-red-100' : 
                      alert.priority === 'medium' ? 'bg-amber-100' : 
                      'bg-blue-100'
                    }`}>
                      {getAlertIcon(alert.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">{alert.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <div className="text-center mt-4">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    View All Alerts
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center">
                <CalendarClock className="h-4 w-4 text-blue-500 mr-2" />
                <CardTitle className="text-lg font-medium">Pending Tasks</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
                    <div>
                      <h4 className="text-sm font-medium">Review quarterly treasury report</h4>
                      <p className="text-xs text-gray-500">Due in 3 days</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-blue-600">Action</Button>
                </div>
                
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5"></div>
                    <div>
                      <h4 className="text-sm font-medium">Approve vendor payment batch</h4>
                      <p className="text-xs text-gray-500">Due today</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-blue-600">Action</Button>
                </div>
                
                <div className="flex items-center justify-between border-b pb-3">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
                    <div>
                      <h4 className="text-sm font-medium">Update currency hedging strategy</h4>
                      <p className="text-xs text-gray-500">Due in 5 days</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-blue-600">Action</Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5"></div>
                    <div>
                      <h4 className="text-sm font-medium">Complete risk assessment survey</h4>
                      <p className="text-xs text-gray-500">Due in 2 weeks</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="text-blue-600">Action</Button>
                </div>
                
                <div className="text-center mt-4">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    View All Tasks
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
