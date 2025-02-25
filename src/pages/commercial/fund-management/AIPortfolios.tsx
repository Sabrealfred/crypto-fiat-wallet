
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Button } from "@/components/ui/button";
import { Settings, RefreshCw, Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AllocationChart } from "./components/AllocationChart";
import { RecommendationsList } from "./components/RecommendationsList";
import { useAIAnalysis } from "./hooks/useAIAnalysis";

const initialAllocation = [
  { name: 'US Equities', value: 45 },
  { name: 'International', value: 25 },
  { name: 'Fixed Income', value: 20 },
  { name: 'Alternative', value: 10 },
];

export default function AIPortfolios() {
  const [allocationData] = useState(initialAllocation);
  const { isLoading, recommendations, runAnalysis } = useAIAnalysis();
  const { toast } = useToast();

  const handleRunAnalysis = async () => {
    const result = await runAnalysis(allocationData);
    
    if (result.success) {
      toast({
        title: "AI Analysis Complete",
        description: "Portfolio recommendations have been updated.",
        duration: 3000,
      });
    } else {
      toast({
        title: "Error",
        description: result.error?.message || "Failed to complete AI analysis. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="AI Portfolio Management" 
          description="AI-driven portfolio analysis and rebalancing"
        />

        <div className="grid lg:grid-cols-2 gap-6">
          <AllocationChart allocationData={allocationData} />
          <RecommendationsList recommendations={recommendations} />
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configure AI Parameters
          </Button>
          <Button 
            onClick={handleRunAnalysis} 
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="mr-2 h-4 w-4" />
            )}
            Run AI Analysis
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
