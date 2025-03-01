
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface MarketDataCardProps { 
  title: string; 
  code: string; 
  data: any[];
  color?: string;
}

export const MarketDataCard = ({ title, code, data, color = "#3b82f6" }: MarketDataCardProps) => (
  <Card className="border-blue-100 dark:border-blue-800">
    <CardHeader className="pb-2">
      <div className="flex justify-between items-center">
        <CardTitle className="text-sm font-medium flex items-center gap-1">
          <span>Market Data</span>
          <Badge variant="outline" className="ml-2">{code}</Badge>
        </CardTitle>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <Search className="h-4 w-4" />
        </Button>
      </div>
    </CardHeader>
    <CardContent>
      <div className="h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              dot={false}
            />
            <XAxis dataKey="date" hide={true} />
            <YAxis domain={['dataMin - 0.01', 'dataMax + 0.01']} hide={true} />
            <Tooltip 
              labelFormatter={(label) => `Date: ${label}`}
              formatter={(value: any) => [value, code]}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-between items-center text-sm mt-2">
        <span className="font-medium">{title}</span>
        <span className="text-muted-foreground">{data[data.length - 1].value}</span>
      </div>
    </CardContent>
  </Card>
);
