
import { useState } from "react";
import { KeyPerformanceIndicators } from "../reports/KeyPerformanceIndicators";
import { ReportsHeader } from "../reports/ReportsHeader";
import { ChartsGrid } from "../reports/ChartsGrid";
import { FinancialTrendsChart } from "../reports/FinancialTrendsChart";
import { AIAnalyticsPanel } from "../reports/AIAnalyticsPanel";
import { RiskAssessmentDashboard } from "../reports/RiskAssessmentDashboard";
import { RecentReportsTable } from "../reports/RecentReportsTable";
import { ScheduledReportsPanel } from "../reports/ScheduledReportsPanel";

// Sample data for analytics dashboard
const transactionReportData = [
  { name: "Payments", value: 45 },
  { name: "Transfers", value: 30 },
  { name: "FX", value: 15 },
  { name: "Other", value: 10 },
];

const cashflowReportData = [
  { month: "Jan", inflow: 4000, outflow: 3400 },
  { month: "Feb", inflow: 3500, outflow: 3200 },
  { month: "Mar", inflow: 4500, outflow: 3800 },
  { month: "Apr", inflow: 5000, outflow: 4200 },
  { month: "May", inflow: 4800, outflow: 4000 },
  { month: "Jun", inflow: 5200, outflow: 4500 },
];

const yearlyTrendData = [
  { name: "2021 Q1", cashflow: 3200, liquidity: 4500, assets: 5800 },
  { name: "2021 Q2", cashflow: 3400, liquidity: 4300, assets: 6000 },
  { name: "2021 Q3", cashflow: 3800, liquidity: 4200, assets: 6200 },
  { name: "2021 Q4", cashflow: 4100, liquidity: 4400, assets: 6500 },
  { name: "2022 Q1", cashflow: 4300, liquidity: 4600, assets: 6800 },
  { name: "2022 Q2", cashflow: 4500, liquidity: 4800, assets: 7000 },
  { name: "2022 Q3", cashflow: 4700, liquidity: 5000, assets: 7300 },
  { name: "2022 Q4", cashflow: 5000, liquidity: 5200, assets: 7600 },
  { name: "2023 Q1", cashflow: 5200, liquidity: 5400, assets: 7900 },
  { name: "2023 Q2", cashflow: 5500, liquidity: 5600, assets: 8200 },
];

// Predictive data for AI forecasting
const forecastData = [
  { name: "2023 Q3", actual: 5700, forecast: 5800, ci_lower: 5600, ci_upper: 6000 },
  { name: "2023 Q4", actual: 6000, forecast: 6200, ci_lower: 5900, ci_upper: 6500 },
  { name: "2024 Q1", actual: null, forecast: 6500, ci_lower: 6200, ci_upper: 6800 },
  { name: "2024 Q2", actual: null, forecast: 6800, ci_lower: 6400, ci_upper: 7200 },
  { name: "2024 Q3", actual: null, forecast: 7200, ci_lower: 6700, ci_upper: 7700 },
  { name: "2024 Q4", actual: null, forecast: 7600, ci_lower: 7000, ci_upper: 8200 },
];

// Risk correlation data
const riskCorrelationData = [
  { x: 35, y: 30, z: 5000, name: 'Interest Rate' },
  { x: 45, y: 60, z: 9000, name: 'Credit Default' },
  { x: 60, y: 40, z: 7000, name: 'Market Volatility' },
  { x: 75, y: 65, z: 8000, name: 'Liquidity' },
  { x: 50, y: 75, z: 4000, name: 'Operational' },
  { x: 65, y: 85, z: 6000, name: 'FX Exposure' },
  { x: 80, y: 45, z: 10000, name: 'Compliance' },
];

