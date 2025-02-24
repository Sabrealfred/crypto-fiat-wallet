
import { Outlet } from "react-router-dom";

export function ProtectedRoute() {
  // Temporalmente deshabilitamos la verificación de autenticación
  return <Outlet />;
}
