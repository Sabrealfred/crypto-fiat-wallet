
import { ReportsCard } from "../ReportsCard";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  CardDescription,
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  LineChart,
  Line,
  AreaChart,
  Area,
  ScatterChart,
  Scatter,
  ZAxis,
  ComposedChart,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";
import { 
  ArrowDownRight, 
  ArrowUpRight, 
  Calendar, 
  Clock, 
  Download, 
  FileBarChart, 
  FileText, 
  Filter, 
  Package,
  PieChart as PieChartIcon,
  RefreshCw,
  Settings,
  Sliders,
  Zap,
  Brain,
  TrendingUp,
  AlertTriangle,
  BrainCircuit
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Data for charts and reports
const transactionReportData = [
  { name: "Payments", value: 45 },
  { name: "Transfers", value: 30 },
  { name: "FX", value: 15 },
  { name: "Other", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const cashflowReportData = [
  { month: "Jan", inflow: 4000, outflow: 3400 },
  { month: "Feb", inflow: 3500, outflow: 3200 },
  { month: "Mar", inflow: 4500, outflow: 3800 },
  { month: "Apr", inflow: 5000, outflow: 4200 },
  { month: "May", inflow: 4800, outflow: 4000 },
  { month: "Jun", inflow: 5200, outflow: 4500 },
];

const yearlyTrendData = [
  { name: "2021 Q1", cashflow: 3200, liquidity: 4500, assets: 5800 },
  { name: "2021 Q2", cashflow: 3400, liquidity: 4300, assets: 6000 },
  { name: "2021 Q3", cashflow: 3800, liquidity: 4200, assets: 6200 },
  { name: "2021 Q4", cashflow: 4100, liquidity: 4400, assets: 6500 },
  { name: "2022 Q1", cashflow: 4300, liquidity: 4600, assets: 6800 },
  { name: "2022 Q2", cashflow: 4500, liquidity: 4800, assets: 7000 },
  { name: "2022 Q3", cashflow: 4700, liquidity: 5000, assets: 7300 },
  { name: "2022 Q4", cashflow: 5000, liquidity: 5200, assets: 7600 },
  { name: "2023 Q1", cashflow: 5200, liquidity: 5400, assets: 7900 },
  { name: "2023 Q2", cashflow: 5500, liquidity: 5600, assets: 8200 },
];

// Predictive data for AI forecasting
const forecastData = [
  { name: "2023 Q3", actual: 5700, forecast: 5800, ci_lower: 5600, ci_upper: 6000 },
  { name: "2023 Q4", actual: 6000, forecast: 6200, ci_lower: 5900, ci_upper: 6500 },
  { name: "2024 Q1", actual: null, forecast: 6500, ci_lower: 6200, ci_upper: 6800 },
  { name: "2024 Q2", actual: null, forecast: 6800, ci_lower: 6400, ci_upper: 7200 },
  { name: "2024 Q3", actual: null, forecast: 7200, ci_lower: 6700, ci_upper: 7700 },
  { name: "2024 Q4", actual: null, forecast: 7600, ci_lower: 7000, ci_upper: 8200 },
];

// Risk correlation data
const riskCorrelationData = [
  { x: 35, y: 30, z: 5000, name: 'Interest Rate' },
  { x: 45, y: 60, z: 9000, name: 'Credit Default' },
  { x: 60, y: 40, z: 7000, name: 'Market Volatility' },
  { x: 75, y: 65, z: 8000, name: 'Liquidity' },
  { x: 50, y: 75, z: 4000, name: 'Operational' },
  { x: 65, y: 85, z: 6000, name: 'FX Exposure' },
  { x: 80, y: 45, z: 10000, name: 'Compliance' },
];

// Anomaly detection data
const anomalyDetectionData = [
  { date: '01/01', value: 120, threshold: 150, isAnomaly: false },
  { date: '01/02', value: 132, threshold: 150, isAnomaly: false },
  { date: '01/03', value: 101, threshold: 150, isAnomaly: false },
  { date: '01/04', value: 134, threshold: 150, isAnomaly: false },
  { date: '01/05', value: 90, threshold: 150, isAnomaly: false },
  { date: '01/06', value: 230, threshold: 150, isAnomaly: true },
  { date: '01/07', value: 210, threshold: 150, isAnomaly: true },
  { date: '01/08', value: 120, threshold: 150, isAnomaly: false },
  { date: '01/09', value: 132, threshold: 150, isAnomaly: false },
  { date: '01/10', value: 101, threshold: 150, isAnomaly: false },
  { date: '01/11', value: 134, threshold: 150, isAnomaly: false },
  { date: '01/12', value: 90, threshold: 150, isAnomaly: false },
  { date: '01/13', value: 110, threshold: 150, isAnomaly: false },
  { date: '01/14', value: 301, threshold: 150, isAnomaly: true },
];

// Risk radar data
const riskRadarData = [
  {
    subject: 'Market Risk',
    current: 80,
    industry: 65,
    fullMark: 100,
  },
  {
    subject: 'Credit Risk',
    current: 65,
    industry: 59,
    fullMark: 100,
  },
  {
    subject: 'Liquidity Risk',
    current: 45,
    industry: 60,
    fullMark: 100,
  },
  {
    subject: 'Operational Risk',
    current: 30,
    industry: 40,
    fullMark: 100,
  },
  {
    subject: 'Compliance Risk',
    current: 70,
    industry: 68,
    fullMark: 100,
  },
  {
    subject: 'Strategic Risk',
    current: 55,
    industry: 62,
    fullMark: 100,
  },
];

const keyPerformanceIndicators = [
  { name: "Return on Assets", value: "5.8%", change: "+0.3%", status: "positive" },
  { name: "Debt-to-Equity", value: "0.47", change: "-0.05", status: "positive" },
  { name: "Working Capital", value: "$12.4M", change: "+$1.2M", status: "positive" },
  { name: "Days Payable", value: "32 days", change: "-2 days", status: "positive" },
  { name: "Cash Conversion", value: "18 days", change: "+3 days", status: "negative" },
];

const recentReports = [
  { id: 1, name: "Q2 2023 Financial Performance", type: "Quarterly", date: "Jul 15, 2023", status: "Final" },
  { id: 2, name: "Treasury Investment Analysis", type: "Ad-hoc", date: "Aug 03, 2023", status: "Draft" },
  { id: 3, name: "Cash Position Forecast", type: "Monthly", date: "Aug 05, 2023", status: "Final" },
  { id: 4, name: "Liquidity Risk Assessment", type: "Quarterly", date: "Jul 20, 2023", status: "Final" },
  { id: 5, name: "FX Exposure Summary", type: "Weekly", date: "Aug 08, 2023", status: "Draft" },
];

export const ReportsTabContent = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeFrame, setTimeFrame] = useState("quarterly");
  const [predictionView, setPredictionView] = useState("forecast");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Report data refreshed successfully");
    }, 1500);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleGenerateAIInsights = () => {
    toast.success("AI insights generated successfully");
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Treasury Reports</h2>
          <p className="text-muted-foreground">Comprehensive financial reporting and analysis</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Calendar className="h-4 w-4" />
            Select Date Range
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-2"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {keyPerformanceIndicators.map((kpi, index) => (
          <Card key={index} className="bg-card">
            <CardContent className="p-4">
              <p className="text-sm font-medium text-muted-foreground">{kpi.name}</p>
              <p className="text-2xl font-semibold mt-1">{kpi.value}</p>
              <p className={`text-xs mt-1 flex items-center ${kpi.status === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                {kpi.status === 'positive' ? (
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                ) : (
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                )}
                {kpi.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Custom Reports Card - Reused from existing ReportsCard */}
        <ReportsCard />
        
        {/* Transaction Distribution Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Transaction Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={transactionReportData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {transactionReportData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Cash Flow Reports Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <FileBarChart className="h-5 w-5 text-blue-600" />
              Cash Flow Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={cashflowReportData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                  <Legend />
                  <Bar dataKey="inflow" fill="#22c55e" name="Inflow" />
                  <Bar dataKey="outflow" fill="#ef4444" name="Outflow" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Annual Financial Trend Analysis */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Annual Financial Trends</CardTitle>
              <CardDescription>Historical performance analysis across key metrics</CardDescription>
            </div>
            <div className="flex mt-2 md:mt-0 gap-2">
              <Button variant="outline" size="sm" className="gap-1" onClick={() => setTimeFrame("quarterly")}>
                Quarterly
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={() => setTimeFrame("monthly")}>
                Monthly
              </Button>
              <Button variant="outline" size="sm" className="gap-1" onClick={() => setTimeFrame("yearly")}>
                Yearly
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={yearlyTrendData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorCashflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#0088FE" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorLiquidity" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#00C49F" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFBB28" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#FFBB28" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `$${value/1000}K`} />
                <Tooltip formatter={(value) => formatCurrency(value)} />
                <Legend />
                <Area 
                  type="monotone" 
                  dataKey="cashflow" 
                  name="Cash Flow" 
                  stroke="#0088FE" 
                  fillOpacity={1} 
                  fill="url(#colorCashflow)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="liquidity" 
                  name="Liquidity Position" 
                  stroke="#00C49F" 
                  fillOpacity={1} 
                  fill="url(#colorLiquidity)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="assets" 
                  name="Total Assets" 
                  stroke="#FFBB28" 
                  fillOpacity={1} 
                  fill="url(#colorAssets)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
        <CardFooter className="border-t flex justify-end p-4">
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </CardFooter>
      </Card>

      {/* AI-Powered Predictive Analytics Section */}
      <Card className="border-blue-100 dark:border-blue-800">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-blue-600" />
                AI-Powered Predictive Analysis
              </CardTitle>
              <CardDescription>Machine learning forecasts and anomaly detection</CardDescription>
            </div>
            <div className="flex mt-2 md:mt-0">
              <Button 
                onClick={handleGenerateAIInsights}
                variant="default" 
                size="sm"
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Zap className="h-4 w-4" />
                Generate AI Insights
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="forecast" className="w-full" onValueChange={setPredictionView}>
            <TabsList className="mb-4 w-full justify-start">
              <TabsTrigger value="forecast" className="gap-1">
                <TrendingUp className="h-4 w-4" />
                Financial Forecasting
              </TabsTrigger>
              <TabsTrigger value="risk" className="gap-1">
                <Brain className="h-4 w-4" />
                Risk Correlation
              </TabsTrigger>
              <TabsTrigger value="anomaly" className="gap-1">
                <AlertTriangle className="h-4 w-4" />
                Anomaly Detection
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="forecast">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={forecastData}
                    margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => `$${value/1000}K`} />
                    <Tooltip formatter={(value) => formatCurrency(value)} />
                    <Legend />
                    <defs>
                      <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="rgba(0, 136, 254, 0.3)" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="rgba(0, 136, 254, 0.1)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="ci_upper" 
                      fillOpacity={0.2} 
                      stroke="transparent" 
                      fill="url(#splitColor)" 
                      name="Confidence Interval (Upper)"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="ci_lower" 
                      fillOpacity={0.2} 
                      stroke="transparent" 
                      fill="transparent" 
                      name="Confidence Interval (Lower)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="actual" 
                      stroke="#22c55e" 
                      strokeWidth={2} 
                      dot={{ r: 5 }} 
                      name="Actual Performance" 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="forecast" 
                      stroke="#0088FE" 
                      strokeDasharray="5 5" 
                      strokeWidth={2} 
                      dot={{ r: 5 }} 
                      name="AI Forecast" 
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm flex items-start gap-2">
                  <BrainCircuit className="h-5 w-5 text-blue-600 mt-0.5" />
                  <span>
                    <strong>AI Insight:</strong> Based on historical trends and current market conditions, 
                    the model predicts a 15% growth in cash flow over the next two quarters with 85% confidence. 
                    Consider increasing short-term investments to capitalize on this positive trend.
                  </span>
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="risk">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    margin={{
                      top: 20,
                      right: 20,
                      bottom: 20,
                      left: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                    <XAxis type="number" dataKey="x" name="Risk Level" unit="%" />
                    <YAxis type="number" dataKey="y" name="Correlation" unit="%" />
                    <ZAxis type="number" dataKey="z" range={[100, 1000]} name="Impact" unit="k" />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }}
                      formatter={(value, name, props) => {
                        if (props.name === 'Impact') return [`$${value}k`, name];
                        return [`${value}%`, name];
                      }} 
                    />
                    <Legend />
                    <Scatter name="Risk Factors" data={riskCorrelationData} fill="#8884d8" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm flex items-start gap-2">
                  <BrainCircuit className="h-5 w-5 text-blue-600 mt-0.5" />
                  <span>
                    <strong>AI Risk Assessment:</strong> The analysis indicates that Market Volatility and FX Exposure 
                    present the highest combination of risk level and correlation to your portfolio. 
                    Consider implementing additional hedging strategies for these specific risk factors.
                  </span>
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="anomaly">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={anomalyDetectionData}
                      margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8884d8" 
                        dot={(props) => {
                          const { cx, cy, payload } = props;
                          if (payload.isAnomaly) {
                            return (
                              <circle 
                                cx={cx} 
                                cy={cy} 
                                r={6} 
                                fill="#ef4444" 
                                stroke="none" 
                              />
                            );
                          }
                          return (
                            <circle 
                              cx={cx} 
                              cy={cy} 
                              r={4} 
                              fill="#8884d8" 
                              stroke="none" 
                            />
                          );
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="threshold" 
                        stroke="#ff7300" 
                        strokeDasharray="5 5" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Anomaly Detection Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                          <p className="font-medium text-red-800 dark:text-red-300 mb-1">Detected Anomalies:</p>
                          <ul className="list-disc list-inside text-sm space-y-2">
                            <li>
                              <span className="font-medium">Jan 6:</span> Transaction value 53% above normal threshold
                            </li>
                            <li>
                              <span className="font-medium">Jan 7:</span> Continued elevated activity, 40% above threshold
                            </li>
                            <li>
                              <span className="font-medium">Jan 14:</span> Spike of 100% above normal activity
                            </li>
                          </ul>
                        </div>
                        <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                          <p className="font-medium text-amber-800 dark:text-amber-300 mb-1">Potential Causes:</p>
                          <ul className="list-disc list-inside text-sm">
                            <li>Unusual large transaction patterns</li>
                            <li>Potential duplicate transactions</li>
                            <li>Inconsistent recording procedures</li>
                            <li>Possible unauthorized activity</li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm flex items-start gap-2">
                  <BrainCircuit className="h-5 w-5 text-blue-600 mt-0.5" />
                  <span>
                    <strong>AI Anomaly Analysis:</strong> The system has detected three significant anomalies in the transaction 
                    patterns. The most severe occurred on January 14th with a 100% deviation from normal patterns. 
                    Recommended action: Review transactions from Jan 6-7 and Jan 14 for potential irregularities.
                  </span>
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Risk Assessment Dashboard */}
      <Card className="border-blue-100 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-600" />
            Risk Assessment Dashboard
          </CardTitle>
          <CardDescription>
            Comprehensive risk profile analysis with industry benchmarking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart outerRadius={130} data={riskRadarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar 
                    name="Your Organization" 
                    dataKey="current" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.6} 
                  />
                  <Radar 
                    name="Industry Average" 
                    dataKey="industry" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    fillOpacity={0.6} 
                  />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <div className="space-y-4">
                <Card className="border-blue-50 dark:border-blue-900">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">Key Risk Indicators</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Market Risk (VaR)</span>
                          <span className="font-medium text-amber-600">Medium-High</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Credit Risk</span>
                          <span className="font-medium text-amber-600">Medium</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Liquidity Risk</span>
                          <span className="font-medium text-green-600">Medium-Low</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Operational Risk</span>
                          <span className="font-medium text-green-600">Low</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Compliance Risk</span>
                          <span className="font-medium text-amber-600">Medium-High</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div className="bg-amber-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm flex items-start gap-2">
                    <BrainCircuit className="h-5 w-5 text-blue-600 mt-0.5" />
                    <span>
                      <strong>AI Risk Analysis:</strong> Your organization shows elevated market risk compared to industry averages. 
                      Consider diversifying your investment portfolio to reduce concentration risk. 
                      Your operational risk management is exemplary, showing best-in-class controls.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Reports Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <CardTitle>Recent Reports</CardTitle>
            <Button className="mt-2 md:mt-0 gap-2">
              <FileText className="h-4 w-4" />
              Generate New Report
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-medium">Report Name</th>
                  <th className="text-left p-3 font-medium">Type</th>
                  <th className="text-left p-3 font-medium">Date</th>
                  <th className="text-left p-3 font-medium">Status</th>
                  <th className="text-right p-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr key={report.id} className="border-b hover:bg-muted/20">
                    <td className="p-3">
                      <div className="font-medium">{report.name}</div>
                    </td>
                    <td className="p-3 text-muted-foreground">{report.type}</td>
                    <td className="p-3 text-muted-foreground">{report.date}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        report.status === 'Final' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                          : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">View</Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
        <CardFooter className="border-t flex items-center justify-between p-4">
          <div className="text-sm text-muted-foreground">
            <Clock className="h-4 w-4 inline mr-1" />
            Last updated: Aug 10, 2023 at 09:45 AM
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="h-4 w-4" />
            Report Settings
          </Button>
        </CardFooter>
      </Card>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reports</CardTitle>
          <CardDescription>Automated reports scheduled for delivery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Daily Cash Position</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  Every weekday at 8:00 AM
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">Disable</Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Weekly Treasury Summary</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  Every Monday at 9:00 AM
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">Disable</Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">Monthly Performance Report</h4>
                <p className="text-sm text-muted-foreground mt-1">
                  <Calendar className="h-3 w-3 inline mr-1" />
                  1st of each month at 7:00 AM
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">Disable</Button>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t p-4 flex justify-center">
          <Button className="gap-2">
            <PieChartIcon className="h-4 w-4" />
            Schedule New Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
