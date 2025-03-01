
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import {
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  BarChart,
  Download,
  Wallet,
  Building2,
  CreditCard,
  CalendarRange,
  ChevronRight
} from "lucide-react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function LiquidityPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Liquidity data refreshed successfully");
    }, 1500);
  };

  // Sample data for liquidity metrics
  const liquidityData = [
    {
      name: 'Jan',
      shortTerm: 4500,
      mediumTerm: 2800,
      longTerm: 1600,
    },
    {
      name: 'Feb',
      shortTerm: 5000,
      mediumTerm: 3100,
      longTerm: 1800,
    },
    {
      name: 'Mar',
      shortTerm: 4800,
      mediumTerm: 3300,
      longTerm: 2200,
    },
    {
      name: 'Apr',
      shortTerm: 5200,
      mediumTerm: 3500,
      longTerm: 2300,
    },
    {
      name: 'May',
      shortTerm: 5600,
      mediumTerm: 3400,
      longTerm: 2100,
    },
    {
      name: 'Jun',
      shortTerm: 6000,
      mediumTerm: 3600,
      longTerm: 2400,
    },
  ];

  // Sample data for cash flow forecast
  const cashFlowData = [
    {
      name: 'Week 1',
      inflows: 2800,
      outflows: 2200,
    },
    {
      name: 'Week 2',
      inflows: 3200,
      outflows: 2600,
    },
    {
      name: 'Week 3',
      inflows: 3100,
      outflows: 2900,
    },
    {
      name: 'Week 4',
      inflows: 3500,
      outflows: 3100,
    },
    {
      name: 'Week 5',
      inflows: 3400,
      outflows: 2800,
    },
    {
      name: 'Week 6',
      inflows: 3800,
      outflows: 3200,
    },
  ];

  // Sample liquidity ratios data
  const liquidityRatios = [
    {
      name: 'Current Ratio',
      value: 2.8,
      benchmark: 2.0,
      trend: 'up',
    },
    {
      name: 'Quick Ratio',
      value: 1.6,
      benchmark: 1.0,
      trend: 'up',
    },
    {
      name: 'Cash Ratio',
      value: 0.9,
      benchmark: 0.5,
      trend: 'up',
    },
    {
      name: 'Operating Cash Flow Ratio',
      value: 1.2,
      benchmark: 1.0,
      trend: 'down',
    },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Liquidity Management" 
          description="Monitor and optimize your organization's liquidity position"
          showBack={true}
        />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Liquidity Dashboard</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Liquidity Position Summary */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Total Liquidity</p>
                  <h3 className="text-2xl font-bold mt-2">$14.5M</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +6.2% vs last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Current Ratio</p>
                  <h3 className="text-2xl font-bold mt-2">2.8</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +0.3 vs benchmark
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
                  <p className="text-sm text-muted-foreground">30-Day Forecast</p>
                  <h3 className="text-2xl font-bold mt-2">$16.2M</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +11.7% growth expected
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <CalendarRange className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Cash Burn Rate</p>
                  <h3 className="text-2xl font-bold mt-2">$1.2M</h3>
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    -3.8% vs last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liquidity Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Liquidity Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={liquidityData}>
                    <defs>
                      <linearGradient id="colorShortTerm" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorMediumTerm" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorLongTerm" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="shortTerm"
                      name="Short Term"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorShortTerm)"
                    />
                    <Area
                      type="monotone"
                      dataKey="mediumTerm"
                      name="Medium Term"
                      stroke="#6366f1"
                      fillOpacity={1}
                      fill="url(#colorMediumTerm)"
                    />
                    <Area
                      type="monotone"
                      dataKey="longTerm"
                      name="Long Term"
                      stroke="#8b5cf6"
                      fillOpacity={1}
                      fill="url(#colorLongTerm)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Cash Flow Forecast (30 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={cashFlowData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="inflows" name="Inflows" fill="#22c55e" />
                    <Bar dataKey="outflows" name="Outflows" fill="#ef4444" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liquidity Ratios */}
        <Card className="mb-6 border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Liquidity Ratios</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {liquidityRatios.map((ratio, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{ratio.name}</span>
                    <Badge 
                      variant="outline"
                      className={
                        ratio.trend === "up" 
                          ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                          : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                      }
                    >
                      {ratio.trend === "up" ? "↑" : "↓"}
                    </Badge>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold">{ratio.value}</span>
                    <span className="text-sm text-muted-foreground">/ {ratio.benchmark} benchmark</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full mt-2 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        ratio.value >= ratio.benchmark 
                          ? "bg-green-500" 
                          : "bg-red-500"
                      }`}
                      style={{ width: `${Math.min(100, (ratio.value / ratio.benchmark) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Liquidity by Business Unit */}
        <Card className="mb-6 border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Liquidity by Business Unit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  unit: "Corporate Treasury", 
                  liquidity: "$5.8M", 
                  percentage: 40,
                  change: "+8.2%",
                  changeType: "positive"
                },
                { 
                  unit: "North America Operations", 
                  liquidity: "$3.6M", 
                  percentage: 25,
                  change: "+4.5%",
                  changeType: "positive"
                },
                { 
                  unit: "European Division", 
                  liquidity: "$2.9M", 
                  percentage: 20,
                  change: "-1.2%",
                  changeType: "negative"
                },
                { 
                  unit: "Asia Pacific", 
                  liquidity: "$1.5M", 
                  percentage: 10,
                  change: "+12.7%",
                  changeType: "positive"
                },
                { 
                  unit: "Latin America", 
                  liquidity: "$0.7M", 
                  percentage: 5,
                  change: "-3.1%",
                  changeType: "negative"
                },
              ].map((unit, i) => (
                <div key={i} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                  <div>
                    <div className="font-medium">{unit.unit}</div>
                    <div className="text-sm text-muted-foreground">
                      {unit.percentage}% of total
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{unit.liquidity}</div>
                    <div className={`text-sm ${
                      unit.changeType === "positive" ? "text-green-500" : "text-red-500"
                    }`}>
                      {unit.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Liquidity Management Actions */}
        <Card className="mb-6 border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Liquidity Management Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border border-blue-50 dark:border-blue-900">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Cash Flow Forecasting</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Run detailed cash flow forecasts for better liquidity planning.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Run Forecast
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-blue-50 dark:border-blue-900">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Liquidity Stress Testing</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Test liquidity positions against various market scenarios.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Run Stress Test
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-blue-50 dark:border-blue-900">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Liquidity Optimization</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get AI-powered recommendations for optimal liquidity allocation.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Recommendations
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button className="flex items-center gap-2">
            View Detailed Liquidity Reports
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
