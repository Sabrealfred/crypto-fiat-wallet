
import { Brain, Wallet, LineChart } from "lucide-react";
import { NavItem } from "./NavItem";

interface AIInsightsSectionProps {
  isCollapsed: boolean;
}

export function AIInsightsSection({ isCollapsed }: AIInsightsSectionProps) {
  return (
    <>
      <NavItem 
        path="/commercial/fund-management/ai-insights" 
        icon={Brain} 
        label="AI Insights" 
        isCollapsed={isCollapsed} 
      />
      <NavItem 
        path="/commercial/fund-management/ai-insights/nlp" 
        icon={Brain} 
        label="Natural Language Processing" 
        isCollapsed={isCollapsed} 
        isNested 
      />
      <NavItem 
        path="/commercial/fund-management/ai-insights/cash" 
        icon={Wallet} 
        label="Cash Insights" 
        isCollapsed={isCollapsed} 
        isNested 
      />
      <NavItem 
        path="/commercial/fund-management/ai-insights/recommendations" 
        icon={LineChart} 
        label="AI Recommendations" 
        isCollapsed={isCollapsed} 
        isNested 
      />
    </>
  );
}
