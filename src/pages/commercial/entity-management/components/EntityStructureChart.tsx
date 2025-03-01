
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Building2, ChevronDown, ChevronRight, Dot } from "lucide-react";
import { toast } from "sonner";

interface EntityNode {
  id: number;
  name: string;
  type: string;
  jurisdiction: string;
  children?: EntityNode[];
  expanded?: boolean;
}

// Sample entity structure data
const entityStructureData: EntityNode = {
  id: 1,
  name: "Acme Global Holdings Ltd",
  type: "corporation",
  jurisdiction: "uk",
  expanded: true,
  children: [
    {
      id: 2,
      name: "Acme Financial Services GmbH",
      type: "corporation",
      jurisdiction: "eu",
      expanded: true,
      children: [
        {
          id: 5,
          name: "Acme Financial Services Austria GmbH",
          type: "corporation",
          jurisdiction: "eu",
        }
      ]
    },
    {
      id: 3,
      name: "Acme Tech Solutions Inc",
      type: "corporation",
      jurisdiction: "us",
      expanded: true,
      children: [
        {
          id: 8,
          name: "Acme Digital Innovations LLC",
          type: "llc",
          jurisdiction: "us",
        }
      ]
    },
    {
      id: 4,
      name: "Acme Asia Pacific Pte Ltd",
      type: "corporation",
      jurisdiction: "asia",
      expanded: true,
      children: [
        {
          id: 7,
          name: "Acme China Operations Ltd",
          type: "branch",
          jurisdiction: "asia",
        }
      ]
    },
    {
      id: 6,
      name: "Acme Mexico Operations LLC",
      type: "llc",
      jurisdiction: "latam",
    }
  ]
};

export function EntityStructureChart() {
  const [entityStructure, setEntityStructure] = useState<EntityNode>(entityStructureData);

  const toggleExpand = (nodeId: number, parentNode: EntityNode = entityStructure): EntityNode => {
    if (parentNode.id === nodeId) {
      return { ...parentNode, expanded: !parentNode.expanded };
    }

    if (parentNode.children) {
      return {
        ...parentNode,
        children: parentNode.children.map(child => toggleExpand(nodeId, child))
      };
    }

    return parentNode;
  };

  const handleToggleExpand = (nodeId: number) => {
    setEntityStructure(prevStructure => toggleExpand(nodeId, prevStructure));
  };

  const handleEntityClick = (entity: EntityNode) => {
    toast.info(`Selected entity: ${entity.name}`);
  };

  const renderEntityNode = (node: EntityNode, level: number = 0) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = node.expanded || false;
    
    return (
      <div key={node.id} className="entity-node">
        <div 
          className={`
            flex items-center py-2 px-3 rounded-md hover:bg-muted/50 cursor-pointer
            ${level === 0 ? 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30' : ''}
          `}
          style={{ marginLeft: `${level * 20}px` }}
        >
          {hasChildren ? (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 mr-1"
              onClick={() => handleToggleExpand(node.id)}
            >
              {isExpanded ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          ) : (
            <Dot className="h-6 w-6 mr-1 text-muted-foreground" />
          )}
          
          <Building2 className="h-4 w-4 mr-2 text-blue-600" />
          
          <div className="flex-grow" onClick={() => handleEntityClick(node)}>
            <p className="font-medium text-sm">{node.name}</p>
            <p className="text-xs text-muted-foreground">
              {node.type.charAt(0).toUpperCase() + node.type.slice(1)} | {getJurisdictionName(node.jurisdiction)}
            </p>
          </div>
        </div>
        
        {(hasChildren && isExpanded) && (
          <div className="entity-children">
            {node.children?.map(child => renderEntityNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const getJurisdictionName = (code: string) => {
    const jurisdictions: Record<string, string> = {
      'us': 'United States',
      'uk': 'United Kingdom',
      'eu': 'European Union',
      'asia': 'Asia Pacific',
      'latam': 'Latin America',
      'other': 'Other'
    };
    return jurisdictions[code] || code;
  };

  return (
    <div className="entity-structure-container p-4 bg-muted/10 rounded-lg border border-muted/20">
      <div className="controls mb-4 flex justify-between">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            // Create a deep copy and expand all nodes
            const expandAll = (node: EntityNode): EntityNode => {
              return {
                ...node,
                expanded: true,
                children: node.children ? node.children.map(expandAll) : undefined
              };
            };
            setEntityStructure(expandAll(entityStructure));
          }}
        >
          Expand All
        </Button>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            // Create a deep copy and collapse all nodes except root
            const collapseAll = (node: EntityNode, isRoot: boolean = false): EntityNode => {
              return {
                ...node,
                expanded: isRoot,
                children: node.children ? node.children.map(child => collapseAll(child)) : undefined
              };
            };
            setEntityStructure(collapseAll(entityStructure, true));
          }}
        >
          Collapse All
        </Button>
      </div>
      <div className="entity-tree">
        {renderEntityNode(entityStructure)}
      </div>
    </div>
  );
}
