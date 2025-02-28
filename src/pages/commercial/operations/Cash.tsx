import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  DollarSign, 
  ChevronUp, 
  ChevronDown, 
  Calendar, 
  Download, 
  Globe,
  ArrowDownRight,
  ArrowUpRight,
  PlusCircle,
  Ban,
  RefreshCcw,
  AlertTriangle,
  CircleDollarSign,
  ArrowRight,
  Clock as LucideClock
} from "lucide-react";
import { useState } from "react";

// Mock data for cash flow
const cashFlowData = [
  { month: 'Jan', inflows: 150000, outflows: 130000, netPosition: 20000 },
  { month: 'Feb', inflows: 180000, outflows: 120000, netPosition: 60000 },
  { month: 'Mar', inflows: 170000, outflows: 160000, netPosition: 10000 },
  { month: 'Apr', inflows: 190000, outflows: 155000, netPosition: 35000 },
  { month: 'May', inflows: 205000, outflows: 175000, netPosition: 30000 },
  { month: 'Jun', inflows: 220000, outflows: 190000, netPosition: 30000 },
  { month: 'Jul', inflows: 190000, outflows: 205000, netPosition: -15000 },
  { month: 'Aug', inflows: 215000, outflows: 195000, netPosition: 20000 },
  { month: 'Sep', inflows: 230000, outflows: 200000, netPosition: 30000 },
  { month: 'Oct', inflows: 240000, outflows: 210000, netPosition: 30000 },
  { month: 'Nov', inflows: 245000, outflows: 215000, netPosition: 30000 },
];

// Mock data for cash positions
const cashPositionsData = [
  { name: 'Operating Accounts', value: 3250000 },
  { name: 'Money Market', value: 1750000 },
  { name: 'Short-term CDs', value: 1500000 },
  { name: 'Treasury Bills', value: 750000 },
];

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

// Mock data for bank accounts
const accountsData = [
  { 
    id: 1, 
    bankName: "First National Bank", 
    accountType: "Operating", 
    accountNumber: "****5678", 
    currency: "USD", 
    balance: "$1,245,780.25", 
    lastUpdated: "Today, 10:45 AM"
  },
  { 
    id: 2, 
    bankName: "Global Finance", 
    accountType: "Operating", 
    accountNumber: "****2345", 
    currency: "USD", 
    balance: "$895,421.50", 
    lastUpdated: "Today, 10:45 AM"
  },
  { 
    id: 3, 
    bankName: "Commerce Bank", 
    accountType: "Money Market", 
    accountNumber: "****9012", 
    currency: "USD", 
    balance: "$1,750,000.00", 
    lastUpdated: "Today, 10:45 AM"
  },
  { 
    id: 4, 
    bankName: "First National Bank", 
    accountType: "Operating", 
    accountNumber: "****3456", 
    currency: "EUR", 
    balance: "€845,325.75", 
    lastUpdated: "Today, 10:45 AM"
  },
  { 
    id: 5, 
    bankName: "Pacific Financial", 
    accountType: "Operating", 
    accountNumber: "****7890", 
    currency: "USD", 
    balance: "$245,650.80", 
    lastUpdated: "Today, 10:45 AM"
  },
];

// Mock data for cash concentration
const concentrationData = [
  { month: '1-Sep', target: 5000000, actual: 4800000 },
  { month: '8-Sep', target: 5000000, actual: 5100000 },
  { month: '15-Sep', target: 5000000, actual: 5200000 },
  { month: '22-Sep', target: 5000000, actual: 4900000 },
  { month: '29-Sep', target: 5000000, actual: 5050000 },
  { month: '6-Oct', target: 5000000, actual: 5300000 },
  { month: '13-Oct', target: 5000000, actual: 5450000 },
  { month: '20-Oct', target: 5000000, actual: 5150000 },
  { month: '27-Oct', target: 5000000, actual: 5250000 },
  { month: '3-Nov', target: 5000000, actual: 5500000 },
  { month: '10-Nov', target: 5000000, actual: 5600000 },
];

