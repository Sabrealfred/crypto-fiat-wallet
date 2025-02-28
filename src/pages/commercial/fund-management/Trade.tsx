
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  ChevronDown,
  ChevronUp,
  Clock,
  DollarSign,
  Filter,
  LineChart as LineChartIcon,
  Plus,
  Search,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  History
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Sample data for trading dashboard
const tradingVolumeData = [
  { date: '2023-10-01', equities: 4500000, bonds: 6500000, derivatives: 3200000, forex: 8500000 },
  { date: '2023-10-15', equities: 5100000, bonds: 6100000, derivatives: 3800000, forex: 9100000 },
  { date: '2023-11-01', equities: 4800000, bonds: 6300000, derivatives: 3600000, forex: 8900000 },
  { date: '2023-11-15', equities: 5300000, bonds: 6700000, derivatives: 4100000, forex: 9400000 },
  { date: '2023-12-01', equities: 5600000, bonds: 7200000, derivatives: 4300000, forex: 9800000 },
  { date: '2023-12-15', equities: 6100000, bonds: 7500000, derivatives: 4800000, forex: 10200000 },
  { date: '2024-01-01', equities: 5800000, bonds: 7100000, derivatives: 4500000, forex: 9900000 },
  { date: '2024-01-15', equities: 6300000, bonds: 7800000, derivatives: 5000000, forex: 10500000 },
  { date: '2024-02-01', equities: 6600000, bonds: 8100000, derivatives: 5200000, forex: 10800000 },
  { date: '2024-02-15', equities: 7000000, bonds: 8500000, derivatives: 5600000, forex: 11200000 },
  { date: '2024-03-01', equities: 7300000, bonds: 8800000, derivatives: 5900000, forex: 11500000 },
];

const assetAllocationData = [
  { name: 'Equities', value: 35 },
  { name: 'Bonds', value: 40 },
  { name: 'Derivatives', value: 10 },
  { name: 'Forex', value: 15 },
];

const recentTradesData = [
  { 
    id: 'TR-789032',
    type: 'BUY',
    security: 'AAPL',
    price: 182.52,
    quantity: 500,
    value: 91260,
    executedAt: '2024-03-15 14:32:15',
    status: 'Completed',
    counterparty: 'Goldman Sachs',
  },
  { 
    id: 'TR-789031',
    type: 'SELL',
    security: 'MSFT',
    price: 415.28,
    quantity: 300,
    value: 124584,
    executedAt: '2024-03-15 14:30:45',
    status: 'Completed',
    counterparty: 'JP Morgan',
  },
  { 
    id: 'TR-789030',
    type: 'BUY',
    security: 'US TREASURY 10Y',
    price: 98.25,
    quantity: 500000,
    value: 491250,
    executedAt: '2024-03-15 14:25:10',
    status: 'Completed',
    counterparty: 'Citibank',
  },
  { 
    id: 'TR-789029',
    type: 'BUY',
    security: 'EUR/USD',
    price: 1.0925,
    quantity: 2000000,
    value: 2185000,
    executedAt: '2024-03-15 14:15:22',
    status: 'Completed',
    counterparty: 'Deutsche Bank',
  },
  { 
    id: 'TR-789028',
    type: 'SELL',
    security: 'AMZN',
    price: 178.35,
    quantity: 400,
    value: 71340,
    executedAt: '2024-03-15 14:10:55',
    status: 'Completed',
    counterparty: 'Bank of America',
  },
];

const pendingTradesData = [
  { 
    id: 'TR-789035',
    type: 'BUY',
    security: 'NVDA',
    price: 890.50,
    quantity: 200,
    value: 178100,
    submittedAt: '2024-03-15 14:55:12',
    status: 'Pending',
    counterparty: 'Morgan Stanley',
  },
  { 
    id: 'TR-789034',
    type: 'SELL',
    security: 'TSLA',
    price: 175.25,
    quantity: 350,
    value: 61337.5,
    submittedAt: '2024-03-15 14:52:30',
    status: 'Pending',
    counterparty: 'Credit Suisse',
  },
];

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

