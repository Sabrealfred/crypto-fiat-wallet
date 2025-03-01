
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw,
  AlertTriangle,
  Clock,
  CheckCircle,
  Download,
  Filter,
  Settings,
  Calendar,
  PieChart
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart, 
  Area,
  Legend
} from 'recharts';

export default function TradingRiskPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeframe, setTimeframe] = useState("1w");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Trading risk metrics updated successfully");
    }, 1500);
  };

  // Sample data for charts
  const riskExposureData = [
    { date: 'Jan', var: 2.1, es: 3.4, limit: 5 },
    { date: 'Feb', var: 2.3, es: 3.7, limit: 5 },
    { date: 'Mar', var: 2.6, es: 4.1, limit: 5 },
    { date: 'Apr', var: 3.1, es: 4.8, limit: 5 },
    { date: 'May', var: 2.8, es: 4.3, limit: 5 },
    { date: 'Jun', var: 2.4, es: 3.9, limit: 5 },
    { date: 'Jul', var: 2.9, es: 4.6, limit: 5 },
  ];

  const limitUtilizationData = [
    { category: 'FX', current: 72, limit: 100 },
    { category: 'Equity', current: 48, limit: 100 },
    { category: 'Fixed Income', current: 91, limit: 100 },
    { category: 'Commodities', current: 35, limit: 100 },
    { category: 'Derivatives', current: 62, limit: 100 },
  ];

  const tradingVolumeData = [
    { date: '2023-07-01', fx: 12.5, equity: 8.2, fixedIncome: 15.3, commodities: 5.1, derivatives: 9.7 },
    { date: '2023-07-02', fx: 13.1, equity: 7.8, fixedIncome: 16.1, commodities: 4.8, derivatives: 10.2 },
    { date: '2023-07-03', fx: 11.9, equity: 8.5, fixedIncome: 14.7, commodities: 5.3, derivatives: 9.9 },
    { date: '2023-07-04', fx: 12.8, equity: 9.1, fixedIncome: 15.0, commodities: 5.7, derivatives: 10.5 },
    { date: '2023-07-05', fx: 14.2, equity: 9.7, fixedIncome: 16.8, commodities: 6.1, derivatives: 11.2 },
    { date: '2023-07-06', fx: 13.7, equity: 8.9, fixedIncome: 16.2, commodities: 5.4, derivatives: 10.8 },
    { date: '2023-07-07', fx: 14.5, equity: 9.2, fixedIncome: 17.1, commodities: 5.8, derivatives: 11.5 },
  ];

  const riskAllocationData = [
    { name: 'Market Risk', value: 35 },
    { name: 'Credit Risk', value: 25 },
    { name: 'Operational Risk', value: 15 },
    { name: 'Liquidity Risk', value: 15 },
    { name: 'Legal Risk', value: 10 },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Trading Risk Management" 
          description="Monitor and control risk exposure across trading activities"
          showBack={true}
        />

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-medium">Trading Risk Dashboard</h2>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
              <Clock className="h-3 w-3 mr-1" />
              Real-time monitoring
            </Badge>
          </div>
          <div className="flex gap-2">
            <div className="flex bg-muted rounded-md p-0.5">
              <Button 
                variant={timeframe === "1d" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setTimeframe("1d")}
                className="text-xs"
              >
                1D
              </Button>
              <Button 
                variant={timeframe === "1w" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setTimeframe("1w")}
                className="text-xs"
              >
                1W
              </Button>
              <Button 
                variant={timeframe === "1m" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setTimeframe("1m")}
                className="text-xs"
              >
                1M
              </Button>
              <Button 
                variant={timeframe === "3m" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setTimeframe("3m")}
                className="text-xs"
              >
                3M
              </Button>
              <Button 
                variant={timeframe === "1y" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setTimeframe("1y")}
                className="text-xs"
              >
                1Y
              </Button>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-1"
            >
              <Filter className="h-3.5 w-3.5" />
              Filter
            </Button>
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="default">Set Alerts</Button>
          </div>
        </div>

        {/* Key Trading Risk Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Value at Risk (VaR)</p>
                  <h3 className="text-2xl font-bold mt-2">$2.9M</h3>
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +0.5M since yesterday
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Expected Shortfall</p>
                  <h3 className="text-2xl font-bold mt-2">$4.6M</h3>
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +0.7M since yesterday
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Limit Utilization</p>
                  <h3 className="text-2xl font-bold mt-2">58%</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    -3% since yesterday
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Limit Breaches</p>
                  <h3 className="text-2xl font-bold mt-2">2</h3>
                  <p className="text-sm text-yellow-500 mt-1 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    Pending resolution
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Exposure Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Risk Exposure Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={riskExposureData}>
                    <defs>
                      <linearGradient id="colorVar" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorEs" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="var"
                      name="Value at Risk (VaR)"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorVar)"
                    />
                    <Area
                      type="monotone"
                      dataKey="es"
                      name="Expected Shortfall"
                      stroke="#ef4444"
                      fillOpacity={1}
                      fill="url(#colorEs)"
                    />
                    <Line
                      type="monotone"
                      dataKey="limit"
                      name="Risk Limit"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Trading Limit Utilization
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {limitUtilizationData.map((item) => (
                  <div key={item.category} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium">{item.category}</span>
                      <span className={`text-sm font-medium ${
                        item.current > 90 ? "text-red-500" : 
                        item.current > 75 ? "text-yellow-500" : 
                        "text-green-500"
                      }`}>
                        {item.current}% of {item.limit}%
                      </span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          item.current > 90 ? "bg-red-500" : 
                          item.current > 75 ? "bg-yellow-500" : 
                          "bg-green-500"
                        }`}
                        style={{ width: `${item.current}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trading Volume and Risk Allocation */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Trading Volume by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={tradingVolumeData}>
                    <defs>
                      <linearGradient id="colorFx" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorEquity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorFixed" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorComm" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDeriv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="fx"
                      name="FX"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorFx)"
                    />
                    <Area
                      type="monotone"
                      dataKey="equity"
                      name="Equity"
                      stroke="#10b981"
                      fillOpacity={1}
                      fill="url(#colorEquity)"
                    />
                    <Area
                      type="monotone"
                      dataKey="fixedIncome"
                      name="Fixed Income"
                      stroke="#f59e0b"
                      fillOpacity={1}
                      fill="url(#colorFixed)"
                    />
                    <Area
                      type="monotone"
                      dataKey="commodities"
                      name="Commodities"
                      stroke="#8b5cf6"
                      fillOpacity={1}
                      fill="url(#colorComm)"
                    />
                    <Area
                      type="monotone"
                      dataKey="derivatives"
                      name="Derivatives"
                      stroke="#ec4899"
                      fillOpacity={1}
                      fill="url(#colorDeriv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <PieChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Risk Allocation by Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  {riskAllocationData.map((item, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium flex items-center gap-2">
                          <span
                            className="inline-block w-3 h-3 rounded-full"
                            style={{ backgroundColor: getColor(index) }}
                          ></span>
                          {item.name}
                        </span>
                        <span className="text-sm">{item.value}%</span>
                      </div>
                      <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ 
                            width: `${item.value}%`,
                            backgroundColor: getColor(index)
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">$8.4M</div>
                        <div className="text-sm text-muted-foreground">Total Risk</div>
                      </div>
                    </div>
                    <svg viewBox="0 0 100 100" className="w-full h-auto">
                      {riskAllocationData.map((item, index) => {
                        const startAngle = getStartAngle(index);
                        const endAngle = startAngle + (item.value * 3.6);
                        return (
                          <DonutSegment
                            key={index}
                            startAngle={startAngle}
                            endAngle={endAngle}
                            color={getColor(index)}
                          />
                        );
                      })}
                      <circle cx="50" cy="50" r="30" fill="white" className="dark:fill-gray-900" />
                    </svg>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Trading Limits */}
        <Card className="mb-6 border-blue-100 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Active Trading Limits</CardTitle>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Settings className="h-3.5 w-3.5" />
              Configure Limits
            </Button>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Category</th>
                    <th className="text-left py-3 px-4 font-medium">Desk</th>
                    <th className="text-left py-3 px-4 font-medium">Limit Type</th>
                    <th className="text-left py-3 px-4 font-medium">Current</th>
                    <th className="text-left py-3 px-4 font-medium">Limit</th>
                    <th className="text-left py-3 px-4 font-medium">Utilization</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { 
                      category: "FX", 
                      desk: "Spot Trading", 
                      limitType: "Intraday", 
                      current: "$5.2M", 
                      limit: "$10M", 
                      utilization: 52,
                      status: "Normal"
                    },
                    { 
                      category: "Fixed Income", 
                      desk: "Bonds", 
                      limitType: "Overnight", 
                      current: "$9.1M", 
                      limit: "$10M", 
                      utilization: 91,
                      status: "Warning"
                    },
                    { 
                      category: "Equity", 
                      desk: "Derivatives", 
                      limitType: "Intraday", 
                      current: "$3.8M", 
                      limit: "$8M", 
                      utilization: 48,
                      status: "Normal"
                    },
                    { 
                      category: "Commodities", 
                      desk: "Metals", 
                      limitType: "Overnight", 
                      current: "$1.4M", 
                      limit: "$4M", 
                      utilization: 35,
                      status: "Normal"
                    },
                    { 
                      category: "Derivatives", 
                      desk: "Options", 
                      limitType: "Weekly", 
                      current: "$6.2M", 
                      limit: "$10M", 
                      utilization: 62,
                      status: "Normal"
                    },
                  ].map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4">{item.category}</td>
                      <td className="py-3 px-4">{item.desk}</td>
                      <td className="py-3 px-4">{item.limitType}</td>
                      <td className="py-3 px-4">{item.current}</td>
                      <td className="py-3 px-4">{item.limit}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-muted h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${
                                item.utilization > 90 ? "bg-red-500" : 
                                item.utilization > 75 ? "bg-yellow-500" : 
                                "bg-green-500"
                              }`}
                              style={{ width: `${item.utilization}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{item.utilization}%</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          className={
                            item.status === "Normal" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
                              : item.status === "Warning"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                                : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                          }
                        >
                          {item.status === "Normal" && <CheckCircle className="h-3 w-3 mr-1" />}
                          {item.status === "Warning" && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {item.status === "Breach" && <AlertTriangle className="h-3 w-3 mr-1" />}
                          {item.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Trading Risk Analytics */}
        <Card className="mb-6 border-blue-100 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle>Trading Risk Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Risk Stress Testing</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Run scenario simulations to assess potential losses under market stress.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="w-full">Scenario Library</Button>
                    <Button size="sm" className="w-full">Run Test</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Position Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Analyze risk across different trading positions and products.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="w-full">View Positions</Button>
                    <Button size="sm" className="w-full">Risk Report</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border shadow-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Risk API Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    Connect to external data sources and risk assessment systems.
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="w-full">API Status</Button>
                    <Button size="sm" className="w-full">Configure</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-2 mb-8">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Schedule Report
          </Button>
          <Button className="flex items-center gap-2">
            <BarChart className="h-4 w-4" />
            Advanced Analytics
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}

// Helper functions for the donut chart
function getStartAngle(index: number): number {
  let totalAngle = 0;
  for (let i = 0; i < index; i++) {
    totalAngle += riskAllocationData[i].value * 3.6;
  }
  return totalAngle;
}

function getColor(index: number): string {
  const colors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];
  return colors[index % colors.length];
}

interface DonutSegmentProps {
  startAngle: number;
  endAngle: number;
  color: string;
}

function DonutSegment({ startAngle, endAngle, color }: DonutSegmentProps) {
  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;
  
  // Coordinates for the start and end points
  const startX = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180);
  const startY = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180);
  const endX = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180);
  const endY = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180);

  // Path definition
  const path = [
    'M', startX, startY,
    'A', 40, 40, 0, largeArcFlag, 1, endX, endY,
    'L', 50, 50,
    'Z'
  ].join(' ');

  return <path d={path} fill={color} />;
}

// Sample data for the risk allocation donut chart
const riskAllocationData = [
  { name: 'Market Risk', value: 35 },
  { name: 'Credit Risk', value: 25 },
  { name: 'Operational Risk', value: 15 },
  { name: 'Liquidity Risk', value: 15 },
  { name: 'Legal Risk', value: 10 },
];
