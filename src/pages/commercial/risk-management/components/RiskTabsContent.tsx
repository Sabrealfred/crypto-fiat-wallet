
import { ReactNode } from "react";

interface RiskTabsContentProps {
  value: string;
  children: ReactNode;
}

export function RiskTabsContent({ value, children }: RiskTabsContentProps) {
  return (
    <div className="space-y-6">
      {children}
    </div>
  );
}
