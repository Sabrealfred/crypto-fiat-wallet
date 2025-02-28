
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-3xl font-bold">Commercial Banking Portal</h1>
        <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">Enterprise Portal</Badge>
      </div>
      <p className="text-muted-foreground text-lg">
        Comprehensive overview of your enterprise operations
      </p>
    </div>
  );
}
