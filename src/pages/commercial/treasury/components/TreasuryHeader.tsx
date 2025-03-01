
import { Button } from "@/components/ui/button";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Calendar, Filter, RefreshCw } from "lucide-react";

export const TreasuryHeader = () => {
  return (
    <>
      <CommercialHeader 
        title="Treasury & Cash Management"
        description="Global financial operations and cash visibility dashboard"
        showBack={true}
      />
      
      <div className="flex items-center gap-2 mt-4 mb-6">
        <Button variant="outline" className="gap-2">
          <Calendar className="h-4 w-4" />
          <span>Nov 25, 2023</span>
        </Button>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
        <Button variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          <span>Refresh</span>
        </Button>
      </div>
    </>
  );
};
