
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
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
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Search,
  Filter,
  Plus,
  DollarSign,
  Calendar,
  Building2,
  FileText,
  Landmark, // Changed from Bank to Landmark which is available in lucide-react
  ArrowRightLeft,
  RefreshCw,
  Share2,
  ChevronDown,
  Clock,
  AlertCircle
} from "lucide-react";

// Sample cash position data
const cashPositionsData = [
  { 
    account: 'Main Operating Account',
    bank: 'Chase Bank',
    accountNumber: '****1234',
    balance: 2850000,
    currency: 'USD',
    type: 'Checking',
    lastUpdated: '2024-03-15 08:30 AM'
  },
  { 
    account: 'Payroll Account',
    bank: 'Wells Fargo',
    accountNumber: '****5678',
    balance: 750000,
    currency: 'USD',
    type: 'Checking',
    lastUpdated: '2024-03-15 08:45 AM'
  },
  { 
    account: 'International Operations',
    bank: 'Citibank',
    accountNumber: '****9012',
    balance: 1250000,
    currency: 'EUR',
    type: 'Business',
    lastUpdated: '2024-03-15 02:30 AM'
  },
  { 
    account: 'Tax Reserve',
    bank: 'Bank of America',
    accountNumber: '****3456',
    balance: 950000,
    currency: 'USD',
    type: 'Savings',
    lastUpdated: '2024-03-14 06:15 PM'
  },
  { 
    account: 'Strategic Investment',
    bank: 'Goldman Sachs',
    accountNumber: '****7890',
    balance: 3500000,
    currency: 'USD',
    type: 'Investment',
    lastUpdated: '2024-03-14 04:30 PM'
  },
];

// Sample cash flow forecast data
const cashFlowForecastData = [
  { month: 'Apr', inflows: 4500000, outflows: 3800000 },
  { month: 'May', inflows: 4200000, outflows: 4000000 },
  { month: 'Jun', inflows: 4800000, outflows: 4100000 },
  { month: 'Jul', inflows: 5100000, outflows: 4300000 },
  { month: 'Aug', inflows: 5400000, outflows: 4500000 },
  { month: 'Sep', inflows: 5200000, outflows: 4700000 },
];

// Sample cash allocation data
const cashAllocationData = [
  { name: 'Operating', value: 45 },
  { name: 'Strategic Reserve', value: 25 },
  { name: 'Tax', value: 15 },
  { name: 'Investment', value: 15 },
];

// Sample recent transactions
const recentTransactionsData = [
  {
    id: 'TRX-001234',
    date: '2024-03-15',
    description: 'Vendor Payment - Tech Supplies Inc',
    amount: -125000,
    account: 'Main Operating Account',
    category: 'Expenses',
    status: 'Completed'
  },
  {
    id: 'TRX-001233',
    date: '2024-03-15',
    description: 'Customer Payment - ABC Corporation',
    amount: 350000,
    account: 'Main Operating Account',
    category: 'Income',
    status: 'Completed'
  },
  {
    id: 'TRX-001232',
    date: '2024-03-14',
    description: 'Payroll Processing',
    amount: -420000,
    account: 'Payroll Account',
    category: 'Payroll',
    status: 'Completed'
  },
  {
    id: 'TRX-001231',
    date: '2024-03-14',
    description: 'Utilities Payment',
    amount: -35000,
    account: 'Main Operating Account',
    category: 'Expenses',
    status: 'Completed'
  },
  {
    id: 'TRX-001230',
    date: '2024-03-13',
    description: 'Customer Payment - XYZ Ltd',
    amount: 280000,
    account: 'Main Operating Account',
    category: 'Income',
    status: 'Completed'
  },
];

// Sample upcoming payments
const upcomingPaymentsData = [
  {
    id: 'PAY-00789',
    date: '2024-03-18',
    description: 'Office Rent',
    amount: 85000,
    account: 'Main Operating Account',
    category: 'Rent',
    status: 'Scheduled'
  },
  {
    id: 'PAY-00788',
    date: '2024-03-20',
    description: 'Software Licenses',
    amount: 45000,
    account: 'Main Operating Account',
    category: 'Software',
    status: 'Scheduled'
  },
  {
    id: 'PAY-00787',
    date: '2024-03-25',
    description: 'Quarterly Insurance Premium',
    amount: 120000,
    account: 'Main Operating Account',
    category: 'Insurance',
    status: 'Scheduled'
  },
];

const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

