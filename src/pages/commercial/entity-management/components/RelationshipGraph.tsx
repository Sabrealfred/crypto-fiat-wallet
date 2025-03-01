
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Network, ZoomIn, ZoomOut, RefreshCw } from "lucide-react";

export const RelationshipGraph = () => {
  const [zoomLevel, setZoomLevel] = useState(100);
  
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 10, 150));
  };
  
  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 10, 50));
  };
  
  const resetZoom = () => {
    setZoomLevel(100);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Network className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Entity Relationship Graph
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={zoomOut}
              disabled={zoomLevel <= 50}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm">{zoomLevel}%</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={zoomIn}
              disabled={zoomLevel >= 150}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetZoom}
              disabled={zoomLevel === 100}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="w-full h-[400px] bg-muted/20 rounded-md border flex items-center justify-center" style={{ transform: `scale(${zoomLevel / 100})` }}>
          <div className="text-center">
            <Network className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-medium text-lg mb-2">Entity Relationship Visualization</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              In a real application, this would display an interactive graph of entity relationships and ownership structures.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
