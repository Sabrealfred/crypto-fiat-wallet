
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Insight } from "./types";

interface InsightCardProps {
  insight: Insight;
}

export const InsightCard = ({ insight }: InsightCardProps) => {
  const getInsightBadgeColor = (type: Insight["type"]) => {
    switch (type) {
      case "positive":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "negative":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "neutral":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    }
  };

  return (
    <div key={insight.id} className="p-4 border rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{insight.title}</h3>
          <p className="text-sm text-muted-foreground">{insight.description}</p>
          <div className="mt-2 flex items-center gap-2">
            <Badge className={getInsightBadgeColor(insight.type)}>
              {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Generated on {insight.generatedDate}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground block">Relevance Score</span>
          <div className="flex items-center gap-1">
            <Progress value={insight.relevanceScore * 100} className="w-20" />
            <span className="text-sm">{Math.round(insight.relevanceScore * 100)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
