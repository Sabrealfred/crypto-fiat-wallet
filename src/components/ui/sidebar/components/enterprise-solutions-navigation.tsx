
import { useNavigate } from "react-router-dom";
import {
  Globe,
  BarChart,
  Database,
  DollarSign,
  ShieldCheck,
  CreditCard,
  Building2,
  Brain,
  Code,
  Settings,
  ShoppingCart
} from "lucide-react";
import { NavItem } from "./commercial/NavItem";

interface EnterpriseSolutionsNavigationProps {
  isCollapsed: boolean;
}

export function EnterpriseSolutionsNavigation({ isCollapsed }: EnterpriseSolutionsNavigationProps) {
  const navigate = useNavigate();
  
  return (
    <nav className="space-y-2">
      <NavItem 
        path="/commercial/treasury" 
        icon={Globe} 
        label="Treasury & Cash Management" 
        isCollapsed={isCollapsed} 
      />
      
      <NavItem 
        path="/commercial/analytics" 
        icon={BarChart} 
        label="Analysis & Forecasting" 
        isCollapsed={isCollapsed} 
      />
      
      <NavItem 
        path="/commercial/operations" 
        icon={Database} 
        label="Data Automation & Integration" 
        isCollapsed={isCollapsed} 
      />

      <NavItem 
        path="/commercial/fund-management" 
        icon={DollarSign} 
        label="Investment Management" 
        isCollapsed={isCollapsed} 
      />

      <NavItem 
        path="/commercial/risk-management" 
        icon={ShieldCheck} 
        label="Risk Management" 
        isCollapsed={isCollapsed} 
      />

      <NavItem 
        path="/commercial/payment-processor" 
        icon={CreditCard} 
        label="Payment Processing" 
        isCollapsed={isCollapsed} 
      />

      <NavItem 
        path="/commercial/operations/accounts" 
        icon={Building2} 
        label="Entity Management" 
        isCollapsed={isCollapsed} 
      />

      <NavItem 
        path="/commercial/fund-management/ai-insights" 
        icon={Brain} 
        label="AI Insights" 
        isCollapsed={isCollapsed} 
      />

      <NavItem 
        path="/developer/dashboard" 
        icon={Code} 
        label="Developer Portal" 
        isCollapsed={isCollapsed} 
      />
    </nav>
  );
}
