
import { TreasuryTransaction } from "@/types/treasury";
import { format, addMonths } from "date-fns";
import { MonthlyTagStats, TagStats } from '../types';

export function calculateTagStats(transactions: TreasuryTransaction[], monthlyStats: Record<string, Record<string, number>>) {
  const tagStats: Record<string, TagStats> = {};
  
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

  return tagStats;
}

export function calculatePredictions(tag: string, monthlyStats: Record<string, Record<string, number>>) {
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
}

export function detectAnomalies(data: number[]): number[] {
  const mean = data.reduce((sum, val) => sum + val, 0) / data.length;
  const stdDev = Math.sqrt(
    data.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / data.length
  );
  const threshold = stdDev * 2;
  
  return data.map(val => Math.abs(val - mean) > threshold ? val : 0);
}
