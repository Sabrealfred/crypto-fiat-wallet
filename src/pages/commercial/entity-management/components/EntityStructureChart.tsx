
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, ChevronDown, ChevronRight, Link2, MapPin } from "lucide-react";
import { useState } from "react";

interface Entity {
  id: number;
  name: string;
  type: string;
  jurisdiction: string;
  subsidiaries?: number;
}

interface EntityStructureChartProps {
  entities?: Entity[];
  fullSize?: boolean;
}

export function EntityStructureChart({ entities = [], fullSize = false }: EntityStructureChartProps) {
  const [expandedNodes, setExpandedNodes] = useState<Record<number, boolean>>({1: true});
  
  const toggleNode = (id: number) => {
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  const getEntityTypeIcon = (type: string) => {
    switch (type) {
      case 'corporation':
        return <Building2 className="h-4 w-4 text-blue-600" />;
      case 'branch':
        return <MapPin className="h-4 w-4 text-green-600" />;
      case 'representative':
        return <MapPin className="h-4 w-4 text-purple-600" />;
      default:
        return <Building2 className="h-4 w-4 text-blue-600" />;
    }
  };

  // If no entities provided, use demo data
  const demoEntities = entities.length > 0 ? entities : [
    { id: 1, name: "Global Holdings Corp", type: "corporation", jurisdiction: "US", subsidiaries: 4 },
    { id: 2, name: "European Ventures Ltd", type: "corporation", jurisdiction: "UK", subsidiaries: 2 },
    { id: 3, name: "Pacific Partners LLC", type: "llc", jurisdiction: "Singapore", subsidiaries: 1 },
    { id: 4, name: "Emerging Markets SA", type: "corporation", jurisdiction: "Brazil", subsidiaries: 0 },
    { id: 5, name: "Northern Investments GmbH", type: "corporation", jurisdiction: "Germany", subsidiaries: 0 }
  ];

  // Create hierarchy
  const rootEntity = demoEntities[0];
  const childEntities = demoEntities.slice(1);
  
  return (
    <Card className={fullSize ? "w-full h-[700px]" : "w-full"}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Link2 className="h-5 w-5 text-blue-600" />
          Entity Structure
        </CardTitle>
      </CardHeader>
      <CardContent className={fullSize ? "overflow-auto h-[630px]" : ""}>
        <div className={`py-2 ${fullSize ? "min-w-[1000px]" : ""}`}>
          <div className="flex flex-col items-start">
            {/* Root Node */}
            <div className="pl-4 flex items-center py-2">
              <button
                className="w-5 h-5 flex items-center justify-center rounded-sm hover:bg-muted mr-2"
                onClick={() => toggleNode(rootEntity.id)}
              >
                {expandedNodes[rootEntity.id] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
              <div className="flex items-center p-2 px-4 border rounded-lg bg-primary/5 font-medium">
                <span className="mr-2">{getEntityTypeIcon(rootEntity.type)}</span>
                <span>{rootEntity.name}</span>
                <span className="ml-2 text-xs text-muted-foreground">({rootEntity.jurisdiction})</span>
              </div>
            </div>
            
            {/* First Level */}
            {expandedNodes[rootEntity.id] && (
              <div className="pl-8 border-l-2 border-dotted border-muted ml-6 mt-1">
                {childEntities.map((entity, index) => (
                  <div key={entity.id} className="relative mb-4">
                    <div className="absolute left-0 top-4 w-6 h-px border-t-2 border-dotted border-muted"></div>
                    <div className="flex flex-col">
                      <div className="flex items-center py-2">
                        <button
                          className="w-5 h-5 flex items-center justify-center rounded-sm hover:bg-muted mr-2"
                          onClick={() => toggleNode(entity.id)}
                          disabled={entity.subsidiaries === 0}
                        >
                          {entity.subsidiaries > 0 ? (
                            expandedNodes[entity.id] ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )
                          ) : (
                            <span className="w-4"></span>
                          )}
                        </button>
                        <div className="flex items-center p-2 px-4 border rounded-lg bg-muted/50">
                          <span className="mr-2">{getEntityTypeIcon(entity.type)}</span>
                          <span>{entity.name}</span>
                          <span className="ml-2 text-xs text-muted-foreground">({entity.jurisdiction})</span>
                        </div>
                      </div>
                      
                      {/* Second Level - Demo Subsidiaries */}
                      {expandedNodes[entity.id] && entity.subsidiaries > 0 && (
                        <div className="pl-8 border-l-2 border-dotted border-muted ml-6 mt-1">
                          {Array.from({ length: entity.subsidiaries }).map((_, subIndex) => (
                            <div key={subIndex} className="relative mb-4 last:mb-0">
                              <div className="absolute left-0 top-4 w-6 h-px border-t-2 border-dotted border-muted"></div>
                              <div className="flex items-center py-2">
                                <div className="w-5 h-5 mr-2"></div>
                                <div className="flex items-center p-2 px-4 border rounded-lg">
                                  <span className="mr-2">
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                  </span>
                                  <span>Subsidiary {subIndex + 1}</span>
                                  <span className="ml-2 text-xs text-muted-foreground">(Local)</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        
        {fullSize && (
          <div className="text-center mt-4 text-sm text-muted-foreground">
            <p>Displaying {demoEntities.length} primary entities and their subsidiaries.</p>
            <p>Click the chevron icons to expand or collapse entity branches.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
