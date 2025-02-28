
import { DollarSign, LineChart, BarChart } from "lucide-react";
import { NavItem } from "./NavItem";

interface InvestmentSectionProps {
  isCollapsed: boolean;
}

export function InvestmentSection({ isCollapsed }: InvestmentSectionProps) {
  return (
    <>
      <NavItem 
        path="/commercial/fund-management" 
        icon={DollarSign} 
        label="Investment Management" 
        isCollapsed={isCollapsed} 
      />
      <NavItem 
        path="/commercial/fund-management/portfolios" 
        icon={LineChart} 
        label="Portfolio Analysis" 
        isCollapsed={isCollapsed} 
        isNested 
      />
      <NavItem 
        path="/commercial/fund-management/opportunities" 
        icon={DollarSign} 
        label="Investment Opportunities" 
        isCollapsed={isCollapsed} 
        isNested 
      />
      <NavItem 
        path="/commercial/fund-management/performance" 
        icon={BarChart} 
        label="Performance Tracking" 
        isCollapsed={isCollapsed} 
        isNested 
      />
    </>
  );
}
