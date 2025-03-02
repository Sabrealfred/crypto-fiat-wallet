
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ResponsiveContainer } from "recharts";
import { ReactElement, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { InfoCircle } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

interface RiskChartProps {
  title: string;
  description?: string;
  children: ReactElement;
  height?: number;
  riskLevel?: "low" | "medium" | "high" | "critical";
  aiInsight?: string;
}

export function RiskChart({ 
  title, 
  description, 
  children, 
  height = 300,
  riskLevel,
  aiInsight
}: RiskChartProps) {
  const getRiskBadgeColor = () => {
    switch (riskLevel) {
      case "low": return "bg-green-100 text-green-800 hover:bg-green-100";
      case "medium": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "high": return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "critical": return "bg-red-100 text-red-800 hover:bg-red-100";
      default: return "";
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </div>
        {riskLevel && (
          <Badge variant="outline" className={`${getRiskBadgeColor()} ml-2`}>
            {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)} Risk
          </Badge>
        )}
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
        
        {aiInsight && (
          <div className="mt-4 flex items-start gap-2 p-3 rounded-md bg-blue-50 dark:bg-blue-950 text-sm">
            <InfoCircle className="h-5 w-5 text-blue-600 mt-0.5 shrink-0" />
            <p>{aiInsight}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
