
import { format } from "date-fns";
import { toast } from "sonner";
import { TagStats } from "../components/types";

export function exportStatsToCSV(statsArray: TagStats[]) {
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
}
