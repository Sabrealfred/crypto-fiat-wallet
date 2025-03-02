
import { Droplets } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface LiquidityHeaderProps {
  timeFrame: string;
  setTimeFrame: (value: string) => void;
}

export function LiquidityHeader({ timeFrame, setTimeFrame }: LiquidityHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        <Droplets className="h-6 w-6 text-blue-600" />
        <h2 className="text-xl font-semibold">Liquidity Dashboard</h2>
      </div>
      <div className="flex gap-2">
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Time Frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1m">1 Month</SelectItem>
            <SelectItem value="3m">3 Months</SelectItem>
            <SelectItem value="6m">6 Months</SelectItem>
            <SelectItem value="1y">1 Year</SelectItem>
            <SelectItem value="all">All Time</SelectItem>
          </SelectContent>
        </Select>
        
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
      </div>
    </div>
  );
}
