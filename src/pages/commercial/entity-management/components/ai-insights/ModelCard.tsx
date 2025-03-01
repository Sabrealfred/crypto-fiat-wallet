
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp } from "lucide-react";
import { Model } from "./types";

interface ModelCardProps {
  model: Model;
}

export const ModelCard = ({ model }: ModelCardProps) => {
  return (
    <div key={model.id} className="p-4 border rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{model.name}</h3>
          <p className="text-sm text-muted-foreground">Type: {model.type}</p>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary">
              {model.status.charAt(0).toUpperCase() + model.status.slice(1)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Accuracy: {Math.round(model.accuracy * 100)}%
            </span>
          </div>
        </div>
        <Button variant="ghost">
          <TrendingUp className="h-4 w-4 mr-2" />
          View Metrics
        </Button>
      </div>
    </div>
  );
};
