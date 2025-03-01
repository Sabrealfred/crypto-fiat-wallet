
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface KPIProps {
  indicators: {
    name: string;
    value: string;
    change: string;
    status: string;
  }[];
}

export const KeyPerformanceIndicators: React.FC<KPIProps> = ({ indicators }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {indicators.map((kpi, index) => (
        <Card key={index} className="bg-card">
          <CardContent className="p-4">
            <p className="text-sm font-medium text-muted-foreground">{kpi.name}</p>
            <p className="text-2xl font-semibold mt-1">{kpi.value}</p>
            <p className={`text-xs mt-1 flex items-center ${kpi.status === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
              {kpi.status === 'positive' ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {kpi.change}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
