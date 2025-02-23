
import { AppLayout } from "@/components/layout/app-layout";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { BalanceCard } from "@/components/BalanceCard";
import { QuickActions } from "@/components/QuickActions";
import { TransactionHistory } from "@/components/TransactionHistory";
import { NotificationsList } from "@/components/dashboard/NotificationsList";

export default function PersonalDashboard() {
  const balanceData = {
    total: 45820.75,
    change: 2.5,
    fiat: 32150.25,
    crypto: 13670.50
  };

  const notifications = [
    {
      id: 1,
      title: "Payment Received",
      description: "You received $1,500 from John Doe",
      time: "Just now",
      type: "income",
      amount: 1500
    },
    {
      id: 2,
      title: "Bill Due",
      description: "Water bill payment due in 3 days",
      time: "15m ago",
      type: "bill",
      amount: 85
    },
    {
      id: 3,
      title: "Spending Alert",
      description: "You've spent more than $5,000 this month",
      time: "6h ago",
      type: "alert",
      amount: 5000
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <WelcomeHeader />
        
        <div className="grid gap-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <BalanceCard {...balanceData} />
            </div>
            <div>
              <NotificationsList notifications={notifications} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <QuickActions />
            <TransactionHistory />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
