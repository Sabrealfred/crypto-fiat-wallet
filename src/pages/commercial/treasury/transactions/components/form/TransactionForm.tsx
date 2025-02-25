
import { FormInput } from "./FormInput";
import { FormSelect } from "./FormSelect";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { TreasuryTransaction } from "@/types/treasury";
import { useState } from "react";

interface FormErrors {
  bank_name?: string;
  amount?: string;
  currency?: string;
  transaction_date?: string;
  description?: string;
  status?: string;
}

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
  const [errors, setErrors] = useState<FormErrors>({});

  const statusOptions = [
    { value: "pending", label: "Pending" },
    { value: "completed", label: "Completed" },
    { value: "failed", label: "Failed" },
  ];

  const validateField = (name: string, value: any) => {
    const newErrors: FormErrors = { ...errors };
    
    switch (name) {
      case 'bank_name':
        if (!value.trim()) {
          newErrors.bank_name = 'Bank name is required';
        } else if (value.length < 2) {
          newErrors.bank_name = 'Bank name must be at least 2 characters';
        } else {
          delete newErrors.bank_name;
        }
        break;
      
      case 'amount':
        if (isNaN(value) || value === '') {
          newErrors.amount = 'Amount must be a valid number';
        } else {
          delete newErrors.amount;
        }
        break;
      
      case 'currency':
        if (!value.trim()) {
          newErrors.currency = 'Currency is required';
        } else if (!/^[A-Z]{3}$/.test(value)) {
          newErrors.currency = 'Currency must be a 3-letter code (e.g., USD)';
        } else {
          delete newErrors.currency;
        }
        break;
      
      case 'transaction_date':
        if (!value) {
          newErrors.transaction_date = 'Transaction date is required';
        } else {
          delete newErrors.transaction_date;
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (name: string, value: any) => {
    validateField(name, value);
    onFormChange({ [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const isValid = Object.keys(formData).every(key => 
      validateField(key, formData[key as keyof typeof formData])
    );

    if (isValid) {
      onSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        id="bank_name"
        label="Bank Name"
        value={formData.bank_name}
        onChange={(value) => handleFieldChange('bank_name', value)}
        required
        error={errors.bank_name}
      />

      <FormInput
        id="amount"
        label="Amount"
        value={formData.amount}
        onChange={(value) => handleFieldChange('amount', value)}
        type="number"
        step="0.01"
        required
        error={errors.amount}
      />

      <FormInput
        id="currency"
        label="Currency"
        value={formData.currency}
        onChange={(value) => handleFieldChange('currency', value)}
        required
        error={errors.currency}
      />

      <FormInput
        id="transaction_date"
        label="Transaction Date"
        value={formData.transaction_date}
        onChange={(value) => handleFieldChange('transaction_date', value)}
        type="date"
        required
        error={errors.transaction_date}
      />

      <FormInput
        id="description"
        label="Description"
        value={formData.description}
        onChange={(value) => handleFieldChange('description', value)}
        error={errors.description}
      />

      <FormSelect
        id="status"
        label="Status"
        value={formData.status}
        onChange={(value) => handleFieldChange('status', value)}
        options={statusOptions}
        required
        error={errors.status}
      />

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || Object.keys(errors).length > 0}>
          {isSubmitting ? 'Saving...' : isEdit ? 'Update' : 'Create'}
        </Button>
      </DialogFooter>
    </form>
  );
}
