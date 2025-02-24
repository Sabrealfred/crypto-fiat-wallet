
import { Link, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  History,
  Settings,
  LogOut
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Sesión cerrada exitosamente");
    navigate("/auth");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r p-4 space-y-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        <nav className="space-y-2">
          <Link to="/admin/dashboard">
            <Button variant="ghost" className="w-full justify-start">
              <LayoutDashboard className="mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link to="/admin/users">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="mr-2" />
              Usuarios
            </Button>
          </Link>
          <Link to="/admin/accounts">
            <Button variant="ghost" className="w-full justify-start">
              <Wallet className="mr-2" />
              Cuentas
            </Button>
          </Link>
          <Link to="/admin/transactions">
            <Button variant="ghost" className="w-full justify-start">
              <History className="mr-2" />
              Transacciones
            </Button>
          </Link>
          <Link to="/admin/settings">
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2" />
              Configuración
            </Button>
          </Link>
        </nav>

        <div className="absolute bottom-4 w-56">
          <Button 
            variant="ghost" 
            className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="mr-2" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-background/50 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
