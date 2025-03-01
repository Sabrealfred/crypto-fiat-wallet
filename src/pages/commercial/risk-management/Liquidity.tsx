
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
  PieChart, 
  Pie, 
  Cell
} from "recharts";
import {
  Droplets,
  AlertTriangle,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Calendar,
  DollarSign,
  Wallet
} from "lucide-react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const liquidityRatioData = [
  { month: 'Jan', ratio: 1.65, benchmark: 1.50 },
  { month: 'Feb', ratio: 1.58, benchmark: 1.50 },
  { month: 'Mar', ratio: 1.72, benchmark: 1.50 },
  { month: 'Apr', ratio: 1.63, benchmark: 1.50 },
  { month: 'May', ratio: 1.51, benchmark: 1.50 },
  { month: 'Jun', ratio: 1.48, benchmark: 1.50 },
  { month: 'Jul', ratio: 1.55, benchmark: 1.50 },
  { month: 'Aug', ratio: 1.62, benchmark: 1.50 },
];

const cashProjectionData = [
  { month: 'Sep', inflow: 2400000, outflow: 1800000, net: 600000 },
  { month: 'Oct', inflow: 2600000, outflow: 2200000, net: 400000 },
  { month: 'Nov', inflow: 3100000, outflow: 2700000, net: 400000 },
  { month: 'Dec', inflow: 3500000, outflow: 3200000, net: 300000 },
  { month: 'Jan', inflow: 2800000, outflow: 2600000, net: 200000 },
  { month: 'Feb', inflow: 2500000, outflow: 2200000, net: 300000 },
];

const assetLiquidityData = [
  { name: 'Cash & Equivalents', value: 35, color: '#22c55e' },
  { name: 'Short-Term Investments', value: 25, color: '#3b82f6' },
  { name: 'Accounts Receivable', value: 20, color: '#f59e0b' },
  { name: 'Marketable Securities', value: 12, color: '#8b5cf6' },
  { name: 'Other Liquid Assets', value: 8, color: '#ef4444' },
];

const maturityProfileData = [
  { month: '0-30d', amount: 2500000 },
  { month: '30-60d', amount: 1800000 },
  { month: '60-90d', amount: 1200000 },
  { month: '90-180d', amount: 2200000 },
  { month: '180-365d', amount: 3100000 },
  { month: '>365d', amount: 4200000 },
];

const stressScenarioData = [
  { name: 'Baseline', value: 1.65 },
  { name: 'Mild Stress', value: 1.32 },
  { name: 'Moderate Stress', value: 1.08 },
  { name: 'Severe Stress', value: 0.85 },
];

