
import { ChartCard } from "../ChartCard";
import { DashboardSection } from "../DashboardSection";
import { MetricCard } from "../MetricCard";
import { Cpu, LineChart, PieChart } from "lucide-react";

export function ForecastingTab() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 mb-6">
        <ChartCard title="Revenue Forecast">
          <div className="text-center text-muted-foreground pt-20">
            Forecast visualization would go here
          </div>
        </ChartCard>
      </div>
      
      <DashboardSection>
        <MetricCard
          title="Q3 Forecast"
          value="$1.2M"
          change="+18% YoY growth projected"
          icon={Cpu}
        />
        <MetricCard
          title="Customer Growth"
          value="+12%"
          change="Expected for next quarter"
          icon={LineChart}
        />
        <MetricCard
          title="Market Share"
          value="23%"
          change="+2.5% expected by year end"
          icon={PieChart}
        />
      </DashboardSection>
    </>
  );
}
