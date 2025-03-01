
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface FinancialTrendsProps {
  data: any[];
  timeFrame: string;
  setTimeFrame: (value: string) => void;
  formatCurrency: (value: number | string) => string;
}

export const FinancialTrendsChart: React.FC<FinancialTrendsProps> = ({ 
  data, 
  timeFrame, 
  setTimeFrame,
  formatCurrency 
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Annual Financial Trends</CardTitle>
            <CardDescription>Historical performance analysis across key metrics</CardDescription>
          </div>
          <div className="flex mt-2 md:mt-0 gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1" 
              onClick={() => setTimeFrame("quarterly")}
            >
              Quarterly
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1" 
              onClick={() => setTimeFrame("monthly")}
            >
              Monthly
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-1" 
              onClick={() => setTimeFrame("yearly")}
            >
              Yearly
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorCashflow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0088FE" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#0088FE" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorLiquidity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#00C49F" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorAssets" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFBB28" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#FFBB28" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value/1000}K`} />
              <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="cashflow" 
                name="Cash Flow" 
                stroke="#0088FE" 
                fillOpacity={1} 
                fill="url(#colorCashflow)" 
              />
              <Area 
                type="monotone" 
                dataKey="liquidity" 
                name="Liquidity Position" 
                stroke="#00C49F" 
                fillOpacity={1} 
                fill="url(#colorLiquidity)" 
              />
              <Area 
                type="monotone" 
                dataKey="assets" 
                name="Total Assets" 
                stroke="#FFBB28" 
                fillOpacity={1} 
                fill="url(#colorAssets)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <CardFooter className="border-t flex justify-end p-4">
        <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </CardFooter>
    </Card>
  );
};
