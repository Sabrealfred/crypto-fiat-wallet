
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
  PieChart as RechartsPieChart,
  Pie as RechartsPie,
  Cell,
  Legend
} from 'recharts';
import {
  AlertCircle,
  BarChart as BarChartIcon,
  BrainCircuit,
  ChevronRight,
  Clock,
  Download,
  Filter,
  LineChart as LineChartIcon,
  Plus,
  RefreshCw,
  Search,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  ShieldCheck,
  Zap,
  Eye,
  PieChart as PieChartIcon
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

// Sample data for analytics dashboard
const performanceData = [
  { month: 'Jan', revenue: 4200, expenses: 3800, profit: 400 },
  { month: 'Feb', revenue: 4500, expenses: 3900, profit: 600 },
  { month: 'Mar', revenue: 5100, expenses: 4200, profit: 900 },
  { month: 'Apr', revenue: 5400, expenses: 4300, profit: 1100 },
  { month: 'May', revenue: 5200, expenses: 4400, profit: 800 },
  { month: 'Jun', revenue: 5800, expenses: 4600, profit: 1200 },
  { month: 'Jul', revenue: 6300, expenses: 4900, profit: 1400 },
  { month: 'Aug', revenue: 6100, expenses: 5000, profit: 1100 },
  { month: 'Sep', revenue: 6600, expenses: 5200, profit: 1400 },
  { month: 'Oct', revenue: 7000, expenses: 5400, profit: 1600 },
  { month: 'Nov', revenue: 7200, expenses: 5500, profit: 1700 },
  { month: 'Dec', revenue: 7500, expenses: 5700, profit: 1800 },
];

const riskExposureData = [
  { name: 'Market Risk', value: 35 },
  { name: 'Credit Risk', value: 25 },
  { name: 'Operational Risk', value: 20 },
  { name: 'Liquidity Risk', value: 15 },
  { name: 'Regulatory Risk', value: 5 },
];

const anomalyData = [
  { date: '2023-10-01', normal: 120, anomaly: 0 },
  { date: '2023-10-02', normal: 132, anomaly: 0 },
  { date: '2023-10-03', normal: 125, anomaly: 0 },
  { date: '2023-10-04', normal: 130, anomaly: 0 },
  { date: '2023-10-05', normal: 110, anomaly: 0 },
  { date: '2023-10-06', normal: 0, anomaly: 220 },
  { date: '2023-10-07', normal: 145, anomaly: 0 },
  { date: '2023-10-08', normal: 150, anomaly: 0 },
  { date: '2023-10-09', normal: 160, anomaly: 0 },
  { date: '2023-10-10', normal: 140, anomaly: 0 },
  { date: '2023-10-11', normal: 0, anomaly: 190 },
  { date: '2023-10-12', normal: 165, anomaly: 0 },
  { date: '2023-10-13', normal: 170, anomaly: 0 },
  { date: '2023-10-14', normal: 175, anomaly: 0 },
];

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444'];

const recentAlerts = [
  { id: 1, type: 'warning', title: 'Anomaly Detected', description: 'Unusual pattern in cash flow detected', time: '2 hours ago' },
  { id: 2, type: 'critical', title: 'Risk Threshold Exceeded', description: 'Market risk exposure above threshold', time: '5 hours ago' },
  { id: 3, type: 'info', title: 'AI Model Updated', description: 'Forecasting model has been recalibrated', time: '1 day ago' },
  { id: 4, type: 'success', title: 'Forecast Accuracy Improved', description: '5% improvement in prediction accuracy', time: '2 days ago' },
];

const aiPredictions = [
  { id: 1, title: 'Cash Flow Forecast', prediction: '+12% next quarter', confidence: 'High (87%)', impact: 'Positive' },
  { id: 2, title: 'Currency Exchange', prediction: 'EUR/USD depreciation', confidence: 'Medium (72%)', impact: 'Negative' },
  { id: 3, title: 'Liquidity Risk', prediction: 'Stable for 90 days', confidence: 'Very High (94%)', impact: 'Neutral' },
  { id: 4, title: 'Market Sentiment', prediction: 'Bullish trend developing', confidence: 'Medium (68%)', impact: 'Positive' },
];

export default function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Key performance metrics
  const metrics = [
    { title: "Forecast Accuracy", value: "92%", change: "+2.3%", trend: "up", icon: TrendingUp },
    { title: "Risk Score", value: "Medium", change: "-12 points", trend: "up", icon: ShieldCheck },
    { title: "ML Model Count", value: "8", change: "+2 models", trend: "up", icon: BrainCircuit },
    { title: "Anomalies Detected", value: "3", change: "-2 vs last week", trend: "up", icon: AlertCircle }
  ];

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Analytics Dashboard" 
          description="AI-powered analytics and forecasting"
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
                  </div>
                  <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/40">
                    <metric.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Analytics Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="risk-analysis">Risk Analysis</TabsTrigger>
            <TabsTrigger value="ai-predictions">AI Predictions</TabsTrigger>
            <TabsTrigger value="anomaly-detection">Anomaly Detection</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Financial Performance Chart */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Financial Performance</CardTitle>
                      <CardDescription>Revenue, expenses and profit over time</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Select defaultValue="year">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quarter">Quarter</SelectItem>
                          <SelectItem value="year">Year</SelectItem>
                          <SelectItem value="ytd">YTD</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={performanceData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${value}`} />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" name="Revenue" strokeWidth={2} />
                        <Line type="monotone" dataKey="expenses" stroke="#ef4444" name="Expenses" strokeWidth={2} />
                        <Line type="monotone" dataKey="profit" stroke="#10b981" name="Profit" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Risk Exposure */}
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Risk Exposure</CardTitle>
                      <CardDescription>Distribution by risk category</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      Risk Details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <RechartsPie
                          data={riskExposureData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                        >
                          {riskExposureData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </RechartsPie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Alerts */}
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Alerts</CardTitle>
                    <CardDescription>Notifications and important alerts</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Alert
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
                      <div className={`p-2 rounded-full flex-shrink-0 ${
                        alert.type === 'warning' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' :
                        alert.type === 'critical' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' :
                        alert.type === 'info' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        <AlertCircle className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{alert.title}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="flex-shrink-0">
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Risk Analysis Tab */}
          <TabsContent value="risk-analysis">
            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
                <CardDescription>Comprehensive risk analysis across all categories</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Detailed risk analysis content will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* AI Predictions Tab */}
          <TabsContent value="ai-predictions">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Machine Learning Predictions</CardTitle>
                <CardDescription>AI-generated forecasts and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {aiPredictions.map((prediction) => (
                    <div key={prediction.id} className="flex items-start gap-3 p-4 rounded-lg border">
                      <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                        <BrainCircuit className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{prediction.title}</h4>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                          <div>
                            <p className="text-xs text-muted-foreground">Prediction</p>
                            <p className="text-sm font-medium">{prediction.prediction}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Confidence</p>
                            <p className="text-sm font-medium">{prediction.confidence}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Impact</p>
                            <Badge variant={
                              prediction.impact === 'Positive' ? 'default' : 
                              prediction.impact === 'Negative' ? 'destructive' : 
                              'outline'
                            }>
                              {prediction.impact}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Anomaly Detection Tab */}
          <TabsContent value="anomaly-detection">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Anomaly Detection</CardTitle>
                    <CardDescription>ML-powered anomaly detection in financial data</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Analysis
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={anomalyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="normal" name="Normal Activity" fill="#3b82f6" />
                      <Bar dataKey="anomaly" name="Anomaly Detected" fill="#ef4444" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
                      <AlertCircle className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">Anomalies Detected</h4>
                      <p className="text-sm mt-1">The system has detected 2 significant anomalies in the past 14 days. Review the details for more information and recommended actions.</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        View Details
                      </Button>
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
