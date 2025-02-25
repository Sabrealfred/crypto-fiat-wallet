
import { Card } from "@/components/ui/card";
import { TreasuryTransaction } from "@/types/treasury";

export interface TagMetricsCardsProps {
  totalTags: number;
  taggedTransactions: number;
  untaggedTransactions: number;
  comparisonTransactions?: TreasuryTransaction[];
  showPercentages?: boolean;
}

export function TagMetricsCards({
  totalTags,
  taggedTransactions,
  untaggedTransactions,
  comparisonTransactions = [],
  showPercentages = false
}: TagMetricsCardsProps) {
  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const prevTaggedCount = comparisonTransactions.filter(t => t.tags?.length > 0).length;
  const taggedChange = calculatePercentageChange(taggedTransactions, prevTaggedCount);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Tags Activos</h3>
        <p className="text-2xl font-bold mt-2">{totalTags}</p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Transacciones Etiquetadas</h3>
        <p className="text-2xl font-bold mt-2">
          {taggedTransactions}
          {showPercentages && (
            <span className={`text-sm ml-2 ${taggedChange > 0 ? 'text-green-500' : 'text-red-500'}`}>
              {taggedChange > 0 ? '+' : ''}{taggedChange.toFixed(1)}%
            </span>
          )}
        </p>
      </Card>
      <Card className="p-4">
        <h3 className="text-sm font-medium text-muted-foreground">Sin Etiquetar</h3>
        <p className="text-2xl font-bold mt-2">{untaggedTransactions}</p>
      </Card>
    </div>
  );
}
