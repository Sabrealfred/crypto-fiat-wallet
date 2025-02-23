
import { BarChart3, PieChart } from "lucide-react";

interface StatisticsCardsProps {
  currentEarning: number;
  previousEarning: number;
  currentSpending: number;
  previousSpending: number;
}

export function StatisticsCards({ 
  currentEarning, 
  previousEarning, 
  currentSpending, 
  previousSpending 
}: StatisticsCardsProps) {
  const earningChange = ((currentEarning - previousEarning) / previousEarning) * 100;
  const spendingChange = ((currentSpending - previousSpending) / previousSpending) * 100;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="p-6 rounded-2xl glass-card">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm text-muted-foreground">Monthly Earning</h3>
          <PieChart className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-2xl font-bold mb-2">${currentEarning.toLocaleString()}</p>
        <span className={`text-sm ${earningChange >= 0 ? 'text-green-600' : 'text-red-500'}`}>
          {earningChange >= 0 ? '↑' : '↓'} {Math.abs(earningChange).toFixed(1)}% vs last month
        </span>
      </div>
      <div className="p-6 rounded-2xl glass-card">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-sm text-muted-foreground">Monthly Spending</h3>
          <BarChart3 className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="text-2xl font-bold mb-2">${currentSpending.toLocaleString()}</p>
        <span className={`text-sm ${spendingChange >= 0 ? 'text-red-500' : 'text-green-600'}`}>
          {spendingChange >= 0 ? '↑' : '↓'} {Math.abs(spendingChange).toFixed(1)}% vs last month
        </span>
      </div>
    </div>
  );
}
