
import { 
  Building, 
  LineChart, 
  Banknote,
  Briefcase,
  BarChart3,
  CreditCard,
  Users,
  LayoutDashboard
} from "lucide-react";
import { NavItem } from "./commercial/NavItem";

interface EnterpriseSolutionsNavigationProps {
  isCollapsed: boolean;
}

export function EnterpriseSolutionsNavigation({ isCollapsed }: EnterpriseSolutionsNavigationProps) {
  return (
    <div className="space-y-1 py-2">
      <NavItem
        path="/commercial/dashboard"
        icon={LayoutDashboard}
        label="Dashboard"
        isCollapsed={isCollapsed}
      />
      <NavItem
        path="/treasury"
        icon={Banknote}
        label="Treasury Management"
        isCollapsed={isCollapsed}
      />
      <NavItem
        path="/entity-management"
        icon={Building}
        label="Entity Management"
        isCollapsed={isCollapsed}
      />
      <NavItem
        path="/investments"
        icon={LineChart}
        label="Investments"
        isCollapsed={isCollapsed}
      />
      <NavItem
        path="/payment-processor"
        icon={CreditCard}
        label="Payment Processor"
        isCollapsed={isCollapsed}
      />
      <NavItem
        path="/operations"
        icon={Briefcase}
        label="Operations"
        isCollapsed={isCollapsed}
      />
      <NavItem
        path="/risk-management"
        icon={BarChart3}
        label="Risk Management"
        isCollapsed={isCollapsed}
      />
      <NavItem
        path="/landing"
        icon={Users}
        label="Back to Home"
        isCollapsed={isCollapsed}
      />
    </div>
  );
}
