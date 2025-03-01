import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  MapPin, 
  Calendar, 
  FileText, 
  Link2, 
  Info, 
  AlertTriangle, 
  Check, 
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

// Types
interface EntityData {
  id: number;
  name: string;
  type: string;
  jurisdiction: string;
  status: string;
  registrationNumber: string;
  taxId: string;
  incorporationDate: string;
  address: string;
  industry: string;
  subsidiaries: number;
  description: string;
}

interface EntityCardProps {
  entity: EntityData;
}

// Utility functions
const getStatusBadgeColors = (status: string) => {
  switch (status) {
    case 'active':
      return "bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400";
    case 'inactive':
      return "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900/30 dark:text-gray-400";
    case 'pending':
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400";
    case 'dissolving':
      return "bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400";
    default:
      return "";
  }
};

const getComplianceStatus = () => {
  // This would be based on real compliance data in a production app
  const random = Math.random();
  if (random > 0.7) {
    return { 
      status: "issues", 
      label: "Compliance Issues", 
      color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400", 
      icon: <AlertTriangle className="h-3 w-3" /> 
    };
  } else if (random > 0.3) {
    return { 
      status: "pending", 
      label: "Review Needed", 
      color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400", 
      icon: <Shield className="h-3 w-3" /> 
    };
  } else {
    return { 
      status: "compliant", 
      label: "Fully Compliant", 
      color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400", 
      icon: <Check className="h-3 w-3" /> 
    };
  }
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

const getEntityTypeName = (type: string) => {
  const types: Record<string, string> = {
    'corporation': 'Corporation',
    'llc': 'Limited Liability Company',
    'partnership': 'Partnership',
    'branch': 'Branch Office',
    'representative': 'Representative Office'
  };
  return types[type] || type;
};

// Components
const EntityHeader = ({ entity }: { entity: EntityData }) => {
  return (
    <>
      <div className="flex justify-between items-start mb-2">
        <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 flex items-center gap-1">
          <Building2 className="h-3 w-3" />
          {getEntityTypeName(entity.type)}
        </Badge>
        <Badge 
          variant="outline"
          className={getStatusBadgeColors(entity.status)}
        >
          {entity.status.charAt(0).toUpperCase() + entity.status.slice(1)}
        </Badge>
      </div>
      <h3 className="font-semibold text-lg">{entity.name}</h3>
      <div className="flex items-center gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{entity.industry}</p>
      </div>
    </>
  );
};

const EntityDetails = ({ entity, isExpanded }: { entity: EntityData, isExpanded: boolean }) => {
  const compliance = getComplianceStatus();
  
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-2">
        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
        <span className="text-sm">{getJurisdictionName(entity.jurisdiction)}</span>
      </div>
      <div className="flex items-start gap-2">
        <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
        <span className="text-sm">Reg: {entity.registrationNumber}</span>
      </div>
      <div className="flex items-start gap-2">
        <Calendar className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
        <span className="text-sm">Inc: {new Date(entity.incorporationDate).toLocaleDateString()}</span>
      </div>
      <div className="flex items-start gap-2">
        <Link2 className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
        <span className="text-sm">{entity.subsidiaries} Subsidiaries</span>
      </div>
      
      {/* Compliance Status */}
      <div className="flex items-center justify-between pt-2 pb-1 border-t">
        <span className="text-sm font-medium">Compliance Status:</span>
        <Badge variant="outline" className={`flex items-center gap-1 ${compliance.color}`}>
          {compliance.icon} 
          {compliance.label}
        </Badge>
      </div>
      
      {/* Tax Compliance Progress */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs">
          <span>Tax Compliance</span>
          <span>82%</span>
        </div>
        <div className="w-full bg-blue-100 dark:bg-blue-950 h-1.5 rounded-full">
          <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: '82%' }} />
        </div>
      </div>
      
      {isExpanded && (
        <div className="pt-2 space-y-3 animate-fade-in">
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <span className="text-sm">Tax ID: {entity.taxId}</span>
          </div>
          <div className="flex items-start gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
            <span className="text-sm">Address: {entity.address}</span>
          </div>
          <div className="pt-1">
            <p className="text-sm text-muted-foreground">{entity.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const EntityActions = ({ 
  entity, 
  isExpanded, 
  onToggleExpand, 
  onViewDetails, 
  onViewMetadata, 
  onViewRelationships 
}: { 
  entity: EntityData, 
  isExpanded: boolean, 
  onToggleExpand: () => void,
  onViewDetails: () => void,
  onViewMetadata: () => void,
  onViewRelationships: () => void
}) => {
  return (
    <>
      <Button 
        variant="ghost" 
        size="sm"
        className="w-full text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950 mt-1"
        onClick={onToggleExpand}
      >
        {isExpanded ? "Show Less" : "Show More"}
      </Button>
    
      <Button 
        variant="outline" 
        size="sm" 
        className="w-full justify-start bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 border-blue-200 dark:border-blue-800" 
        onClick={onViewDetails}
      >
        <Info className="h-4 w-4 mr-2" /> View Full Profile
      </Button>
      <div className="flex w-full gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1" 
          onClick={onViewMetadata}
        >
          <FileText className="h-4 w-4 mr-2" /> Metadata
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1" 
          onClick={onViewRelationships}
        >
          <Link2 className="h-4 w-4 mr-2" /> Relationships
        </Button>
      </div>
    </>
  );
};

// Main component
export function EntityCard({ entity }: EntityCardProps) {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleViewDetails = () => {
    toast.info(`Viewing details for ${entity.name}`);
    // This would navigate to entity detail page in a real application
    // navigate(`/commercial/entity-management/entities/${entity.id}`);
  };

  const handleViewMetadata = () => {
    navigate(`/commercial/entity-management/metadata`);
  };

  const handleViewRelationships = () => {
    navigate(`/commercial/entity-management/relationships`);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Card className="border-blue-100 dark:border-blue-800 h-full flex flex-col transition-all duration-300 hover:shadow-md">
      <CardHeader className="pb-2">
        <EntityHeader entity={entity} />
      </CardHeader>
      <CardContent className="flex-grow">
        <EntityDetails entity={entity} isExpanded={isExpanded} />
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-2">
        <Button 
          variant="ghost" 
          size="sm"
          className="w-full text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 hover:bg-blue-50 dark:hover:bg-blue-950 mt-1"
          onClick={handleToggleExpand}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 border-blue-200 dark:border-blue-800" 
          onClick={handleViewDetails}
        >
          <Info className="h-4 w-4 mr-2" /> View Full Profile
        </Button>
        <div className="flex w-full gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1" 
            onClick={handleViewMetadata}
          >
            <FileText className="h-4 w-4 mr-2" /> Metadata
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1" 
            onClick={handleViewRelationships}
          >
            <Link2 className="h-4 w-4 mr-2" /> Relationships
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
