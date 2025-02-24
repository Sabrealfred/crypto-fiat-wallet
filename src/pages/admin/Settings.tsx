
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings, Mail, Bell, Shield, Globe } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Configuración del Sistema</h1>

      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Configuración General
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="maintenance-mode">Modo mantenimiento</Label>
              <Switch id="maintenance-mode" />
            </div>
            <div className="space-y-2">
              <Label>Zona horaria</Label>
              <Select defaultValue="UTC-5">
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar zona horaria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UTC-5">UTC-5 (EST)</SelectItem>
                  <SelectItem value="UTC-4">UTC-4 (EDT)</SelectItem>
                  <SelectItem value="UTC-3">UTC-3 (ART)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Mail className="mr-2 h-5 w-5" />
            Configuración de Correo
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Servidor SMTP</Label>
              <Input placeholder="smtp.ejemplo.com" />
            </div>
            <div className="space-y-2">
              <Label>Puerto SMTP</Label>
              <Input type="number" placeholder="587" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Notificaciones por correo</Label>
              <Switch id="email-notifications" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notificaciones
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="login-notifications">Notificaciones de inicio de sesión</Label>
              <Switch id="login-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="transaction-notifications">Notificaciones de transacciones</Label>
              <Switch id="transaction-notifications" defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Seguridad
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="two-factor">Autenticación de dos factores</Label>
              <Switch id="two-factor" />
            </div>
            <div className="space-y-2">
              <Label>Tiempo de sesión (minutos)</Label>
              <Input type="number" defaultValue="30" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Globe className="mr-2 h-5 w-5" />
            Localización
          </h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Idioma por defecto</Label>
              <Select defaultValue="es">
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar idioma" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="pt">Português</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Moneda por defecto</Label>
              <Select defaultValue="USD">
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
        </Card>

        <div className="flex justify-end gap-4">
          <Button variant="outline">Cancelar</Button>
          <Button>Guardar Cambios</Button>
        </div>
      </div>
    </div>
  );
}
