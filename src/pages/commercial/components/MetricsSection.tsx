
import { ChartPie } from "lucide-react";
import { CommercialMetrics } from "./CommercialMetrics";

export function MetricsSection() {
  return (
    <section className="fade-in">
      <div className="flex items-center gap-2 mb-4">
        <ChartPie className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-semibold">Key Performance Indicators</h2>
      </div>
      <div className="grid gap-4">
        <CommercialMetrics />
      </div>
    </section>
  );
}
