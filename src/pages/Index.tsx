
import { AppLayout } from "@/components/layout/app-layout";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { BalanceCard } from "@/components/BalanceCard";
import { QuickActions } from "@/components/QuickActions";
import { TransactionHistory } from "@/components/TransactionHistory";
import { NotificationsList } from "@/components/dashboard/NotificationsList";

export default function PersonalDashboard() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <WelcomeHeader />
        
        <div className="grid gap-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <BalanceCard />
            </div>
            <div>
              <NotificationsList />
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
