
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { 
  AlertCircle, 
  ArrowDown, 
  ArrowRight, 
  ArrowUp, 
  BadgeCheck, 
  BarChart2, 
  Brain, 
  Calculator, 
  CalendarDays, 
  ChevronRight, 
  CreditCard, 
  DollarSign, 
  Download, 
  Filter, 
  LineChart as LineChartIcon, 
  Loader2, 
  PieChart as PieChartIcon, 
  Plus, 
  RefreshCcw, 
  Save, 
  Settings, 
  Sliders, 
  ThumbsUp, 
  TrendingDown, 
  TrendingUp 
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Sample data for liquidity risk demonstration
const liquidityCashFlowData = [
  { month: "Jan", inflow: 4500000, outflow: 4100000, net: 400000 },
  { month: "Feb", inflow: 5200000, outflow: 4800000, net: 400000 },
  { month: "Mar", inflow: 4800000, outflow: 4600000, net: 200000 },
  { month: "Apr", inflow: 6000000, outflow: 5500000, net: 500000 },
  { month: "May", inflow: 5800000, outflow: 5700000, net: 100000 },
  { month: "Jun", inflow: 6500000, outflow: 6400000, net: 100000 },
  { month: "Jul", forecast: true, inflow: 6200000, outflow: 5900000, net: 300000 },
  { month: "Aug", forecast: true, inflow: 6700000, outflow: 6200000, net: 500000 },
  { month: "Sep", forecast: true, inflow: 6300000, outflow: 6100000, net: 200000 },
];

const liquidityMetricsData = [
  { name: "Current Ratio", value: 1.85, threshold: 1.5, status: "good" },
  { name: "Quick Ratio", value: 1.32, threshold: 1.0, status: "good" },
  { name: "Cash Ratio", value: 0.45, threshold: 0.5, status: "warning" },
  { name: "Operating Cash Flow Ratio", value: 1.12, threshold: 1.0, status: "good" },
  { name: "Days Cash on Hand", value: 42, threshold: 30, status: "good" },
];

const stressTestScenarios = [
  { id: 1, name: "Baseline", description: "Current projections with no changes", severity: "low" },
  { id: 2, name: "Market Downturn", description: "30% decrease in receivables, 10% increase in payables", severity: "high" },
  { id: 3, name: "Credit Crunch", description: "Limited access to credit facilities and delay in receivables", severity: "high" },
  { id: 4, name: "Operational Disruption", description: "Supply chain disruption causing payment delays", severity: "medium" },
  { id: 5, name: "Regulatory Changes", description: "Increased compliance costs and payment timing changes", severity: "medium" },
];

const aiInsightsData = [
  {
    id: 1,
    title: "Potential Liquidity Crunch in Q3",
    description: "Based on historical patterns and market indicators, there's a 72% probability of a liquidity shortage in August-September if current payment trends continue.",
    impact: "high",
    probability: 0.72,
    recommendation: "Consider securing an additional credit line of $3M to bridge the potential gap and renegotiate terms with top 3 suppliers."
  },
  {
    id: 2,
    title: "Seasonal Cash Flow Pattern Detected",
    description: "AI analysis identified a recurring pattern of reduced receivables during summer months (Jul-Aug) with 95% confidence level.",
    impact: "medium",
    probability: 0.95,
    recommendation: "Adjust payment schedules with key vendors to better align with cash flow seasonality."
  },
  {
    id: 3,
    title: "Optimization Opportunity",
    description: "Cash reserves currently exceed optimal levels by approximately $1.2M based on your risk profile and operations.",
    impact: "low",
    probability: 0.88,
    recommendation: "Consider short-term investments or early payment discounts to optimize excess cash."
  }
];

// Colors for charts and indicators
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];
const STATUS_COLORS = {
  good: "text-green-600",
  warning: "text-yellow-600",
  critical: "text-red-600"
};

