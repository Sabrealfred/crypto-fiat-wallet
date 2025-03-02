
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Globe, LucideIcon } from "lucide-react";

interface PaymentFormHeaderProps {
  title: string;
  icon: LucideIcon;
}

export function PaymentFormHeader({ title, icon: Icon }: PaymentFormHeaderProps) {
  return (
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-primary" />
        {title}
      </CardTitle>
    </CardHeader>
  );
}

export const DomesticPaymentHeader = () => (
  <PaymentFormHeader title="Domestic Payment Details" icon={Building} />
);

export const InternationalPaymentHeader = () => (
  <PaymentFormHeader title="International Payment Details" icon={Globe} />
);
