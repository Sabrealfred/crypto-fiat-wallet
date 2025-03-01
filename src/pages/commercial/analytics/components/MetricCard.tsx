
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ElementType;
  progressWidth?: string;
  maxValue?: number;
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  progressWidth,
  maxValue 
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground">
            {change}
          </p>
        )}
        {progressWidth && (
          <div className="mt-4 h-1 w-full bg-gray-100 dark:bg-gray-800 rounded">
            <div 
              className="h-1 bg-green-500 rounded" 
              style={{ width: progressWidth }}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
