
import { Button } from "@/components/ui/button";

interface DemoLoginProps {
  onDemoLogin: () => void;
  isLoading: boolean;
}

export function DemoLogin({ onDemoLogin, isLoading }: DemoLoginProps) {
  return (
    <>
      <Button 
        onClick={onDemoLogin} 
        className="w-full bg-secondary hover:bg-secondary/90"
        disabled={isLoading}
      >
        Acceder como usuario Demo
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            O continúa con
          </span>
        </div>
      </div>
    </>
  );
}
