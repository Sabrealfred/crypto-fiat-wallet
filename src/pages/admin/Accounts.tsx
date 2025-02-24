
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Search, PlusCircle, Edit2, Ban, CheckCircle2, History } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type AccountType = 'savings' | 'checking' | 'investment' | 'credit';
type BusinessType = 'personal' | 'business' | 'commercial' | 'private_banking';

interface Account {
  id: string;
  account_number: string;
  account_type: AccountType;
  business_type: BusinessType;
  balance: number;
  currency: string;
  is_active: boolean;
  created_at: string;
  profiles: {
    first_name: string | null;
    last_name: string | null;
  };
  user_id: string;
}

interface AccountFormData {
  account_number: string;
  account_type: AccountType;
  business_type: BusinessType;
  user_id?: string;
  currency: string;
}

export default function AccountsPage() {
  const [search, setSearch] = useState("");
  const [accountTypeFilter, setAccountTypeFilter] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);

  const { data: accounts, isLoading, refetch } = useQuery({
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
      return (data || []) as unknown as Account[];
    },
  });

  const { data: users } = useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, first_name, last_name");
      
      if (error) throw error;
      return data;
    },
  });

  const filteredAccounts = accounts?.filter(account => {
    const matchesSearch = search === "" || 
      account.account_number.toLowerCase().includes(search.toLowerCase()) ||
      `${account.profiles?.first_name} ${account.profiles?.last_name}`.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = accountTypeFilter === "" || account.account_type === accountTypeFilter;
    const matchesStatus = statusFilter === "" || 
      (statusFilter === "active" ? account.is_active : !account.is_active);

    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAccountStatusChange = async (accountId: string, newStatus: boolean) => {
    try {
      const { error } = await supabase
        .from("accounts")
        .update({ is_active: newStatus })
        .eq("id", accountId);

      if (error) throw error;
      
      await refetch();
      toast.success(`Cuenta ${newStatus ? 'activada' : 'desactivada'} exitosamente`);
    } catch (error) {
      toast.error("Error al actualizar el estado de la cuenta");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const accountData: AccountFormData = {
      account_number: formData.get("account_number") as string,
      account_type: formData.get("account_type") as AccountType,
      business_type: formData.get("business_type") as BusinessType,
      user_id: formData.get("user_id") as string,
      currency: formData.get("currency") as string || "USD",
    };

    try {
      if (selectedAccount) {
        // Actualizar cuenta existente
        const { error } = await supabase
          .from("accounts")
          .update(accountData)
          .eq("id", selectedAccount.id);

        if (error) throw error;
        toast.success("Cuenta actualizada exitosamente");
      } else {
        // Crear nueva cuenta
        const { error } = await supabase
          .from("accounts")
          .insert({
            ...accountData,
            balance: 0,
            is_active: true,
          });

        if (error) throw error;
        toast.success("Cuenta creada exitosamente");
      }

      setIsDialogOpen(false);
      setSelectedAccount(null);
      await refetch();
    } catch (error) {
      toast.error(selectedAccount ? "Error al actualizar la cuenta" : "Error al crear la cuenta");
    }
  };

  const handleEdit = (account: Account) => {
    setSelectedAccount(account);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Cuentas</h1>
        <Button onClick={() => {
          setSelectedAccount(null);
          setIsDialogOpen(true);
        }}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Nueva Cuenta
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {selectedAccount ? 'Editar Cuenta' : 'Crear Nueva Cuenta'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <label htmlFor="account_number">Número de Cuenta</label>
                <Input 
                  id="account_number" 
                  name="account_number" 
                  defaultValue={selectedAccount?.account_number}
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="account_type">Tipo de Cuenta</label>
                <Select 
                  name="account_type" 
                  defaultValue={selectedAccount?.account_type}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="savings">Ahorros</SelectItem>
                    <SelectItem value="checking">Corriente</SelectItem>
                    <SelectItem value="investment">Inversión</SelectItem>
                    <SelectItem value="credit">Crédito</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="business_type">Tipo de Negocio</label>
                <Select 
                  name="business_type"
                  defaultValue={selectedAccount?.business_type}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="personal">Personal</SelectItem>
                    <SelectItem value="business">Negocio</SelectItem>
                    <SelectItem value="commercial">Comercial</SelectItem>
                    <SelectItem value="private_banking">Banca Privada</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="user_id">Usuario</label>
                <Select 
                  name="user_id"
                  defaultValue={selectedAccount?.user_id}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar usuario" />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="currency">Moneda</label>
                <Select 
                  name="currency" 
                  defaultValue={selectedAccount?.currency || "USD"}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar moneda" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-4">
              <Button type="button" variant="outline" onClick={() => {
                setIsDialogOpen(false);
                setSelectedAccount(null);
              }}>
                Cancelar
              </Button>
              <Button type="submit">
                {selectedAccount ? 'Guardar Cambios' : 'Crear Cuenta'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Card className="p-4">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Input 
              placeholder="Buscar cuentas..." 
              className="w-full pl-10"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-500" />
          </div>
          <Select value={accountTypeFilter} onValueChange={setAccountTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Tipo de cuenta" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              <SelectItem value="savings">Ahorros</SelectItem>
              <SelectItem value="checking">Corriente</SelectItem>
              <SelectItem value="investment">Inversión</SelectItem>
              <SelectItem value="credit">Crédito</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
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
              {filteredAccounts?.map((account) => (
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
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Editar"
                        onClick={() => handleEdit(account)}
                      >
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
