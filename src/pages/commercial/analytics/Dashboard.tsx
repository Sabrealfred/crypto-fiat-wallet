
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  LineChart,
  PieChart,
  Pie,
  Bar,
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import {
  BarChart2,
  PieChart as PieChartIcon,
  TrendingUp,
  Brain,
  Calculator,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  FilePlus
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const performanceData = [
  { month: 'Jan', revenue: 6500000, expenses: 4200000 },
  { month: 'Feb', revenue: 5900000, expenses: 4300000 },
  { month: 'Mar', revenue: 6700000, expenses: 4500000 },
  { month: 'Apr', revenue: 7200000, expenses: 4800000 },
  { month: 'May', revenue: 7800000, expenses: 5100000 },
  { month: 'Jun', revenue: 8100000, expenses: 5300000 },
  { month: 'Jul', revenue: 8500000, expenses: 5400000 },
  { month: 'Aug', revenue: 8900000, expenses: 5700000 },
];

const marketAnalysisData = [
  { name: 'Market Share', value: 42 },
  { name: 'Competitors', value: 58 },
];

const COLORS = ['#3b82f6', '#e5e7eb'];

const quickLinks = [
  { title: "ML Models", path: "/commercial/analytics/ml-models", icon: Brain },
  { title: "Predictive Analysis", path: "/commercial/analytics/predictive", icon: Calculator },
  { title: "Trend Visualization", path: "/commercial/analytics/trends", icon: TrendingUp },
  { title: "New Analysis", path: "/commercial/analytics/custom", icon: FilePlus },
];

export default function AnalyticsDashboard() {
  const [tab, setTab] = useState("overview");
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Analysis & Forecasting"
          description="AI-powered financial analytics and data visualization"
          showBack={true}
        />

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Revenue Growth</p>
                  <h3 className="text-2xl font-bold mt-1">+15.8%</h3>
                  <p className="text-xs flex items-center text-green-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +3.2% vs last month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Expense Ratio</p>
                  <h3 className="text-2xl font-bold mt-1">64.2%</h3>
                  <p className="text-xs flex items-center text-red-600 mt-1">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    -1.5% from target
                  </p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <BarChart2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Market Share</p>
                  <h3 className="text-2xl font-bold mt-1">42.5%</h3>
                  <p className="text-xs flex items-center text-green-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +1.8% vs last quarter
                  </p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <PieChartIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Models</p>
                  <h3 className="text-2xl font-bold mt-1">12</h3>
                  <p className="text-xs flex items-center text-blue-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    3 new this month
                  </p>
                </div>
                <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
                  <Brain className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={tab} onValueChange={setTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full md:w-auto md:inline-flex">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="models">AI Models</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Financial Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Financial Performance</CardTitle>
                  <CardDescription>Revenue vs Expenses (Monthly)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={performanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${(Number(value)/1000000).toFixed(2)}M`} />
                        <Legend />
                        <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" />
                        <Bar dataKey="expenses" name="Expenses" fill="#cbd5e1" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Market Analysis Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Market Analysis</CardTitle>
                  <CardDescription>Market Share Analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={marketAnalysisData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                        >
                          {marketAnalysisData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickLinks.map((link) => (
                <Button
                  key={link.title}
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2"
                  onClick={() => navigate(link.path)}
                >
                  <link.icon className="h-6 w-6" />
                  <span>{link.title}</span>
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Analysis Reports</CardTitle>
                <CardDescription>
                  Access and generate financial analysis reports
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" className="justify-start h-auto py-4 px-4">
                    <FileText className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Monthly Performance</p>
                      <p className="text-xs text-muted-foreground">Updated 3 days ago</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-4 px-4">
                    <FileText className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Quarterly Review</p>
                      <p className="text-xs text-muted-foreground">Updated 2 weeks ago</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-4 px-4">
                    <FileText className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Market Analysis</p>
                      <p className="text-xs text-muted-foreground">Updated 1 week ago</p>
                    </div>
                  </Button>
                  
                  <Button variant="outline" className="justify-start h-auto py-4 px-4">
                    <FileText className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <p className="font-medium">Financial Projections</p>
                      <p className="text-xs text-muted-foreground">Updated yesterday</p>
                    </div>
                  </Button>
                </div>
                
                <Button className="w-full mt-4">
                  <FilePlus className="h-4 w-4 mr-2" />
                  Generate New Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="models">
            <Card>
              <CardHeader>
                <CardTitle>AI Models</CardTitle>
                <CardDescription>
                  Manage and deploy machine learning models for financial analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate('/commercial/analytics/ml-models')}>
                  <Brain className="h-4 w-4 mr-2" />
                  View ML Models
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
