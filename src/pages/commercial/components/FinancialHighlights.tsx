
import { ArrowUpRight, ArrowDownRight, TrendingUp, ChartPie, DollarSign, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface HighlightProps {
  title: string;
  value: string;
  trend: "up" | "down";
  description: string;
  icon: any;
  color: string;
  bgColor: string;
}

export const financialHighlights: HighlightProps[] = [
  {
    title: "Revenue Growth",
    value: "+24.5%",
    trend: "up",
    description: "vs. previous quarter",
    icon: TrendingUp,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50"
  },
  {
    title: "Operating Margin",
    value: "32.8%",
    trend: "up",
    description: "Above target",
    icon: ChartPie,
    color: "text-violet-500",
    bgColor: "bg-violet-50"
  },
  {
    title: "Cash Flow",
    value: "-12.4%",
    trend: "down",
    description: "Below expectations",
    icon: DollarSign,
    color: "text-red-500",
    bgColor: "bg-red-50"
  },
  {
    title: "Market Share",
    value: "+2.3%",
    trend: "up",
    description: "Growing steadily",
    icon: BarChart3,
    color: "text-blue-500",
    bgColor: "bg-blue-50"
  }
];

export function FinancialHighlights() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {financialHighlights.map((highlight, index) => (
        <Card 
          key={index} 
          className="transition-all hover:shadow-lg border-none bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
        >
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className={`${highlight.bgColor} ${highlight.color} p-3 rounded-xl`}>
                <highlight.icon className="h-6 w-6" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-muted-foreground">
                    {highlight.title}
                  </p>
                  {highlight.trend === 'up' ? (
                    <ArrowUpRight className="h-5 w-5 text-emerald-500" />
                  ) : (
                    <ArrowDownRight className="h-5 w-5 text-red-500" />
                  )}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${
                    highlight.trend === 'up' 
                      ? 'text-emerald-500' 
                      : highlight.trend === 'down' 
                        ? 'text-red-500' 
                        : ''
                  }`}>
                    {highlight.value}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {highlight.description}
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${highlight.color} bg-current`}
                    style={{ 
                      width: `${Math.abs(parseFloat(highlight.value))}%`,
                      maxWidth: '100%'
                    }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
