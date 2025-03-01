
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Building2 } from "lucide-react";

interface ParentEntity {
  id: number;
  name: string;
  jurisdiction: string;
  registrationNumber: string;
}

interface ParentEntityListProps {
  parentEntities: ParentEntity[];
  selectedParentId: number | null;
  onSelectParent: (parentId: number) => void;
}

export const ParentEntityList = ({
  parentEntities,
  selectedParentId,
  onSelectParent
}: ParentEntityListProps) => {
  return (
    <Card className="md:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Parent Entities
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {parentEntities.map(entity => (
          <button
            key={entity.id}
            className={`w-full text-left p-3 rounded-md transition-colors ${
              selectedParentId === entity.id 
                ? 'bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-600 dark:border-blue-400' 
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
            onClick={() => onSelectParent(entity.id)}
          >
            <p className="font-medium">{entity.name}</p>
            <p className="text-sm text-muted-foreground">{entity.jurisdiction}</p>
          </button>
        ))}
      </CardContent>
    </Card>
  );
};
