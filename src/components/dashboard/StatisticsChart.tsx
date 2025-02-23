import { Button } from "@/components/ui/button";

interface MonthlyData {
  month: string;
  earning: number;
  spending: number;
}

interface StatisticsChartProps {
  monthlyData: MonthlyData[];
}

export function StatisticsChart({ monthlyData }: StatisticsChartProps) {
  return (
    <div className="relative glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Statistics</h2>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="bg-accent text-white">
            Weekly
          </Button>
          <Button variant="outline" size="sm">
            Monthly
          </Button>
          <Button variant="outline" size="sm">
            Yearly
          </Button>
        </div>
      </div>
      <div className="h-[200px] flex items-end justify-between gap-2">
        {monthlyData.map((data) => (
          <div key={data.month} className="flex flex-col items-center">
            <div className="flex-1 w-full relative">
              <div 
                className="absolute bottom-0 w-full bg-accent/20 rounded-t-lg transition-all duration-300"
                style={{ height: `${(data.earning / 25000) * 100}%` }}
              ></div>
              <div 
                className="absolute bottom-0 w-full bg-red-400/20 rounded-t-lg transition-all duration-300"
                style={{ height: `${(data.spending / 25000) * 100}%`, width: '50%', left: '25%' }}
              ></div>
            </div>
            <span className="text-xs text-muted-foreground mt-2">
              {data.month.slice(0, 3)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
