
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PieChart as PieChartIcon } from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface CurrencyAllocationProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
}

export const CurrencyAllocationChart = ({ data }: CurrencyAllocationProps) => (
  <Card className="border-blue-100 dark:border-blue-800">
    <CardHeader className="pb-2">
      <CardTitle className="flex items-center gap-2">
        <PieChartIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        Currency Allocation
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="h-[200px] flex">
        <ResponsiveContainer width="60%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`]} />
          </PieChart>
        </ResponsiveContainer>
        <div className="w-[40%] pl-2 flex flex-col justify-center">
          <div className="space-y-2">
            {data.map((item, i) => (
              <div key={i} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);
