import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/layout/app-layout";
import { Wallet, ArrowUpRight, ArrowDownRight, History } from "lucide-react";

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
          <p className="text-muted-foreground">Manage your wallets and transactions</p>
        </div>

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
      </div>
    </AppLayout>
  );
}
