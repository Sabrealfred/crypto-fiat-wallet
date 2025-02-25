
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { TreasuryTransaction } from "@/types/treasury";

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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {transaction ? 'Edit Transaction' : 'Create New Transaction'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="bank_name">Bank Name</Label>
            <Input
              id="bank_name"
              value={formData.bank_name}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                bank_name: e.target.value
              }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                amount: parseFloat(e.target.value)
              }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Input
              id="currency"
              value={formData.currency}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                currency: e.target.value
              }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="transaction_date">Transaction Date</Label>
            <Input
              id="transaction_date"
              type="date"
              value={formData.transaction_date}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                transaction_date: e.target.value
              }))}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                description: e.target.value
              }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                status: e.target.value
              }))}
              required
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : transaction ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
