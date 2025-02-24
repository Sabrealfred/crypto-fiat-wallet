
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Transaction {
  id: string;
  created_at: string;
  amount: number;
  transaction_type: string;
  status: string;
  recipient_address: string | null;
  currency: string;
  user_id: string;
  wallet_id: string;
  updated_at: string;
}

interface TransactionHistoryModalProps {
  accountId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function TransactionHistoryModal({ accountId, isOpen, onClose }: TransactionHistoryModalProps) {
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["account-transactions", accountId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .or(`wallet_id.eq.${accountId}`)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Transaction[];
    },
    enabled: isOpen && !!accountId,
  });

  const getTransactionStatus = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-500">Completada</Badge>;
      case "pending":
        return <Badge variant="secondary">Pendiente</Badge>;
      case "failed":
        return <Badge variant="destructive">Fallida</Badge>;
      default:
        return <Badge variant="outline">Desconocido</Badge>;
    }
  };

  const formatAmount = (amount: number, type: string, currency: string) => {
    const formatter = new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency,
    });
    return `${type === 'deposit' ? '+' : '-'} ${formatter.format(Math.abs(amount))}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Historial de Transacciones</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center p-4">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Fecha</th>
                  <th className="text-left p-2">Tipo</th>
                  <th className="text-right p-2">Monto</th>
                  <th className="text-left p-2">Estado</th>
                  <th className="text-left p-2">Dirección Destino</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="p-2">
                      {new Date(transaction.created_at).toLocaleString()}
                    </td>
                    <td className="p-2 capitalize">{transaction.transaction_type}</td>
                    <td className="p-2 text-right">
                      <span className={transaction.transaction_type === 'deposit' ? 'text-green-600' : 'text-red-600'}>
                        {formatAmount(transaction.amount, transaction.transaction_type, transaction.currency)}
                      </span>
                    </td>
                    <td className="p-2">
                      {getTransactionStatus(transaction.status)}
                    </td>
                    <td className="p-2">
                      {transaction.recipient_address || 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
