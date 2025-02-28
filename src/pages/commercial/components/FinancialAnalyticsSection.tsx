
import { Card } from "@/components/ui/card";
import { LineChart } from "lucide-react";
import { StatisticsCards } from "@/components/dashboard/StatisticsCards";
import { StatisticsChart } from "@/components/dashboard/StatisticsChart";

interface FinancialAnalyticsSectionProps {
  monthlyData: Array<{
    month: string;
    earning: number;
    spending: number;
  }>;
}

export function FinancialAnalyticsSection({ monthlyData }: FinancialAnalyticsSectionProps) {
  const currentEarning = monthlyData[monthlyData.length - 1].earning;
  const previousEarning = monthlyData[monthlyData.length - 2].earning;
  const currentSpending = monthlyData[monthlyData.length - 1].spending;
  const previousSpending = monthlyData[monthlyData.length - 2].spending;

  return (
    <div className="fade-in animation-delay-100">
      <div className="flex items-center gap-2 mb-4">
        <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-semibold">Financial Analytics</h2>
      </div>
      <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/20 border-none shadow-lg">
        <StatisticsCards 
          currentEarning={currentEarning}
          previousEarning={previousEarning}
          currentSpending={currentSpending}
          previousSpending={previousSpending}
        />
      </Card>
    </div>
  );
}
