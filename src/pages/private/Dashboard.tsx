import { AppLayout } from "@/components/layout/app-layout";
import { WealthManagement } from "@/components/private/WealthManagement";
import { StatisticsCards } from "@/components/dashboard/StatisticsCards";
import { StatisticsChart } from "@/components/dashboard/StatisticsChart";
import { NotificationsList } from "@/components/dashboard/NotificationsList";

export default function PrivateBankingDashboard() {
  const monthlyData = [
    { month: "September", earning: 5820000, spending: 980000 },
    { month: "October", earning: 5950000, spending: 1010000 },
    { month: "November", earning: 6210000, spending: 1030000 },
    { month: "December", earning: 6450000, spending: 1039200 },
    { month: "January", earning: 6680000, spending: 1045000 },
    { month: "February", earning: 6910000, spending: 1060000 },
  ];

  const currentEarning = monthlyData[monthlyData.length - 1].earning;
  const previousEarning = monthlyData[monthlyData.length - 2].earning;
  const currentSpending = monthlyData[monthlyData.length - 1].spending;
  const previousSpending = monthlyData[monthlyData.length - 2].spending;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Private Banking Portal</h1>
          <p className="text-muted-foreground">
            Welcome to your exclusive private banking experience
          </p>
        </div>

        <div className="grid gap-6">
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <StatisticsCards 
                currentEarning={currentEarning}
                previousEarning={previousEarning}
                currentSpending={currentSpending}
                previousSpending={previousSpending}
              />
            </div>
            <div>
              <NotificationsList notifications={[]} />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <StatisticsChart monthlyData={monthlyData} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4">Latest Transactions</h2>
              {/* Add TransactionList component here */}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Wealth Management Services</h2>
            <WealthManagement />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
