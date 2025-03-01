
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { IntegrationMetadataCard } from "../entity-management/components/IntegrationMetadataCard";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  RefreshCw,
  CreditCard,
  Globe,
  Building2,
  Clock,
  Download,
  ChevronRight,
  Search,
  Calendar,
  BarChart4,
  PieChart as PieChartIcon,
  Filter,
  Bell,
  ExternalLink,
  ChevronDown
} from "lucide-react";
import { useState } from "react";

// Market data for currency exchange rates charts
const marketData = {
  eurUsd: [
    { date: 'Aug 10', value: 1.08 },
    { date: 'Aug 11', value: 1.09 },
    { date: 'Aug 12', value: 1.085 },
    { date: 'Aug 13', value: 1.095 },
    { date: 'Aug 14', value: 1.1 },
    { date: 'Aug 15', value: 1.092 },
    { date: 'Aug 16', value: 1.088 },
    { date: 'Aug 17', value: 1.078 },
    { date: 'Aug 18', value: 1.082 },
  ],
  usdGbp: [
    { date: 'Aug 10', value: 0.78 },
    { date: 'Aug 11', value: 0.775 },
    { date: 'Aug 12', value: 0.77 },
    { date: 'Aug 13', value: 0.765 },
    { date: 'Aug 14', value: 0.76 },
    { date: 'Aug 15', value: 0.77 },
    { date: 'Aug 16', value: 0.775 },
    { date: 'Aug 17', value: 0.78 },
    { date: 'Aug 18', value: 0.782 },
  ],
  usdCad: [
    { date: 'Aug 10', value: 1.35 },
    { date: 'Aug 11', value: 1.36 },
    { date: 'Aug 12', value: 1.355 },
    { date: 'Aug 13', value: 1.358 },
    { date: 'Aug 14', value: 1.35 },
    { date: 'Aug 15', value: 1.345 },
    { date: 'Aug 16', value: 1.35 },
    { date: 'Aug 17', value: 1.355 },
    { date: 'Aug 18', value: 1.36 },
  ],
  creditDefault: [
    { date: 'Aug 10', value: 50 },
    { date: 'Aug 11', value: 52 },
    { date: 'Aug 12', value: 51 },
    { date: 'Aug 13', value: 50 },
    { date: 'Aug 14', value: 48 },
    { date: 'Aug 15', value: 50 },
    { date: 'Aug 16', value: 53 },
    { date: 'Aug 17', value: 55 },
    { date: 'Aug 18', value: 58 },
  ]
};

// Cash flow data
const cashFlowData = [
  { month: 'Jan', inflow: 4000, outflow: 2400 },
  { month: 'Feb', inflow: 3000, outflow: 1398 },
  { month: 'Mar', inflow: 2000, outflow: 9800 },
  { month: 'Apr', inflow: 2780, outflow: 3908 },
  { month: 'May', inflow: 1890, outflow: 4800 },
  { month: 'Jun', inflow: 2390, outflow: 3800 }
];

// Liquidity data
const liquidityData = [
  { name: 'Week 1', value: 4000 },
  { name: 'Week 2', value: 3000 },
  { name: 'Week 3', value: 5000 },
  { name: 'Week 4', value: 2780 },
  { name: 'Week 5', value: 1890 },
  { name: 'Week 6', value: 2390 }
];

// Balance allocation data
const balanceAllocationData = [
  { name: 'USD (40%)', value: 40, color: '#3b82f6' },
  { name: 'EUR (25%)', value: 25, color: '#8b5cf6' },
  { name: 'GBP (15%)', value: 15, color: '#ec4899' },
  { name: 'JPY (10%)', value: 10, color: '#f97316' },
  { name: 'CAD (5%)', value: 5, color: '#22c55e' },
  { name: 'AUD (5%)', value: 5, color: '#eab308' },
];

