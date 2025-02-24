
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { FinancialProduct } from "@/types/admin";

export default function ProductsPage() {
  const { data: products } = useQuery<FinancialProduct[]>({
    queryKey: ["financial-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("financial_products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Productos Financieros</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Input 
              placeholder="Buscar productos..." 
              className="w-full pl-10"
            />
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-500" />
          </div>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Tipo de producto" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="loan">Préstamos</SelectItem>
              <SelectItem value="savings">Ahorros</SelectItem>
              <SelectItem value="investment">Inversiones</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products?.map((product) => (
            <Card key={product.id} className="p-6">
              <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {product.description}
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tasa de interés</span>
                  <span className="font-medium">{product.interest_rate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monto mínimo</span>
                  <span className="font-medium">${product.min_amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monto máximo</span>
                  <span className="font-medium">${product.max_amount}</span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button variant="outline" className="w-full">Editar</Button>
                <Button variant="destructive" className="w-full">Eliminar</Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
}