export default function CashPage() {
  const [timeframe, setTimeframe] = useState("3m");
  const [targetBank, setTargetBank] = useState("all");
  
  // Calculate summary metrics
  const currentMonthData = cashFlowData[cashFlowData.length - 1];
  const previousMonthData = cashFlowData[cashFlowData.length - 2];
  const inflowsChange = ((currentMonthData.inflows - previousMonthData.inflows) / previousMonthData.inflows) * 100;
  const outflowsChange = ((currentMonthData.outflows - previousMonthData.outflows) / previousMonthData.outflows) * 100;
  
  // Total cash position
  const totalCashPosition = cashPositionsData.reduce((sum, item) => sum + item.value, 0);

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Cash Management" 
          description="Optimize cash positions and manage cash flow across the enterprise"
          showBack={true}
        />

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Cash Position</p>
                  <h3 className="text-2xl font-bold mt-1">${(totalCashPosition / 1000000).toFixed(2)}M</h3>
                  <p className="text-xs flex items-center text-green-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +2.3% vs last month
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Inflows</p>
                  <h3 className="text-2xl font-bold mt-1">${currentMonthData.inflows.toLocaleString()}</h3>
                  <p className={`text-xs flex items-center ${inflowsChange >= 0 ? 'text-green-600' : 'text-red-600'} mt-1`}>
                    {inflowsChange >= 0 ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(inflowsChange).toFixed(1)}% vs last month
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-800/50 p-2 rounded-full">
                  <ChevronUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Outflows</p>
                  <h3 className="text-2xl font-bold mt-1">${currentMonthData.outflows.toLocaleString()}</h3>
                  <p className={`text-xs flex items-center ${outflowsChange <= 0 ? 'text-green-600' : 'text-red-600'} mt-1`}>
                    {outflowsChange <= 0 ? (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(outflowsChange).toFixed(1)}% vs last month
                  </p>
                </div>
                <div className="bg-amber-100 dark:bg-amber-800/50 p-2 rounded-full">
                  <ChevronDown className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Net Position</p>
                  <h3 className="text-2xl font-bold mt-1">${currentMonthData.netPosition.toLocaleString()}</h3>
                  <p className={`text-xs flex items-center ${Number(currentMonthData.netPosition) >= Number(previousMonthData.netPosition) ? 'text-green-600' : 'text-red-600'} mt-1`}>
                    {Number(currentMonthData.netPosition) >= Number(previousMonthData.netPosition) ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(Number(currentMonthData.netPosition) - Number(previousMonthData.netPosition)).toLocaleString()} change
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full">
                  <Ban className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="cash-flow" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
            <TabsTrigger value="positions">Cash Positions</TabsTrigger>
            <TabsTrigger value="accounts">Bank Accounts</TabsTrigger>
            <TabsTrigger value="concentration">Cash Concentration</TabsTrigger>
          </TabsList>
          
          {/* Cash Flow Tab */}
          <TabsContent value="cash-flow">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Cash Flow Analysis</CardTitle>
                  <CardDescription>Monitor inflows and outflows over time</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1m">1 Month</SelectItem>
                      <SelectItem value="3m">3 Months</SelectItem>
                      <SelectItem value="6m">6 Months</SelectItem>
                      <SelectItem value="1y">1 Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={cashFlowData}
                      margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <defs>
                        <linearGradient id="inflows" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1} />
                        </linearGradient>
                        <linearGradient id="outflows" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="inflows"
                        stroke="#10b981"
                        fillOpacity={1}
                        fill="url(#inflows)"
                        name="Cash Inflows"
                      />
                      <Area
                        type="monotone"
                        dataKey="outflows"
                        stroke="#f59e0b"
                        fillOpacity={1}
                        fill="url(#outflows)"
                        name="Cash Outflows"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-sm font-semibold mb-4">Net Cash Position</h4>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={cashFlowData}
                        margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        <Legend />
                        <Bar 
                          dataKey="netPosition" 
                          name="Net Position"
                          fill="#3b82f6"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Cash Positions Tab */}
          <TabsContent value="positions">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Cash Positions</CardTitle>
                  <CardDescription>Distribution of cash across account types</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="flex items-center justify-center">
                    <div className="h-[300px] w-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={cashPositionsData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {cashPositionsData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `$${(value / 1000000).toFixed(2)}M`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Cash Position Breakdown</h4>
                    <div className="space-y-5">
                      {cashPositionsData.map((item, index) => (
                        <div key={item.name}>
                          <div className="flex justify-between items-center mb-1">
                            <div className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-2" 
                                style={{ backgroundColor: COLORS[index % COLORS.length] }}
                              />
                              <span>{item.name}</span>
                            </div>
                            <span className="font-semibold">${(item.value / 1000000).toFixed(2)}M</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full" 
                              style={{ 
                                width: `${(item.value / totalCashPosition) * 100}%`,
                                backgroundColor: COLORS[index % COLORS.length]
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-8 space-y-4">
                      <h4 className="text-sm font-semibold">Quick Actions</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <Button variant="outline" className="justify-start">
                          <PlusCircle className="h-4 w-4 mr-2" />
                          New Allocation
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Globe className="h-4 w-4 mr-2" />
                          FX Management
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <CircleDollarSign className="h-4 w-4 mr-2" />
                          Yield Analysis
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <Calendar className="h-4 w-4 mr-2" />
                          Maturity Schedule
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Bank Accounts Tab */}
          <TabsContent value="accounts">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Bank Accounts</CardTitle>
                  <CardDescription>View and manage all bank accounts</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCcw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button size="sm">
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add Account
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Bank</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Account Type</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Account Number</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Currency</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Balance</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Last Updated</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {accountsData.map((account) => (
                        <tr key={account.id} className="border-b">
                          <td className="p-4 align-middle">{account.bankName}</td>
                          <td className="p-4 align-middle">{account.accountType}</td>
                          <td className="p-4 align-middle font-mono text-xs">{account.accountNumber}</td>
                          <td className="p-4 align-middle">{account.currency}</td>
                          <td className="p-4 align-middle font-semibold">{account.balance}</td>
                          <td className="p-4 align-middle text-xs text-muted-foreground">{account.lastUpdated}</td>
                          <td className="p-4 align-middle">
                            <Button variant="ghost" size="sm">
                              <ArrowRight className="h-4 w-4" />
                              <span className="sr-only">Details</span>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                    <p className="text-sm text-muted-foreground">
                      Some accounts may not show real-time balances due to bank processing delays.
                    </p>
                  </div>
                  <Button variant="outline" size="sm">View All Accounts</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Cash Concentration Tab */}
          <TabsContent value="concentration">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>Cash Concentration</CardTitle>
                  <CardDescription>Monitor cash pooling and target balances</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select value={targetBank} onValueChange={setTargetBank}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Banks" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Banks</SelectItem>
                      <SelectItem value="fnb">First National Bank</SelectItem>
                      <SelectItem value="global">Global Finance</SelectItem>
                      <SelectItem value="commerce">Commerce Bank</SelectItem>
                      <SelectItem value="pacific">Pacific Financial</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={concentrationData}
                      margin={{ top: 20, right: 30, left: 30, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="target"
                        stroke="#f59e0b"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Target Balance"
                      />
                      <Line
                        type="monotone"
                        dataKey="actual"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        name="Actual Balance"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-sm font-semibold mb-4">Cash Concentration Settings</h4>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border-dashed">
                      <CardContent className="pt-6">
                        <h5 className="text-sm font-medium mb-2">Target Balance</h5>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xl font-bold">$5,000,000</span>
                        </div>
                        <Button variant="ghost" size="sm" className="mt-2 w-full">
                          Adjust Target
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-dashed">
                      <CardContent className="pt-6">
                        <h5 className="text-sm font-medium mb-2">Sweep Frequency</h5>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xl font-bold">Daily</span>
                        </div>
                        <Button variant="ghost" size="sm" className="mt-2 w-full">
                          Change Frequency
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-dashed">
                      <CardContent className="pt-6">
                        <h5 className="text-sm font-medium mb-2">Auto-Transfer</h5>
                        <div className="flex items-center gap-2">
                          <div className="bg-green-100 dark:bg-green-800/50 px-2 py-1 rounded text-green-600 dark:text-green-400 text-sm font-medium">
                            Enabled
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="mt-2 w-full">
                          Configure
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-dashed">
                      <CardContent className="pt-6">
                        <h5 className="text-sm font-medium mb-2">Last Sweep</h5>
                        <div className="flex items-center gap-2">
                          <LucideClock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xl font-bold">Today, 08:00</span>
                        </div>
                        <Button variant="ghost" size="sm" className="mt-2 w-full">
                          View History
                        </Button>
                      </CardContent>
                    </Card>
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
