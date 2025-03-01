
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export interface RelationshipChange {
  id: number;
  date: string;
  entity: string;
  type: string;
  user: string;
  details: string;
  change: string;
  previousValue: string;
}

interface RecentChangesProps {
  relationshipChanges: RelationshipChange[];
}

export function RecentChanges({ relationshipChanges }: RecentChangesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Changes</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0 overflow-hidden">
          {relationshipChanges.slice(0, 4).map((change) => (
            <div key={change.id} className="flex flex-col p-4 border-b last:border-0">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">{change.entity}</span>
                <span className="text-xs text-muted-foreground">{change.date}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{change.details}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400 rounded">
                  {change.type}
                </span>
                <span className="text-xs text-muted-foreground">By {change.user}</span>
              </div>
            </div>
          ))}
          {relationshipChanges.length > 4 && (
            <div className="p-4 text-center">
              <Button variant="ghost" size="sm">View All Changes</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
