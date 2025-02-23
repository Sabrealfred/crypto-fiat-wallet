
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LogOut } from "lucide-react";

export default function Index() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error al cerrar sesión");
    } else {
      toast.success("Sesión cerrada exitosamente");
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Crypto-Fiat Wallet</h1>
          {user ? (
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </Button>
          ) : (
            <Button onClick={() => navigate('/auth')}>
              Iniciar sesión
            </Button>
          )}
        </div>
        {!user ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold mb-4">
              ¡Bienvenido a Crypto-Fiat Wallet!
            </h2>
            <p className="text-muted-foreground mb-8">
              Inicia sesión para empezar a gestionar tus transacciones.
            </p>
            <Button onClick={() => navigate('/auth')} size="lg">
              Comenzar
            </Button>
          </div>
        ) : (
          <p className="text-xl">¡Bienvenido de vuelta!</p>
        )}
      </div>
    </div>
  );
}
