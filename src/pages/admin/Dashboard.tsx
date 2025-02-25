import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ModuleProgress } from "@/components/system/ModuleProgress";
import { AppLayout } from "@/components/layout/app-layout";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from "recharts";
import { Users, CreditCard, Building2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      // En un caso real, estos datos vendrían de la base de datos
      return {
        totalUsers: 1234,
        totalAccounts: 2345,
        totalTransactions: 5678,
        pendingKYC: 45
      };
    }
  });

  const { data: transactionStats } = useQuery({
    queryKey: ["admin-transaction-stats"],
    queryFn: async () => {
      // Datos de ejemplo para los gráficos
      return [
        { name: "Ene", transactions: 400, amount: 2400 },
        { name: "Feb", transactions: 300, amount: 1398 },
        { name: "Mar", transactions: 500, amount: 9800 },
        { name: "Abr", transactions: 278, amount: 3908 },
        { name: "May", transactions: 189, amount: 4800 },
        { name: "Jun", transactions: 239, amount: 3800 }
      ];
    }
  });

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Monitor system implementation progress and key metrics
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Implementation Progress</CardTitle>
            <CardDescription>
              Track the development progress of each system module
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ModuleProgress />
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Users className="h-10 w-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Usuarios</p>
                <h3 className="text-2xl font-bold">{stats?.totalUsers}</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <CreditCard className="h-10 w-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Cuentas</p>
                <h3 className="text-2xl font-bold">{stats?.totalAccounts}</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <Building2 className="h-10 w-10 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Transacciones</p>
                <h3 className="text-2xl font-bold">{stats?.totalTransactions}</h3>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <AlertTriangle className="h-10 w-10 text-yellow-500" />
              <div>
                <p className="text-sm text-muted-foreground">Pendientes KYC</p>
                <h3 className="text-2xl font-bold">{stats?.pendingKYC}</h3>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Volumen de Transacciones</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={transactionStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="transactions" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Monto Total</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={transactionStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#82ca9d" 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
