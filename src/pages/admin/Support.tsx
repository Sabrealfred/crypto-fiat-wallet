
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, MessageCircle, Phone, Mail } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Centro de Soporte</h1>
        <Button>
          <MessageCircle className="mr-2 h-4 w-4" />
          Nuevo Ticket
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 mb-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Tickets Abiertos</h3>
            <Badge>25</Badge>
          </div>
          <p className="text-sm text-gray-500">Tickets pendientes de resolución</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Tiempo Promedio</h3>
            <span>2.5h</span>
          </div>
          <p className="text-sm text-gray-500">Tiempo de respuesta promedio</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Satisfacción</h3>
            <span>94%</span>
          </div>
          <p className="text-sm text-gray-500">Nivel de satisfacción del usuario</p>
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Input 
              placeholder="Buscar tickets..." 
              className="w-full pl-10"
            />
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-500" />
          </div>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Abierto</SelectItem>
              <SelectItem value="in_progress">En Progreso</SelectItem>
              <SelectItem value="closed">Cerrado</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Prioridad" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">Alta</SelectItem>
              <SelectItem value="medium">Media</SelectItem>
              <SelectItem value="low">Baja</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">ID</th>
                <th className="text-left p-2">Usuario</th>
                <th className="text-left p-2">Asunto</th>
                <th className="text-left p-2">Estado</th>
                <th className="text-left p-2">Prioridad</th>
                <th className="text-left p-2">Última Actualización</th>
                <th className="text-left p-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2">#1234</td>
                <td className="p-2">Juan Pérez</td>
                <td className="p-2">Problema con transferencia</td>
                <td className="p-2">
                  <Badge variant="secondary">Abierto</Badge>
                </td>
                <td className="p-2">
                  <Badge variant="destructive">Alta</Badge>
                </td>
                <td className="p-2">Hace 2 horas</td>
                <td className="p-2">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Mail className="h-4 w-4" />
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
