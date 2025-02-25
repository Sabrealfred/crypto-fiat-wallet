
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";
import { TagStatsHeader } from "./tag-stats/TagStatsHeader";
import { TagMetricsCards } from "./tag-stats/TagMetricsCards";
import { TagAmountChart } from "./tag-stats/TagAmountChart";
import { TagTrendsChart } from "./tag-stats/TagTrendsChart";
import { TagStatsTable } from "./tag-stats/TagStatsTable";
import { TagStatsFilters } from "./tag-stats/TagStatsFilters";
import { calculateTagStats, calculatePredictions, detectAnomalies } from "./tag-stats/TagAnalytics";
import { MonthlyTagStats } from "./types";
import { DateRange } from "react-day-picker";
import { useTransactionStats } from "../hooks/useTransactionStats";
import { exportStatsToCSV } from "../utils/exportUtils";

export function TransactionTagStats() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [comparisonPeriod, setComparisonPeriod] = useState("previous");
  const [showPercentages, setShowPercentages] = useState(false);

  const { transactions, tags, comparisonTransactions } = useTransactionStats(dateRange, comparisonPeriod);

  const monthlyStats: Record<string, Record<string, number>> = {};
  for (let i = 0; i < 12; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthKey = format(date, 'yyyy-MM');
    monthlyStats[monthKey] = {};
  }

  const currentStats = calculateTagStats(transactions, monthlyStats);
  const comparisonStats = calculateTagStats(comparisonTransactions, {});

  const statsArray = Object.values(currentStats)
    .map(stat => {
      const comparisonStat = comparisonStats[stat.tag];
      const percentageChange = comparisonStat 
        ? ((stat.totalAmount - comparisonStat.totalAmount) / comparisonStat.totalAmount) * 100 
        : 0;

      return {
        ...stat,
        totalAmount: Number(stat.totalAmount.toFixed(2)),
        averageAmount: Number((stat.totalAmount / stat.count).toFixed(2)),
        percentageChange: Number(percentageChange.toFixed(2))
      };
    })
    .sort((a, b) => b.totalAmount - a.totalAmount);

  const top5Tags = statsArray.slice(0, 5).map(stat => stat.tag);

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

  const anomalies = top5Tags.reduce((acc, tag) => {
    const monthlyValues = Object.values(monthlyStats).map(m => m[tag] || 0);
    const anomalousValues = detectAnomalies(monthlyValues);
    if (anomalousValues.some(v => v !== 0)) {
      acc[tag] = anomalousValues;
    }
    return acc;
  }, {} as Record<string, number[]>);

  return (
    <Card className="p-6">
      <TagStatsHeader onExport={() => exportStatsToCSV(statsArray)} />
      
      <TagStatsFilters
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        comparisonPeriod={comparisonPeriod}
        onComparisonPeriodChange={setComparisonPeriod}
        showPercentages={showPercentages}
        onShowPercentagesChange={setShowPercentages}
      />

      <TagMetricsCards
        totalTags={tags.length}
        taggedTransactions={transactions.filter(t => t.tags?.length > 0).length}
        untaggedTransactions={transactions.filter(t => !t.tags?.length).length}
        comparisonTransactions={comparisonTransactions}
        showPercentages={showPercentages}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TagAmountChart
          statsArray={statsArray}
          anomalies={anomalies}
          showPercentages={showPercentages}
        />
        
        <TagTrendsChart
          combinedData={combinedData}
          top5Tags={top5Tags}
          anomalies={anomalies}
          comparisonData={comparisonTransactions}
        />
      </div>

      <TagStatsTable
        statsArray={statsArray}
        top5Tags={top5Tags}
        anomalies={anomalies}
        showPercentages={showPercentages}
      />
    </Card>
  );
}