// Navigation quick actions for My Day section
const quickActions = [
  {
    title: "FX Operations",
    icon: Globe,
    path: "/commercial/treasury/fx",
    description: "Manage foreign exchange"
  },
  {
    title: "Cash Pooling",
    icon: RefreshCw,
    path: "/commercial/treasury/cash-flow",
    description: "Optimize liquidity"
  },
  {
    title: "Payment Processing",
    icon: CreditCard,
    path: "/commercial/payment-processor",
    description: "Process transactions"
  },
  {
    title: "Balance Explorer",
    icon: DollarSign,
    path: "/commercial/treasury/balances",
    description: "View all accounts"
  },
  {
    title: "Reconciliation",
    icon: TrendingUp,
    path: "/commercial/treasury/transactions",
    description: "Match transactions"
  },
  {
    title: "Cash Forecasting",
    icon: BarChart4,
    path: "/commercial/treasury/forecast",
    description: "Predict future flows"
  },
  {
    title: "Risk Management",
    icon: Bell,
    path: "/commercial/risk-management",
    description: "Monitor exposure"
  },
  {
    title: "Reporting",
    icon: Download,
    path: "/commercial/treasury/reports",
    description: "Generate reports"
  }
];

// Bank connections for the integrations card
const bankIntegrations = [
  {
    type: "banking",
    system: "Chase Bank API",
    status: "active" as const,
    lastSync: "2023-11-25 09:30:22",
    frequency: "Every 1 hour",
    syncCount: 152
  },
  {
    type: "banking",
    system: "Wells Fargo",
    status: "active" as const,
    lastSync: "2023-11-25 08:45:10",
    frequency: "Every 3 hours",
    syncCount: 98
  },
  {
    type: "erp",
    system: "Oracle NetSuite",
    status: "active" as const,
    lastSync: "2023-11-25 07:15:45",
    frequency: "Every 6 hours",
    syncCount: 64
  }
];

// Favorite Workflows for quick access
const favoriteWorkflows = [
  { name: "JPY Forecast", description: "JPY Position Report", date: "Daily" },
  { name: "CASH_POSITION_EOD", description: "Cash Position End-of-Day", date: "Daily" },
  { name: "CASH_FORECAST", description: "15-day Forecast", date: "Weekly" },
  { name: "CASH_FORECAST_1M", description: "1-Week Forecast", date: "Daily" },
  { name: "CASH_RECON_EOD_SUM", description: "Cash Recon End-of-Day", date: "Daily" }
];

const MetricCard = ({ title, value, change, icon: Icon, trend }: {
  title: string;
  value: string;
  change: string;
  icon: any;
  trend: 'up' | 'down';
}) => (
  <Card className="border-blue-100 dark:border-blue-800">
    <CardContent className="pt-6">
      <div className="flex justify-between items-start">
        <div>
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
        </div>
        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
    </CardContent>
  </Card>
);

// Market data card component
const MarketDataCard = ({ title, code, data, color = "#3b82f6" }: { 
  title: string; 
  code: string; 
  data: any[];
  color?: string;
}) => (
  <Card className="border-blue-100 dark:border-blue-800">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <CardTitle className="text-sm font-medium flex items-center gap-1">
          <span>Market Data</span>
          <Badge variant="outline" className="ml-2">{code}</Badge>
        </CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div className="h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
            <XAxis dataKey="date" hide={true} />
            <YAxis domain={['dataMin - 0.01', 'dataMax + 0.01']} hide={true} />
            <Tooltip 
              labelFormatter={(label) => `Date: ${label}`}
              formatter={(value: any) => [value, code]}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between items-center text-sm mt-2">
        <span className="font-medium">{title}</span>
        <span className="text-muted-foreground">{data[data.length - 1].value}</span>
      </div>
    </CardContent>
  </Card>
);

