
import { ShieldCheck, FileText, LineChart } from "lucide-react";
import { NavItem } from "./NavItem";

interface RiskManagementSectionProps {
  isCollapsed: boolean;
}

export function RiskManagementSection({ isCollapsed }: RiskManagementSectionProps) {
  return (
    <>
      <NavItem 
        path="/commercial/risk-management" 
        icon={ShieldCheck} 
        label="Risk Management" 
        isCollapsed={isCollapsed} 
      />
      <NavItem 
        path="/commercial/risk-management/assessment" 
        icon={ShieldCheck} 
        label="Risk Assessment" 
        isCollapsed={isCollapsed} 
        isNested 
      />
      <NavItem 
        path="/commercial/risk-management/compliance" 
        icon={FileText} 
        label="Compliance Reporting" 
        isCollapsed={isCollapsed} 
        isNested 
      />
      <NavItem 
        path="/commercial/risk-management/market" 
        icon={LineChart} 
        label="Market Risk Analysis" 
        isCollapsed={isCollapsed} 
        isNested 
      />
    </>
  );
}
