
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HighlightProps {
  title: string;
  value: string;
  trend: "up" | "down";
  description: string;
}

export const financialHighlights: HighlightProps[] = [
  {
    title: "Revenue Growth",
    value: "+24.5%",
    trend: "up",
    description: "vs. previous quarter"
  },
  {
    title: "Operating Margin",
    value: "32.8%",
    trend: "up",
    description: "Above target"
  },
  {
    title: "Cash Flow",
    value: "-12.4%",
    trend: "down",
    description: "Below expectations"
  },
  {
    title: "Market Share",
    value: "+2.3%",
    trend: "up",
    description: "Growing steadily"
  }
];

export function FinancialHighlights() {
  return (
    <div className="grid md:grid-cols-4 gap-4">
      {financialHighlights.map((highlight, index) => (
        <Card key={index}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {highlight.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{highlight.value}</span>
              {highlight.trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-red-500" />
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {highlight.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
