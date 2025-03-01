
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { 
  ArrowDownRight, 
  ArrowUpRight,
  Calendar, 
  Download, 
  Droplet, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon,
  RefreshCw, 
  Wallet
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Sample data for charts
const cashFlowData = [
  { date: 'Jan', inflow: 4500, outflow: 3800, balance: 700 },
  { date: 'Feb', inflow: 5200, outflow: 4200, balance: 1000 },
  { date: 'Mar', inflow: 4800, outflow: 4600, balance: 200 },
  { date: 'Apr', inflow: 5500, outflow: 4900, balance: 600 },
  { date: 'May', inflow: 6000, outflow: 5200, balance: 800 },
  { date: 'Jun', inflow: 5800, outflow: 5400, balance: 400 },
];

const cashAllocationData = [
  { name: 'Operating Accounts', value: 45 },
  { name: 'Money Market', value: 25 },
  { name: 'Time Deposits', value: 15 },
  { name: 'Treasury Bills', value: 10 },
  { name: 'Other', value: 5 },
];

const cashForecastData = [
  { date: 'Jul', forecast: 5900, lower: 5500, upper: 6300 },
  { date: 'Aug', forecast: 6200, lower: 5700, upper: 6700 },
  { date: 'Sep', forecast: 6500, lower: 5900, upper: 7100 },
  { date: 'Oct', forecast: 6300, lower: 5600, upper: 7000 },
  { date: 'Nov', forecast: 6700, lower: 5900, upper: 7500 },
  { date: 'Dec', forecast: 7200, lower: 6300, upper: 8100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function CashInsightsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Cash insights refreshed successfully");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader
          title="Cash Flow Insights"
          description="AI-powered analysis and forecasting of your cash flows"
          showBack={true}
        />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Cash Intelligence</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh Insights
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Cash Insights */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Current Cash Position</p>
                  <h3 className="text-2xl font-bold mt-2">$12.7M</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +4.2% vs last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Cash Burn Rate</p>
                  <h3 className="text-2xl font-bold mt-2">$2.3M/mo</h3>
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +5.8% vs last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <LineChartIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Liquidity Ratio</p>
                  <h3 className="text-2xl font-bold mt-2">1.8</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +0.2 vs target
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Droplet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Forecasted Cash</p>
                  <h3 className="text-2xl font-bold mt-2">$15.2M</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +19.7% in 90 days
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cash Flow Analysis */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChartIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Cash Flow Analysis
              </CardTitle>
              <CardDescription>
                Historical cash flow analysis with AI-detected patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="inflow" 
                      name="Cash Inflow" 
                      stackId="1"
                      stroke="#10b981" 
                      fill="#10b981"
                      fillOpacity={0.6}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="outflow" 
                      name="Cash Outflow" 
                      stackId="2"
                      stroke="#ef4444" 
                      fill="#ef4444"
                      fillOpacity={0.6}
                    />
                    <Line
                      type="monotone"
                      dataKey="balance"
                      name="Net Cash Flow"
                      stroke="#3b82f6"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 space-y-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                  AI Analysis
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Our AI has detected a cyclical pattern in your cash flows with peaks in February and May. 
                  The trend indicates increasing cash stability with reduced volatility compared to previous periods.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Cash Allocation
              </CardTitle>
              <CardDescription>
                Current cash allocation with AI optimization suggestions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={cashAllocationData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {cashAllocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 space-y-2">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                  AI Recommendation
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Based on current interest rates and your liquidity needs, our AI suggests reducing operating 
                  account balances by 10% and increasing time deposits allocation to take advantage of favorable rates.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cash Forecast */}
        <Card className="mb-6 border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LineChartIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              AI Cash Flow Forecast
            </CardTitle>
            <CardDescription>
              6-month forward-looking cash forecast with confidence intervals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={cashForecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="upper" 
                    stroke="transparent" 
                    fill="#3b82f6" 
                    fillOpacity={0.2} 
                    name="Upper Bound"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="lower" 
                    stroke="transparent" 
                    fill="#3b82f6" 
                    fillOpacity={0.2} 
                    name="Lower Bound"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="#3b82f6" 
                    name="Forecast" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                <h4 className="font-medium mb-2">AI Forecast Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Our AI predicts your cash position will improve by 19.7% over the next 90 days, with a confidence 
                  interval of ±9%. This forecast incorporates historical patterns, seasonality, and known future 
                  transactions. Key drivers include:
                </p>
                <ul className="list-disc text-sm text-muted-foreground pl-5 mt-2">
                  <li>Expected increase in receivables collection efficiency</li>
                  <li>Seasonal uptick in Q3 revenue</li>
                  <li>Planned reduction in capital expenditure</li>
                </ul>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <Card className="border border-blue-50 dark:border-blue-900">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm">Cash Runway</h4>
                    <p className="text-2xl font-bold">18.2 months</p>
                    <p className="text-xs text-muted-foreground mt-1">at current burn rate</p>
                  </CardContent>
                </Card>
                <Card className="border border-blue-50 dark:border-blue-900">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm">Cash Conversion Cycle</h4>
                    <p className="text-2xl font-bold">26 days</p>
                    <p className="text-xs text-green-500 mt-1 flex items-center">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      -3 days vs previous period
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-blue-50 dark:border-blue-900">
                  <CardContent className="p-4">
                    <h4 className="font-medium text-sm">Forecast Accuracy</h4>
                    <p className="text-2xl font-bold">93%</p>
                    <p className="text-xs text-muted-foreground mt-1">based on last 6 months</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Cash Management Recommendations</CardTitle>
            <CardDescription>
              AI-generated recommendations to optimize your cash position
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Optimize Accounts Receivable",
                  description: "Implement an early payment discount program to reduce days sales outstanding. We identified $1.2M in aging receivables that could benefit from this approach.",
                  impact: "High",
                  timeframe: "1-2 months",
                  confidence: "87%"
                },
                {
                  title: "Restructure Cash Pooling",
                  description: "Consolidate cash from 5 separate operating accounts to reduce idle balances. This would unlock approximately $800K for better yielding investments.",
                  impact: "Medium",
                  timeframe: "Immediate",
                  confidence: "94%"
                },
                {
                  title: "Adjust Payment Terms",
                  description: "Negotiate extended payment terms with top 3 suppliers, which would improve cash flow by approximately $450K per month.",
                  impact: "Medium",
                  timeframe: "3 months",
                  confidence: "76%"
                },
                {
                  title: "Optimize Cash Reserves",
                  description: "Current reserves exceed optimal levels by approximately $3.2M. Consider deploying excess capital to short-term investments with 2.8% higher yield.",
                  impact: "High",
                  timeframe: "Immediate",
                  confidence: "91%"
                }
              ].map((rec, index) => (
                <Card key={index} className="border border-blue-50 dark:border-blue-900">
                  <CardContent className="p-4">
                    <div className="flex justify-between mb-2">
                      <h3 className="font-medium">{rec.title}</h3>
                      <Badge
                        variant="outline"
                        className={
                          rec.impact === "High"
                            ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                            : "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                        }
                      >
                        {rec.impact} Impact
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{rec.description}</p>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <Badge variant="outline">Timeframe: {rec.timeframe}</Badge>
                      <Badge variant="outline">AI Confidence: {rec.confidence}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
