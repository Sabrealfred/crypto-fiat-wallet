
import { Wallet, LineChart, Receipt, Globe } from "lucide-react";
import { NavItem } from "./NavItem";

interface TreasurySectionProps {
  isCollapsed: boolean;
}

export function TreasurySection({ isCollapsed }: TreasurySectionProps) {
  return (
    <>
      <NavItem 
        path="/commercial/treasury" 
        icon={Wallet} 
        label="Treasury & Cash Management" 
        isCollapsed={isCollapsed} 
      />
      <NavItem 
        path="/commercial/treasury/cash-flow" 
        icon={LineChart} 
        label="Cash Flow Analysis" 
        isCollapsed={isCollapsed} 
        isNested 
      />
      <NavItem 
        path="/commercial/treasury/transactions" 
        icon={Receipt} 
        label="Transaction Management" 
        isCollapsed={isCollapsed} 
        isNested 
      />
      <NavItem 
        path="/commercial/treasury/fx" 
        icon={Globe} 
        label="FX Operations" 
        isCollapsed={isCollapsed} 
        isNested 
      />
    </>
  );
}
