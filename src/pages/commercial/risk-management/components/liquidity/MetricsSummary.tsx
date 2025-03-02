
import { RiskMetricCard } from "../RiskMetricCard";
import { TrendingUp, Clock, Calendar } from "lucide-react";

export function MetricsSummary() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <RiskMetricCard
        title="Current Liquidity Ratio"
        value="1.62x"
        change="+0.07x from last month"
        isPositive={true}
        icon={TrendingUp}
        progress={{
          value: 82,
          target: "1.5x",
          excellent: "2.0x"
        }}
      />
      
      <RiskMetricCard
        title="Days Cash on Hand"
        value="98 days"
        change="-5 days from last quarter"
        isPositive={false}
        icon={Clock}
        progress={{
          value: 65,
          target: "90 days",
          excellent: "180 days"
        }}
      />
      
      <RiskMetricCard
        title="Cash Projection (90 days)"
        value="$1.4M"
        change="+$300K from previous projection"
        isPositive={true}
        icon={Calendar}
        progress={{
          value: 78,
          target: "$1M",
          excellent: "$2M"
        }}
      />
    </div>
  );
}
