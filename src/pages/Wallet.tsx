
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/app-layout";
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  History,
  CreditCard,
  Banknote,
  TrendingUp,
  Home,
  Building,
  Star 
} from "lucide-react";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";

export default function WalletPage() {
  const wallets = [
    {
      id: 1,
      type: "Main Wallet",
      balance: 81910.00,
      currency: "USD",
      lastTransaction: "2 hours ago",
      monthlyChange: 12.81
    },
    {
      id: 2,
      type: "Savings",
      balance: 25350.50,
      currency: "USD",
      lastTransaction: "1 day ago",
      monthlyChange: 5.23
    },
    {
      id: 3,
      type: "Investment",
      balance: 142680.75,
      currency: "USD",
      lastTransaction: "3 days ago",
      monthlyChange: 8.45
    }
  ];

  const loans = [
    {
      id: 1,
      type: "Personal Loan",
      amount: 25000,
      remainingBalance: 18500,
      interestRate: "12.5%",
      monthlyPayment: 750,
      nextPayment: "2024-03-15"
    },
    {
      id: 2,
      type: "Auto Loan",
      amount: 35000,
      remainingBalance: 28000,
      interestRate: "8.9%",
      monthlyPayment: 650,
      nextPayment: "2024-03-20"
    }
  ];

  const investments = [
    {
      id: 1,
      type: "Investment Account",
      portfolio: "Growth",
      balance: 75000,
      returns: "+15.8%",
      allocation: {
        stocks: "70%",
        bonds: "20%",
        cash: "10%"
      }
    },
    {
      id: 2,
      type: "Retirement Account",
      portfolio: "Conservative",
      balance: 150000,
      returns: "+8.2%",
      allocation: {
        stocks: "40%",
        bonds: "50%",
        cash: "10%"
      }
    }
  ];

  const mortgages = [
    {
      id: 1,
      type: "Fixed Rate Mortgage",
      propertyAddress: "123 Main St, City",
      originalAmount: 350000,
      remainingBalance: 285000,
      interestRate: "4.5%",
      monthlyPayment: 1800,
      nextPayment: "2024-03-01"
    }
  ];

  const recentTransactions = [
    {
      id: 1,
      type: "Received",
      amount: 1250.00,
      from: "John Doe",
      date: "Today, 14:35",
      status: "completed"
    },
    {
      id: 2,
      type: "Sent",
      amount: -850.00,
      to: "Sarah Smith",
      date: "Today, 12:20",
      status: "completed"
    },
    {
      id: 3,
      type: "Received",
      amount: 3200.00,
      from: "PayPal",
      date: "Yesterday",
      status: "completed"
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">My Wallets</h1>
          <p className="text-muted-foreground">Manage your wallets and financial products</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 gap-4 bg-muted p-1">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="loans">Loans</TabsTrigger>
            <TabsTrigger value="investments">Investments</TabsTrigger>
            <TabsTrigger value="mortgages">Mortgages</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {wallets.map((wallet) => (
                <div key={wallet.id} className="p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold">{wallet.type}</h3>
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-2xl font-bold mb-1">
                    ${wallet.balance.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">
                    Last transaction {wallet.lastTransaction}
                  </p>
                  <p className="text-sm text-green-600">
                    ↑ {wallet.monthlyChange}% this month
                  </p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Quick Actions</h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button className="h-auto py-4" variant="outline">
                    <ArrowUpRight className="h-5 w-5 mr-2" />
                    Send Money
                  </Button>
                  <Button className="h-auto py-4" variant="outline">
                    <ArrowDownRight className="h-5 w-5 mr-2" />
                    Request Money
                  </Button>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-semibold">Recent Transactions</h2>
                  <Button variant="ghost" size="sm">
                    <History className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">
                          {transaction.type === "Received" ? `From ${transaction.from}` : `To ${transaction.to}`}
                        </p>
                        <p className="text-sm text-muted-foreground">{transaction.date}</p>
                      </div>
                      <span className={`font-medium ${
                        transaction.type === "Received" ? "text-green-600" : "text-red-500"
                      }`}>
                        {transaction.type === "Received" ? "+" : "-"}${Math.abs(transaction.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="loans" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {loans.map((loan) => (
                <div key={loan.id} className="p-6 rounded-xl bg-white/70 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{loan.type}</h3>
                      <p className="text-muted-foreground">Original Amount: ${loan.amount.toLocaleString()}</p>
                    </div>
                    <Banknote className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Remaining Balance</p>
                      <p className="text-2xl font-bold">${loan.remainingBalance.toLocaleString()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Interest Rate</p>
                        <p className="font-medium">{loan.interestRate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Payment</p>
                        <p className="font-medium">${loan.monthlyPayment}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Next Payment Due</p>
                      <p className="font-medium">{new Date(loan.nextPayment).toLocaleDateString()}</p>
                    </div>
                    <Button className="w-full">Make Payment</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="investments" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {investments.map((investment) => (
                <div key={investment.id} className="p-6 rounded-xl bg-white/70 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{investment.type}</h3>
                      <p className="text-muted-foreground">{investment.portfolio} Portfolio</p>
                    </div>
                    <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Balance</p>
                      <p className="text-2xl font-bold">${investment.balance.toLocaleString()}</p>
                      <p className="text-green-600">{investment.returns} YTD</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Asset Allocation</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-muted/50 p-2 rounded">
                          <p className="text-sm text-muted-foreground">Stocks</p>
                          <p className="font-medium">{investment.allocation.stocks}</p>
                        </div>
                        <div className="bg-muted/50 p-2 rounded">
                          <p className="text-sm text-muted-foreground">Bonds</p>
                          <p className="font-medium">{investment.allocation.bonds}</p>
                        </div>
                        <div className="bg-muted/50 p-2 rounded">
                          <p className="text-sm text-muted-foreground">Cash</p>
                          <p className="font-medium">{investment.allocation.cash}</p>
                        </div>
                      </div>
                    </div>
                    <Button className="w-full">View Details</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mortgages" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {mortgages.map((mortgage) => (
                <div key={mortgage.id} className="p-6 rounded-xl bg-white/70 backdrop-blur-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold">{mortgage.type}</h3>
                      <p className="text-muted-foreground">{mortgage.propertyAddress}</p>
                    </div>
                    <Home className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Original Amount</p>
                      <p className="text-2xl font-bold">${mortgage.originalAmount.toLocaleString()}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Remaining Balance</p>
                        <p className="font-medium">${mortgage.remainingBalance.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Interest Rate</p>
                        <p className="font-medium">{mortgage.interestRate}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Monthly Payment</p>
                        <p className="font-medium">${mortgage.monthlyPayment}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next Payment</p>
                        <p className="font-medium">{new Date(mortgage.nextPayment).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <Button className="w-full">Make Payment</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div className="p-6 rounded-xl bg-white/70 backdrop-blur-sm shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">All Transactions</h2>
                <Button variant="outline" size="sm">
                  <History className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium">
                        {transaction.type === "Received" ? `From ${transaction.from}` : `To ${transaction.to}`}
                      </p>
                      <p className="text-sm text-muted-foreground">{transaction.date}</p>
                    </div>
                    <div className="text-right">
                      <span className={`font-medium ${
                        transaction.type === "Received" ? "text-green-600" : "text-red-500"
                      }`}>
                        {transaction.type === "Received" ? "+" : "-"}${Math.abs(transaction.amount).toLocaleString()}
                      </span>
                      <p className="text-sm text-muted-foreground">{transaction.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
