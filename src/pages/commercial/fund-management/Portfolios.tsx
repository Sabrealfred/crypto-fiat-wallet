
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  Filter, 
  Download, 
  BarChart3, 
  PieChart, 
  Search,
  TrendingUp,
  AlertCircle,
  Briefcase,
  LineChart
} from "lucide-react";
import { AllocationChart } from "./components/AllocationChart";

interface Portfolio {
  id: string;
  name: string;
  type: string;
  value: number;
  return: number;
  risk: string;
  manager?: string;
  inception?: string;
  benchmark?: string;
}

const portfolios: Portfolio[] = [
  { 
    id: "1", 
    name: "Growth Fund", 
    type: "Equity", 
    value: 125000000, 
    return: 15.4, 
    risk: "Moderate",
    manager: "Sarah Johnson",
    inception: "2021-03-15",
    benchmark: "S&P 500"
  },
  { 
    id: "2", 
    name: "Income Portfolio", 
    type: "Fixed Income", 
    value: 85000000, 
    return: 8.2, 
    risk: "Low",
    manager: "Michael Chen",
    inception: "2020-07-22",
    benchmark: "Bloomberg US Agg"
  },
  { 
    id: "3", 
    name: "Balanced Fund", 
    type: "Mixed", 
    value: 150000000, 
    return: 12.8, 
    risk: "Moderate",
    manager: "David Williams",
    inception: "2019-11-08",
    benchmark: "60/40 Blend"
  },
  { 
    id: "4", 
    name: "High Yield", 
    type: "Fixed Income", 
    value: 65000000, 
    return: -2.4, 
    risk: "High",
    manager: "Jennifer Lopez",
    inception: "2022-01-30",
    benchmark: "ICE BofA HY"
  },
  { 
    id: "5", 
    name: "Global Opportunities", 
    type: "Equity", 
    value: 110000000, 
    return: 9.7, 
    risk: "High",
    manager: "Robert Kim",
    inception: "2020-09-15",
    benchmark: "MSCI World"
  },
  { 
    id: "6", 
    name: "ESG Focus", 
    type: "Mixed", 
    value: 95000000, 
    return: 11.2, 
    risk: "Moderate",
    manager: "Emma Richards",
    inception: "2021-06-10",
    benchmark: "MSCI ESG Leaders"
  },
];

const allocationData = [
  { name: 'Equity', value: 52 },
  { name: 'Fixed Income', value: 28 },
  { name: 'Cash', value: 12 },
  { name: 'Alternative', value: 8 }
];

const performanceChartData = [
  { month: 'Jan', portfolios: 5.2, benchmark: 4.8 },
  { month: 'Feb', portfolios: 6.1, benchmark: 5.5 },
  { month: 'Mar', portfolios: 5.8, benchmark: 5.2 },
  { month: 'Apr', portfolios: 7.2, benchmark: 6.1 },
  { month: 'May', portfolios: 8.4, benchmark: 7.2 },
  { month: 'Jun', portfolios: 9.7, benchmark: 8.3 },
  { month: 'Jul', portfolios: 11.2, benchmark: 9.5 },
  { month: 'Aug', portfolios: 12.6, benchmark: 10.8 },
];

