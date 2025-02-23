
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { AuthForm } from "@/components/auth/AuthForm";
import { DemoLogin } from "@/components/auth/DemoLogin";
import { AuthHeader } from "@/components/auth/AuthHeader";

export default function Auth() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/');
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (email: string, password: string, firstName?: string, lastName?: string) => {
    setIsLoading(true);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName,
              last_name: lastName,
            },
          },
        });
        if (error) throw error;
        toast.success("Registro exitoso! Por favor inicia sesión.");
        setIsSignUp(false);
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Inicio de sesión exitoso!");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createAndLoginDemoUser = async () => {
    setIsLoading(true);
    try {
      // First try to create the demo user
      const { error: signUpError } = await supabase.auth.signUp({
        email: "demo@example.com",
        password: "demo12345",
        options: {
          data: {
            first_name: "Leonardo",
            last_name: "Cruz",
          },
        },
      });

      // Attempt to sign in regardless of whether sign up succeeded
      // (in case user already exists)
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: "demo@example.com",
        password: "demo12345",
      });

      if (signInError) throw signInError;
      toast.success("Inicio de sesión exitoso!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <AuthHeader isSignUp={isSignUp} />
        <DemoLogin onDemoLogin={createAndLoginDemoUser} isLoading={isLoading} />
        <AuthForm 
          isSignUp={isSignUp} 
          isLoading={isLoading} 
          onSubmit={handleAuth} 
        />
        <div className="text-center">
          <Button
            variant="link"
            className="text-sm"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp
              ? "¿Ya tienes una cuenta? Inicia sesión"
              : "¿No tienes una cuenta? Regístrate"}
          </Button>
        </div>
      </Card>
    </div>
  );
}
