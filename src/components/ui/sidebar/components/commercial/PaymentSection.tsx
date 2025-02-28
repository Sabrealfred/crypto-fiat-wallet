
import { CreditCard, Receipt, Globe } from "lucide-react";
import { NavItem } from "./NavItem";

interface PaymentSectionProps {
  isCollapsed: boolean;
}

export function PaymentSection({ isCollapsed }: PaymentSectionProps) {
  return (
    <>
      <NavItem 
        path="/commercial/payment-processor" 
        icon={CreditCard} 
        label="Payment Processing" 
        isCollapsed={isCollapsed} 
      />
      <NavItem 
        path="/commercial/payment-processor/real-time" 
        icon={CreditCard} 
        label="Real-time Payments" 
        isCollapsed={isCollapsed} 
        isNested 
      />
      <NavItem 
        path="/commercial/payment-processor/ach" 
        icon={Receipt} 
        label="ACH Processing" 
        isCollapsed={isCollapsed} 
        isNested 
      />
      <NavItem 
        path="/commercial/payment-processor/cross-border" 
        icon={Globe} 
        label="Cross-border Transfers" 
        isCollapsed={isCollapsed} 
        isNested 
      />
    </>
  );
}
