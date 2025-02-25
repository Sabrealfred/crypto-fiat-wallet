
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TreasuryTransaction } from "@/types/treasury";
import { AppLayout } from "@/components/layout/app-layout";
import { TransactionFormModal } from "./TransactionFormModal";
import { TransactionFilters } from "./components/TransactionFilters";
import { TransactionTable } from "./components/TransactionTable";
import { TransactionActions } from "./components/TransactionActions";

const TransactionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<TreasuryTransaction | undefined>();
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [statusFilter, setStatusFilter] = useState<string>("");

  const { data: transactions = [], isLoading, refetch } = useQuery({
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

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.bank_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm);

    const matchesStatus = !statusFilter || transaction.status === statusFilter;

    const transactionDate = new Date(transaction.transaction_date);
    const matchesDateRange = 
      (!dateRange.from || transactionDate >= new Date(dateRange.from)) &&
      (!dateRange.to || transactionDate <= new Date(dateRange.to));

    return matchesSearch && matchesStatus && matchesDateRange;
  });

  const handleExport = () => {
    const csvContent = [
      ["Date", "Bank", "Description", "Status", "Amount", "Currency"].join(","),
      ...filteredTransactions.map(t => [
        new Date(t.transaction_date).toLocaleDateString(),
        t.bank_name,
        t.description || "",
        t.status,
        t.amount,
        t.currency
      ].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `treasury-transactions-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <TransactionActions
          onExport={handleExport}
          onCreateNew={() => setIsModalOpen(true)}
          transactions={filteredTransactions}
        />

        <TransactionFilters
          searchTerm={searchTerm}
          dateRange={dateRange}
          statusFilter={statusFilter}
          onSearchChange={setSearchTerm}
          onDateRangeChange={setDateRange}
          onStatusChange={setStatusFilter}
        />

        <TransactionTable
          transactions={filteredTransactions}
          isLoading={isLoading}
          onTransactionClick={(transaction) => {
            setSelectedTransaction(transaction);
            setIsModalOpen(true);
          }}
        />

        <TransactionFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTransaction(undefined);
          }}
          transaction={selectedTransaction}
          onSuccess={refetch}
        />
      </div>
    </AppLayout>
  );
};

export default TransactionsPage;
