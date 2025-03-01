
import { ReactNode } from "react";
import { MetricCard } from "./MetricCard";

interface DashboardSectionProps {
  title?: string;
  children: ReactNode;
}

export function DashboardSection({ title, children }: DashboardSectionProps) {
  return (
    <div className="mb-6">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {children}
      </div>
    </div>
  );
}
