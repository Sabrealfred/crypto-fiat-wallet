
import { Button } from "@/components/ui/button";
import { Calendar, Filter, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface ReportsHeaderProps {
  isRefreshing: boolean;
  setIsRefreshing: (value: boolean) => void;
}

export const ReportsHeader: React.FC<ReportsHeaderProps> = ({ isRefreshing, setIsRefreshing }) => {
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Report data refreshed successfully");
    }, 1500);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-2xl font-semibold">Treasury Reports</h2>
        <p className="text-muted-foreground">Comprehensive financial reporting and analysis</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="h-4 w-4" />
          Select Date Range
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>
    </div>
  );
};
