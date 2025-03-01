
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

export type RelationshipChange = {
  id: number;
  date: string;
  entity: string;
  type: string;
  user: string;
  details: string;
  change: string;
  previousValue: string;
};

interface RecentChangesProps {
  relationshipChanges: RelationshipChange[];
}

export function RecentChanges({ relationshipChanges }: RecentChangesProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Recent Changes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {relationshipChanges.map((change) => (
            <div key={change.id} className="border-b pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between">
                <h4 className="font-medium text-sm">{change.entity}</h4>
                <span className="text-xs text-muted-foreground">{change.date}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{change.type}</p>
              <div className="text-xs mt-1">
                <span className="text-muted-foreground">Change: </span>
                {change.change}
              </div>
              <div className="text-xs mt-1">
                <span className="text-muted-foreground">Previous: </span>
                {change.previousValue}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
