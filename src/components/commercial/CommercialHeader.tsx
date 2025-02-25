
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CommercialHeaderProps {
  title: string;
  description?: string;
  showBack?: boolean;
}

export function CommercialHeader({ title, description, showBack = true }: CommercialHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex gap-2">
        {showBack && (
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={() => navigate("/commercial/dashboard")}
        >
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </div>
    </div>
  );
}
