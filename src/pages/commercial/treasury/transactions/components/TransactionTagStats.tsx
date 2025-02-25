import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TreasuryTransaction } from "@/types/treasury";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, Legend, Brush, CartesianGrid } from 'recharts';
import { startOfMonth, format, subMonths, isSameMonth, addMonths } from "date-fns";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";

interface TagStats {
  tag: string;
  totalAmount: number;
  count: number;
  averageAmount: number;
  monthlyGrowth?: number;
  trend?: 'up' | 'down' | 'stable';
}

interface MonthlyTagStats {
  month: string;
  [key: string]: number | string;
}

export function TransactionTagStats() {
  const { data: transactions = [] } = useQuery({
    queryKey: ['treasury-transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('treasury_transactions')
        .select('*')
        .order('transaction_date', { ascending: false });
      
      if (error) throw error;
      return data as TreasuryTransaction[];
    }
  });

  const { data: tags = [] } = useQuery({
    queryKey: ['treasury-tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('treasury_tags')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      return data;
    }
  });

  const tagStats: Record<string, TagStats> = {};
  const monthlyStats: Record<string, Record<string, number>> = {};
  
  for (let i = 0; i < 12; i++) {
    const date = subMonths(new Date(), i);
    const monthKey = format(date, 'yyyy-MM');
    monthlyStats[monthKey] = {};
  }
  
  transactions.forEach(transaction => {
    const transactionDate = new Date(transaction.transaction_date);
    const monthKey = format(transactionDate, 'yyyy-MM');
    
    transaction.tags?.forEach(tagName => {
      if (!tagStats[tagName]) {
        tagStats[tagName] = {
          tag: tagName,
          totalAmount: 0,
          count: 0,
          averageAmount: 0,
          monthlyGrowth: 0
        };
      }
      
      tagStats[tagName].totalAmount += transaction.amount;
      tagStats[tagName].count += 1;

      if (monthlyStats[monthKey]) {
        monthlyStats[monthKey][tagName] = (monthlyStats[monthKey][tagName] || 0) + transaction.amount;
      }
    });
  });

  Object.keys(tagStats).forEach(tagName => {
    const monthlyAmounts = Object.keys(monthlyStats)
      .sort()
      .map(month => monthlyStats[month][tagName] || 0);
    
    if (monthlyAmounts.length >= 2) {
      const lastMonth = monthlyAmounts[monthlyAmounts.length - 1];
      const previousMonth = monthlyAmounts[monthlyAmounts.length - 2];
      
      if (previousMonth > 0) {
        const growth = ((lastMonth - previousMonth) / previousMonth) * 100;
        tagStats[tagName].monthlyGrowth = Number(growth.toFixed(1));
        tagStats[tagName].trend = growth > 5 ? 'up' : growth < -5 ? 'down' : 'stable';
      }
    }
  });

  const statsArray = Object.values(tagStats)
    .map(stat => ({
      ...stat,
      totalAmount: Number(stat.totalAmount.toFixed(2)),
      averageAmount: Number((stat.totalAmount / stat.count).toFixed(2))
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const monthlyData: MonthlyTagStats[] = Object.entries(monthlyStats)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, values]) => ({
      month: format(new Date(month), 'MMM yyyy'),
      ...values
    }));

  const top5Tags = statsArray.slice(0, 5).map(stat => stat.tag);

  const handleExportCSV = () => {
    const csvData = statsArray.map(stat => ({
      Tag: stat.tag,
      'Total Amount': stat.totalAmount,
      'Transaction Count': stat.count,
      'Average Amount': stat.averageAmount,
      'Monthly Growth %': stat.monthlyGrowth,
      'Trend': stat.trend
    }));

    const headers = ['Tag', 'Total Amount', 'Transaction Count', 'Average Amount', 'Monthly Growth %', 'Trend'];
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => 
        headers.map(header => JSON.stringify(row[header as keyof typeof row])).join(',')
      )
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `transaction_tags_stats_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Statistics exported successfully");
  };

  const calculatePredictions = (tag: string) => {
    const monthlyData = Object.entries(monthlyStats)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, values]) => ({
        month: new Date(month),
        amount: values[tag] || 0
      }));

    if (monthlyData.length < 2) return null;

    const n = monthlyData.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumXX = 0;
    
    monthlyData.forEach((data, i) => {
      sumX += i;
      sumY += data.amount;
      sumXY += i * data.amount;
      sumXX += i * i;
    });

    const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
    const intercept = (sumY - slope * sumX) / n;

    const predictions = [];
    for (let i = 1; i <= 3; i++) {
      const predictedAmount = slope * (n + i - 1) + intercept;
      const predictedDate = addMonths(monthlyData[monthlyData.length - 1].month, i);
      predictions.push({
        month: format(predictedDate, 'MMM yyyy'),
        [tag]: Math.max(0, predictedAmount)
      });
    }

    return predictions;
  };

  const predictions = top5Tags.reduce((acc, tag) => {
    const tagPredictions = calculatePredictions(tag);
    if (tagPredictions) {
      tagPredictions.forEach((pred, i) => {
        if (!acc[i]) acc[i] = { month: pred.month };
        acc[i] = { ...acc[i], ...pred };
      });
    }
    return acc;
  }, [] as MonthlyTagStats[]);

  const combinedData = [...monthlyData, ...predictions];

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Transaction Analysis by Tags</h2>
        <Button onClick={handleExportCSV} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Stats
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-muted/50">
          <h3 className="text-sm font-medium mb-1">Total Tags</h3>
          <p className="text-2xl font-bold">{tags.length}</p>
        </Card>
        
        <Card className="p-4 bg-muted/50">
          <h3 className="text-sm font-medium mb-1">Tagged Transactions</h3>
          <p className="text-2xl font-bold">
            {transactions.filter(t => t.tags?.length > 0).length}
          </p>
        </Card>
        
        <Card className="p-4 bg-muted/50">
          <h3 className="text-sm font-medium mb-1">Untagged Transactions</h3>
          <p className="text-2xl font-bold">
            {transactions.filter(t => !t.tags?.length).length}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Total Amount by Tag</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsArray}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="tag" />
                <YAxis />
                <Tooltip 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload as TagStats;
                      return (
                        <div className="bg-white p-3 border rounded-lg shadow">
                          <p className="font-medium">{data.tag}</p>
                          <p>Total: ${data.totalAmount.toLocaleString()}</p>
                          <p>Count: {data.count}</p>
                          <p>Average: ${data.averageAmount.toLocaleString()}</p>
                          {data.monthlyGrowth && (
                            <p className={data.monthlyGrowth > 0 ? 'text-green-600' : 'text-red-600'}>
                              Growth: {data.monthlyGrowth}%
                            </p>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="totalAmount" fill="#6366f1" name="Total Amount" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-4">Monthly Trends & Predictions (Top 5 Tags)</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-3 border rounded-lg shadow">
                        <p className="font-medium">{label}</p>
                        {payload.map((entry, index) => (
                          <p key={index} style={{ color: entry.color }}>
                            {entry.name}: ${entry.value?.toLocaleString()}
                          </p>
                        ))}
                      </div>
                    );
                  }
                  return null;
                }} />
                <Legend />
                <Brush dataKey="month" height={30} stroke="#8884d8" />
                {top5Tags.map((tag, index) => (
                  <Line
                    key={tag}
                    type="monotone"
                    dataKey={tag}
                    stroke={`hsl(${index * 60}, 70%, 50%)`}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Líneas punteadas muestran predicciones para los próximos 3 meses
          </p>
        </Card>
      </div>

      <div className="mt-6 overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Tag</th>
              <th className="text-right py-2">Transactions</th>
              <th className="text-right py-2">Total Amount</th>
              <th className="text-right py-2">Average Amount</th>
              <th className="text-right py-2">Monthly Growth</th>
              <th className="text-right py-2">Predicted Trend</th>
            </tr>
          </thead>
          <tbody>
            {statsArray.map(stat => (
              <tr key={stat.tag} className="border-b hover:bg-muted/50 transition-colors">
                <td className="py-2">{stat.tag}</td>
                <td className="text-right">{stat.count}</td>
                <td className="text-right">${stat.totalAmount.toLocaleString()}</td>
                <td className="text-right">${stat.averageAmount.toLocaleString()}</td>
                <td className={`text-right ${
                  stat.monthlyGrowth && stat.monthlyGrowth > 0 ? 'text-green-600' : 
                  stat.monthlyGrowth && stat.monthlyGrowth < 0 ? 'text-red-600' : ''
                }`}>
                  {stat.monthlyGrowth ? `${stat.monthlyGrowth}%` : '-'}
                </td>
                <td className="text-right">
                  {top5Tags.includes(stat.tag) ? 
                    (stat.monthlyGrowth && stat.monthlyGrowth > 5 ? '📈 Creciente' :
                     stat.monthlyGrowth && stat.monthlyGrowth < -5 ? '📉 Decreciente' : 
                     '➡️ Estable') :
                    '-'
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
