
import { Button } from "@/components/ui/button";
import { FileDown, Plus } from "lucide-react";
import { TreasuryTransaction } from "@/types/treasury";

interface TransactionActionsProps {
  onExport: () => void;
  onCreateNew: () => void;
  transactions: TreasuryTransaction[];
}

export function TransactionActions({
  onExport,
  onCreateNew,
  transactions
}: TransactionActionsProps) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-3xl font-bold">Treasury Transactions</h1>
        <p className="text-muted-foreground mt-2">
          View and manage treasury transactions
        </p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={onExport}>
          <FileDown className="mr-2 h-4 w-4" />
          Export
        </Button>
        <Button onClick={onCreateNew}>
          <Plus className="mr-2 h-4 w-4" />
          New Transaction
        </Button>
      </div>
    </div>
  );
}
