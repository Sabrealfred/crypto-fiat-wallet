
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { 
  LineChart, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw,
  BarChart,
  Download,
  AlertTriangle
} from "lucide-react";

export default function MarketRiskPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Market risk data refreshed successfully");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Market Risk Management" 
          description="Monitor and manage your market risk exposures across trading and banking books"
          showBack={true}
        />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Market Risk Dashboard</h2>
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

        {/* Key Market Risk Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Value at Risk (VaR)</p>
                  <h3 className="text-2xl font-bold mt-2">$2.3M</h3>
                  <p className="text-sm text-yellow-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +8.4% vs last week
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Stressed VaR</p>
                  <h3 className="text-2xl font-bold mt-2">$5.8M</h3>
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +12.1% vs last week
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
                  <p className="text-sm text-muted-foreground">Interest Rate Risk</p>
                  <h3 className="text-2xl font-bold mt-2">$1.7M</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    -3.2% vs last week
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
                  <h3 className="text-2xl font-bold mt-2">76.4%</h3>
                  <p className="text-sm text-yellow-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +4.8% vs last week
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Exposure by Asset Class */}
        <Card className="mb-6 border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Risk Exposure by Asset Class
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { 
                  assetClass: "Foreign Exchange", 
                  risk: "$780K", 
                  limit: "$1.2M", 
                  utilization: 65,
                  status: "Within Limit",
                  statusColor: "text-green-500"
                },
                { 
                  assetClass: "Interest Rate", 
                  risk: "$1.7M", 
                  limit: "$2.2M", 
                  utilization: 77,
                  status: "Within Limit",
                  statusColor: "text-green-500"
                },
                { 
                  assetClass: "Equity", 
                  risk: "$850K", 
                  limit: "$1M", 
                  utilization: 85,
                  status: "Near Limit",
                  statusColor: "text-yellow-500"
                },
                { 
                  assetClass: "Commodity", 
                  risk: "$420K", 
                  limit: "$800K", 
                  utilization: 53,
                  status: "Within Limit",
                  statusColor: "text-green-500"
                },
                { 
                  assetClass: "Credit Spread", 
                  risk: "$950K", 
                  limit: "$1M", 
                  utilization: 95,
                  status: "Near Breach",
                  statusColor: "text-red-500"
                },
              ].map((asset, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 py-3 border-b">
                  <div className="col-span-3 font-medium">{asset.assetClass}</div>
                  <div className="col-span-2">{asset.risk}</div>
                  <div className="col-span-2">{asset.limit}</div>
                  <div className="col-span-3">
                    <div className="w-full bg-blue-100 dark:bg-blue-950 h-2 rounded-full">
                      <div 
                        className={`h-2 rounded-full ${
                          asset.utilization > 90 ? 'bg-red-500' : 
                          asset.utilization > 75 ? 'bg-yellow-500' : 
                          'bg-green-500'
                        }`}
                        style={{ width: `${asset.utilization}%` }}
                      />
                    </div>
                  </div>
                  <div className={`col-span-2 ${asset.statusColor}`}>{asset.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Risk Analytics */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle>Sensitivity Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Delta (Equity)</span>
                  <span className="font-semibold">$320K per 1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Vega (FX Options)</span>
                  <span className="font-semibold">$85K per 1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">DV01 (IR)</span>
                  <span className="font-semibold">$62K per 1bp</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">CS01 (Credit)</span>
                  <span className="font-semibold">$48K per 1bp</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Stress Test Impact</h4>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                    Moderate
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  The portfolio shows moderate resilience to most stress scenarios, with FX and interest rate shocks having the largest potential impact.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle>Risk Outliers & Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    title: "Emerging Market FX Positions", 
                    message: "Exposure increased by 12% overnight", 
                    severity: "High",
                    severityColor: "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400",
                    time: "2 hours ago"
                  },
                  { 
                    title: "Credit Spread Risk", 
                    message: "Approaching internal limit (95% utilized)", 
                    severity: "Medium",
                    severityColor: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
                    time: "4 hours ago"
                  },
                  { 
                    title: "Volatility Exposure", 
                    message: "Vega risk doubled in the last trading session", 
                    severity: "Medium",
                    severityColor: "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400",
                    time: "1 day ago"
                  },
                  { 
                    title: "Concentration Risk", 
                    message: "Single name equity exposure exceeds diversity threshold", 
                    severity: "Low",
                    severityColor: "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400",
                    time: "2 days ago"
                  },
                ].map((alert, i) => (
                  <div key={i} className="pb-3 border-b last:border-0">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-medium">{alert.title}</h4>
                      <Badge variant="outline" className={alert.severityColor}>
                        {alert.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{alert.message}</p>
                    <p className="text-xs text-slate-400">{alert.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Risk Factors */}
        <Card className="border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Key Market Risk Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  name: "Interest Rate Curve Shifts",
                  impact: "Significant",
                  trend: "Steepening",
                  description: "Long-end rates rising faster than short-end",
                  mitigationStatus: "Partially Hedged"
                },
                {
                  name: "FX Rate Volatility",
                  impact: "Moderate",
                  trend: "Increasing",
                  description: "Major currency pairs showing increased volatility",
                  mitigationStatus: "Hedged"
                },
                {
                  name: "Credit Spread Widening",
                  impact: "High",
                  trend: "Widening",
                  description: "Corporate spreads widening in high-yield sector",
                  mitigationStatus: "Unhedged"
                },
                {
                  name: "Equity Market Volatility",
                  impact: "Moderate",
                  trend: "Stable",
                  description: "Implied volatility holding steady",
                  mitigationStatus: "Partially Hedged"
                },
                {
                  name: "Commodity Price Shifts",
                  impact: "Low",
                  trend: "Mixed",
                  description: "Energy up, metals down, agricultural stable",
                  mitigationStatus: "Hedged"
                },
                {
                  name: "Basis Risk",
                  impact: "Moderate",
                  trend: "Increasing",
                  description: "Growing divergence between related markets",
                  mitigationStatus: "Monitoring"
                }
              ].map((factor, i) => (
                <Card key={i} className="border border-blue-50 dark:border-blue-900">
                  <CardContent className="p-4">
                    <h3 className="font-medium mb-2">{factor.name}</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Impact:</span>
                        <span>{factor.impact}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Trend:</span>
                        <span>{factor.trend}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Mitigation:</span>
                        <span>{factor.mitigationStatus}</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">{factor.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button className="flex items-center gap-2">
            View Full Market Risk Analysis
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
