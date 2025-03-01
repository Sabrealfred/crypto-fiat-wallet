
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RiskCategory, RiskMetric } from "./types";
import { ChevronRight } from "lucide-react";

interface RiskMetricCardProps {
  category: RiskCategory;
  getStatusColor: (status: RiskMetric['status']) => string;
}

export function RiskMetricCard({ category, getStatusColor }: RiskMetricCardProps) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <category.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            <span>{category.title}</span>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
        <div className="space-y-3">
          {category.metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center">
              <span className="text-sm">{metric.name}</span>
              <div className="flex items-center gap-2">
                <span className="font-medium">{metric.value}</span>
                <span className={`text-xs ${getStatusColor(metric.status)}`}>{metric.change}</span>
              </div>
            </div>
          ))}
        </div>
        {category.lastUpdate && (
          <p className="text-xs text-muted-foreground mt-4">Last updated: {category.lastUpdate}</p>
        )}
      </CardContent>
    </Card>
  );
}
