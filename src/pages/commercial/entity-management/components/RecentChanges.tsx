
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { History } from "lucide-react";

interface RelationshipChange {
  id: number;
  date: string;
  entity: string;
  change: string;
  previousValue: string;
}

interface RecentChangesProps {
  relationshipChanges: RelationshipChange[];
}

export const RecentChanges = ({ relationshipChanges }: RecentChangesProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <History className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Recent Relationship Changes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {relationshipChanges.map((change) => (
            <div key={change.id} className="border-b pb-3 last:border-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{change.entity}</p>
                  <p className="text-sm text-muted-foreground">{change.change}</p>
                  <p className="text-xs text-muted-foreground">Previous: {change.previousValue}</p>
                </div>
                <p className="text-sm text-muted-foreground">{new Date(change.date).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
