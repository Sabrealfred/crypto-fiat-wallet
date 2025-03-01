
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  FileText, 
  Download,
  TrendingUp,
  PieChart as PieChartIcon,
  BarChart as BarChartIcon,
  Calendar,
  RefreshCw,
  Brain,
  AlertTriangle,
  ListFilter,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

// Sample data for analytics
const monthlyPerformanceData = [
  { month: 'Jan', revenue: 4500000, expenses: 3200000, profit: 1300000 },
  { month: 'Feb', revenue: 4700000, expenses: 3300000, profit: 1400000 },
  { month: 'Mar', revenue: 5100000, expenses: 3400000, profit: 1700000 },
  { month: 'Apr', revenue: 4900000, expenses: 3300000, profit: 1600000 },
  { month: 'May', revenue: 5300000, expenses: 3500000, profit: 1800000 },
  { month: 'Jun', revenue: 5600000, expenses: 3600000, profit: 2000000 },
  { month: 'Jul', revenue: 5900000, expenses: 3700000, profit: 2200000 },
  { month: 'Aug', revenue: 6200000, expenses: 3800000, profit: 2400000 },
  { month: 'Sep', revenue: 6400000, expenses: 3900000, profit: 2500000 },
  { month: 'Oct', revenue: 6300000, expenses: 3800000, profit: 2500000 },
  { month: 'Nov', revenue: 6500000, expenses: 4000000, profit: 2500000 },
  { month: 'Dec', revenue: 6800000, expenses: 4100000, profit: 2700000 },
];

const departmentPerformanceData = [
  { name: 'Treasury', value: 35 },
  { name: 'Operations', value: 25 },
  { name: 'Risk Mgmt', value: 15 },
  { name: 'Investment', value: 25 },
];

const keyMetricsData = [
  { title: 'Overall ROI', value: '18.5%', change: '+2.3%', status: 'increase' },
  { title: 'Liquidity Ratio', value: '2.4', change: '+0.3', status: 'increase' },
  { title: 'Cash Conversion', value: '22 days', change: '-3 days', status: 'increase' },
  { title: 'Operational Efficiency', value: '81%', change: '+4%', status: 'increase' },
  { title: 'Risk Exposure', value: 'Moderate', change: 'Stable', status: 'neutral' },
  { title: 'Cost of Capital', value: '4.8%', change: '-0.3%', status: 'increase' },
];

const riskMetricsData = [
  { category: 'Market', current: 68, target: 50, status: 'warning' },
  { category: 'Credit', current: 42, target: 40, status: 'good' },
  { category: 'Operational', current: 35, target: 30, status: 'good' },
  { category: 'Liquidity', current: 55, target: 40, status: 'warning' },
  { category: 'Compliance', current: 28, target: 30, status: 'good' },
];

