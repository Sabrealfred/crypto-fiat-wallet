
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface TagStatsHeaderProps {
  onExport: () => void;
}

export function TagStatsHeader({ onExport }: TagStatsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-semibold">Transaction Analysis by Tags</h2>
      <Button onClick={onExport} variant="outline" size="sm">
        <Download className="h-4 w-4 mr-2" />
        Export Stats
      </Button>
    </div>
  );
}
