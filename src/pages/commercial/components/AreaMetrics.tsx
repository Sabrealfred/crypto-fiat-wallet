
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  TrendingUp,
  DollarSign,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  Building2,
  BarChart,
  Briefcase
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  label: string;
  icon: any;
}

function MetricCard({ title, value, change, label, icon: Icon }: MetricCardProps) {
  const isPositive = change >= 0;
  
  return (
    <Card className="glass-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-1">{value}</div>
        <div className="flex items-center text-sm">
          {isPositive ? (
            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {Math.abs(change)}%
          </span>
          <span className="text-muted-foreground ml-2">{label}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export function AreaMetrics() {
  const treasuryMetrics = [
    {
      title: "Cash Position",
      value: "$12.4M",
      change: 8.2,
      label: "vs last month",
      icon: Building2
    },
    {
      title: "FX Exposure",
      value: "$3.2M",
      change: -2.4,
      label: "vs target",
      icon: DollarSign
    },
    {
      title: "Liquidity Ratio",
      value: "2.8",
      change: 5.1,
      label: "vs last quarter",
      icon: Percent
    }
  ];

  const operationsMetrics = [
    {
      title: "Operating Efficiency",
      value: "94.2%",
      change: 3.1,
      label: "vs target",
      icon: BarChart
    },
    {
      title: "Cost to Income",
      value: "0.42",
      change: -1.8,
      label: "vs last month",
      icon: TrendingUp
    },
    {
      title: "Transaction Volume",
      value: "28.5K",
      change: 12.3,
      label: "vs average",
      icon: TrendingUp
    }
  ];

  const fundsMetrics = [
    {
      title: "AUM",
      value: "$845M",
      change: 15.4,
      label: "vs last quarter",
      icon: Briefcase
    },
    {
      title: "ROI",
      value: "18.2%",
      change: 4.7,
      label: "annualized",
      icon: TrendingUp
    },
    {
      title: "Portfolio Beta",
      value: "0.92",
      change: -0.5,
      label: "vs benchmark",
      icon: Percent
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Treasury KPIs</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {treasuryMetrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Operations Indicators</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {operationsMetrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Fund Performance</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {fundsMetrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>
      </div>
    </div>
  );
}
