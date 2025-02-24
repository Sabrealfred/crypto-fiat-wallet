
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Transaction {
  id: string;
  created_at: string;
  amount: number;
  type: string;
  status: string;
  description: string;
  currency: string;
  from_account: string;
  to_account: string;
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
        .or(`from_account.eq.${accountId},to_account.eq.${accountId}`)
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
    return `${type === 'credit' ? '+' : '-'} ${formatter.format(Math.abs(amount))}`;
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
                  <th className="text-left p-2">Descripción</th>
                  <th className="text-right p-2">Monto</th>
                  <th className="text-left p-2">Estado</th>
                  <th className="text-left p-2">Cuenta Destino</th>
                </tr>
              </thead>
              <tbody>
                {transactions?.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="p-2">
                      {new Date(transaction.created_at).toLocaleString()}
                    </td>
                    <td className="p-2">{transaction.description}</td>
                    <td className="p-2 text-right">
                      <span className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                        {formatAmount(transaction.amount, transaction.type, transaction.currency)}
                      </span>
                    </td>
                    <td className="p-2">
                      {getTransactionStatus(transaction.status)}
                    </td>
                    <td className="p-2">
                      {transaction.to_account === accountId ? 
                        transaction.from_account : 
                        transaction.to_account}
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
