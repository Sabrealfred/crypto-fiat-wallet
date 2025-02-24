
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminDashboard() {
  const { data: accountsData, isLoading: isLoadingAccounts } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("accounts")
        .select("*");
      if (error) throw error;
      return data;
    },
  });

  const { data: usersData, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*");
      if (error) throw error;
      return data;
    },
  });

  if (isLoadingAccounts || isLoadingUsers) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vista General</TabsTrigger>
          <TabsTrigger value="users">Usuarios</TabsTrigger>
          <TabsTrigger value="accounts">Cuentas</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-2">Total de Usuarios</h3>
              <p className="text-3xl font-bold">{usersData?.length || 0}</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-2">Total de Cuentas</h3>
              <p className="text-3xl font-bold">{accountsData?.length || 0}</p>
            </Card>
            <Card className="p-4">
              <h3 className="font-semibold text-lg mb-2">Balance Total</h3>
              <p className="text-3xl font-bold">
                ${accountsData?.reduce((acc, curr) => acc + (curr.balance || 0), 0).toLocaleString()}
              </p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-lg mb-4">Listado de Usuarios</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Nombre</th>
                    <th className="text-left p-2">Apellido</th>
                    <th className="text-left p-2">Estado KYC</th>
                    <th className="text-left p-2">Moneda</th>
                  </tr>
                </thead>
                <tbody>
                  {usersData?.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-2">{user.first_name}</td>
                      <td className="p-2">{user.last_name}</td>
                      <td className="p-2">{user.kyc_status}</td>
                      <td className="p-2">{user.preferred_currency}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="accounts" className="space-y-4">
          <Card className="p-4">
            <h3 className="font-semibold text-lg mb-4">Listado de Cuentas</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">Número</th>
                    <th className="text-left p-2">Tipo</th>
                    <th className="text-left p-2">Balance</th>
                    <th className="text-left p-2">Moneda</th>
                    <th className="text-left p-2">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {accountsData?.map((account) => (
                    <tr key={account.id} className="border-b">
                      <td className="p-2">{account.account_number}</td>
                      <td className="p-2">{account.account_type}</td>
                      <td className="p-2">${account.balance?.toLocaleString()}</td>
                      <td className="p-2">{account.currency}</td>
                      <td className="p-2">{account.is_active ? "Activo" : "Inactivo"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
