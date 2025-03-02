
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { LineChart, TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface MarketRatesCardProps {
  marketData: any[];
}

export function MarketRatesCard({ marketData }: MarketRatesCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-blue-600" />
          Market Exchange Rates
        </CardTitle>
        <CardDescription>Live rates from global markets</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={marketData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0088FE" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
              <XAxis dataKey="date" />
              <YAxis domain={['dataMin - 0.01', 'dataMax + 0.01']} />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#0088FE" 
                fillOpacity={1} 
                fill="url(#colorValue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center border-b pb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">EUR/USD</span>
              <span className="text-sm text-muted-foreground">Euro/US Dollar</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-medium">1.0914</span>
              <span className="text-xs text-green-600">+0.12%</span>
            </div>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">GBP/USD</span>
              <span className="text-sm text-muted-foreground">British Pound/US Dollar</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-medium">1.2745</span>
              <span className="text-xs text-red-600">-0.05%</span>
            </div>
          </div>
          <div className="flex justify-between items-center border-b pb-2">
            <div className="flex items-center gap-2">
              <span className="font-medium">USD/JPY</span>
              <span className="text-sm text-muted-foreground">US Dollar/Japanese Yen</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono font-medium">157.28</span>
              <span className="text-xs text-green-600">+0.31%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
