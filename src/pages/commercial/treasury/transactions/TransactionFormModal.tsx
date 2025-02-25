
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { TreasuryTransaction } from "@/types/treasury";
import { TransactionForm } from "./components/form/TransactionForm";

interface TransactionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: TreasuryTransaction;
  onSuccess: () => void;
}

export function TransactionFormModal({
  isOpen,
  onClose,
  transaction,
  onSuccess
}: TransactionFormModalProps) {
  const [formData, setFormData] = useState({
    bank_name: transaction?.bank_name || "",
    amount: transaction?.amount || 0,
    currency: transaction?.currency || "USD",
    transaction_date: transaction?.transaction_date?.split('T')[0] || new Date().toISOString().split('T')[0],
    description: transaction?.description || "",
    status: transaction?.status || "pending"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (transaction?.id) {
        const { error } = await supabase
          .from('treasury_transactions')
          .update(formData)
          .eq('id', transaction.id);

        if (error) throw error;
        toast.success("Transaction updated successfully");
      } else {
        const { error } = await supabase
          .from('treasury_transactions')
          .insert([{
            ...formData,
            entity_id: '1', // This should come from your auth context
            tags: [],
            metadata: {}
          }]);

        if (error) throw error;
        toast.success("Transaction created successfully");
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormChange = (newData: Partial<typeof formData>) => {
    setFormData(prev => ({
      ...prev,
      ...newData
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {transaction ? 'Edit Transaction' : 'Create New Transaction'}
          </DialogTitle>
        </DialogHeader>

        <TransactionForm
          formData={formData}
          onFormChange={handleFormChange}
          onSubmit={handleSubmit}
          onClose={onClose}
          isSubmitting={isSubmitting}
          isEdit={!!transaction}
        />
      </DialogContent>
    </Dialog>
  );
}
