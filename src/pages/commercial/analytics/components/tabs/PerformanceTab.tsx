
import { ChartCard } from "../ChartCard";
import { DashboardSection } from "../DashboardSection";
import { MetricCard } from "../MetricCard";
import { TrendingUp, DollarSign, Users } from "lucide-react";

export function PerformanceTab() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 mb-6">
        <ChartCard title="Performance Metrics">
          <div className="text-center text-muted-foreground pt-20">
            Performance visualization would go here
          </div>
        </ChartCard>
      </div>
      
      <DashboardSection>
        <MetricCard
          title="Conversion Rate"
          value="3.6%"
          change="+0.8% from last month"
          icon={TrendingUp}
        />
        <MetricCard
          title="Average Order Value"
          value="$289.45"
          change="+$32.50 from last month"
          icon={DollarSign}
        />
        <MetricCard
          title="Customer Lifetime Value"
          value="$3,542"
          change="+$298 from last month"
          icon={Users}
        />
      </DashboardSection>
    </>
  );
}
