
import { ArrowUpRight, ArrowDownRight, TrendingUp, ChartPie, DollarSign, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HighlightProps {
  title: string;
  value: string;
  trend: "up" | "down";
  description: string;
  icon: any;
  color: string;
}

export const financialHighlights: HighlightProps[] = [
  {
    title: "Revenue Growth",
    value: "+24.5%",
    trend: "up",
    description: "vs. previous quarter",
    icon: TrendingUp,
    color: "bg-green-500"
  },
  {
    title: "Operating Margin",
    value: "32.8%",
    trend: "up",
    description: "Above target",
    icon: ChartPie,
    color: "bg-purple-500"
  },
  {
    title: "Cash Flow",
    value: "-12.4%",
    trend: "down",
    description: "Below expectations",
    icon: DollarSign,
    color: "bg-red-500"
  },
  {
    title: "Market Share",
    value: "+2.3%",
    trend: "up",
    description: "Growing steadily",
    icon: BarChart3,
    color: "bg-blue-500"
  }
];

export function FinancialHighlights() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {financialHighlights.map((highlight, index) => (
        <Card key={index} className="transition-all hover:shadow-lg">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <div className={`${highlight.color} p-3 rounded-lg`}>
                <highlight.icon className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {highlight.title}
                </p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-2xl font-bold">{highlight.value}</span>
                  {highlight.trend === 'up' ? (
                    <ArrowUpRight className="h-5 w-5 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {highlight.description}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
