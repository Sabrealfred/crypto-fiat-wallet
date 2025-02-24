
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Search, PlusCircle, Edit2, Ban, CheckCircle2, History } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Account {
  id: string;
  account_number: string;
  account_type: string;
  business_type: string;
  balance: number;
  currency: string;
  is_active: boolean;
  created_at: string;
  profiles: {
    first_name: string | null;
    last_name: string | null;
  } | null;
}

export default function AccountsPage() {
  const { data: accounts, isLoading } = useQuery({
    queryKey: ["admin-accounts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("accounts")
        .select(`
          *,
          profiles (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Account[];
    },
  });

  const handleAccountStatusChange = async (accountId: string, newStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("accounts")
        .update({ is_active: newStatus })
        .eq("id", accountId);

      if (error) throw error;
      
      toast.success(`Cuenta ${newStatus ? 'activada' : 'desactivada'} exitosamente`);
    } catch (error) {
      toast.error("Error al actualizar el estado de la cuenta");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Cuentas</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Cuenta
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Input 
              placeholder="Buscar cuentas..." 
              className="w-full pl-10"
            />
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-500" />
          </div>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Tipo de cuenta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="savings">Ahorros</SelectItem>
              <SelectItem value="checking">Corriente</SelectItem>
              <SelectItem value="investment">Inversión</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Activa</SelectItem>
              <SelectItem value="inactive">Inactiva</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Número de Cuenta</th>
                <th className="text-left p-2">Titular</th>
                <th className="text-left p-2">Tipo</th>
                <th className="text-right p-2">Balance</th>
                <th className="text-left p-2">Estado</th>
                <th className="text-left p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {accounts?.map((account) => (
                <tr key={account.id} className="border-b">
                  <td className="p-2">{account.account_number}</td>
                  <td className="p-2">
                    {account.profiles ? 
                      `${account.profiles.first_name} ${account.profiles.last_name}` : 
                      'N/A'}
                  </td>
                  <td className="p-2 capitalize">{account.account_type}</td>
                  <td className="p-2 text-right">
                    {new Intl.NumberFormat('es-ES', {
                      style: 'currency',
                      currency: account.currency
                    }).format(account.balance)}
                  </td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      account.is_active ? 
                        'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'
                    }`}>
                      {account.is_active ? 'Activa' : 'Inactiva'}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" title="Editar">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        title={account.is_active ? "Desactivar" : "Activar"}
                        onClick={() => handleAccountStatusChange(account.id, !account.is_active)}
                      >
                        {account.is_active ? 
                          <Ban className="h-4 w-4 text-red-500" /> : 
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        }
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        title="Ver historial"
                      >
                        <History className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