export function LiquidityRiskPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedStressTest, setSelectedStressTest] = useState(stressTestScenarios[0]);
  const [timeHorizon, setTimeHorizon] = useState("12months");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Liquidity data refreshed successfully");
    }, 1500);
  };

  const handleStressTestSelect = (scenario) => {
    setSelectedStressTest(scenario);
    toast.info(`Loaded ${scenario.name} stress test scenario`);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Generate stress test results based on selected scenario
  const generateStressTestData = () => {
    // Clone the base data
    const baseData = [...liquidityCashFlowData];
    
    // Apply scenario-specific modifications
    if (selectedStressTest.id === 2) { // Market Downturn
      return baseData.map(month => ({
        ...month,
        inflow: month.forecast ? month.inflow * 0.7 : month.inflow, // 30% decrease in future inflows
        outflow: month.forecast ? month.outflow * 1.1 : month.outflow, // 10% increase in future outflows
        net: month.forecast ? (month.inflow * 0.7) - (month.outflow * 1.1) : month.net
      }));
    } else if (selectedStressTest.id === 3) { // Credit Crunch
      return baseData.map(month => ({
        ...month,
        inflow: month.forecast ? month.inflow * 0.8 : month.inflow, // 20% decrease due to delayed receivables
        net: month.forecast ? (month.inflow * 0.8) - month.outflow : month.net
      }));
    } else if (selectedStressTest.id === 4) { // Operational Disruption
      return baseData.map(month => ({
        ...month,
        outflow: month.forecast ? month.outflow * 1.15 : month.outflow, // 15% increase in costs
        net: month.forecast ? month.inflow - (month.outflow * 1.15) : month.net
      }));
    } else if (selectedStressTest.id === 5) { // Regulatory Changes
      return baseData.map(month => ({
        ...month,
        outflow: month.forecast ? month.outflow * 1.08 : month.outflow, // 8% increase in compliance costs
        net: month.forecast ? month.inflow - (month.outflow * 1.08) : month.net
      }));
    }
    
    // Default case: return baseline scenario (no changes)
    return baseData;
  };

  const stressTestData = generateStressTestData();

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <CommercialHeader 
          title="Liquidity Risk Management"
          description="Monitor, analyze, and optimize liquidity positions"
          showBack={true}
        />

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2" onClick={() => setTimeHorizon("3months")}>
              <CalendarDays className="h-4 w-4" />
              3 Months
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => setTimeHorizon("6months")}>
              <CalendarDays className="h-4 w-4" />
              6 Months
            </Button>
            <Button variant="outline" className="gap-2" onClick={() => setTimeHorizon("12months")}>
              <CalendarDays className="h-4 w-4" />
              12 Months
            </Button>
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleRefresh}
            disabled={isRefreshing}
          >
            <RefreshCcw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Data
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            <TabsTrigger value="cashflow">Cash Flow Forecast</TabsTrigger>
            <TabsTrigger value="stress-test">Stress Testing</TabsTrigger>
            <TabsTrigger value="ai-insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Summary Cards for Liquidity Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Liquidity Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-3xl font-bold">1.85</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        0.1 from last month
                      </p>
                    </div>
                    <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full">
                      <DollarSign className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Cash Flow Coverage</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-3xl font-bold">118%</p>
                      <p className="text-sm text-green-600 flex items-center mt-1">
                        <ArrowUp className="h-4 w-4 mr-1" />
                        3% from last month
                      </p>
                    </div>
                    <div className="bg-green-100 dark:bg-green-800 p-2 rounded-full">
                      <BarChart2 className="h-6 w-6 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Days Cash on Hand</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-3xl font-bold">42 days</p>
                      <p className="text-sm text-red-600 flex items-center mt-1">
                        <ArrowDown className="h-4 w-4 mr-1" />
                        5 days from target
                      </p>
                    </div>
                    <div className="bg-orange-100 dark:bg-orange-800 p-2 rounded-full">
                      <CalendarDays className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main chart */}
            <Card>
              <CardHeader>
                <CardTitle>Liquidity Forecast</CardTitle>
                <CardDescription>Projected cash flows with 90-day forecast horizon</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={liquidityCashFlowData}
                      margin={{ top: 10, right: 30, left: 20, bottom: 30 }}
                    >
                      <defs>
                        <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => `$${(value/1000000).toFixed(1)}M`}
                      />
                      <Tooltip 
                        formatter={(value) => formatCurrency(value)}
                        labelFormatter={(label, items) => {
                          const dataPoint = liquidityCashFlowData.find(item => item.month === label);
                          return `${label}${dataPoint?.forecast ? ' (Forecast)' : ''}`;
                        }}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="inflow" 
                        stroke="#22c55e" 
                        fillOpacity={1} 
                        fill="url(#colorInflow)" 
                        name="Cash Inflow"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="outflow" 
                        stroke="#ef4444" 
                        fillOpacity={1} 
                        fill="url(#colorOutflow)" 
                        name="Cash Outflow"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="px-6 border-t pt-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <div className="flex items-center mr-4">
                    <div className="h-3 w-3 rounded-full bg-blue-500 mr-1"></div>
                    <span>Historical Data</span>
                  </div>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-blue-500 opacity-50 mr-1"></div>
                    <span>Forecast</span>
                  </div>
                </div>
              </CardFooter>
            </Card>

            {/* Liquidity Risk Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Liquidity Risk Alerts</CardTitle>
                <CardDescription>Active alerts requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start p-4 border rounded-lg bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-amber-900 dark:text-amber-300">Cash Ratio Below Target</h4>
                      <p className="text-sm text-amber-800 dark:text-amber-400 mt-1">Current ratio 0.45 is below the target threshold of 0.5. Consider increasing liquid assets or restructuring short-term liabilities.</p>
                      <div className="flex mt-2">
                        <Button variant="outline" size="sm" className="text-xs mr-2">View Details</Button>
                        <Button variant="outline" size="sm" className="text-xs">Dismiss</Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start p-4 border rounded-lg">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold">Credit Facility Renewal</h4>
                      <p className="text-sm text-muted-foreground mt-1">$10M revolving credit facility renewal due in 45 days. Begin preparation for renewal documentation.</p>
                      <div className="flex mt-2">
                        <Button variant="outline" size="sm" className="text-xs mr-2">View Details</Button>
                        <Button variant="outline" size="sm" className="text-xs">Dismiss</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Liquidity Metrics Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Liquidity Metrics</CardTitle>
                  <CardDescription>Key performance indicators for liquidity position</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left font-medium p-2">Metric</th>
                          <th className="text-right font-medium p-2">Value</th>
                          <th className="text-right font-medium p-2">Threshold</th>
                          <th className="text-right font-medium p-2">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {liquidityMetricsData.map((metric, i) => (
                          <tr key={i} className="border-b">
                            <td className="p-2">
                              <div className="font-medium">{metric.name}</div>
                            </td>
                            <td className="text-right p-2">{metric.value}</td>
                            <td className="text-right p-2">{metric.threshold}</td>
                            <td className="text-right p-2">
                              <span className={`inline-flex items-center ${STATUS_COLORS[metric.status]}`}>
                                {metric.status === "good" && <BadgeCheck className="h-4 w-4 mr-1" />}
                                {metric.status === "warning" && <AlertCircle className="h-4 w-4 mr-1" />}
                                {metric.status === "critical" && <AlertCircle className="h-4 w-4 mr-1" />}
                                {metric.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Liquidity Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Liquidity Distribution</CardTitle>
                  <CardDescription>Breakdown of available liquid assets</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Operating Cash", value: 5000000 },
                            { name: "Short-term Investments", value: 3200000 },
                            { name: "Secured Credit Lines", value: 8000000 },
                            { name: "Unsecured Credit Lines", value: 4000000 },
                            { name: "Trade Finance", value: 2500000 },
                          ]}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {[0, 1, 2, 3, 4].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Historical Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Historical Liquidity Trends</CardTitle>
                <CardDescription>12-month trend analysis of key liquidity metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { month: "Mar", currentRatio: 1.65, quickRatio: 1.22, cashRatio: 0.38 },
                        { month: "Apr", currentRatio: 1.68, quickRatio: 1.25, cashRatio: 0.42 },
                        { month: "May", currentRatio: 1.70, quickRatio: 1.27, cashRatio: 0.40 },
                        { month: "Jun", currentRatio: 1.72, quickRatio: 1.28, cashRatio: 0.41 },
                        { month: "Jul", currentRatio: 1.75, quickRatio: 1.30, cashRatio: 0.43 },
                        { month: "Aug", currentRatio: 1.73, quickRatio: 1.29, cashRatio: 0.42 },
                        { month: "Sep", currentRatio: 1.78, quickRatio: 1.33, cashRatio: 0.44 },
                        { month: "Oct", currentRatio: 1.80, quickRatio: 1.34, cashRatio: 0.43 },
                        { month: "Nov", currentRatio: 1.79, quickRatio: 1.32, cashRatio: 0.42 },
                        { month: "Dec", currentRatio: 1.82, quickRatio: 1.35, cashRatio: 0.44 },
                        { month: "Jan", currentRatio: 1.83, quickRatio: 1.34, cashRatio: 0.45 },
                        { month: "Feb", currentRatio: 1.85, quickRatio: 1.32, cashRatio: 0.45 },
                      ]}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0.3, 2.0]} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="currentRatio" stroke="#0088FE" name="Current Ratio" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="quickRatio" stroke="#00C49F" name="Quick Ratio" strokeWidth={2} dot={{ r: 3 }} />
                      <Line type="monotone" dataKey="cashRatio" stroke="#FFBB28" name="Cash Ratio" strokeWidth={2} dot={{ r: 3 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cashflow" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="col-span-3 md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Net Cash Flow</CardTitle>
                </CardHeader>
                <CardContent className="pb-1">
                  <div className="flex flex-col">
                    <div className="text-3xl font-bold">
                      {formatCurrency(500000)}
                    </div>
                    <div className="text-sm text-green-600 flex items-center mt-1">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      25% vs. previous month
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3 md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Inflows</CardTitle>
                </CardHeader>
                <CardContent className="pb-1">
                  <div className="flex flex-col">
                    <div className="text-3xl font-bold">
                      {formatCurrency(6700000)}
                    </div>
                    <div className="text-sm text-green-600 flex items-center mt-1">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      8% vs. previous month
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3 md:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Upcoming Outflows</CardTitle>
                </CardHeader>
                <CardContent className="pb-1">
                  <div className="flex flex-col">
                    <div className="text-3xl font-bold">
                      {formatCurrency(6200000)}
                    </div>
                    <div className="text-sm text-red-600 flex items-center mt-1">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      5% vs. previous month
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Detailed Cash Flow Forecast</CardTitle>
                <CardDescription>30/60/90-day projection with variance analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={liquidityCashFlowData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="month" />
                      <YAxis yAxisId="left" orientation="left" tickFormatter={(value) => `$${(value/1000000).toFixed(1)}M`} />
                      <YAxis yAxisId="right" orientation="right" domain={[-1000000, 1000000]} tickFormatter={(value) => `$${(value/1000000).toFixed(1)}M`} />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend verticalAlign="top" wrapperStyle={{ paddingBottom: 20 }} />
                      <Bar yAxisId="left" dataKey="inflow" fill="#22c55e" name="Cash Inflow" />
                      <Bar yAxisId="left" dataKey="outflow" fill="#ef4444" name="Cash Outflow" />
                      <Line yAxisId="right" type="monotone" dataKey="net" stroke="#0088FE" name="Net Cash Flow" strokeWidth={2} dot={{ r: 4 }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t px-6 py-4">
                <div className="text-sm text-muted-foreground flex items-center">
                  <div className="w-3 h-3 bg-blue-300 opacity-50 rounded-sm mr-2"></div>
                  Forecast data shown with blue shading
                </div>
                <Button className="gap-2">
                  <Download className="h-4 w-4" />
                  Export Data
                </Button>
              </CardFooter>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Inflow Analysis</CardTitle>
                  <CardDescription>Categorized sources of upcoming cash inflows</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Customer Payments", value: 4200000 },
                            { name: "Receivables", value: 1500000 },
                            { name: "Credit Facilities", value: 650000 },
                            { name: "Asset Sales", value: 350000 },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {[0, 1, 2, 3].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Outflow Analysis</CardTitle>
                  <CardDescription>Categorized sources of upcoming cash outflows</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Vendor Payments", value: 3100000 },
                            { name: "Payroll", value: 1800000 },
                            { name: "Loan Payments", value: 850000 },
                            { name: "Taxes", value: 450000 },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {[0, 1, 2, 3].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stress-test" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>Stress Test Scenarios</CardTitle>
                    <CardDescription>Select a scenario to view the impact on liquidity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {stressTestScenarios.map(scenario => (
                        <div 
                          key={scenario.id}
                          className={`p-4 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${selectedStressTest.id === scenario.id ? 'bg-accent border-blue-200 dark:border-blue-800' : ''}`}
                          onClick={() => handleStressTestSelect(scenario)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{scenario.name}</div>
                            <div className={`text-xs px-2 py-1 rounded ${
                              scenario.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                              scenario.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                              {scenario.severity.charAt(0).toUpperCase() + scenario.severity.slice(1)} Severity
                            </div>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{scenario.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-2">
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle>{selectedStressTest.name} Scenario Impact</CardTitle>
                    <CardDescription>{selectedStressTest.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={stressTestData}
                          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#0088FE" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                          <XAxis dataKey="month" />
                          <YAxis tickFormatter={(value) => `$${(value/1000000).toFixed(1)}M`} />
                          <Tooltip 
                            formatter={(value) => formatCurrency(value)}
                            labelFormatter={(label) => {
                              const item = stressTestData.find(d => d.month === label);
                              return `${label}${item?.forecast ? " (Forecast)" : ""}`;
                            }}
                          />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="net" 
                            stroke="#0088FE" 
                            fillOpacity={1} 
                            fill="url(#colorNet)" 
                            name="Net Cash Flow"
                          />
                          <Area 
                            type="monotone" 
                            dataKey="inflow" 
                            stroke="#22c55e" 
                            fill="none"
                            name="Cash Inflow" 
                          />
                          <Area 
                            type="monotone" 
                            dataKey="outflow" 
                            stroke="#ef4444" 
                            fill="none"
                            name="Cash Outflow" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="mt-6 space-y-4">
                      <h4 className="font-semibold">Impact Analysis</h4>
                      
                      <div className="flex flex-col space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Cash Flow Coverage Ratio:</span>
                          <span className={`font-medium ${selectedStressTest.id > 1 ? 'text-red-600' : 'text-green-600'}`}>
                            {selectedStressTest.id === 1 ? '118%' : 
                             selectedStressTest.id === 2 ? '82%' : 
                             selectedStressTest.id === 3 ? '88%' : 
                             selectedStressTest.id === 4 ? '92%' : '95%'}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm">Days Cash on Hand:</span>
                          <span className={`font-medium ${selectedStressTest.id > 1 ? 'text-red-600' : 'text-green-600'}`}>
                            {selectedStressTest.id === 1 ? '42 days' : 
                             selectedStressTest.id === 2 ? '26 days' : 
                             selectedStressTest.id === 3 ? '25 days' : 
                             selectedStressTest.id === 4 ? '30 days' : '36 days'}
                          </span>
                        </div>
                        
                        <div className="flex justify-between">
                          <span className="text-sm">Additional Funding Needed:</span>
                          <span className={`font-medium ${selectedStressTest.id === 1 ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedStressTest.id === 1 ? '$0' : 
                             selectedStressTest.id === 2 ? '$3,500,000' : 
                             selectedStressTest.id === 3 ? '$2,800,000' : 
                             selectedStressTest.id === 4 ? '$1,500,000' : '$900,000'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t flex justify-between px-6 py-4">
                    <Button variant="outline" className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Analysis
                    </Button>
                    <Button className="gap-2">
                      <Download className="h-4 w-4" />
                      Export Report
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai-insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1">
                <Card className="bg-blue-50/50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-blue-600" />
                      AI Liquidity Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">AI analysis of your liquidity position with personalized recommendations based on historical patterns and market conditions.</p>
                      
                      <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4">
                        <h4 className="font-semibold flex items-center text-blue-900 dark:text-blue-300">
                          <Calculator className="h-4 w-4 mr-2" />
                          Optimization Score
                        </h4>
                        <div className="mt-2 flex items-center">
                          <span className="text-2xl font-bold text-blue-900 dark:text-blue-300">78/100</span>
                          <span className="ml-3 text-sm text-blue-700 dark:text-blue-400">+5 from last month</span>
                        </div>
                        <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">Your liquidity management is improving but there are still optimization opportunities.</p>
                      </div>
                      
                      <div className="pt-2">
                        <h4 className="font-semibold mb-2">Quick Actions</h4>
                        <div className="space-y-2">
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Run optimization analysis
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Settings className="h-4 w-4 mr-2" />
                            Configure AI parameters
                          </Button>
                          <Button variant="outline" size="sm" className="w-full justify-start">
                            <Download className="h-4 w-4 mr-2" />
                            Download full AI report
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>AI-Generated Insights</CardTitle>
                    <CardDescription>Machine learning-powered analysis of your liquidity data</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {aiInsightsData.map((insight) => (
                        <div key={insight.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start">
                            <h4 className="font-semibold">{insight.title}</h4>
                            <div className={`text-xs px-2 py-1 rounded ${
                              insight.impact === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                              insight.impact === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                              'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            }`}>
                              {insight.impact.charAt(0).toUpperCase() + insight.impact.slice(1)} Impact
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mt-2">{insight.description}</p>
                          
                          <div className="mt-3 pt-3 border-t">
                            <div className="flex items-center">
                              <Brain className="h-4 w-4 text-blue-600 mr-2" />
                              <span className="text-sm font-semibold">AI Recommendation:</span>
                            </div>
                            <p className="text-sm mt-1">{insight.recommendation}</p>
                          </div>
                          
                          <div className="mt-3 flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                              Confidence: {(insight.probability * 100).toFixed(0)}%
                            </div>
                            <Button size="sm">Apply Recommendation</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Forecasting Chart */}
            <Card>
              <CardHeader>
                <CardTitle>AI-Powered Cash Flow Forecast</CardTitle>
                <CardDescription>90-day ML forecast with confidence intervals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { day: "1", actual: 320000, forecast: null, upper: null, lower: null },
                        { day: "5", actual: 340000, forecast: null, upper: null, lower: null },
                        { day: "10", actual: 305000, forecast: null, upper: null, lower: null },
                        { day: "15", actual: 350000, forecast: null, upper: null, lower: null },
                        { day: "20", actual: 370000, forecast: null, upper: null, lower: null },
                        { day: "25", actual: 390000, forecast: null, upper: null, lower: null },
                        { day: "30", actual: 410000, forecast: 410000, upper: 410000, lower: 410000 },
                        { day: "35", actual: null, forecast: 425000, upper: 445000, lower: 405000 },
                        { day: "40", actual: null, forecast: 440000, upper: 470000, lower: 410000 },
                        { day: "45", actual: null, forecast: 455000, upper: 490000, lower: 420000 },
                        { day: "50", actual: null, forecast: 430000, upper: 470000, lower: 390000 },
                        { day: "55", actual: null, forecast: 450000, upper: 495000, lower: 405000 },
                        { day: "60", actual: null, forecast: 465000, upper: 515000, lower: 415000 },
                        { day: "65", actual: null, forecast: 480000, upper: 535000, lower: 425000 },
                        { day: "70", actual: null, forecast: 495000, upper: 555000, lower: 435000 },
                        { day: "75", actual: null, forecast: 510000, upper: 575000, lower: 445000 },
                        { day: "80", actual: null, forecast: 525000, upper: 595000, lower: 455000 },
                        { day: "85", actual: null, forecast: 540000, upper: 615000, lower: 465000 },
                        { day: "90", actual: null, forecast: 555000, upper: 635000, lower: 475000 },
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="day" label={{ value: 'Days', position: 'insideBottomRight', offset: -10 }} />
                      <YAxis tickFormatter={(value) => `$${(value/1000).toFixed(0)}k`} />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Legend />
                      <Line type="monotone" dataKey="actual" stroke="#0088FE" name="Actual Cash Flow" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="forecast" stroke="#00C49F" strokeDasharray="5 5" name="ML Forecast" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="upper" stroke="#FFBB28" strokeDasharray="3 3" name="Upper Bound (95%)" strokeWidth={1} dot={false} />
                      <Line type="monotone" dataKey="lower" stroke="#FF8042" strokeDasharray="3 3" name="Lower Bound (95%)" strokeWidth={1} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="border-t pt-4 mt-2 flex justify-between items-center text-sm text-muted-foreground">
                  <div>Model: LSTM + Seasonal Decomposition (Updated 2 days ago)</div>
                  <div>Accuracy: 93.2% (MAPE: 6.8%)</div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

export default LiquidityRiskPage;