const anomalyAlerts = [
  { 
    id: 'ANO-001', 
    description: 'Unusual spike in treasury transactions',
    severity: 'medium',
    date: '2024-03-15',
    status: 'unresolved'
  },
  { 
    id: 'ANO-002', 
    description: 'Unexpected drop in liquidity ratio',
    severity: 'high',
    date: '2024-03-14',
    status: 'investigating'
  },
  { 
    id: 'ANO-003', 
    description: 'Unusual pattern in trading activity',
    severity: 'medium',
    date: '2024-03-13',
    status: 'resolved'
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState('year');
  const navigate = useNavigate();
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: 1
    }).format(value);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getRiskStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-500';
      case 'warning':
        return 'bg-amber-500';
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Financial Analytics"
          description="Comprehensive analysis and insights for intelligent decision making"
          showBack={true}
        />
        
        {/* Key Metrics Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          {keyMetricsData.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                <p className={`text-sm flex items-center mt-1 ${getStatusColor(metric.status)}`}>
                  {metric.status === 'increase' && <ArrowUpRight className="h-3 w-3 mr-1" />}
                  {metric.status === 'decrease' && <ArrowDownRight className="h-3 w-3 mr-1" />}
                  {metric.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid grid-cols-4 w-full max-w-md mx-auto">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="risk">Risk Analytics</TabsTrigger>
            <TabsTrigger value="prediction">Predictions</TabsTrigger>
            <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
          </TabsList>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Financial Performance</h2>
              <div className="flex gap-2">
                <Select value={timeframe} onValueChange={setTimeframe}>
                  <SelectTrigger className="w-[130px]">
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="year">Last 12 months</SelectItem>
                    <SelectItem value="quarter">Last quarter</SelectItem>
                    <SelectItem value="month">Last month</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>

                <Button variant="outline" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-muted-foreground" />
                    Revenue & Expenses Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyPerformanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip 
                          formatter={(value) => formatCurrency(Number(value))}
                          labelFormatter={(label) => `Month: ${label}`}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue" strokeWidth={2} />
                        <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" strokeWidth={2} />
                        <Line type="monotone" dataKey="profit" stroke="#10b981" name="Profit" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5 text-muted-foreground" />
                    Department Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={departmentPerformanceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={130}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {departmentPerformanceData.map((entry, index) => (
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

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                    Growth Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-md bg-blue-50 dark:bg-blue-900/20">
                      <p className="text-sm text-muted-foreground">Revenue Growth (YoY)</p>
                      <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">+15.8%</h3>
                    </div>
                    <div className="p-4 rounded-md bg-green-50 dark:bg-green-900/20">
                      <p className="text-sm text-muted-foreground">Profit Growth (YoY)</p>
                      <h3 className="text-2xl font-bold text-green-600 dark:text-green-400">+21.2%</h3>
                    </div>
                    <div className="p-4 rounded-md bg-purple-50 dark:bg-purple-900/20">
                      <p className="text-sm text-muted-foreground">Asset Growth</p>
                      <h3 className="text-2xl font-bold text-purple-600 dark:text-purple-400">+9.4%</h3>
                    </div>
                    <div className="p-4 rounded-md bg-amber-50 dark:bg-amber-900/20">
                      <p className="text-sm text-muted-foreground">Customer Growth</p>
                      <h3 className="text-2xl font-bold text-amber-600 dark:text-amber-400">+7.5%</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    Forecasted Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[230px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { quarter: 'Q1', actual: 1300000, forecast: 1300000 },
                        { quarter: 'Q2', actual: 1800000, forecast: 1800000 },
                        { quarter: 'Q3', actual: 2500000, forecast: 2700000 },
                        { quarter: 'Q4', actual: 0, forecast: 3200000 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quarter" />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Bar dataKey="actual" name="Actual Profit" fill="#3b82f6" />
                        <Bar dataKey="forecast" name="Forecasted Profit" fill="#9ca3af" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Risk Analytics Tab */}
          <TabsContent value="risk" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Risk Analytics</h2>
              <Button variant="outline" size="sm" onClick={() => navigate("/commercial/risk-management")}>
                View Risk Management
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Risk Metrics</CardTitle>
                  <CardDescription>Current risk exposure by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {riskMetricsData.map((risk, index) => (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium">{risk.category} Risk</span>
                          <span className="text-sm text-muted-foreground">
                            {risk.current}/{risk.target}
                          </span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${getRiskStatusColor(risk.status)}`} 
                            style={{ width: `${(risk.current / 100) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Risk Alerts</CardTitle>
                  <CardDescription>Recently identified anomalies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {anomalyAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-3 p-3 rounded-md border">
                        <div className={`p-2 rounded-full ${
                          alert.severity === 'high' ? 'bg-red-100 text-red-600' : 
                          alert.severity === 'medium' ? 'bg-amber-100 text-amber-600' : 
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{alert.description}</h4>
                            <span className="text-xs font-mono text-muted-foreground">{alert.id}</span>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-muted-foreground">{alert.date}</span>
                            <span className={`text-xs ${
                              alert.status === 'resolved' ? 'text-green-600' : 
                              alert.status === 'investigating' ? 'text-amber-600' : 
                              'text-red-600'
                            }`}>
                              {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Predictions Tab */}
          <TabsContent value="prediction" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">AI-Powered Predictions</h2>
              <Button variant="outline" size="sm" onClick={() => navigate("/commercial/analytics/ml-models")}>
                <Brain className="h-4 w-4 mr-2" />
                View ML Models
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Cash Flow Prediction</CardTitle>
                  <CardDescription>Next 90 days forecasted cash positions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={[
                          { day: '30', actual: 8500000, predicted: 8500000, lower: 8500000, upper: 8500000 },
                          { day: '60', actual: 0, predicted: 9200000, lower: 8900000, upper: 9500000 },
                          { day: '90', actual: 0, predicted: 9800000, lower: 9300000, upper: 10300000 }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" label={{ value: 'Days', position: 'insideBottom', offset: -5 }} />
                        <YAxis tickFormatter={(value) => formatCurrency(value)} />
                        <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                        <Legend />
                        <Line type="monotone" dataKey="actual" stroke="#3b82f6" name="Actual" strokeWidth={2} />
                        <Line type="monotone" dataKey="predicted" stroke="#10b981" name="Predicted" strokeWidth={2} strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="upper" stroke="#d1d5db" name="Upper Bound" strokeWidth={1} strokeDasharray="3 3" />
                        <Line type="monotone" dataKey="lower" stroke="#d1d5db" name="Lower Bound" strokeWidth={1} strokeDasharray="3 3" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md mt-4">
                    <p className="text-sm">
                      <span className="font-medium">AI Insight:</span> Based on historical patterns and current trends, we predict a 15.3% increase in cash reserves over the next 90 days with 92% confidence.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Risk Prediction</CardTitle>
                  <CardDescription>Forecasted risk exposure</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart 
                        data={[
                          { category: 'Market', current: 68, forecasted: 65 },
                          { category: 'Credit', current: 42, forecasted: 45 },
                          { category: 'Operational', current: 35, forecasted: 32 },
                          { category: 'Liquidity', current: 55, forecasted: 48 },
                          { category: 'Compliance', current: 28, forecasted: 30 }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis label={{ value: 'Risk Score', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="current" name="Current Risk" fill="#ef4444" />
                        <Bar dataKey="forecasted" name="Forecasted Risk (90 days)" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-3 rounded-md mt-4">
                    <p className="text-sm">
                      <span className="font-medium">AI Insight:</span> Market risk is predicted to decrease by 4.4% due to expected market stabilization. Liquidity risk shows significant improvement from implemented treasury strategies.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Anomalies Tab */}
          <TabsContent value="anomalies" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Anomaly Detection</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <ListFilter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Report
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Identified Anomalies</CardTitle>
                <CardDescription>ML-detected patterns requiring investigation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left p-3 font-medium">ID</th>
                        <th className="text-left p-3 font-medium">Description</th>
                        <th className="text-left p-3 font-medium">Detection Date</th>
                        <th className="text-left p-3 font-medium">Confidence</th>
                        <th className="text-left p-3 font-medium">Status</th>
                        <th className="text-left p-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3 font-mono text-xs">ANO-2024-001</td>
                        <td className="p-3">Unusual spike in treasury transactions</td>
                        <td className="p-3">Mar 15, 2024</td>
                        <td className="p-3">87%</td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
                            Investigating
                          </span>
                        </td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">Review</Button>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-mono text-xs">ANO-2024-002</td>
                        <td className="p-3">Unexpected drop in liquidity ratio</td>
                        <td className="p-3">Mar 14, 2024</td>
                        <td className="p-3">93%</td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300">
                            Critical
                          </span>
                        </td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">Review</Button>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-mono text-xs">ANO-2024-003</td>
                        <td className="p-3">Unusual pattern in trading activity</td>
                        <td className="p-3">Mar 13, 2024</td>
                        <td className="p-3">79%</td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                            Resolved
                          </span>
                        </td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-mono text-xs">ANO-2024-004</td>
                        <td className="p-3">Abnormal payment processor activity</td>
                        <td className="p-3">Mar 12, 2024</td>
                        <td className="p-3">85%</td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300">
                            Resolved
                          </span>
                        </td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">View</Button>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3 font-mono text-xs">ANO-2024-005</td>
                        <td className="p-3">Potential duplicate transactions detected</td>
                        <td className="p-3">Mar 10, 2024</td>
                        <td className="p-3">91%</td>
                        <td className="p-3">
                          <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
                            In review
                          </span>
                        </td>
                        <td className="p-3">
                          <Button variant="ghost" size="sm">Review</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center justify-center text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
              onClick={() => navigate("/commercial/analytics/ml-models")}
            >
              <Brain className="h-5 w-5 mb-2" />
              <span>ML Models</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center justify-center text-green-700 dark:text-green-400 border-green-200 dark:border-green-800"
              onClick={() => navigate("/commercial/analytics/predictive")}
            >
              <TrendingUp className="h-5 w-5 mb-2" />
              <span>Predictive Analysis</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center justify-center text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800"
              onClick={() => navigate("/commercial/analytics/trends")}
            >
              <BarChartIcon className="h-5 w-5 mb-2" />
              <span>Trend Visualization</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto py-4 flex flex-col items-center justify-center text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800"
              onClick={() => navigate("/commercial/operations/reports")}
            >
              <FileText className="h-5 w-5 mb-2" />
              <span>Generate Reports</span>
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
