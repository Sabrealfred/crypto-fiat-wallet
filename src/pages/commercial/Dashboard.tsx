
import { AppLayout } from "@/components/layout/app-layout";
import { StatisticsCards } from "@/components/dashboard/StatisticsCards";
import { StatisticsChart } from "@/components/dashboard/StatisticsChart";
import { CommercialMetrics } from "./components/CommercialMetrics";
import { FinancialHighlights } from "./components/FinancialHighlights";
import { EnterpriseServices } from "./components/EnterpriseServices";

export default function CommercialDashboard() {
  const monthlyData = [
    { month: "September", earning: 1820000, spending: 480000 },
    { month: "October", earning: 1950000, spending: 510000 },
    { month: "November", earning: 2010000, spending: 530000 },
    { month: "December", earning: 2150000, spending: 539200 },
    { month: "January", earning: 2280000, spending: 545000 },
    { month: "February", earning: 2410000, spending: 560000 },
  ];

  const currentEarning = monthlyData[monthlyData.length - 1].earning;
  const previousEarning = monthlyData[monthlyData.length - 2].earning;
  const currentSpending = monthlyData[monthlyData.length - 1].spending;
  const previousSpending = monthlyData[monthlyData.length - 2].spending;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Commercial Banking Portal</h1>
          <p className="text-muted-foreground">
            Comprehensive overview of your enterprise operations
          </p>
        </div>

        <div className="grid gap-6">
          <CommercialMetrics />
          <FinancialHighlights />
          
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
            <EnterpriseServices />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
