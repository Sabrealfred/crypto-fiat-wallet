
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TreasuryTransaction } from "@/types/treasury";
import { Card } from "@/components/ui/card";
import { format, subMonths } from "date-fns";
import { toast } from "sonner";
import { TagStatsHeader } from "./tag-stats/TagStatsHeader";
import { TagMetricsCards } from "./tag-stats/TagMetricsCards";
import { TagAmountChart } from "./tag-stats/TagAmountChart";
import { TagTrendsChart } from "./tag-stats/TagTrendsChart";
import { TagStatsTable } from "./tag-stats/TagStatsTable";
import { calculateTagStats, calculatePredictions, detectAnomalies } from "./tag-stats/TagAnalytics";
import { MonthlyTagStats, TagStats } from "./types";
import { DateRange } from "react-day-picker";

export function TransactionTagStats() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [comparisonPeriod, setComparisonPeriod] = useState("previous");

  const { data: transactions = [] } = useQuery({
    queryKey: ['treasury-transactions', dateRange],
    queryFn: async () => {
      let query = supabase
        .from('treasury_transactions')
        .select('id, amount, currency, transaction_date, description, status, tags, metadata, bank_name, bai_code, entity_id')
        .order('transaction_date', { ascending: false });

      if (dateRange?.from) {
        query = query.gte('transaction_date', dateRange.from.toISOString());
      }
      if (dateRange?.to) {
        query = query.lte('transaction_date', dateRange.to.toISOString());
      }

      const { data, error } = await query;
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

  // Inicializar estadísticas mensuales
  const monthlyStats: Record<string, Record<string, number>> = {};
  for (let i = 0; i < 12; i++) {
    const date = subMonths(new Date(), i);
    const monthKey = format(date, 'yyyy-MM');
    monthlyStats[monthKey] = {};
  }

  // Calcular estadísticas
  const tagStats = calculateTagStats(transactions, monthlyStats);

  const statsArray = Object.values(tagStats)
    .map(stat => ({
      ...stat,
      totalAmount: Number(stat.totalAmount.toFixed(2)),
      averageAmount: Number((stat.totalAmount / stat.count).toFixed(2))
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const top5Tags = statsArray.slice(0, 5).map(stat => stat.tag);

  // Calcular datos mensuales y predicciones
  const monthlyData = Object.entries(monthlyStats)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([month, values]) => ({
      month: format(new Date(month), 'MMM yyyy'),
      ...values
    }));

  const predictions = top5Tags.reduce((acc, tag) => {
    const tagPredictions = calculatePredictions(tag, monthlyStats);
    if (tagPredictions) {
      tagPredictions.forEach((pred, i) => {
        if (!acc[i]) acc[i] = { month: pred.month };
        acc[i] = { ...acc[i], ...pred };
      });
    }
    return acc;
  }, [] as MonthlyTagStats[]);

  const combinedData = [...monthlyData, ...predictions];

  // Detectar anomalías
  const anomalies = top5Tags.reduce((acc, tag) => {
    const monthlyValues = Object.values(monthlyStats).map(m => m[tag] || 0);
    const anomalousValues = detectAnomalies(monthlyValues);
    if (anomalousValues.some(v => v !== 0)) {
      acc[tag] = anomalousValues;
    }
    return acc;
  }, {} as Record<string, number[]>);

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

  return (
    <Card className="p-6">
      <TagStatsHeader onExport={handleExportCSV} />
      
      <TagStatsFilters
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        comparisonPeriod={comparisonPeriod}
        onComparisonPeriodChange={setComparisonPeriod}
      />

      <TagMetricsCards
        totalTags={tags.length}
        taggedTransactions={transactions.filter(t => t.tags?.length > 0).length}
        untaggedTransactions={transactions.filter(t => !t.tags?.length).length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TagAmountChart
          statsArray={statsArray}
          anomalies={anomalies}
        />
        
        <TagTrendsChart
          combinedData={combinedData}
          top5Tags={top5Tags}
          anomalies={anomalies}
        />
      </div>

      <TagStatsTable
        statsArray={statsArray}
        top5Tags={top5Tags}
        anomalies={anomalies}
      />
    </Card>
  );
}