export default function LiquidityRiskPage() {
  const [timeFrame, setTimeFrame] = useState("1y");
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatRatio = (value) => {
    return value.toFixed(2) + 'x';
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <CommercialHeader 
          title="Liquidity Risk Management"
          description="Monitor and manage liquidity positions and risk exposure"
          showBack={true}
        />

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Droplets className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Liquidity Dashboard</h2>
          </div>
          <div className="flex gap-2">
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Time Frame" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">1 Month</SelectItem>
                <SelectItem value="3m">3 Months</SelectItem>
                <SelectItem value="6m">6 Months</SelectItem>
                <SelectItem value="1y">1 Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-blue-800 dark:text-blue-300">Current Liquidity Ratio</p>
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold mt-2">1.62x</h3>
              <p className="text-sm mt-2 flex items-center text-green-700 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +0.07x from last month
              </p>
              <div className="mt-3 h-1 w-full bg-muted rounded">
                <div className="h-1 bg-blue-600 rounded" style={{ width: '82%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs">
                <span>Target: 1.5x</span>
                <span>Excellent: 2.0x</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-amber-800 dark:text-amber-300">Days Cash on Hand</p>
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-2xl font-bold mt-2">98 days</h3>
              <p className="text-sm mt-2 flex items-center text-amber-700 dark:text-amber-400">
                <ArrowDownRight className="h-4 w-4 mr-1" />
                -5 days from last quarter
              </p>
              <div className="mt-3 h-1 w-full bg-muted rounded">
                <div className="h-1 bg-amber-600 rounded" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs">
                <span>Target: 90 days</span>
                <span>Excellent: 180 days</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-green-800 dark:text-green-300">Cash Projection (90 days)</p>
                <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold mt-2">$1.4M</h3>
              <p className="text-sm mt-2 flex items-center text-green-700 dark:text-green-400">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +$300K from previous projection
              </p>
              <div className="mt-3 h-1 w-full bg-muted rounded">
                <div className="h-1 bg-green-600 rounded" style={{ width: '78%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs">
                <span>Minimum: $1M</span>
                <span>Target: $2M</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="cashflow">Cash Flow Projections</TabsTrigger>
            <TabsTrigger value="stress">Stress Testing</TabsTrigger>
            <TabsTrigger value="metrics">Advanced Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Liquidity Ratio Trend */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Liquidity Ratio Trend</CardTitle>
                  <CardDescription>Historical liquidity ratio compared to benchmark</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={liquidityRatioData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                        <XAxis dataKey="month" />
                        <YAxis domain={[1, 2]} tickFormatter={value => `${value.toFixed(1)}x`} />
                        <Tooltip formatter={value => [formatRatio(value), "Ratio"]} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="ratio" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          activeDot={{ r: 8 }}
                          name="Current Ratio"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="benchmark" 
                          stroke="#ef4444" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          name="Benchmark"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Asset Liquidity Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle>Asset Liquidity Breakdown</CardTitle>
                  <CardDescription>Distribution of assets by liquidity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={assetLiquidityData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {assetLiquidityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [`${value}%`, 'Percentage']} 
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Maturity Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Liability Maturity Profile</CardTitle>
                <CardDescription>Breakdown of liabilities by maturity date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={maturityProfileData}
                      margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${value/1000000}M`} />
                      <Tooltip formatter={(value) => [formatCurrency(value), "Amount"]} />
                      <Bar dataKey="amount" fill="#8884d8" name="Maturity Amount" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cashflow" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Cash Flow Projections</CardTitle>
                <CardDescription>Six-month forecast of cash inflows and outflows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={cashProjectionData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `$${value/1000000}M`} />
                      <Tooltip formatter={(value) => [formatCurrency(value), "Amount"]} />
                      <Legend />
                      <Bar dataKey="inflow" fill="#22c55e" name="Cash Inflow" stackId="a" />
                      <Bar dataKey="outflow" fill="#ef4444" name="Cash Outflow" stackId="b" />
                      <Line 
                        type="monotone" 
                        dataKey="net" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        dot={{ fill: '#3b82f6', r: 5 }}
                        name="Net Cash Flow" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Cash Flow Assumptions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">Average Collection Period</span>
                      <span>45 days</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">Average Payment Period</span>
                      <span>30 days</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">Projected Revenue Growth</span>
                      <span>8% YoY</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">Projected Expense Growth</span>
                      <span>5% YoY</span>
                    </div>
                    <div className="flex justify-between items-center pb-2 border-b">
                      <span className="font-medium">Expected Cash Conversion Cycle</span>
                      <span>60 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Liquidity Gap Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Short-term Gap (0-30 days)</span>
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Low Risk</span>
                      </div>
                      <div className="text-2xl font-bold mb-1">+$1.2M</div>
                      <div className="text-sm text-muted-foreground">Surplus of liquid assets</div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Medium-term Gap (30-90 days)</span>
                        <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">Medium Risk</span>
                      </div>
                      <div className="text-2xl font-bold mb-1">+$0.8M</div>
                      <div className="text-sm text-muted-foreground">Diminishing surplus</div>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Long-term Gap (90+ days)</span>
                        <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">Medium Risk</span>
                      </div>
                      <div className="text-2xl font-bold mb-1">+$0.4M</div>
                      <div className="text-sm text-muted-foreground">Strategic planning recommended</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Liquidity Stress Test Results</CardTitle>
                <CardDescription>Impact of various stress scenarios on liquidity ratios</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stressScenarioData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 2]} tickFormatter={value => `${value.toFixed(1)}x`} />
                      <Tooltip formatter={value => [formatRatio(value), "Liquidity Ratio"]} />
                      <Bar 
                        dataKey="value" 
                        name="Liquidity Ratio" 
                        radius={[4, 4, 0, 0]}
                      >
                        {stressScenarioData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.value >= 1.5 ? '#22c55e' : 
                                  entry.value >= 1.2 ? '#3b82f6' : 
                                  entry.value >= 1.0 ? '#f59e0b' : '#ef4444'} 
                          />
                        ))}
                      </Bar>
                      {/* Reference line at 1.0x ratio */}
                      <Line 
                        type="monotone" 
                        dataKey={() => 1} 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Minimum Required" 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Stress Test Scenarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
                        <span className="font-medium">Baseline Scenario</span>
                      </div>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Normal market conditions</li>
                        <li>Standard cash flow patterns</li>
                        <li>No significant market disruptions</li>
                        <li>Current 1.65x liquidity ratio maintained</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="h-5 w-5 text-blue-600" />
                        <span className="font-medium">Mild Stress Scenario</span>
                      </div>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        <li>10% decrease in incoming payments</li>
                        <li>5% increase in operational expenses</li>
                        <li>30-day delay in accounts receivable</li>
                        <li>Liquidity ratio falls to 1.32x</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="h-5 w-5 text-amber-600" />
                        <span className="font-medium">Moderate Stress Scenario</span>
                      </div>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        <li>25% decrease in incoming payments</li>
                        <li>10% increase in operational expenses</li>
                        <li>45-day delay in accounts receivable</li>
                        <li>20% reduction in short-term investment liquidity</li>
                        <li>Liquidity ratio falls to 1.08x</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <span className="font-medium">Severe Stress Scenario</span>
                      </div>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        <li>40% decrease in incoming payments</li>
                        <li>15% increase in operational expenses</li>
                        <li>60-day delay in accounts receivable</li>
                        <li>50% reduction in short-term investment liquidity</li>
                        <li>Limited access to credit facilities</li>
                        <li>Liquidity ratio falls to 0.85x (below minimum)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contingency Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-600">
                      <div className="font-medium mb-2">Mild Stress Response</div>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Accelerate accounts receivable collection</li>
                        <li>Optimize payment timing to vendors</li>
                        <li>Temporary reduction in non-essential expenses</li>
                        <li>Review and potentially defer capital expenditures</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-l-4 border-amber-600">
                      <div className="font-medium mb-2">Moderate Stress Response</div>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Draw on committed credit facilities</li>
                        <li>Implement accounts payable stretching strategy</li>
                        <li>Reduce inventory levels</li>
                        <li>Defer all non-critical capital expenditures</li>
                        <li>Convert short-term investments to cash</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border-l-4 border-red-600">
                      <div className="font-medium mb-2">Severe Stress Response</div>
                      <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                        <li>Activate emergency liquidity lines</li>
                        <li>Negotiate emergency payment terms with major suppliers</li>
                        <li>Consider factoring of accounts receivable</li>
                        <li>Implement aggressive cost reduction measures</li>
                        <li>Liquidate non-core assets</li>
                        <li>Seek potential capital injections</li>
                      </ul>
                    </div>

                    <div className="mt-4">
                      <Button className="w-full">
                        View Detailed Contingency Plan
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Liquidity Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Current Ratio</span>
                        <span className="font-medium">1.62x</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "82%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Quick Ratio</span>
                        <span className="font-medium">1.23x</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Cash Ratio</span>
                        <span className="font-medium">0.72x</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: "58%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Operational Cash Flow Ratio</span>
                        <span className="font-medium">1.15x</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: "68%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Defensive Interval Ratio</span>
                        <span className="font-medium">98 days</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Metric Definitions & Benchmarks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="pb-2 border-b">
                      <h4 className="font-medium mb-1">Current Ratio</h4>
                      <p className="text-sm text-muted-foreground mb-1">Current Assets ÷ Current Liabilities</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">Good: ≥ 1.5</span>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs">Moderate: 1.0-1.5</span>
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs">Poor: &lt; 1.0</span>
                      </div>
                    </div>
                    
                    <div className="pb-2 border-b">
                      <h4 className="font-medium mb-1">Quick Ratio</h4>
                      <p className="text-sm text-muted-foreground mb-1">(Current Assets - Inventory) ÷ Current Liabilities</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">Good: ≥ 1.0</span>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs">Moderate: 0.7-1.0</span>
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs">Poor: &lt; 0.7</span>
                      </div>
                    </div>
                    
                    <div className="pb-2 border-b">
                      <h4 className="font-medium mb-1">Cash Ratio</h4>
                      <p className="text-sm text-muted-foreground mb-1">Cash & Cash Equivalents ÷ Current Liabilities</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">Good: ≥ 0.75</span>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs">Moderate: 0.5-0.75</span>
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs">Poor: &lt; 0.5</span>
                      </div>
                    </div>
                    
                    <div className="pb-2 border-b">
                      <h4 className="font-medium mb-1">Operational Cash Flow Ratio</h4>
                      <p className="text-sm text-muted-foreground mb-1">Operating Cash Flow ÷ Current Liabilities</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">Good: ≥ 1.0</span>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs">Moderate: 0.6-1.0</span>
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs">Poor: &lt; 0.6</span>
                      </div>
                    </div>
                    
                    <div className="pb-2 border-b">
                      <h4 className="font-medium mb-1">Defensive Interval Ratio</h4>
                      <p className="text-sm text-muted-foreground mb-1">(Current Assets ÷ Daily Operational Expenditures)</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded text-xs">Good: ≥ 90 days</span>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded text-xs">Moderate: 60-90 days</span>
                        <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded text-xs">Poor: &lt; 60 days</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Industry Benchmarking</CardTitle>
                <CardDescription>Comparative analysis against industry peers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Metric</th>
                        <th className="text-center p-3 font-medium">Your Organization</th>
                        <th className="text-center p-3 font-medium">Industry Average</th>
                        <th className="text-center p-3 font-medium">Top Quartile</th>
                        <th className="text-center p-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="p-3">Current Ratio</td>
                        <td className="p-3 text-center font-mono">1.62x</td>
                        <td className="p-3 text-center">1.45x</td>
                        <td className="p-3 text-center">1.75x</td>
                        <td className="p-3 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Above Average
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="p-3">Quick Ratio</td>
                        <td className="p-3 text-center font-mono">1.23x</td>
                        <td className="p-3 text-center">1.10x</td>
                        <td className="p-3 text-center">1.40x</td>
                        <td className="p-3 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Above Average
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="p-3">Cash Ratio</td>
                        <td className="p-3 text-center font-mono">0.72x</td>
                        <td className="p-3 text-center">0.68x</td>
                        <td className="p-3 text-center">0.85x</td>
                        <td className="p-3 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            Average
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="p-3">Days Cash on Hand</td>
                        <td className="p-3 text-center font-mono">98 days</td>
                        <td className="p-3 text-center">85 days</td>
                        <td className="p-3 text-center">120 days</td>
                        <td className="p-3 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Above Average
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-muted/50">
                        <td className="p-3">Operational CF Ratio</td>
                        <td className="p-3 text-center font-mono">1.15x</td>
                        <td className="p-3 text-center">1.05x</td>
                        <td className="p-3 text-center">1.30x</td>
                        <td className="p-3 text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                            Average
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-end mt-4">
                  <Button variant="outline">
                    Download Detailed Benchmark Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
