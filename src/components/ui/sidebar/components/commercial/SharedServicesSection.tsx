
import { History, Code } from "lucide-react";
import { NavItem } from "./NavItem";

interface SharedServicesSectionProps {
  isCollapsed: boolean;
}

export function SharedServicesSection({ isCollapsed }: SharedServicesSectionProps) {
  return (
    <>
      <NavItem 
        path="/commercial/history" 
        icon={History} 
        label="Transaction History" 
        isCollapsed={isCollapsed} 
      />
      <NavItem 
        path="/developer/dashboard" 
        icon={Code} 
        label="Developer Portal" 
        isCollapsed={isCollapsed} 
      />
    </>
  );
}
