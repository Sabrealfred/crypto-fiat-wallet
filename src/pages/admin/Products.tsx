
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Pencil, Archive, Eye } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestión de Productos</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Producto
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-4 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Total Productos</h3>
            <Badge>42</Badge>
          </div>
          <p className="text-sm text-gray-500">Productos activos</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Cuentas</h3>
            <Badge variant="secondary">15</Badge>
          </div>
          <p className="text-sm text-gray-500">Tipos de cuentas</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Tarjetas</h3>
            <Badge variant="secondary">12</Badge>
          </div>
          <p className="text-sm text-gray-500">Tipos de tarjetas</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Inversiones</h3>
            <Badge variant="secondary">15</Badge>
          </div>
          <p className="text-sm text-gray-500">Productos de inversión</p>
        </Card>
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
              <SelectValue placeholder="Categoría" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="accounts">Cuentas</SelectItem>
              <SelectItem value="cards">Tarjetas</SelectItem>
              <SelectItem value="investments">Inversiones</SelectItem>
              <SelectItem value="loans">Préstamos</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Activo</SelectItem>
              <SelectItem value="inactive">Inactivo</SelectItem>
              <SelectItem value="draft">Borrador</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Nombre</th>
                <th className="text-left p-2">Categoría</th>
                <th className="text-left p-2">Estado</th>
                <th className="text-right p-2">Tasa/Comisión</th>
                <th className="text-left p-2">Última Modificación</th>
                <th className="text-left p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">Cuenta Corriente Premium</td>
                <td className="p-2">Cuentas</td>
                <td className="p-2">
                  <Badge variant="secondary">Activo</Badge>
                </td>
                <td className="p-2 text-right">2.5%</td>
                <td className="p-2">Hace 2 días</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Archive className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
              {/* Agregar más filas según sea necesario */}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
