
import { MetricCard } from "./MetricCard";

interface Metric {
  title: string;
  value: string;
  change?: string;
  icon: React.ElementType;
  progressWidth?: string;
}

interface MetricsGridProps {
  metrics: Metric[];
  gridCols?: string;
}

export function MetricsGrid({ metrics, gridCols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" }: MetricsGridProps) {
  return (
    <div className={`grid ${gridCols} gap-4 mb-6`}>
      {metrics.map((metric, index) => (
        <MetricCard 
          key={index}
          title={metric.title}
          value={metric.value}
          change={metric.change}
          icon={metric.icon}
          progressWidth={metric.progressWidth}
        />
      ))}
    </div>
  );
}
