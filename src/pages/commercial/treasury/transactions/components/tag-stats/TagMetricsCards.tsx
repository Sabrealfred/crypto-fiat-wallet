
import { Card } from "@/components/ui/card";

interface TagMetricsCardsProps {
  totalTags: number;
  taggedTransactions: number;
  untaggedTransactions: number;
}

export function TagMetricsCards({
  totalTags,
  taggedTransactions,
  untaggedTransactions,
}: TagMetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="p-4 bg-muted/50">
        <h3 className="text-sm font-medium mb-1">Total Tags</h3>
        <p className="text-2xl font-bold">{totalTags}</p>
      </Card>
      
      <Card className="p-4 bg-muted/50">
        <h3 className="text-sm font-medium mb-1">Tagged Transactions</h3>
        <p className="text-2xl font-bold">{taggedTransactions}</p>
      </Card>
      
      <Card className="p-4 bg-muted/50">
        <h3 className="text-sm font-medium mb-1">Untagged Transactions</h3>
        <p className="text-2xl font-bold">{untaggedTransactions}</p>
      </Card>
    </div>
  );
}
