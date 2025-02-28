
import { AppLayout } from "@/components/layout/app-layout";
import { DashboardHeader } from "./components/DashboardHeader";
import { MetricsSection } from "./components/MetricsSection";
import { FinancialAnalyticsSection } from "./components/FinancialAnalyticsSection";
import { PerformanceSection } from "./components/PerformanceSection";
import { EnterpriseSolutionsSection } from "./components/EnterpriseSolutionsSection";
import { QuickAccessSection } from "./components/QuickAccessSection";

export default function CommercialDashboard() {
  const monthlyData = [
    { month: "September", earning: 1820000, spending: 480000 },
    { month: "October", earning: 1950000, spending: 510000 },
    { month: "November", earning: 2010000, spending: 530000 },
    { month: "December", earning: 2150000, spending: 539200 },
    { month: "January", earning: 2280000, spending: 545000 },
    { month: "February", earning: 2410000, spending: 560000 },
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <DashboardHeader />

        <div className="grid gap-6">
          <MetricsSection />
          
          <FinancialAnalyticsSection monthlyData={monthlyData} />
          
          <PerformanceSection monthlyData={monthlyData} />
          
          <EnterpriseSolutionsSection />
          
          <QuickAccessSection />
        </div>
      </div>
    </AppLayout>
  );
}
