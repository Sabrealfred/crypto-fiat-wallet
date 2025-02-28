
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  ChevronRight, 
  DollarSign,
  ChartPie,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  FileText,
  Calendar,
  Download,
  Briefcase,
  BarChart2,
  Search,
  Filter,
  Clock,
  CircleDollarSign,
  AlertCircle,
  Plus,
  Layers,
  FileSpreadsheet
} from "lucide-react";

// Performance data
const performanceData = [
  { month: 'Jan', return: 2.5, benchmark: 2.1 },
  { month: 'Feb', return: 3.2, benchmark: 2.6 },
  { month: 'Mar', return: 2.8, benchmark: 2.4 },
  { month: 'Apr', return: 3.5, benchmark: 2.9 },
  { month: 'May', return: 4.2, benchmark: 3.7 },
  { month: 'Jun', return: 3.8, benchmark: 3.2 }
];

// Asset allocation data
const allocationData = [
  { name: 'Equity', value: 45 },
  { name: 'Fixed Income', value: 30 },
  { name: 'Cash', value: 15 },
  { name: 'Alternative', value: 10 }
];

// Liquidity forecast data
const liquidityForecastData = [
  { date: '1-Jul', available: 3.2, required: 2.1, excess: 1.1 },
  { date: '8-Jul', available: 3.8, required: 2.5, excess: 1.3 },
  { date: '15-Jul', available: 2.9, required: 2.7, excess: 0.2 },
  { date: '22-Jul', available: 3.5, required: 3.2, excess: 0.3 },
  { date: '29-Jul', available: 4.1, required: 2.8, excess: 1.3 },
  { date: '5-Aug', available: 4.5, required: 3.0, excess: 1.5 }
];

// Investment opportunity data
const investmentOpportunities = [
  { 
    id: 1, 
    name: "Treasury Bills", 
    expectedReturn: "4.2%", 
    maturity: "3 months", 
    riskLevel: "Low", 
    minInvestment: "$100,000"
  },
  { 
    id: 2, 
    name: "Corporate Bonds", 
    expectedReturn: "5.7%", 
    maturity: "1 year", 
    riskLevel: "Medium-Low", 
    minInvestment: "$250,000"
  },
  { 
    id: 3, 
    name: "Money Market Fund", 
    expectedReturn: "4.5%", 
    maturity: "On Demand", 
    riskLevel: "Low", 
    minInvestment: "$50,000"
  },
  { 
    id: 4, 
    name: "Commercial Paper", 
    expectedReturn: "4.8%", 
    maturity: "6 months", 
    riskLevel: "Medium-Low", 
    minInvestment: "$500,000"
  }
];

// Investment activity data
const recentActivity = [
  { 
    id: 1, 
    type: "Purchase", 
    instrument: "Treasury Bills", 
    amount: "$1,200,000", 
    date: "2023-06-15", 
    status: "Completed" 
  },
  { 
    id: 2, 
    type: "Maturity", 
    instrument: "Commercial Paper", 
    amount: "$800,000", 
    date: "2023-06-12", 
    status: "Completed" 
  },
  { 
    id: 3, 
    type: "Dividend", 
    instrument: "ETF Portfolio", 
    amount: "$35,200", 
    date: "2023-06-10", 
    status: "Completed" 
  },
  { 
    id: 4, 
    type: "Purchase", 
    instrument: "Corporate Bonds", 
    amount: "$1,500,000", 
    date: "2023-06-05", 
    status: "Completed" 
  }
];

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'];

const MetricCard = ({ title, value, change, trend }: { 
  title: string; 
  value: string; 
  change: string; 
  trend: 'up' | 'down' 
}) => (
  <Card>
    <CardContent className="pt-6">
      <p className="text-sm text-muted-foreground">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
      <p className={`text-sm mt-2 flex items-center ${
        trend === 'up' ? 'text-green-500' : 'text-red-500'
      }`}>
        {trend === 'up' ? (
          <ArrowUpRight className="h-4 w-4 mr-1" />
        ) : (
          <ArrowDownRight className="h-4 w-4 mr-1" />
        )}
        {change}
      </p>
    </CardContent>
  </Card>
);

