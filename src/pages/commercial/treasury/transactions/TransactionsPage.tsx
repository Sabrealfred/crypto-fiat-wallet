
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { TransactionTable } from "./components/TransactionTable";
import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionTagStats } from "./components/TransactionTagStats";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TransactionFormModal } from "./TransactionFormModal";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TreasuryTransaction } from "@/types/treasury";

export default function TransactionsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    dateRange: null,
    status: [] as string[],
    tags: [] as string[],
  });

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ['treasury-transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('treasury_transactions')
        .select('*')
        .order('transaction_date', { ascending: false });
      
      if (error) throw error;
      return data as TreasuryTransaction[];
    }
  });

  const handleTransactionClick = (transaction: TreasuryTransaction) => {
    console.log('Transaction clicked:', transaction);
  };

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
            searchTerm={searchTerm}
            dateRange={selectedFilters.dateRange}
            selectedFilters={selectedFilters}
            onFilterChange={setSelectedFilters}
          />

          <TransactionTagStats />

          <TransactionTable
            transactions={transactions}
            isLoading={isLoading}
            onTransactionClick={handleTransactionClick}
            filters={selectedFilters}
          />

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
