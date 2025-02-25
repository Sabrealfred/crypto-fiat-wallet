
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { TreasuryTransaction } from "@/types/treasury";

interface TransactionFormProps {
  formData: {
    bank_name: string;
    amount: number;
    currency: string;
    transaction_date: string;
    description: string;
    status: string;
  };
  onFormChange: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
  isSubmitting: boolean;
  isEdit: boolean;
}

export function TransactionForm({
  formData,
  onFormChange,
  onSubmit,
  onClose,
  isSubmitting,
  isEdit,
}: TransactionFormProps) {
  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "failed", label: "Failed" },
  ];

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormInput
        id="bank_name"
        label="Bank Name"
        value={formData.bank_name}
        onChange={(value) => onFormChange({ bank_name: value })}
        required
      />

      <FormInput
        id="amount"
        label="Amount"
        value={formData.amount}
        onChange={(value) => onFormChange({ amount: value })}
        type="number"
        step="0.01"
        required
      />

      <FormInput
        id="currency"
        label="Currency"
        value={formData.currency}
        onChange={(value) => onFormChange({ currency: value })}
        required
      />

      <FormInput
        id="transaction_date"
        label="Transaction Date"
        value={formData.transaction_date}
        onChange={(value) => onFormChange({ transaction_date: value })}
        type="date"
        required
      />

      <FormInput
        id="description"
        label="Description"
        value={formData.description}
        onChange={(value) => onFormChange({ description: value })}
      />

      <FormSelect
        id="status"
        label="Status"
        value={formData.status}
        onChange={(value) => onFormChange({ status: value })}
        options={statusOptions}
        required
      />

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Create'}
        </Button>
      </DialogFooter>
    </form>
  );
}
