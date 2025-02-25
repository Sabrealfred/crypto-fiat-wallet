
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}

function MetricCard({ title, value, change, trend }: MetricCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-2">{value}</h3>
            <p className={`text-sm mt-2 flex items-center ${
              trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              )}
              {change}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function CommercialMetrics() {
  const metrics = [
    {
      title: "Total Assets Under Management",
      value: "$845M",
      change: "+12.5% vs last month",
      trend: "up" as const
    },
    {
      title: "Treasury Operations",
      value: "$234M",
      change: "+8.3% vs last month",
      trend: "up" as const
    },
    {
      title: "Investment Portfolio",
      value: "$412M",
      change: "+5.7% vs last month",
      trend: "up" as const
    },
    {
      title: "Operating Cash",
      value: "$156M",
      change: "-2.1% vs last month",
      trend: "down" as const
    }
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric) => (
        <MetricCard key={metric.title} {...metric} />
      ))}
    </div>
  );
}