// Anomaly detection data
const anomalyDetectionData = [
  { date: '01/01', value: 120, threshold: 150, isAnomaly: false },
  { date: '01/02', value: 132, threshold: 150, isAnomaly: false },
  { date: '01/03', value: 101, threshold: 150, isAnomaly: false },
  { date: '01/04', value: 134, threshold: 150, isAnomaly: false },
  { date: '01/05', value: 90, threshold: 150, isAnomaly: false },
  { date: '01/06', value: 230, threshold: 150, isAnomaly: true },
  { date: '01/07', value: 210, threshold: 150, isAnomaly: true },
  { date: '01/08', value: 120, threshold: 150, isAnomaly: false },
  { date: '01/09', value: 132, threshold: 150, isAnomaly: false },
  { date: '01/10', value: 101, threshold: 150, isAnomaly: false },
  { date: '01/11', value: 134, threshold: 150, isAnomaly: false },
  { date: '01/12', value: 90, threshold: 150, isAnomaly: false },
  { date: '01/13', value: 110, threshold: 150, isAnomaly: false },
  { date: '01/14', value: 301, threshold: 150, isAnomaly: true },
];

// Risk radar data
const riskRadarData = [
  {
    subject: 'Market Risk',
    current: 80,
    industry: 65,
    fullMark: 100,
  },
  {
    subject: 'Credit Risk',
    current: 65,
    industry: 59,
    fullMark: 100,
  },
  {
    subject: 'Liquidity Risk',
    current: 45,
    industry: 60,
    fullMark: 100,
  },
  {
    subject: 'Operational Risk',
    current: 30,
    industry: 40,
    fullMark: 100,
  },
  {
    subject: 'Compliance Risk',
    current: 70,
    industry: 68,
    fullMark: 100,
  },
  {
    subject: 'Strategic Risk',
    current: 55,
    industry: 62,
    fullMark: 100,
  },
];

const keyPerformanceIndicators = [
  { name: "Return on Assets", value: "5.8%", change: "+0.3%", status: "positive" },
  { name: "Debt-to-Equity", value: "0.47", change: "-0.05", status: "positive" },
  { name: "Working Capital", value: "$12.4M", change: "+$1.2M", status: "positive" },
  { name: "Days Payable", value: "32 days", change: "-2 days", status: "positive" },
  { name: "Cash Conversion", value: "18 days", change: "+3 days", status: "negative" },
];

const recentReports = [
  { id: 1, name: "Q2 2023 Financial Performance", type: "Quarterly", date: "Jul 15, 2023", status: "Final" },
  { id: 2, name: "Treasury Investment Analysis", type: "Ad-hoc", date: "Aug 03, 2023", status: "Draft" },
  { id: 3, name: "Cash Position Forecast", type: "Monthly", date: "Aug 05, 2023", status: "Final" },
  { id: 4, name: "Liquidity Risk Assessment", type: "Quarterly", date: "Jul 20, 2023", status: "Final" },
  { id: 5, name: "FX Exposure Summary", type: "Weekly", date: "Aug 08, 2023", status: "Draft" },
];

export const ReportsTabContent = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeFrame, setTimeFrame] = useState("quarterly");

  const formatCurrency = (value: number | string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(Number(value));
  };

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <ReportsHeader 
        isRefreshing={isRefreshing} 
        setIsRefreshing={setIsRefreshing} 
      />

      {/* KPI Cards */}
      <KeyPerformanceIndicators indicators={keyPerformanceIndicators} />

      {/* Charts Grid */}
      <ChartsGrid 
        transactionReportData={transactionReportData}
        cashflowReportData={cashflowReportData}
        formatCurrency={formatCurrency}
      />

      {/* Annual Financial Trend Analysis */}
      <FinancialTrendsChart 
        data={yearlyTrendData}
        timeFrame={timeFrame}
        setTimeFrame={setTimeFrame}
        formatCurrency={formatCurrency}
      />

      {/* AI-Powered Predictive Analytics Section */}
      <AIAnalyticsPanel 
        forecastData={forecastData}
        riskCorrelationData={riskCorrelationData}
        anomalyDetectionData={anomalyDetectionData}
        riskRadarData={riskRadarData}
        formatCurrency={formatCurrency}
      />

      {/* Risk Assessment Dashboard */}
      <RiskAssessmentDashboard riskRadarData={riskRadarData} />

      {/* Recent Reports Table */}
      <RecentReportsTable reports={recentReports} />

      {/* Scheduled Reports */}
      <ScheduledReportsPanel />
    </div>
  );
};
