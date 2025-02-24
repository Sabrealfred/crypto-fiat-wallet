
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Account {
  id: string;
  account_number: string;
  balance: number;
  currency: string;
}

export default function TransferPage() {
  const [amount, setAmount] = useState('');
  const [sourceAccount, setSourceAccount] = useState('');
  const [destinationAccount, setDestinationAccount] = useState('');

  const { data: accounts = [], isLoading } = useQuery({
    queryKey: ['user-accounts'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) throw error;
      return data as Account[];
    }
  });

  const handleTransfer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || !sourceAccount || !destinationAccount) {
      toast.error('Por favor complete todos los campos');
      return;
    }

    try {
      const { error } = await supabase
        .from('transfers')
        .insert({
          amount: parseFloat(amount),
          source_wallet_id: sourceAccount,
          destination_details: { account_id: destinationAccount },
          destination_type: 'internal',
          source_currency: 'USD',
          destination_currency: 'USD',
          exchange_rate: 1,
          transfer_method: 'internal'
        });

      if (error) throw error;

      toast.success('Transferencia iniciada exitosamente');
      setAmount('');
      setSourceAccount('');
      setDestinationAccount('');
    } catch (error: any) {
      toast.error('Error al realizar la transferencia: ' + error.message);
    }
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Realizar Transferencia</h1>

      <Card className="p-6">
        <form onSubmit={handleTransfer} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Cuenta Origen</label>
            <Select value={sourceAccount} onValueChange={setSourceAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar cuenta origen" />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.account_number} - {account.currency} {account.balance}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Cuenta Destino</label>
            <Select value={destinationAccount} onValueChange={setDestinationAccount}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar cuenta destino" />
              </SelectTrigger>
              <SelectContent>
                {accounts
                  .filter(account => account.id !== sourceAccount)
                  .map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.account_number} - {account.currency} {account.balance}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Monto</label>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Ingrese el monto"
              min="0"
              step="0.01"
            />
          </div>

          <Button type="submit" className="w-full">
            Realizar Transferencia
          </Button>
        </form>
      </Card>
    </div>
  );
}