export default function TradePage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Securities Trading" 
          description="Execute and manage security trades across global markets"
          showBack={true}
        />

        {/* Trading Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Daily Trading Volume</p>
                  <h3 className="text-2xl font-bold mt-1">$12.5M</h3>
                  <p className="text-xs flex items-center text-green-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +8.3% vs yesterday
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Open Orders</p>
                  <h3 className="text-2xl font-bold mt-1">24</h3>
                  <p className="text-xs flex items-center text-amber-600 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    5 pending approval
                  </p>
                </div>
                <div className="bg-amber-100 dark:bg-amber-800/50 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Executed Today</p>
                  <h3 className="text-2xl font-bold mt-1">36</h3>
                  <p className="text-xs flex items-center text-green-600 mt-1">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    All trades settled
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-800/50 p-2 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Trading P&L</p>
                  <h3 className="text-2xl font-bold mt-1">+$345K</h3>
                  <p className="text-xs flex items-center text-green-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +2.1% today
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full">
                  <LineChartIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Trading Interface */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="positions">Positions</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Trading Volume Chart */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Trading Volume</CardTitle>
                      <CardDescription>Trading volume by asset class</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Select defaultValue="1m">
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Period" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1w">1 Week</SelectItem>
                          <SelectItem value="1m">1 Month</SelectItem>
                          <SelectItem value="3m">3 Months</SelectItem>
                          <SelectItem value="1y">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={tradingVolumeData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${(value/1000000).toFixed(2)}M`} />
                        <Legend />
                        <Bar dataKey="equities" name="Equities" fill="#3b82f6" />
                        <Bar dataKey="bonds" name="Fixed Income" fill="#10b981" />
                        <Bar dataKey="derivatives" name="Derivatives" fill="#8b5cf6" />
                        <Bar dataKey="forex" name="Forex" fill="#f59e0b" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Asset Allocation */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Asset Allocation</CardTitle>
                  <CardDescription>Current trading allocation</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={assetAllocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {assetAllocationData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Trades */}
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Recent Trades</CardTitle>
                    <CardDescription>Latest executed trades</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Trade
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Trade ID</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Security</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Quantity</th>
                        <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Value</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Executed At</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentTradesData.map((trade) => (
                        <tr key={trade.id} className="border-b">
                          <td className="p-4 align-middle font-mono text-sm">{trade.id}</td>
                          <td className="p-4 align-middle">
                            <Badge variant={trade.type === 'BUY' ? 'default' : 'destructive'}>
                              {trade.type}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle font-medium">{trade.security}</td>
                          <td className="p-4 align-middle">${trade.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                          <td className="p-4 align-middle">{trade.quantity.toLocaleString()}</td>
                          <td className="p-4 align-middle text-right">${trade.value.toLocaleString()}</td>
                          <td className="p-4 align-middle text-sm text-muted-foreground">{trade.executedAt}</td>
                          <td className="p-4 align-middle">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              {trade.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="ghost" size="sm">
                  <History className="h-4 w-4 mr-2" />
                  View All Trades
                </Button>
                <div className="text-sm text-muted-foreground">
                  Showing 5 of 158 trades
                </div>
              </CardFooter>
            </Card>

            {/* Pending Orders */}
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Pending Orders</CardTitle>
                    <CardDescription>Orders awaiting execution</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Order ID</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Security</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Price</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Quantity</th>
                        <th className="h-10 px-4 text-right align-middle font-medium text-muted-foreground">Value</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Submitted At</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingTradesData.map((trade) => (
                        <tr key={trade.id} className="border-b">
                          <td className="p-4 align-middle font-mono text-sm">{trade.id}</td>
                          <td className="p-4 align-middle">
                            <Badge variant={trade.type === 'BUY' ? 'default' : 'destructive'}>
                              {trade.type}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle font-medium">{trade.security}</td>
                          <td className="p-4 align-middle">${trade.price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                          <td className="p-4 align-middle">{trade.quantity.toLocaleString()}</td>
                          <td className="p-4 align-middle text-right">${trade.value.toLocaleString()}</td>
                          <td className="p-4 align-middle text-sm text-muted-foreground">{trade.submittedAt}</td>
                          <td className="p-4 align-middle">
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              {trade.status}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">Edit</Button>
                              <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">Cancel</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Placeholder content for other tabs */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
                <CardDescription>Manage your open and scheduled orders</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Order management content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="positions">
            <Card>
              <CardHeader>
                <CardTitle>Positions</CardTitle>
                <CardDescription>View your current trading positions</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Position management content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Trading History</CardTitle>
                <CardDescription>View and export your historical trades</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Trading history content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Trading Analytics</CardTitle>
                <CardDescription>Analyze your trading performance</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Trading analytics content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