export default function Portfolios() {
  const [activeTab, setActiveTab] = useState("overview");

  const getTotalPortfolioValue = () => {
    return portfolios.reduce((sum, portfolio) => sum + portfolio.value, 0);
  };

  const getAverageReturn = () => {
    const totalValue = getTotalPortfolioValue();
    const weightedReturn = portfolios.reduce(
      (sum, portfolio) => sum + (portfolio.value * portfolio.return / totalValue), 
      0
    );
    return weightedReturn;
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Portfolio Management" 
          description="Manage and analyze your investment portfolios"
        />

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-4 w-full max-w-xl mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="portfolios">Portfolios</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Total AUM</p>
                  <h3 className="text-2xl font-bold mt-2">${(getTotalPortfolioValue() / 1000000).toFixed(1)}M</h3>
                  <p className="text-sm mt-2 flex items-center text-green-500">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +12.6% YTD
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Average Return</p>
                  <h3 className="text-2xl font-bold mt-2">{getAverageReturn().toFixed(1)}%</h3>
                  <p className="text-sm mt-2 flex items-center text-green-500">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +2.3% vs benchmark
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Total Portfolios</p>
                  <h3 className="text-2xl font-bold mt-2">{portfolios.length}</h3>
                  <p className="text-sm mt-2 flex items-center text-green-500">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    +2 this year
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground">Risk Assessment</p>
                  <h3 className="text-2xl font-bold mt-2">Moderate</h3>
                  <p className="text-sm mt-2 flex items-center text-muted-foreground">
                    Last updated: Today
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Portfolio Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {portfolios.map((portfolio) => (
                      <div key={portfolio.id} className="flex items-center">
                        <div className="w-full max-w-md">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">{portfolio.name}</span>
                            <span className="text-sm font-medium">
                              ${(portfolio.value / 1000000).toFixed(1)}M
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-primary h-2.5 rounded-full" 
                              style={{ width: `${(portfolio.value / getTotalPortfolioValue()) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <span className="ml-2 text-xs text-muted-foreground">
                          {((portfolio.value / getTotalPortfolioValue()) * 100).toFixed(1)}%
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <AllocationChart allocationData={allocationData} />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Recent Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="inline-flex gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        <span className="text-sm">Portfolios</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                        <span className="text-sm">Benchmark</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-[300px] w-full bg-slate-50 border rounded-md p-4 flex items-end">
                    {performanceChartData.map((data, index) => (
                      <div key={index} className="flex-1 flex flex-col items-center gap-2">
                        <div className="w-full flex justify-center gap-1">
                          <div 
                            className="w-5 bg-primary rounded-t" 
                            style={{ height: `${data.portfolios * 10}px` }}
                          ></div>
                          <div 
                            className="w-5 bg-gray-300 rounded-t" 
                            style={{ height: `${data.benchmark * 10}px` }}
                          ></div>
                        </div>
                        <span className="text-xs">{data.month}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    Alerts & Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-amber-500 pl-4 py-2">
                      <h4 className="font-medium">Risk Threshold Exceeded</h4>
                      <p className="text-sm text-muted-foreground">High Yield portfolio has exceeded risk threshold</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                      <h4 className="font-medium">Performance Update</h4>
                      <p className="text-sm text-muted-foreground">Growth Fund outperforming benchmark by 3.2%</p>
                      <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-medium">Rebalancing Due</h4>
                      <p className="text-sm text-muted-foreground">Balanced Fund due for quarterly rebalancing</p>
                      <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 text-sm">
                    View All Alerts
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Portfolios Tab */}
          <TabsContent value="portfolios">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold">Active Portfolios</h2>
                <p className="text-muted-foreground">
                  Manage and analyze your investment portfolios
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  New Portfolio
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Portfolio Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead className="text-right">Value</TableHead>
                      <TableHead className="text-right">Return</TableHead>
                      <TableHead>Risk Level</TableHead>
                      <TableHead>Inception</TableHead>
                      <TableHead>Benchmark</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolios.map((portfolio) => (
                      <TableRow key={portfolio.id}>
                        <TableCell className="font-medium">{portfolio.name}</TableCell>
                        <TableCell>{portfolio.type}</TableCell>
                        <TableCell>{portfolio.manager}</TableCell>
                        <TableCell className="text-right">
                          ${(portfolio.value / 1000000).toFixed(1)}M
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="flex items-center justify-end">
                            {portfolio.return >= 0 ? (
                              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                            )}
                            <span className={portfolio.return >= 0 ? "text-green-500" : "text-red-500"}>
                              {portfolio.return}%
                            </span>
                          </span>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline"
                            className={
                              portfolio.risk === "Low" 
                                ? "bg-green-50 text-green-700 border-green-200" 
                                : portfolio.risk === "Moderate"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {portfolio.risk}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(portfolio.inception || "").toLocaleDateString()}</TableCell>
                        <TableCell>{portfolio.benchmark}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LineChart className="h-5 w-5" />
                  Performance Analysis
                </CardTitle>
                <CardDescription>
                  Track your portfolio performance against benchmarks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">1-Month</p>
                      <h3 className="text-2xl font-bold mt-1 text-green-600">+4.2%</h3>
                      <p className="text-xs mt-1">vs. +3.7% benchmark</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">3-Month</p>
                      <h3 className="text-2xl font-bold mt-1 text-green-600">+8.7%</h3>
                      <p className="text-xs mt-1">vs. +7.5% benchmark</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">YTD</p>
                      <h3 className="text-2xl font-bold mt-1 text-green-600">+12.5%</h3>
                      <p className="text-xs mt-1">vs. +10.2% benchmark</p>
                    </div>
                    <div className="border rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">1-Year</p>
                      <h3 className="text-2xl font-bold mt-1 text-green-600">+21.8%</h3>
                      <p className="text-xs mt-1">vs. +18.5% benchmark</p>
                    </div>
                  </div>

                  <div className="h-80 w-full bg-slate-50 border rounded-lg p-4 flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-10 w-10 mx-auto text-gray-400" />
                      <p className="mt-2 text-muted-foreground">Performance chart visualization</p>
                      <p className="text-xs text-muted-foreground">Showing relative performance by time period</p>
                    </div>
                  </div>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Portfolio</TableHead>
                        <TableHead className="text-right">1-Month</TableHead>
                        <TableHead className="text-right">3-Month</TableHead>
                        <TableHead className="text-right">YTD</TableHead>
                        <TableHead className="text-right">1-Year</TableHead>
                        <TableHead className="text-right">3-Year</TableHead>
                        <TableHead className="text-right">5-Year</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {portfolios.slice(0, 4).map((portfolio) => (
                        <TableRow key={portfolio.id}>
                          <TableCell className="font-medium">{portfolio.name}</TableCell>
                          <TableCell className="text-right text-green-600">+3.2%</TableCell>
                          <TableCell className="text-right text-green-600">+7.8%</TableCell>
                          <TableCell className="text-right text-green-600">+12.4%</TableCell>
                          <TableCell className="text-right text-green-600">+18.7%</TableCell>
                          <TableCell className="text-right text-green-600">+42.3%</TableCell>
                          <TableCell className="text-right text-green-600">+87.6%</TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell className="font-medium">Benchmark Average</TableCell>
                        <TableCell className="text-right">+2.8%</TableCell>
                        <TableCell className="text-right">+6.5%</TableCell>
                        <TableCell className="text-right">+10.2%</TableCell>
                        <TableCell className="text-right">+16.4%</TableCell>
                        <TableCell className="text-right">+36.8%</TableCell>
                        <TableCell className="text-right">+73.2%</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Attribution Analysis</CardTitle>
                  <CardDescription>
                    Performance attribution by sector and asset class
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-60 w-full bg-slate-50 border rounded-lg p-4 flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-10 w-10 mx-auto text-gray-400" />
                      <p className="mt-2 text-muted-foreground">Attribution chart visualization</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Technology</span>
                      <span className="text-sm text-green-600">+4.2%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Healthcare</span>
                      <span className="text-sm text-green-600">+3.1%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Financials</span>
                      <span className="text-sm text-green-600">+2.7%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Consumer Discretionary</span>
                      <span className="text-sm text-red-600">-0.8%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Energy</span>
                      <span className="text-sm text-green-600">+1.5%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Metrics</CardTitle>
                  <CardDescription>
                    Key risk indicators for portfolio analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="border rounded p-3">
                      <p className="text-xs text-muted-foreground">Alpha</p>
                      <p className="text-lg font-semibold mt-1">2.34</p>
                    </div>
                    <div className="border rounded p-3">
                      <p className="text-xs text-muted-foreground">Beta</p>
                      <p className="text-lg font-semibold mt-1">0.92</p>
                    </div>
                    <div className="border rounded p-3">
                      <p className="text-xs text-muted-foreground">Sharpe Ratio</p>
                      <p className="text-lg font-semibold mt-1">1.87</p>
                    </div>
                    <div className="border rounded p-3">
                      <p className="text-xs text-muted-foreground">Std Deviation</p>
                      <p className="text-lg font-semibold mt-1">12.3%</p>
                    </div>
                    <div className="border rounded p-3">
                      <p className="text-xs text-muted-foreground">Max Drawdown</p>
                      <p className="text-lg font-semibold mt-1">-18.4%</p>
                    </div>
                    <div className="border rounded p-3">
                      <p className="text-xs text-muted-foreground">Information Ratio</p>
                      <p className="text-lg font-semibold mt-1">1.43</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full mt-2">
                    <Download className="mr-2 h-4 w-4" />
                    Download Risk Report
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Portfolio Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-1">Sector Concentration</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Technology sector represents 28.5% of your equity holdings, exceeding your target of 25%.
                      </p>
                      <Button variant="outline" size="sm">Review Allocation</Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-1">Risk Analysis</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Your portfolio volatility is 12.3%, which is within your target range of 10-15%.
                      </p>
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-1">Performance Drivers</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Growth Fund is the top performer this quarter, contributing 42% of total returns.
                      </p>
                      <Button variant="outline" size="sm">View Performance</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recommendation Engine</CardTitle>
                  <CardDescription>
                    AI-powered recommendations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4 py-2">
                      <h4 className="font-medium">Rebalancing Opportunity</h4>
                      <p className="text-sm text-muted-foreground">Consider rebalancing Growth Fund to reduce tech exposure.</p>
                    </div>
                    <div className="border-l-4 border-amber-500 pl-4 py-2">
                      <h4 className="font-medium">Diversification Alert</h4>
                      <p className="text-sm text-muted-foreground">International exposure is below your target allocation.</p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4 py-2">
                      <h4 className="font-medium">ESG Opportunity</h4>
                      <p className="text-sm text-muted-foreground">ESG Focus fund aligns with your sustainability goals.</p>
                    </div>
                    <Button className="w-full mt-2">
                      View All Recommendations
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>What-If Analysis</CardTitle>
                <CardDescription>
                  Simulate changes to your portfolio allocation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-4">
                      <h3 className="font-semibold text-center mb-3">Current Allocation</h3>
                      <div className="h-40 w-full bg-slate-50 rounded-md flex items-center justify-center">
                        <PieChart className="h-10 w-10 text-gray-400" />
                      </div>
                      <div className="mt-3 text-sm text-center">
                        <p>Expected Return: 10.5%</p>
                        <p>Expected Risk: 12.3%</p>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-semibold text-center mb-3">Proposed Allocation</h3>
                      <div className="h-40 w-full bg-slate-50 rounded-md flex items-center justify-center">
                        <PieChart className="h-10 w-10 text-gray-400" />
                      </div>
                      <div className="mt-3 text-sm text-center">
                        <p>Expected Return: 11.2%</p>
                        <p>Expected Risk: 13.1%</p>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="font-semibold text-center mb-3">Difference</h3>
                      <div className="space-y-3 mt-8">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Expected Return</span>
                          <span className="text-sm text-green-600">+0.7%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Expected Risk</span>
                          <span className="text-sm text-red-600">+0.8%</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Sharpe Ratio</span>
                          <span className="text-sm text-amber-600">-0.03</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Diversification Score</span>
                          <span className="text-sm text-green-600">+5%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">Reset Simulation</Button>
                    <Button>Apply Changes</Button>
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
