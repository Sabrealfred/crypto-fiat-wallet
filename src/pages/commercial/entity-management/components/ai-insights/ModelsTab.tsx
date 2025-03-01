
import React from "react";
import { Button } from "@/components/ui/button";
import { Brain, RefreshCw } from "lucide-react";
import { Model } from "./types";
import { ModelCard } from "./ModelCard";

interface ModelsTabProps {
  models: Model[];
  entityName: string;
  isTrainingModel: boolean;
  handleTrainModel: () => void;
}

export const ModelsTab = ({ 
  models, 
  entityName, 
  isTrainingModel, 
  handleTrainModel 
}: ModelsTabProps) => {
  return (
    <>
      <div className="flex justify-end">
        <Button onClick={handleTrainModel} disabled={isTrainingModel}>
          {isTrainingModel ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Training...
            </>
          ) : (
            <>
              <Brain className="mr-2 h-4 w-4" />
              Train New Model
            </>
          )}
        </Button>
      </div>
      {models.length === 0 ? (
        <div className="p-8 text-center border border-dashed rounded-lg">
          <Brain className="h-10 w-10 mx-auto mb-4 text-muted-foreground/60" />
          <h3 className="text-lg font-medium mb-2">No AI models available</h3>
          <p className="text-muted-foreground mb-4">
            Train AI models to gain deeper insights into {entityName}'s data.
          </p>
          <Button onClick={handleTrainModel} disabled={isTrainingModel}>
            {isTrainingModel ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Training...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                Train New Model
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {models.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      )}
    </>
  );
};
