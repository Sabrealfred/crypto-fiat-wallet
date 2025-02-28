
import { ChartBar, ChartPie, FileText } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AreaMetrics } from "./AreaMetrics";
import { FinancialHighlights } from "./FinancialHighlights";
import { StatisticsChart } from "@/components/dashboard/StatisticsChart";

interface PerformanceSectionProps {
  monthlyData: Array<{
    month: string;
    earning: number;
    spending: number;
  }>;
}

export function PerformanceSection({ monthlyData }: PerformanceSectionProps) {
  return (
    <section className="grid lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="fade-in animation-delay-200">
          <div className="flex items-center gap-2 mb-4">
            <ChartPie className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold">Area Performance</h2>
          </div>
          <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/20 border-none shadow-lg p-6">
            <AreaMetrics />
          </Card>
        </div>
      </div>

      <div className="space-y-6">
        <div className="fade-in animation-delay-150">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold">Financial Highlights</h2>
          </div>
          <FinancialHighlights />
        </div>

        <div className="fade-in animation-delay-250">
          <div className="flex items-center gap-2 mb-4">
            <ChartBar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <h2 className="text-xl font-semibold">Monthly Trends</h2>
          </div>
          <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/20 border-none shadow-lg">
            <StatisticsChart monthlyData={monthlyData} />
          </Card>
        </div>
      </div>
    </section>
  );
}
