
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { TransactionTable } from "./components/TransactionTable";
import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionTagStats } from "./components/TransactionTagStats";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TransactionFormModal } from "./TransactionFormModal";

export default function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    dateRange: null,
    status: [],
    tags: [],
  });

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Treasury Transactions</h1>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Transaction
          </Button>
        </div>

        <div className="space-y-6">
          <TransactionFilters
            selectedFilters={selectedFilters}
            onFilterChange={setSelectedFilters}
          />

          <TransactionTagStats />

          <TransactionTable filters={selectedFilters} />

          <TransactionFormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSuccess={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </AppLayout>
  );
}
