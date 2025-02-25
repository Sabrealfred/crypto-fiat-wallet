
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskCategory, RiskMetric } from "./types";

interface RiskMetricCardProps {
  category: RiskCategory;
  getStatusColor: (status: RiskMetric['status']) => string;
}

export function RiskMetricCard({ category, getStatusColor }: RiskMetricCardProps) {
  return (
    <Card className="relative overflow-hidden group hover:shadow-lg transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <category.icon className="h-5 w-5 text-primary" />
          {category.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {category.description}
        </p>
        <div className="space-y-4">
          {category.metrics.map((metric, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
              <span className="text-sm text-muted-foreground">{metric.name}</span>
              <div className="flex items-center gap-2">
                <span className={`font-medium ${getStatusColor(metric.status)}`}>
                  {metric.value}
                </span>
                <span className={`text-xs ${
                  metric.change.includes('+') 
                    ? 'text-green-500' 
                    : metric.change.includes('-') 
                    ? 'text-red-500' 
                    : 'text-muted-foreground'
                }`}>
                  {metric.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
