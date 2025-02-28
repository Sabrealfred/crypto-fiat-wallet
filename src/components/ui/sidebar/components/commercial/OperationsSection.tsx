
import { Database, Receipt, FileText } from "lucide-react";
import { NavItem } from "./NavItem";

interface OperationsSectionProps {
  isCollapsed: boolean;
}

export function OperationsSection({ isCollapsed }: OperationsSectionProps) {
  return (
    <>
      <NavItem 
        path="/commercial/operations" 
        icon={Database} 
        label="Data Automation & Integration" 
        isCollapsed={isCollapsed} 
      />
      <NavItem 
        path="/commercial/operations/integration" 
        icon={Database} 
        label="Multi-bank Integration" 
        isCollapsed={isCollapsed} 
        isNested 
      />
      <NavItem 
        path="/commercial/operations/real-time" 
        icon={Receipt} 
        label="Real-time Updates" 
        isCollapsed={isCollapsed} 
        isNested 
      />
      <NavItem 
        path="/commercial/operations/normalization" 
        icon={FileText} 
        label="Data Normalization" 
        isCollapsed={isCollapsed} 
        isNested 
      />
    </>
  );
}
