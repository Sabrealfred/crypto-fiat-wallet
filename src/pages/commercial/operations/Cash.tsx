
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
  CreditCard
} from "lucide-react";

export default function CashPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Cash management data refreshed successfully");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader
          title="Cash Management"
          description="Monitor, forecast and optimize your organization's cash flow operations"
          showBack={true}
        />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Cash Management Dashboard</h2>
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

        {/* Cash Position Summary */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Total Cash Position</p>
                  <h3 className="text-2xl font-bold mt-2">$12.7M</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +4.2% vs last week
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
                  <p className="text-sm text-muted-foreground">Operating Cash</p>
                  <h3 className="text-2xl font-bold mt-2">$5.3M</h3>
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    -2.8% vs last week
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Strategic Reserves</p>
                  <h3 className="text-2xl font-bold mt-2">$7.4M</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +9.6% vs last week
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Net Cash Flow</p>
                  <h3 className="text-2xl font-bold mt-2">+$1.8M</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +12.3% vs last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cash by Account & Entity */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Cash by Entity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    entity: "Corporate Headquarters", 
                    amount: "$4.2M", 
                    percentage: 33,
                    change: "+2.1%",
                    changeType: "positive"
                  },
                  { 
                    entity: "North America Operations", 
                    amount: "$3.5M", 
                    percentage: 28,
                    change: "+5.3%",
                    changeType: "positive"
                  },
                  { 
                    entity: "European Division", 
                    amount: "$2.8M", 
                    percentage: 22,
                    change: "-1.2%",
                    changeType: "negative"
                  },
                  { 
                    entity: "Asia Pacific", 
                    amount: "$1.4M", 
                    percentage: 11,
                    change: "+8.7%",
                    changeType: "positive"
                  },
                  { 
                    entity: "Latin America", 
                    amount: "$0.8M", 
                    percentage: 6,
                    change: "-3.4%",
                    changeType: "negative"
                  },
                ].map((entity, i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{entity.entity}</div>
                      <div className="text-sm text-muted-foreground">
                        {entity.percentage}% of total
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{entity.amount}</div>
                      <div className={`text-sm ${
                        entity.changeType === "positive" ? "text-green-500" : "text-red-500"
                      }`}>
                        {entity.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Cash by Account Type
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    account: "Operating Accounts", 
                    amount: "$5.3M", 
                    percentage: 42,
                    change: "-2.8%",
                    changeType: "negative"
                  },
                  { 
                    account: "Money Market Funds", 
                    amount: "$3.1M", 
                    percentage: 24,
                    change: "+4.5%",
                    changeType: "positive"
                  },
                  { 
                    account: "Time Deposits", 
                    amount: "$2.2M", 
                    percentage: 17,
                    change: "+3.2%",
                    changeType: "positive"
                  },
                  { 
                    account: "Cash Pooling Accounts", 
                    amount: "$1.5M", 
                    percentage: 12,
                    change: "+10.4%",
                    changeType: "positive"
                  },
                  { 
                    account: "Other Cash Equivalents", 
                    amount: "$0.6M", 
                    percentage: 5,
                    change: "-1.8%",
                    changeType: "negative"
                  },
                ].map((account, i) => (
                  <div key={i} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                    <div>
                      <div className="font-medium">{account.account}</div>
                      <div className="text-sm text-muted-foreground">
                        {account.percentage}% of total
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{account.amount}</div>
                      <div className={`text-sm ${
                        account.changeType === "positive" ? "text-green-500" : "text-red-500"
                      }`}>
                        {account.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cash Management Actions */}
        <Card className="mb-6 border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Cash Management Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="border border-blue-50 dark:border-blue-900">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Cash Forecasting</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Project cash positions based on historical data and scheduled payments.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Run Forecast
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-blue-50 dark:border-blue-900">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Optimize Cash Allocation</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Analyze and recommend optimal cash distribution across accounts.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Recommendations
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-blue-50 dark:border-blue-900">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Cash Pooling</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Manage internal liquidity by consolidating cash balances.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Setup Pooling
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-blue-50 dark:border-blue-900">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Working Capital Management</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Optimize AR/AP processes to improve cash position.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Analysis
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-blue-50 dark:border-blue-900">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Investment Planning</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Plan short-term investments for excess cash to maximize returns.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Investment Options
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-blue-50 dark:border-blue-900">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Currency Management</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Optimize multi-currency positions and manage FX risk.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Manage Currencies
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Recent Cash Movements */}
        <Card className="border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Recent Cash Movements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-4 pb-2 font-medium text-sm">
                <div className="col-span-3">Date</div>
                <div className="col-span-3">Description</div>
                <div className="col-span-2">From</div>
                <div className="col-span-2">To</div>
                <div className="col-span-2 text-right">Amount</div>
              </div>
              
              {[
                { 
                  date: "Mar 16, 2024", 
                  description: "Quarterly Tax Payment", 
                  from: "Operating Account", 
                  to: "External", 
                  amount: "-$1,250,000",
                  amountColor: "text-red-500"
                },
                { 
                  date: "Mar 15, 2024", 
                  description: "Cash Pooling Transfer", 
                  from: "EU Accounts", 
                  to: "Cash Pool", 
                  amount: "+$750,000",
                  amountColor: "text-green-500"
                },
                { 
                  date: "Mar 14, 2024", 
                  description: "Investment Maturity", 
                  from: "Money Market", 
                  to: "Operating", 
                  amount: "+$2,000,000",
                  amountColor: "text-green-500"
                },
                { 
                  date: "Mar 12, 2024", 
                  description: "Vendor Payment", 
                  from: "Operating Account", 
                  to: "External", 
                  amount: "-$430,000",
                  amountColor: "text-red-500"
                },
                { 
                  date: "Mar 10, 2024", 
                  description: "New Investment", 
                  from: "Operating", 
                  to: "Time Deposit", 
                  amount: "-$1,000,000",
                  amountColor: "text-red-500"
                },
              ].map((transaction, i) => (
                <div key={i} className="grid grid-cols-12 gap-4 py-3 border-b text-sm">
                  <div className="col-span-3">{transaction.date}</div>
                  <div className="col-span-3 font-medium">{transaction.description}</div>
                  <div className="col-span-2">{transaction.from}</div>
                  <div className="col-span-2">{transaction.to}</div>
                  <div className={`col-span-2 text-right font-medium ${transaction.amountColor}`}>
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button className="flex items-center gap-2">
            View Cash Management Reports
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
