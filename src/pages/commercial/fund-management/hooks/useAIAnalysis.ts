
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { parseAIRecommendations, RecommendationType } from "../utils/aiUtils";

interface AllocationData {
  name: string;
  value: number;
}

export function useAIAnalysis() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<RecommendationType[]>([]);

  const runAnalysis = async (allocationData: AllocationData[]) => {
    setIsLoading(true);
    try {
      console.log('Starting AI analysis with data:', {
        currentAllocation: allocationData,
        marketConditions: "Current market shows increased volatility with rising interest rates",
        riskProfile: "Moderate"
      });

      const { data, error } = await supabase.functions.invoke('portfolio-rebalance', {
        body: {
          currentAllocation: allocationData,
          marketConditions: "Current market shows increased volatility with rising interest rates",
          riskProfile: "Moderate"
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('AI analysis response:', data);

      if (!data?.recommendations) {
        throw new Error('No recommendations received from AI analysis');
      }

      const aiRecommendations = parseAIRecommendations(data.recommendations);
      console.log('Parsed recommendations:', aiRecommendations);
      
      setRecommendations(aiRecommendations);
      return { success: true, recommendations: aiRecommendations };
    } catch (error) {
      console.error('Error running AI analysis:', error);
      return { success: false, error };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    recommendations,
    runAnalysis
  };
}
