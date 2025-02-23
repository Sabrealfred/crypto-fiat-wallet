
interface AuthHeaderProps {
  isSignUp: boolean;
}

export function AuthHeader({ isSignUp }: AuthHeaderProps) {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">
        {isSignUp ? "Crear cuenta" : "Iniciar sesión"}
      </h1>
      <p className="text-muted-foreground">
        {isSignUp
          ? "Ingresa tus datos para registrarte"
          : "Bienvenido de vuelta"}
      </p>
    </div>
  );
}
