
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ResponsiveContainer } from "recharts";
import { ReactElement } from "react";

interface RiskChartProps {
  title: string;
  description?: string;
  children: ReactElement;
  height?: number;
}

export function RiskChart({ title, description, children, height = 300 }: RiskChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }}>
          <ResponsiveContainer width="100%" height="100%">
            {children}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
