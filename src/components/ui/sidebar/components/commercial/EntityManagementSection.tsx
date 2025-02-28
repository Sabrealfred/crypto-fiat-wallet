
import { Building2, Database, BriefcaseBusiness } from "lucide-react";
import { NavItem } from "./NavItem";

interface EntityManagementSectionProps {
  isCollapsed: boolean;
}

export function EntityManagementSection({ isCollapsed }: EntityManagementSectionProps) {
  return (
    <>
      <NavItem 
        path="/commercial/operations/accounts" 
        icon={Building2} 
        label="Entity Management" 
        isCollapsed={isCollapsed} 
      />
      <NavItem 
        path="/commercial/operations/accounts/subsidiaries" 
        icon={Building2} 
        label="Subsidiary Management" 
        isCollapsed={isCollapsed} 
        isNested 
      />
      <NavItem 
        path="/commercial/operations/accounts/metadata" 
        icon={Database} 
        label="Custom Metadata" 
        isCollapsed={isCollapsed} 
        isNested 
      />
      <NavItem 
        path="/commercial/operations/accounts/relationships" 
        icon={BriefcaseBusiness} 
        label="Relationship Mapping" 
        isCollapsed={isCollapsed} 
        isNested 
      />
    </>
  );
}
