
import { BarChart, Brain, LineChart } from "lucide-react";
import { NavItem } from "./NavItem";

interface AnalyticsSectionProps {
  isCollapsed: boolean;
}

export function AnalyticsSection({ isCollapsed }: AnalyticsSectionProps) {
  return (
    <>
      <NavItem 
        path="/commercial/analytics" 
        icon={BarChart} 
        label="Analysis & Forecasting" 
        isCollapsed={isCollapsed} 
      />
      <NavItem 
        path="/commercial/analytics/ml-models" 
        icon={Brain} 
        label="Machine Learning Models" 
        isCollapsed={isCollapsed} 
        isNested 
      />
      <NavItem 
        path="/commercial/analytics/predictive" 
        icon={LineChart} 
        label="Predictive Analysis" 
        isCollapsed={isCollapsed} 
        isNested 
      />
      <NavItem 
        path="/commercial/analytics/trends" 
        icon={BarChart} 
        label="Trend Visualization" 
        isCollapsed={isCollapsed} 
        isNested 
      />
    </>
  );
}