export default function InvestmentManagement() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Investment Management" 
          description="Determine liquidity needs and seamlessly invest excess cash"
          showBack={true}
        />

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-5 w-full max-w-4xl mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="liquidity">Liquidity Analysis</TabsTrigger>
            <TabsTrigger value="opportunities">Investment Opportunities</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio Analysis</TabsTrigger>
            <TabsTrigger value="reports">Reports & Statements</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            {/* Key Metrics */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricCard
                title="Total Portfolio Value"
                value="$4.2M"
                change="+5.8% vs last month"
                trend="up"
              />
              <MetricCard
                title="YTD Return"
                value="12.4%"
                change="+2.1% vs benchmark"
                trend="up"
              />
              <MetricCard
                title="Risk Score"
                value="Medium"
                change="No change"
                trend="up"
              />
              <MetricCard
                title="Cash Position"
                value="$620K"
                change="-8.3% vs target"
                trend="down"
              />
            </div>

            {/* Performance Chart */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Portfolio Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="return" 
                          name="Portfolio Return (%)"
                          stroke="#8b5cf6" 
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="benchmark" 
                          name="Benchmark (%)"
                          stroke="#94a3b8" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChartPie className="h-5 w-5" />
                    Asset Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={allocationData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {allocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-4">
                      {allocationData.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[index] }}
                          />
                          <span className="text-sm">{item.name} ({item.value}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Investment Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Instrument</th>
                        <th className="text-left py-3 px-4">Amount</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivity.map((activity) => (
                        <tr key={activity.id} className="border-b">
                          <td className="py-3 px-4">{activity.type}</td>
                          <td className="py-3 px-4">{activity.instrument}</td>
                          <td className="py-3 px-4">{activity.amount}</td>
                          <td className="py-3 px-4">{activity.date}</td>
                          <td className="py-3 px-4">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {activity.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                <span>Portfolio Analysis</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <DollarSign className="h-5 w-5" />
                <span>Trade Securities</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <ChartPie className="h-5 w-5" />
                <span>Rebalance Portfolio</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <FileText className="h-5 w-5" />
                <span>Investment Reports</span>
              </Button>
            </div>
          </TabsContent>

          {/* Liquidity Analysis Tab */}
          <TabsContent value="liquidity">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Liquidity Forecast (Next 30 Days)
                  </CardTitle>
                  <CardDescription>
                    Forecast of available funds, required liquidity, and excess cash
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={liquidityForecastData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`$${value}M`, ""]} />
                        <Legend />
                        <Bar dataKey="available" name="Available Liquidity ($M)" fill="#3b82f6" />
                        <Bar dataKey="required" name="Required Liquidity ($M)" fill="#f59e0b" />
                        <Bar dataKey="excess" name="Excess Cash ($M)" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CircleDollarSign className="h-5 w-5" />
                    Liquidity Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Current Liquidity</p>
                      <h3 className="text-2xl font-bold">$3.2M</h3>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">30-Day Required</p>
                      <h3 className="text-2xl font-bold">$2.1M</h3>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Available for Investment</p>
                      <h3 className="text-2xl font-bold text-green-600">$1.1M</h3>
                    </div>
                    <Separator />
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Upcoming Payments (7d)</p>
                      <h3 className="text-lg font-semibold">$450K</h3>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Upcoming Collections (7d)</p>
                      <h3 className="text-lg font-semibold">$680K</h3>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Invest Excess Cash
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Layers className="h-5 w-5" />
                  Cash Positioning by Entity
                </CardTitle>
                <CardDescription>
                  Cash position across all entities, divisions, and regions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-end gap-2 mb-4">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Entity</th>
                        <th className="text-left py-3 px-4">Division</th>
                        <th className="text-left py-3 px-4">Region</th>
                        <th className="text-right py-3 px-4">Current Balance</th>
                        <th className="text-right py-3 px-4">Min. Required</th>
                        <th className="text-right py-3 px-4">Excess / (Deficit)</th>
                        <th className="text-center py-3 px-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Main Corp</td>
                        <td className="py-3 px-4">Operations</td>
                        <td className="py-3 px-4">North America</td>
                        <td className="py-3 px-4 text-right">$1,250,000</td>
                        <td className="py-3 px-4 text-right">$800,000</td>
                        <td className="py-3 px-4 text-right text-green-600">$450,000</td>
                        <td className="py-3 px-4 text-center">
                          <Badge className="bg-green-50 text-green-700 border-green-200">Excess</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Subsidiary A</td>
                        <td className="py-3 px-4">Sales</td>
                        <td className="py-3 px-4">Europe</td>
                        <td className="py-3 px-4 text-right">$850,000</td>
                        <td className="py-3 px-4 text-right">$650,000</td>
                        <td className="py-3 px-4 text-right text-green-600">$200,000</td>
                        <td className="py-3 px-4 text-center">
                          <Badge className="bg-green-50 text-green-700 border-green-200">Excess</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Subsidiary B</td>
                        <td className="py-3 px-4">Manufacturing</td>
                        <td className="py-3 px-4">Asia</td>
                        <td className="py-3 px-4 text-right">$450,000</td>
                        <td className="py-3 px-4 text-right">$550,000</td>
                        <td className="py-3 px-4 text-right text-red-600">($100,000)</td>
                        <td className="py-3 px-4 text-center">
                          <Badge className="bg-red-50 text-red-700 border-red-200">Deficit</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Subsidiary C</td>
                        <td className="py-3 px-4">R&D</td>
                        <td className="py-3 px-4">North America</td>
                        <td className="py-3 px-4 text-right">$650,000</td>
                        <td className="py-3 px-4 text-right">$350,000</td>
                        <td className="py-3 px-4 text-right text-green-600">$300,000</td>
                        <td className="py-3 px-4 text-center">
                          <Badge className="bg-green-50 text-green-700 border-green-200">Excess</Badge>
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-muted/20">
                        <td className="py-3 px-4 font-semibold" colSpan={3}>Total</td>
                        <td className="py-3 px-4 text-right font-semibold">$3,200,000</td>
                        <td className="py-3 px-4 text-right font-semibold">$2,350,000</td>
                        <td className="py-3 px-4 text-right font-semibold text-green-600">$850,000</td>
                        <td className="py-3 px-4"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Investment Opportunities Tab */}
          <TabsContent value="opportunities">
            <div className="mb-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Available Investment Opportunities
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Search className="h-4 w-4 mr-2" />
                        Search
                      </Button>
                    </div>
                  </div>
                  <CardDescription>
                    Current investment options based on your liquidity profile and risk preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {investmentOpportunities.map((opportunity) => (
                      <Card key={opportunity.id} className="border-2 border-muted">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{opportunity.name}</CardTitle>
                          <CardDescription>Expected Return: {opportunity.expectedReturn}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Maturity:</span>
                              <span className="text-sm font-medium">{opportunity.maturity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Risk Level:</span>
                              <span className="text-sm font-medium">{opportunity.riskLevel}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">Minimum Investment:</span>
                              <span className="text-sm font-medium">{opportunity.minInvestment}</span>
                            </div>
                          </div>
                          <Button className="w-full">Invest Now</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="rounded-lg border-2 border-blue-100 bg-blue-50 p-4">
                    <div className="flex items-start">
                      <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                      <div>
                        <h4 className="text-sm font-semibold text-blue-800">Personalized Recommendation</h4>
                        <p className="text-sm text-blue-700 mt-1">
                          Based on your current cash position of $1.1M excess liquidity, we recommend a mix of Treasury Bills ($500K) and Money Market Fund ($600K) for optimal returns while maintaining necessary liquidity.
                        </p>
                        <Button size="sm" variant="outline" className="mt-3 border-blue-200 text-blue-700 hover:bg-blue-100">
                          Apply Recommendation
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5" />
                    Return Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        layout="vertical"
                        data={[
                          { name: "Treasury Bills", value: 4.2 },
                          { name: "Money Market", value: 4.5 },
                          { name: "Corporate Bonds", value: 5.7 },
                          { name: "Commercial Paper", value: 4.8 }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 6]} />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip formatter={(value) => [`${value}%`, "Expected Return"]} />
                        <Bar dataKey="value" fill="#3b82f6" name="Expected Return (%)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Investment Calendar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center p-3 rounded border border-muted bg-muted/10">
                      <div className="w-2 h-10 bg-blue-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">T-Bill Maturity</h4>
                        <p className="text-xs text-muted-foreground">July 15, 2023</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">$450K</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 rounded border border-muted bg-muted/10">
                      <div className="w-2 h-10 bg-green-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Bond Coupon Payment</h4>
                        <p className="text-xs text-muted-foreground">July 22, 2023</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">$28.5K</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 rounded border border-muted bg-muted/10">
                      <div className="w-2 h-10 bg-purple-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">CD Maturity</h4>
                        <p className="text-xs text-muted-foreground">August 5, 2023</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">$750K</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center p-3 rounded border border-muted bg-muted/10">
                      <div className="w-2 h-10 bg-orange-500 rounded-full mr-3"></div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">Commercial Paper Issue</h4>
                        <p className="text-xs text-muted-foreground">August 10, 2023</p>
                      </div>
                      <div className="text-right">
                        <span className="font-medium">$1.2M</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Portfolio Analysis Tab */}
          <TabsContent value="portfolio">
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Performance Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="return" 
                          name="Portfolio Return (%)"
                          stroke="#8b5cf6" 
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="benchmark" 
                          name="Benchmark (%)"
                          stroke="#94a3b8" 
                          strokeWidth={2}
                          strokeDasharray="5 5"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChartPie className="h-5 w-5" />
                    Asset Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={allocationData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {allocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-4 mt-4">
                      {allocationData.map((item, index) => (
                        <div key={item.name} className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: COLORS[index] }}
                          />
                          <span className="text-sm">{item.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5" />
                  Holdings Detail
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Instrument</th>
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Purchase Date</th>
                        <th className="text-right py-3 px-4">Amount</th>
                        <th className="text-right py-3 px-4">Current Value</th>
                        <th className="text-right py-3 px-4">Return</th>
                        <th className="text-left py-3 px-4">Maturity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">US Treasury</td>
                        <td className="py-3 px-4">T-Bill</td>
                        <td className="py-3 px-4">2023-04-15</td>
                        <td className="py-3 px-4 text-right">$500,000</td>
                        <td className="py-3 px-4 text-right">$508,750</td>
                        <td className="py-3 px-4 text-right text-green-600">+1.75%</td>
                        <td className="py-3 px-4">2023-07-15</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Corp Bond Fund</td>
                        <td className="py-3 px-4">Bond Fund</td>
                        <td className="py-3 px-4">2023-02-10</td>
                        <td className="py-3 px-4 text-right">$750,000</td>
                        <td className="py-3 px-4 text-right">$795,000</td>
                        <td className="py-3 px-4 text-right text-green-600">+6.00%</td>
                        <td className="py-3 px-4">Various</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Money Market Fund</td>
                        <td className="py-3 px-4">Money Market</td>
                        <td className="py-3 px-4">2023-05-20</td>
                        <td className="py-3 px-4 text-right">$1,200,000</td>
                        <td className="py-3 px-4 text-right">$1,209,000</td>
                        <td className="py-3 px-4 text-right text-green-600">+0.75%</td>
                        <td className="py-3 px-4">On Demand</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Commercial Paper</td>
                        <td className="py-3 px-4">CP</td>
                        <td className="py-3 px-4">2023-04-05</td>
                        <td className="py-3 px-4 text-right">$1,000,000</td>
                        <td className="py-3 px-4 text-right">$1,015,000</td>
                        <td className="py-3 px-4 text-right text-green-600">+1.50%</td>
                        <td className="py-3 px-4">2023-10-05</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Certificate of Deposit</td>
                        <td className="py-3 px-4">CD</td>
                        <td className="py-3 px-4">2023-03-15</td>
                        <td className="py-3 px-4 text-right">$750,000</td>
                        <td className="py-3 px-4 text-right">$772,500</td>
                        <td className="py-3 px-4 text-right text-green-600">+3.00%</td>
                        <td className="py-3 px-4">2023-09-15</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-muted/20">
                        <td className="py-3 px-4 font-semibold" colSpan={3}>Total</td>
                        <td className="py-3 px-4 text-right font-semibold">$4,200,000</td>
                        <td className="py-3 px-4 text-right font-semibold">$4,300,250</td>
                        <td className="py-3 px-4 text-right font-semibold text-green-600">+2.39%</td>
                        <td className="py-3 px-4"></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Button>
                <ChartPie className="h-4 w-4 mr-2" />
                Rebalance Portfolio
              </Button>
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Standard Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded border border-muted hover:bg-muted/10 cursor-pointer">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-500 mr-3" />
                        <span>Monthly Performance Report</span>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded border border-muted hover:bg-muted/10 cursor-pointer">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-500 mr-3" />
                        <span>Investment Transactions</span>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded border border-muted hover:bg-muted/10 cursor-pointer">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-500 mr-3" />
                        <span>Maturity Schedule</span>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded border border-muted hover:bg-muted/10 cursor-pointer">
                      <div className="flex items-center">
                        <FileText className="h-5 w-5 text-blue-500 mr-3" />
                        <span>Cash Flow from Investments</span>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ChartPie className="h-5 w-5" />
                    Analytics Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded border border-muted hover:bg-muted/10 cursor-pointer">
                      <div className="flex items-center">
                        <BarChart2 className="h-5 w-5 text-purple-500 mr-3" />
                        <span>Portfolio Analysis</span>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded border border-muted hover:bg-muted/10 cursor-pointer">
                      <div className="flex items-center">
                        <BarChart2 className="h-5 w-5 text-purple-500 mr-3" />
                        <span>Risk Assessment</span>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded border border-muted hover:bg-muted/10 cursor-pointer">
                      <div className="flex items-center">
                        <BarChart2 className="h-5 w-5 text-purple-500 mr-3" />
                        <span>Return Attribution</span>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded border border-muted hover:bg-muted/10 cursor-pointer">
                      <div className="flex items-center">
                        <BarChart2 className="h-5 w-5 text-purple-500 mr-3" />
                        <span>Benchmark Comparison</span>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileSpreadsheet className="h-5 w-5" />
                    Custom Workbooks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 rounded border border-muted hover:bg-muted/10 cursor-pointer">
                      <div className="flex items-center">
                        <FileSpreadsheet className="h-5 w-5 text-green-500 mr-3" />
                        <span>Investment Master Data</span>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded border border-muted hover:bg-muted/10 cursor-pointer">
                      <div className="flex items-center">
                        <FileSpreadsheet className="h-5 w-5 text-green-500 mr-3" />
                        <span>Portfolio Break-down</span>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex items-center justify-between p-3 rounded border border-muted hover:bg-muted/10 cursor-pointer">
                      <div className="flex items-center">
                        <FileSpreadsheet className="h-5 w-5 text-green-500 mr-3" />
                        <span>Entity Investments</span>
                      </div>
                      <Download className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Create New Workbook
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Scheduled Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Report Name</th>
                        <th className="text-left py-3 px-4">Frequency</th>
                        <th className="text-left py-3 px-4">Recipients</th>
                        <th className="text-left py-3 px-4">Next Delivery</th>
                        <th className="text-left py-3 px-4">Format</th>
                        <th className="text-center py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4">Monthly Performance</td>
                        <td className="py-3 px-4">Monthly</td>
                        <td className="py-3 px-4">4 recipients</td>
                        <td className="py-3 px-4">Jul 1, 2023</td>
                        <td className="py-3 px-4">PDF, Excel</td>
                        <td className="py-3 px-4 text-center">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Weekly Liquidity</td>
                        <td className="py-3 px-4">Weekly</td>
                        <td className="py-3 px-4">2 recipients</td>
                        <td className="py-3 px-4">Jun 26, 2023</td>
                        <td className="py-3 px-4">PDF</td>
                        <td className="py-3 px-4 text-center">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4">Investment Master Data</td>
                        <td className="py-3 px-4">Daily</td>
                        <td className="py-3 px-4">1 recipient</td>
                        <td className="py-3 px-4">Jun 23, 2023</td>
                        <td className="py-3 px-4">Excel</td>
                        <td className="py-3 px-4 text-center">
                          <Button variant="ghost" size="sm">Edit</Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule New Report
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
