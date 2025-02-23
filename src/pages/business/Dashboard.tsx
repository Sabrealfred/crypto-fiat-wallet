
import { AppLayout } from "@/components/layout/app-layout";
import { StatisticsCards } from "@/components/dashboard/StatisticsCards";
import { StatisticsChart } from "@/components/dashboard/StatisticsChart";
import { BusinessMetrics } from "./components/BusinessMetrics";
import { QuickActions } from "./components/QuickActions";

export default function BusinessDashboard() {
  const monthlyData = [
    { month: "September", earning: 182000, spending: 48000 },
    { month: "October", earning: 195000, spending: 51000 },
    { month: "November", earning: 201000, spending: 53000 },
    { month: "December", earning: 215000, spending: 53920 },
    { month: "January", earning: 228000, spending: 54500 },
    { month: "February", earning: 241000, spending: 56000 },
  ];

  const currentEarning = monthlyData[monthlyData.length - 1].earning;
  const previousEarning = monthlyData[monthlyData.length - 2].earning;
  const currentSpending = monthlyData[monthlyData.length - 1].spending;
  const previousSpending = monthlyData[monthlyData.length - 2].spending;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Business Overview</h1>
          <p className="text-muted-foreground">
            Welcome back to your business dashboard
          </p>
        </div>

        <div className="grid gap-6">
          <BusinessMetrics />

          <StatisticsCards 
            currentEarning={currentEarning}
            previousEarning={previousEarning}
            currentSpending={currentSpending}
            previousSpending={previousSpending}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <StatisticsChart monthlyData={monthlyData} />
            </div>
            <QuickActions />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
