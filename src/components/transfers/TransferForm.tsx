
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { SendHorizontal } from "lucide-react";
import { TransferType, Currency } from "@/types/transfers";
import { toast } from "sonner";
import { z } from "zod";

// Schema de validación
const transferSchema = z.object({
  amount: z.string().min(1, "Amount is required")
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .refine((val) => Number(val) > 0, "Amount must be greater than 0"),
  transferType: z.string().min(1, "Transfer type is required"),
  sourceCurrency: z.string().min(1, "Currency is required"),
  details: z.record(z.string()).optional(),
});

interface TransferFormProps {
  transferTypes?: TransferType[];
  currencies?: Currency[];
  onSubmit: (data: any) => void;
}

export function TransferForm({ transferTypes, currencies, onSubmit }: TransferFormProps) {
  const [amount, setAmount] = useState("");
  const [sourceCurrency, setSourceCurrency] = useState("USD");
  const [selectedTransferType, setSelectedTransferType] = useState<string>("");
  const [transferDetails, setTransferDetails] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const currentTransferType = transferTypes?.find(t => t.id === selectedTransferType);

  const validateForm = () => {
    try {
      transferSchema.parse({
        amount,
        transferType: selectedTransferType,
        sourceCurrency,
        details: transferDetails
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          newErrors[err.path[0].toString()] = err.message;
        });
        setErrors(newErrors);
        toast.error("Please check the form for errors");
      }
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      onSubmit({
        amount,
        sourceCurrency,
        transferType: selectedTransferType,
        details: transferDetails
      });
      toast.success("Transfer initiated successfully");
    } catch (error) {
      toast.error("Failed to process transfer");
    }
  };

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-semibold mb-4">Transfer Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Transfer Type</label>
            <Select value={selectedTransferType} onValueChange={setSelectedTransferType}>
              <SelectTrigger className={errors.transferType ? "border-red-500" : ""}>
                <SelectValue placeholder="Select transfer type" />
              </SelectTrigger>
              <SelectContent>
                {transferTypes?.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.transferType && (
              <p className="text-sm text-red-500 mt-1">{errors.transferType}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Amount</label>
              <div className="relative">
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className={`pl-8 ${errors.amount ? "border-red-500" : ""}`}
                />
                <span className="absolute left-3 top-3 text-muted-foreground">
                  {currencies?.find(c => c.code === sourceCurrency)?.symbol}
                </span>
              </div>
              {errors.amount && (
                <p className="text-sm text-red-500 mt-1">{errors.amount}</p>
              )}
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Currency</label>
              <Select value={sourceCurrency} onValueChange={setSourceCurrency}>
                <SelectTrigger className={errors.sourceCurrency ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies?.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.sourceCurrency && (
                <p className="text-sm text-red-500 mt-1">{errors.sourceCurrency}</p>
              )}
            </div>
          </div>

          {currentTransferType?.requirements && (
            <div className="space-y-4">
              {Object.entries(currentTransferType.requirements).map(([field, required]) => (
                <div key={field}>
                  <label className="text-sm font-medium mb-2 block capitalize">
                    {field.replace(/_/g, ' ')}
                    {required === 'required' && <span className="text-red-500">*</span>}
                  </label>
                  <Input
                    value={transferDetails[field] || ''}
                    onChange={(e) => setTransferDetails(prev => ({
                      ...prev,
                      [field]: e.target.value
                    }))}
                    required={required === 'required'}
                    className={errors[`details.${field}`] ? "border-red-500" : ""}
                  />
                  {errors[`details.${field}`] && (
                    <p className="text-sm text-red-500 mt-1">{errors[`details.${field}`]}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <Button type="submit" className="w-full">
            <SendHorizontal className="w-4 h-4 mr-2" />
            Send Transfer
          </Button>
        </div>
      </form>
    </div>
  );
}
