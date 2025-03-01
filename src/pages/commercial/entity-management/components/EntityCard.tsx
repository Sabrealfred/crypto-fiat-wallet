
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, MapPin, Calendar, FileText, Link2, Info, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface EntityCardProps {
  entity: {
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
  };
}

export function EntityCard({ entity }: EntityCardProps) {
  const navigate = useNavigate();

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

  return (
    <Card className="border-blue-100 dark:border-blue-800 h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
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
        <p className="text-sm text-muted-foreground">{entity.industry}</p>
      </CardHeader>
      <CardContent className="flex-grow">
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
          <div className="pt-2">
            <p className="text-sm text-muted-foreground">{entity.description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 pt-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full justify-start" 
          onClick={handleViewDetails}
        >
          <Info className="h-4 w-4 mr-2" /> View Details
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
