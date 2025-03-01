
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Building2,
  Landmark,
  CreditCard,
  ArrowRight,
  Calendar,
  BarChart2
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Sample data for cash management
const cashData = {
  balance: 8425000,
  change: 3.2,
  accounts: 12,
  transactions: 1432,
  pendingApprovals: 14,
  incomingWires: 8,
  projectedEOM: 9100000,
  categories: [
    { name: "Operating Expenses", amount: 3200000, percentage: 38 },
    { name: "Payroll", amount: 2500000, percentage: 30 },
    { name: "Investments", amount: 1500000, percentage: 18 },
    { name: "Reserves", amount: 1225000, percentage: 14 }
  ],
  upcomingPayments: [
    { id: "PMT-001", description: "Vendor Payment - Tech Supplies", amount: 124500, due: "Mar 05, 2024" },
    { id: "PMT-002", description: "Quarterly Tax Payment", amount: 345000, due: "Mar 15, 2024" },
    { id: "PMT-003", description: "Office Lease Payment", amount: 78500, due: "Mar 01, 2024" },
    { id: "PMT-004", description: "Utility Bills", amount: 22300, due: "Mar 10, 2024" },
    { id: "PMT-005", description: "Insurance Premium", amount: 45600, due: "Mar 20, 2024" }
  ],
  monthlyCashFlow: [
    { month: "Jan", inflow: 1820000, outflow: 1650000 },
    { month: "Feb", inflow: 1750000, outflow: 1580000 },
    { month: "Mar", inflow: 1900000, outflow: 1700000 },
    { month: "Apr", inflow: 1850000, outflow: 1720000 },
    { month: "May", inflow: 1950000, outflow: 1800000 },
    { month: "Jun", inflow: 2050000, outflow: 1850000 }
  ]
};

export default function CashPage() {
  const navigate = useNavigate();

  // Format currencies
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate percentages for progress bars
  const calculatePercent = (amount: number, total: number) => {
    return Math.round((amount / total) * 100);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Cash Management"
          description="Monitor and manage your organization's cash positions"
          showBack={true}
        />

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Cash Balance</p>
                  <h3 className="text-2xl font-bold mt-1">{formatCurrency(cashData.balance)}</h3>
                  <p className="text-xs flex items-center text-green-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +{cashData.change}% vs last month
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
                  <p className="text-sm text-muted-foreground">Active Accounts</p>
                  <h3 className="text-2xl font-bold mt-1">{cashData.accounts}</h3>
                  <p className="text-xs flex items-center text-muted-foreground mt-1">
                    Across {cashData.accounts} banks
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-800/50 p-2 rounded-full">
                  <Building2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Approvals</p>
                  <h3 className="text-2xl font-bold mt-1">{cashData.pendingApprovals}</h3>
                  <p className="text-xs flex items-center text-amber-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    {cashData.incomingWires} incoming wires
                  </p>
                </div>
                <div className="bg-amber-100 dark:bg-amber-800/50 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Projected EOM Balance</p>
                  <h3 className="text-2xl font-bold mt-1">{formatCurrency(cashData.projectedEOM)}</h3>
                  <p className="text-xs flex items-center text-green-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +{Math.round((cashData.projectedEOM - cashData.balance) / cashData.balance * 100)}% growth
                  </p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-800/50 p-2 rounded-full">
                  <Landmark className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="accounts">Accounts</TabsTrigger>
            <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-4">
              {/* Cash Allocation */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-muted-foreground" />
                    Cash Allocation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cashData.categories.map((category) => (
                      <div key={category.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{category.name}</span>
                          <span className="text-sm text-muted-foreground">
                            {formatCurrency(category.amount)} ({category.percentage}%)
                          </span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    View Detailed Breakdown
                  </Button>
                </CardContent>
              </Card>

              {/* Upcoming Payments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    Upcoming Payments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {cashData.upcomingPayments.slice(0, 4).map((payment) => (
                      <div key={payment.id} className="flex justify-between items-center p-2 border rounded-md">
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-xs text-muted-foreground">Due: {payment.due}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                          <p className="text-xs font-mono text-muted-foreground">{payment.id}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full mt-4 text-sm">
                    View All Scheduled Payments
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="flex-col h-auto py-4 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800"
                onClick={() => navigate("/commercial/operations/accounts")}
              >
                <Building2 className="h-5 w-5 mb-2" />
                <span>View Accounts</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-col h-auto py-4 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                onClick={() => navigate("/commercial/payment-processor/new-payment")}
              >
                <ArrowRight className="h-5 w-5 mb-2" />
                <span>Make Payment</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-col h-auto py-4 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
                onClick={() => navigate("/commercial/treasury/cash-flow")}
              >
                <BarChart2 className="h-5 w-5 mb-2" />
                <span>Cash Flow Analysis</span>
              </Button>
              <Button 
                variant="outline" 
                className="flex-col h-auto py-4 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800"
                onClick={() => navigate("/commercial/operations/reports")}
              >
                <DollarSign className="h-5 w-5 mb-2" />
                <span>Cash Reports</span>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="accounts">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Detailed account information will appear here.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => navigate("/commercial/operations/accounts")}
                >
                  Go to Account Management
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecasting">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Cash forecasting tools and projections will appear here.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => navigate("/commercial/analytics/predictive")}
                >
                  View Forecasting Tools
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardContent className="pt-6">
                <p className="text-muted-foreground">
                  Cash management reports and analytics will appear here.
                </p>
                <Button
                  className="mt-4"
                  onClick={() => navigate("/commercial/operations/reports")}
                >
                  View All Reports
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