export default function TreasuryDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Treasury & Cash Management"
          description="Global financial operations and cash visibility dashboard"
          showBack={true}
        >
          <div className="flex items-center gap-2">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Nov 25, 2023</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </Button>
          </div>
        </CommercialHeader>

        <Tabs defaultValue="overview" className="mt-6" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="market">Market Data</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            {/* Key Metrics */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <MetricCard
                title="Total Treasury Balance"
                value="$2.4M"
                change="+14.2% vs last month"
                icon={Wallet}
                trend="up"
              />
              <MetricCard
                title="Working Capital"
                value="$890K"
                change="-5.1% vs last month"
                icon={RefreshCw}
                trend="down"
              />
              <MetricCard
                title="FX Exposure"
                value="$340K"
                change="+2.3% vs last month"
                icon={Globe}
                trend="up"
              />
              <MetricCard
                title="Credit Utilization"
                value="65%"
                change="+3.5% vs last month"
                icon={CreditCard}
                trend="up"
              />
            </div>

            {/* Charts Section */}
            <div className="grid lg:grid-cols-2 gap-6 mb-6">
              <Card className="border-blue-100 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Cash Flow Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={cashFlowData}>
                        <defs>
                          <linearGradient id="inflow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="outflow" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1e40af" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="inflow"
                          stroke="#3b82f6"
                          fillOpacity={1}
                          fill="url(#inflow)"
                          name="Inflow"
                        />
                        <Area
                          type="monotone"
                          dataKey="outflow"
                          stroke="#1e40af"
                          fillOpacity={1}
                          fill="url(#outflow)"
                          name="Outflow"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 gap-6">
                <Card className="border-blue-100 dark:border-blue-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <PieChartIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Currency Allocation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[200px] flex">
                      <ResponsiveContainer width="60%" height="100%">
                        <PieChart>
                          <Pie
                            data={balanceAllocationData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {balanceAllocationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value}%`]} />
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="w-[40%] pl-2 flex flex-col justify-center">
                        <div className="space-y-2">
                          {balanceAllocationData.map((item, i) => (
                            <div key={i} className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-2" 
                                style={{ backgroundColor: item.color }}
                              />
                              <span className="text-xs">{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-100 dark:border-blue-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      Debt Maturity Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-2xl font-bold">5</div>
                        <div className="text-sm text-muted-foreground">Active debts</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold">$14.9M</div>
                        <div className="text-sm text-muted-foreground">Total debt</div>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full justify-between mt-2"
                      onClick={() => navigate("/commercial/treasury/debt")}
                    >
                      <span>View Debt Portfolio</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* My Day - Quick Actions */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">My Day</h3>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {quickActions.slice(0, 8).map((action) => (
                  <Button
                    key={action.title}
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    onClick={() => navigate(action.path)}
                  >
                    <action.icon className="h-6 w-6" />
                    <div className="text-center">
                      <div className="font-medium">{action.title}</div>
                      <div className="text-xs text-muted-foreground">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>

            {/* Integration Status */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Connected Systems</h3>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-1"
                  onClick={() => navigate("/commercial/entity-management/integrations")}
                >
                  <ExternalLink className="h-4 w-4" />
                  Manage Connections
                </Button>
              </div>
              <IntegrationMetadataCard integrations={bankIntegrations} />
            </div>
            
            {/* Favorite Workflows */}
            <Card className="mb-6 border-blue-100 dark:border-blue-800">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium">Favorite Workflows</CardTitle>
                  <Button variant="ghost" size="sm">
                    <PlusIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium text-sm py-2">Name</th>
                        <th className="text-left font-medium text-sm py-2">Description</th>
                        <th className="text-left font-medium text-sm py-2">Frequency</th>
                        <th className="text-right font-medium text-sm py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {favoriteWorkflows.map((workflow, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="py-3">
                            <div className="flex items-center">
                              <div className="h-2 w-2 rounded-full bg-blue-500 mr-2"></div>
                              {workflow.name}
                            </div>
                          </td>
                          <td className="py-3 text-muted-foreground">{workflow.description}</td>
                          <td className="py-3 text-muted-foreground">{workflow.date}</td>
                          <td className="py-3 text-right">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <ChevronRight className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market" className="mt-4">
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">Currency Exchange Rates</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <MarketDataCard 
                  title="EUR/USD Spot" 
                  code="EUR/USD" 
                  data={marketData.eurUsd} 
                  color="#8b5cf6" 
                />
                <MarketDataCard 
                  title="USD/GBP Spot" 
                  code="USD/GBP" 
                  data={marketData.usdGbp} 
                  color="#ec4899" 
                />
                <MarketDataCard 
                  title="USD/CAD Spot" 
                  code="USD/CAD" 
                  data={marketData.usdCad} 
                  color="#f97316" 
                />
                <MarketDataCard 
                  title="USD 10 YR Credit Default Swap" 
                  code="USD 10YR CDS" 
                  data={marketData.creditDefault} 
                  color="#22c55e" 
                />
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-blue-100 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Global Market Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="text-sm font-medium mb-1">USD Index</div>
                        <div className="text-2xl font-bold">104.2</div>
                        <div className="text-sm text-green-500 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          +0.8%
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="text-sm font-medium mb-1">US 10Y Yield</div>
                        <div className="text-2xl font-bold">4.42%</div>
                        <div className="text-sm text-red-500 flex items-center">
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                          -0.05%
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="text-sm font-medium mb-1">Libor 3M</div>
                        <div className="text-2xl font-bold">4.72%</div>
                        <div className="text-sm text-green-500 flex items-center">
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                          +0.01%
                        </div>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="text-sm font-medium mb-1">SOFR</div>
                        <div className="text-2xl font-bold">4.30%</div>
                        <div className="text-sm text-gray-500">Unchanged</div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full justify-between">
                      <span>View Full Market Data</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-blue-100 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Market Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-amber-500 pl-3 py-2">
                      <div className="text-sm font-medium">EUR/USD approaching 6-month high</div>
                      <div className="text-xs text-muted-foreground">25 Nov 2023, 08:15 AM</div>
                    </div>
                    <div className="border-l-4 border-red-500 pl-3 py-2">
                      <div className="text-sm font-medium">US Treasury yield curve flattening</div>
                      <div className="text-xs text-muted-foreground">25 Nov 2023, 07:30 AM</div>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-3 py-2">
                      <div className="text-sm font-medium">Federal Reserve meeting minutes released</div>
                      <div className="text-xs text-muted-foreground">24 Nov 2023, 04:45 PM</div>
                    </div>
                    <div className="border-l-4 border-green-500 pl-3 py-2">
                      <div className="text-sm font-medium">GBP volatility increasing ahead of BoE decision</div>
                      <div className="text-xs text-muted-foreground">24 Nov 2023, 11:20 AM</div>
                    </div>
                    
                    <Button variant="outline" className="w-full justify-between">
                      <span>Manage Market Alerts</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="operations" className="mt-4">
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2 border-blue-100 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Today's Operations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="text-sm text-muted-foreground">Pending Transactions</div>
                        <div className="text-2xl font-bold mt-1">12</div>
                        <Button variant="ghost" size="sm" className="mt-2 h-8 px-2 text-xs">View All</Button>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="text-sm text-muted-foreground">Approvals Needed</div>
                        <div className="text-2xl font-bold mt-1">5</div>
                        <Button variant="ghost" size="sm" className="mt-2 h-8 px-2 text-xs">View All</Button>
                      </div>
                      <div className="border rounded-lg p-4">
                        <div className="text-sm text-muted-foreground">Reconciliation Items</div>
                        <div className="text-2xl font-bold mt-1">8</div>
                        <Button variant="ghost" size="sm" className="mt-2 h-8 px-2 text-xs">View All</Button>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-sm font-medium mb-3">Recent Transactions</h4>
                      <div className="overflow-auto max-h-[300px]">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="border-b">
                              <th className="text-left font-medium text-sm py-2">Reference</th>
                              <th className="text-left font-medium text-sm py-2">Description</th>
                              <th className="text-left font-medium text-sm py-2">Amount</th>
                              <th className="text-left font-medium text-sm py-2">Status</th>
                              <th className="text-left font-medium text-sm py-2">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {[
                              { ref: 'TX-7829', desc: 'Invoice Payment - Acme Inc', amount: '$42,500.00', status: 'completed', date: '25 Nov 2023' },
                              { ref: 'TX-7830', desc: 'FX Swap Settlement', amount: '€35,000.00', status: 'pending', date: '25 Nov 2023' },
                              { ref: 'TX-7831', desc: 'Internal Transfer', amount: '$125,000.00', status: 'processing', date: '25 Nov 2023' },
                              { ref: 'TX-7832', desc: 'Supplier Payment - XYZ Corp', amount: '$18,750.00', status: 'completed', date: '24 Nov 2023' },
                              { ref: 'TX-7833', desc: 'Payroll Processing', amount: '$89,450.00', status: 'scheduled', date: '26 Nov 2023' },
                            ].map((tx, i) => (
                              <tr key={i} className="border-b last:border-0">
                                <td className="py-3 text-sm">{tx.ref}</td>
                                <td className="py-3 text-sm">{tx.desc}</td>
                                <td className="py-3 text-sm font-medium">{tx.amount}</td>
                                <td className="py-3">
                                  <Badge className={
                                    tx.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                                    tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                                    tx.status === 'processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                                    'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                                  }>
                                    {tx.status}
                                  </Badge>
                                </td>
                                <td className="py-3 text-sm text-muted-foreground">{tx.date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-blue-100 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Upcoming Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-3">
                      <div className="text-xs text-blue-600 font-medium mb-1">Today - 11:00 AM</div>
                      <div className="text-sm font-medium">FX Settlement - EUR/USD</div>
                      <div className="text-xs text-muted-foreground mt-1">€2,500,000 at 1.0925</div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="text-xs text-blue-600 font-medium mb-1">Today - 2:30 PM</div>
                      <div className="text-sm font-medium">Weekly Cash Position Review</div>
                      <div className="text-xs text-muted-foreground mt-1">Virtual meeting with Treasury team</div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="text-xs text-blue-600 font-medium mb-1">Tomorrow - 9:15 AM</div>
                      <div className="text-sm font-medium">Confirm International Wire Transfers</div>
                      <div className="text-xs text-muted-foreground mt-1">5 pending transfers require approval</div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <div className="text-xs text-blue-600 font-medium mb-1">Tomorrow - 3:00 PM</div>
                      <div className="text-sm font-medium">Bank Account Reconciliation</div>
                      <div className="text-xs text-muted-foreground mt-1">Wells Fargo Corporate accounts</div>
                    </div>
                    
                    <Button variant="outline" className="w-full">View Full Calendar</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-4">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-blue-100 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart4 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Available Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Daily Cash Position', description: 'Summary of all cash balances', icon: Wallet },
                      { name: 'FX Exposure Analysis', description: 'Currency exposure by business unit', icon: Globe },
                      { name: 'Liquidity Forecast', description: '90-day projection of available liquidity', icon: TrendingUp },
                      { name: 'Bank Fee Analysis', description: 'Monthly bank service charges', icon: DollarSign },
                    ].map((report, i) => (
                      <div key={i} className="flex items-center justify-between border rounded-lg p-3">
                        <div className="flex items-center">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                            <report.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="font-medium">{report.name}</div>
                            <div className="text-xs text-muted-foreground">{report.description}</div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full">View All Reports</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-blue-100 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Scheduled Reports
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Daily Cash Position', frequency: 'Daily - 8:00 AM', recipients: 'Treasury Team', format: 'PDF, Excel' },
                      { name: 'Weekly Cash Forecast', frequency: 'Monday - 9:00 AM', recipients: 'Finance Leadership', format: 'PDF' },
                      { name: 'Monthly Bank Reconciliation', frequency: 'Last day of month', recipients: 'Accounting', format: 'Excel' },
                      { name: 'Quarterly FX Exposure', frequency: 'Last day of quarter', recipients: 'CFO, Treasury', format: 'PDF, Dashboard' },
                    ].map((report, i) => (
                      <div key={i} className="flex flex-col border rounded-lg p-3">
                        <div className="flex justify-between items-start mb-2">
                          <div className="font-medium">{report.name}</div>
                          <Badge variant="outline">{report.frequency}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                          <div className="text-muted-foreground">Recipients:</div>
                          <div>{report.recipients}</div>
                          <div className="text-muted-foreground">Format:</div>
                          <div>{report.format}</div>
                        </div>
                      </div>
                    ))}
                    
                    <Button variant="outline" className="w-full">
                      Manage Report Schedules
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Stats Section */}
        <div className="my-12 py-12 border-t border-b">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-500">100%</div>
              <div className="mt-2 text-lg font-medium">Cash Visibility</div>
              <div className="text-sm text-muted-foreground">Real-time view across all accounts</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500">13,000+</div>
              <div className="mt-2 text-lg font-medium">Connected Banks</div>
              <div className="text-sm text-muted-foreground">Global banking network</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-500">$12.5T+</div>
              <div className="mt-2 text-lg font-medium">Payments Volume</div>
              <div className="text-sm text-muted-foreground">Processed annually</div>
            </div>
          </div>
        </div>
        
        {/* Connectivity Section */}
        <div className="grid md:grid-cols-2 gap-8 items-center mt-8 mb-8">
          <div>
            <img 
              src="/lovable-uploads/73219b40-fec2-42d0-aec8-808c33b4d8d4.png" 
              alt="Treasury connectivity diagram" 
              className="w-full max-w-md mx-auto rounded-lg shadow-lg" 
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-4">Intelligent Connectivity by ClearConnect</h2>
            <p className="text-lg mb-4">Any Bank. Any ERP. Anytime. Anywhere.</p>
            <p className="mb-4">Rapid Time to Value in 90 Days.</p>
            <p className="mb-4">AI-driven, Orchestrated Data Connections.</p>
            <p className="mb-6">No need to struggle with cumbersome, monolithic systems using codebase to create and manage connections.</p>
            <Button size="lg" className="gap-2">
              Learn More
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

// Icons
function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
