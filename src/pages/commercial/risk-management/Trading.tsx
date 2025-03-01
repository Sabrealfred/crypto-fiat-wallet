
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
  CheckCircle
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
  Area
} from 'recharts';

export default function TradingRiskPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Trading Risk Management" 
          description="Monitor and control risk exposure across trading activities"
          showBack={true}
        />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Trading Risk Dashboard</h2>
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
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
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
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
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

        {/* Active Trading Limits */}
        <Card className="mb-6 border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Active Trading Limits</CardTitle>
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
      </div>
    </AppLayout>
  );
}
