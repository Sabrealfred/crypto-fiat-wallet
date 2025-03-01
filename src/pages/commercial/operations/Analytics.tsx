
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import { 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon, 
  TrendingUp, 
  Download, 
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  BrainCircuit,
  AlertTriangle,
  FileText,
  Settings
} from "lucide-react";
import { useState } from "react";

export default function OperationsAnalyticsPage() {
  const [activeTab, setActiveTab] = useState("performance");

  // Sample data for analytics
  const performanceData = [
    { month: 'Jan', revenue: 4200, expenses: 3800, profit: 400 },
    { month: 'Feb', revenue: 4500, expenses: 3900, profit: 600 },
    { month: 'Mar', revenue: 5100, expenses: 4200, profit: 900 },
    { month: 'Apr', revenue: 5400, expenses: 4300, profit: 1100 },
    { month: 'May', revenue: 5200, expenses: 4400, profit: 800 },
    { month: 'Jun', revenue: 5800, expenses: 4600, profit: 1200 },
    { month: 'Jul', revenue: 6300, expenses: 4900, profit: 1400 },
    { month: 'Aug', revenue: 6100, expenses: 5000, profit: 1100 },
  ];

  const operationalEfficiencyData = [
    { name: 'Processing Time', current: 3.2, target: 2.5, industry: 4.1 },
    { name: 'Error Rate (%)', current: 1.8, target: 1.0, industry: 2.5 },
    { name: 'SLA Compliance (%)', current: 97.3, target: 99.0, industry: 95.0 },
    { name: 'Cost per Transaction', current: 2.45, target: 2.0, industry: 3.1 },
    { name: 'Automation Level (%)', current: 67, target: 75, industry: 58 },
  ];

  const resourceAllocationData = [
    { name: 'Technology', value: 42 },
    { name: 'Personnel', value: 28 },
    { name: 'Facilities', value: 15 },
    { name: 'Training', value: 8 },
    { name: 'Other', value: 7 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const processOptimizationData = [
    { month: 'Jan', before: 100, after: 100 },
    { month: 'Feb', before: 102, after: 98 },
    { month: 'Mar', before: 105, after: 92 },
    { month: 'Apr', before: 108, after: 85 },
    { month: 'May', before: 110, after: 75 },
    { month: 'Jun', before: 115, after: 68 },
    { month: 'Jul', before: 120, after: 65 },
    { month: 'Aug', before: 125, after: 60 },
  ];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Key performance metrics
  const metrics = [
    { 
      title: "Operational Efficiency", 
      value: "87%", 
      change: "+3.2%", 
      trend: "up", 
      description: "Overall efficiency score across operations"
    },
    { 
      title: "Process Cycle Time", 
      value: "3.2 days", 
      change: "-0.5 days", 
      trend: "up", 
      description: "Average time to complete key processes"
    },
    { 
      title: "Error Rate", 
      value: "1.8%", 
      change: "-0.3%", 
      trend: "up", 
      description: "Percentage of transactions with errors"
    },
    { 
      title: "Cost Reduction", 
      value: "12.4%", 
      change: "+2.1% YoY", 
      trend: "up", 
      description: "Year over year operational cost savings"
    },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Operations Analytics" 
          description="Advanced analytics for business operations"
          showBack={true}
        />

        {/* KPI Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
                    <p className={`text-sm flex items-center mt-1 ${
                      metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {metric.trend === 'up' ? (
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                      ) : (
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                      )}
                      {metric.change}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/40">
                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Analytics Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Financial Performance</TabsTrigger>
            <TabsTrigger value="efficiency">Operational Efficiency</TabsTrigger>
            <TabsTrigger value="allocation">Resource Allocation</TabsTrigger>
            <TabsTrigger value="optimization">Process Optimization</TabsTrigger>
          </TabsList>
          
          {/* Financial Performance Tab */}
          <TabsContent value="performance">
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChartIcon className="h-5 w-5 text-blue-600" />
                    Financial Performance Analysis
                  </CardTitle>
                  <CardDescription>Revenue, expenses and profitability trends</CardDescription>
                </div>
                <div className="flex mt-2 md:mt-0 gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Filter className="h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={performanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => formatCurrency(value)} />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        name="Revenue" 
                        stroke="#3b82f6" 
                        fillOpacity={1}
                        fill="url(#colorRevenue)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="expenses" 
                        name="Expenses" 
                        stroke="#ef4444" 
                        fillOpacity={1}
                        fill="url(#colorExpenses)" 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="profit" 
                        name="Profit" 
                        stroke="#10b981" 
                        fillOpacity={1}
                        fill="url(#colorProfit)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <BrainCircuit className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">AI-Generated Insight</h4>
                      <p className="text-sm mt-1">
                        Revenue has been growing at an average rate of 6.2% month-over-month, 
                        while expenses have increased by only 4.1%. This positive trend has resulted in 
                        a 12.8% improvement in profit margins over the analyzed period. 
                        The most significant growth occurred between May and June.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Operational Efficiency Tab */}
          <TabsContent value="efficiency">
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChartIcon className="h-5 w-5 text-blue-600" />
                    Operational Efficiency Metrics
                  </CardTitle>
                  <CardDescription>Current performance against targets and industry averages</CardDescription>
                </div>
                <div className="flex mt-2 md:mt-0 gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Settings className="h-4 w-4" />
                    Settings
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={operationalEfficiencyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" horizontal={false} />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="current" name="Current" fill="#3b82f6" />
                      <Bar dataKey="target" name="Target" fill="#22c55e" />
                      <Bar dataKey="industry" name="Industry Avg" fill="#94a3b8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <BrainCircuit className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">AI-Generated Insight</h4>
                      <p className="text-sm mt-1">
                        Your organization is outperforming industry averages across all operational metrics, 
                        but still has room for improvement to reach target levels. 
                        The most significant gap exists in automation level (currently at 67% vs. target of 75%), 
                        which presents the greatest opportunity for efficiency improvement.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Resource Allocation Tab */}
          <TabsContent value="allocation">
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5 text-blue-600" />
                    Resource Allocation Analysis
                  </CardTitle>
                  <CardDescription>Distribution of operational resources by category</CardDescription>
                </div>
                <div className="flex mt-2 md:mt-0 gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <FileText className="h-4 w-4" />
                    Report
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="h-[350px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={resourceAllocationData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                        >
                          {resourceAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-medium mb-4">Allocation Summary</h3>
                    <div className="space-y-4">
                      {resourceAllocationData.map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="flex items-center">
                              <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                              {item.name}
                            </span>
                            <span className="font-medium">{item.value}%</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="h-2 rounded-full" 
                              style={{ 
                                width: `${item.value}%`,
                                backgroundColor: COLORS[index % COLORS.length]
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                      <p className="text-sm flex items-start gap-2">
                        <BrainCircuit className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span>
                          <strong>AI Resource Optimization:</strong> Technology investment at 42% is above 
                          industry average (35%), which aligns with your digital transformation goals. 
                          Consider increasing training allocation from 8% to 10-12% to support technology adoption.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Process Optimization Tab */}
          <TabsContent value="optimization">
            <Card>
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Process Optimization Impact
                  </CardTitle>
                  <CardDescription>Before and after optimization implementation</CardDescription>
                </div>
                <div className="flex mt-2 md:mt-0 gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <AlertTriangle className="h-4 w-4" />
                    Issues
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-4 w-4" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={processOptimizationData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="before" 
                        name="Before Optimization" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="after" 
                        name="After Optimization" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                      <BrainCircuit className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">AI-Generated Insight</h4>
                      <p className="text-sm mt-1">
                        Process optimization initiatives have resulted in a 52% efficiency improvement since implementation.
                        The most significant gains were achieved between April and June, where processing times 
                        decreased by 30.8%. If this trend continues, you will exceed your annual optimization 
                        target by 15% by year-end.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