export default function CashManagementPage() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('all');

  // Calculate total cash position
  const totalCashPosition = cashPositionsData.reduce((sum, account) => sum + account.balance, 0);
  
  // Calculate net position (last 30 days)
  const totalInflows = recentTransactionsData
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalOutflows = recentTransactionsData
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0); // Fixed the type issue with Number()
  
  const netPosition = totalInflows - totalOutflows;
  
  // Filter transactions based on search term and selected account
  const filteredTransactions = recentTransactionsData.filter(transaction => {
    const matchesSearch = searchTerm === '' || 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAccount = selectedAccount === 'all' || 
      transaction.account === selectedAccount;
    
    return matchesSearch && matchesAccount;
  });

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Cash Management"
          description="Monitor and manage cash positions across all accounts"
          showBack={true}
        />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-blue-100 dark:border-blue-900">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Cash Position</p>
                  <h3 className="text-2xl font-bold mt-1">${(totalCashPosition / 1000000).toFixed(2)}M</h3>
                  <p className="text-xs flex items-center text-green-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +5.2% vs last month
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-900">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Net Position (30 days)</p>
                  <h3 className="text-2xl font-bold mt-1">${(netPosition / 1000).toFixed(0)}K</h3>
                  <p className="text-xs flex items-center text-green-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    Positive cash flow
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <ArrowRightLeft className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-900">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Payments (7 days)</p>
                  <h3 className="text-2xl font-bold mt-1">${(upcomingPaymentsData.reduce((sum, payment) => sum + payment.amount, 0) / 1000).toFixed(0)}K</h3>
                  <p className="text-xs flex items-center text-amber-600 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    {upcomingPaymentsData.length} payments due
                  </p>
                </div>
                <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-full">
                  <Calendar className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="forecast">Forecasting</TabsTrigger>
          </TabsList>
          
          {/* Dashboard Tab */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Cash Flow Chart */}
              <Card className="lg:col-span-2 border-blue-100 dark:border-blue-900">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>Cash Flow Forecast</CardTitle>
                      <CardDescription>6-month forecast of inflows and outflows</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={cashFlowForecastData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip formatter={(value) => `$${(value/1000000).toFixed(2)}M`} />
                        <Legend />
                        <Bar dataKey="inflows" name="Inflows" fill="#3b82f6" />
                        <Bar dataKey="outflows" name="Outflows" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Cash Allocation */}
              <Card className="border-blue-100 dark:border-blue-900">
                <CardHeader>
                  <CardTitle>Cash Allocation</CardTitle>
                  <CardDescription>Current cash allocation by purpose</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={cashAllocationData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                        >
                          {cashAllocationData.map((entry, index) => (
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

            {/* Upcoming Payments */}
            <Card className="mt-6 border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Upcoming Payments</CardTitle>
                    <CardDescription>Scheduled payments for the next 7 days</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule Payment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="h-10 px-4 text-left align-middle font-medium">Date</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Description</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Account</th>
                        <th className="h-10 px-4 text-right align-middle font-medium">Amount</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Category</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingPaymentsData.map((payment) => (
                        <tr key={payment.id} className="border-b">
                          <td className="p-4 align-middle">{payment.date}</td>
                          <td className="p-4 align-middle font-medium">{payment.description}</td>
                          <td className="p-4 align-middle">{payment.account}</td>
                          <td className="p-4 align-middle text-right text-red-500">
                            -${payment.amount.toLocaleString()}
                          </td>
                          <td className="p-4 align-middle">
                            <Badge variant="outline">{payment.category}</Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge className="bg-amber-100 text-amber-800 border-amber-200">
                              {payment.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Accounts Tab */}
          <TabsContent value="accounts">
            <Card className="border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Cash Accounts</CardTitle>
                    <CardDescription>All active cash accounts across banks</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Account
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="h-10 px-4 text-left align-middle font-medium">Account Name</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Bank</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Account Number</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Type</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Currency</th>
                        <th className="h-10 px-4 text-right align-middle font-medium">Balance</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Last Updated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cashPositionsData.map((account, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-4 align-middle font-medium">{account.account}</td>
                          <td className="p-4 align-middle">{account.bank}</td>
                          <td className="p-4 align-middle">{account.accountNumber}</td>
                          <td className="p-4 align-middle">{account.type}</td>
                          <td className="p-4 align-middle">{account.currency}</td>
                          <td className="p-4 align-middle text-right">
                            ${account.balance.toLocaleString()}
                          </td>
                          <td className="p-4 align-middle text-sm text-muted-foreground">
                            {account.lastUpdated}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Transactions Tab */}
          <TabsContent value="transactions">
            <Card className="border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>All cash movements across accounts</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      New Transaction
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search transactions..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={selectedAccount} onValueChange={setSelectedAccount}>
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="Select Account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Accounts</SelectItem>
                      {cashPositionsData.map((account, index) => (
                        <SelectItem key={index} value={account.account}>
                          {account.account}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="h-10 px-4 text-left align-middle font-medium">Date</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">ID</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Description</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Account</th>
                        <th className="h-10 px-4 text-right align-middle font-medium">Amount</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Category</th>
                        <th className="h-10 px-4 text-left align-middle font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b">
                          <td className="p-4 align-middle">{transaction.date}</td>
                          <td className="p-4 align-middle font-mono text-sm">{transaction.id}</td>
                          <td className="p-4 align-middle font-medium">{transaction.description}</td>
                          <td className="p-4 align-middle">{transaction.account}</td>
                          <td className={`p-4 align-middle text-right ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                            {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}
                          </td>
                          <td className="p-4 align-middle">
                            <Badge variant="outline">{transaction.category}</Badge>
                          </td>
                          <td className="p-4 align-middle">
                            <Badge className="bg-green-100 text-green-800 border-green-200">
                              {transaction.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {filteredTransactions.length === 0 && (
                  <div className="text-center py-8">
                    <AlertCircle className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No transactions found matching your criteria</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Forecasting Tab */}
          <TabsContent value="forecast">
            <Card className="border-blue-100 dark:border-blue-900">
              <CardHeader>
                <CardTitle>Cash Flow Forecasting</CardTitle>
                <CardDescription>Predict future cash positions and plan accordingly</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">
                  Cash flow forecasting content will be available soon.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
