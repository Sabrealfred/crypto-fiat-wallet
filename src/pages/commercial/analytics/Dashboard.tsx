
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowUpRight,
  BarChart as BarChartIcon,
  Cpu,
  DollarSign,
  LineChart as LineIcon,
  PieChart as PieChartIcon,
  Activity,
  TrendingUp,
  Users,
  ChevronDown,
  Download,
  Filter,
  Settings
} from "lucide-react";

// Named export for the component
export function AnalyticsDashboard() {
  // Fixed calculation functions with proper variables
  const calculateProgressWidth = (value: number, max: number) => {
    return Math.floor((value / max) * 100) + '%';
  };

  const calculateTaskPercentage = (completed: number, total: number) => {
    return Math.floor((completed / total) * 100) + '%';
  };

  const calculateAllocationPercentage = (allocatedAmount: number, totalAllocated: number) => {
    return Math.floor((allocatedAmount / totalAllocated) * 100) + '%';
  };

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$45,231.89</div>
                  <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                  </p>
                  <div className="mt-4 h-1 w-full bg-gray-100 dark:bg-gray-800 rounded">
                    <div 
                      className="h-1 bg-green-500 rounded" 
                      style={{ width: calculateProgressWidth(45231.89, 100000) }}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Customers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+2350</div>
                  <p className="text-xs text-muted-foreground">
                    +10.1% from last month
                  </p>
                  <div className="mt-4 h-1 w-full bg-gray-100 dark:bg-gray-800 rounded">
                    <div 
                      className="h-1 bg-blue-500 rounded" 
                      style={{ width: calculateProgressWidth(2350, 5000) }}
                    />
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Active Projects
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12/23</div>
                  <p className="text-xs text-muted-foreground">
                    +2 new projects this week
                  </p>
                  <div className="mt-4 h-1 w-full bg-gray-100 dark:bg-gray-800 rounded">
                    <div 
                      className="h-1 bg-purple-500 rounded" 
                      style={{ width: calculateProgressWidth(12, 23) }}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6 h-80">
                    <div className="text-center text-muted-foreground pt-20">
                      Line chart visualization would go here
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>User Demographics</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6 h-80">
                    <div className="text-center text-muted-foreground pt-20">
                      Pie chart visualization would go here
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Projects Progress</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Financial Dashboard", completed: 72, total: 100 },
                      { name: "Customer Portal Redesign", completed: 35, total: 100 },
                      { name: "API Integration", completed: 95, total: 100 },
                      { name: "Mobile App Development", completed: 25, total: 100 },
                      { name: "Data Migration", completed: 60, total: 100 },
                    ].map((project, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{project.name}</span>
                          <span className="text-sm">{project.completed}%</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: calculateTaskPercentage(project.completed, project.total) }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="performance">
            <div className="grid grid-cols-1 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6 h-80">
                    <div className="text-center text-muted-foreground pt-20">
                      Performance visualization would go here
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Conversion Rate
                  </CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.6%</div>
                  <p className="text-xs text-muted-foreground">
                    +0.8% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Order Value
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$289.45</div>
                  <p className="text-xs text-muted-foreground">
                    +$32.50 from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Customer Lifetime Value
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$3,542</div>
                  <p className="text-xs text-muted-foreground">
                    +$298 from last month
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="risk">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Risk Score
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">72/100</div>
                  <p className="text-xs text-muted-foreground">
                    +3 points from last assessment
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Compliance Rating
                  </CardTitle>
                  <Settings className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">A+</div>
                  <p className="text-xs text-muted-foreground">
                    No change from last assessment
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Outstanding Issues
                  </CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    -2 issues from last month
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "Market Risk", allocatedAmount: 245000, totalAllocated: 1000000 },
                      { category: "Credit Risk", allocatedAmount: 380000, totalAllocated: 1000000 },
                      { category: "Operational Risk", allocatedAmount: 175000, totalAllocated: 1000000 },
                      { category: "Liquidity Risk", allocatedAmount: 120000, totalAllocated: 1000000 },
                      { category: "Legal Risk", allocatedAmount: 80000, totalAllocated: 1000000 },
                    ].map((allocation, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{allocation.category}</span>
                          <span className="text-sm">${allocation.allocatedAmount.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: calculateAllocationPercentage(allocation.allocatedAmount, allocation.totalAllocated) }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="forecasting">
            <div className="grid grid-cols-1 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Forecast</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="p-6 h-80">
                    <div className="text-center text-muted-foreground pt-20">
                      Forecast visualization would go here
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Q3 Forecast
                  </CardTitle>
                  <Cpu className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$1.2M</div>
                  <p className="text-xs text-muted-foreground">
                    +18% YoY growth projected
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Customer Growth
                  </CardTitle>
                  <LineIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12%</div>
                  <p className="text-xs text-muted-foreground">
                    Expected for next quarter
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Market Share
                  </CardTitle>
                  <PieChartIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">23%</div>
                  <p className="text-xs text-muted-foreground">
                    +2.5% expected by year end
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

// Default export
export default AnalyticsDashboard;
