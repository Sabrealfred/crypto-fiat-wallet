
import React from "react";
import { Brain, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Insight } from "./types";
import { InsightCard } from "./InsightCard";

interface InsightsTabProps {
  insights: Insight[];
  entityName: string;
}

export const InsightsTab = ({ insights, entityName }: InsightsTabProps) => {
  return (
    <div className="space-y-4">
      {insights.length === 0 ? (
        <div className="p-8 text-center border border-dashed rounded-lg">
          <Brain className="h-10 w-10 mx-auto mb-4 text-muted-foreground/60" />
          <h3 className="text-lg font-medium mb-2">No insights available</h3>
          <p className="text-muted-foreground mb-4">
            AI is analyzing data to generate insights for {entityName}.
          </p>
          <Button disabled>
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating Insights...
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {insights.map((insight) => (
            <InsightCard key={insight.id} insight={insight} />
          ))}
        </div>
      )}
    </div>
  );
};
