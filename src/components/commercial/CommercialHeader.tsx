
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface CommercialHeaderProps {
  title: string;
  description?: string;
  showBack?: boolean;
  actions?: React.ReactNode;
}

export function CommercialHeader({ 
  title, 
  description, 
  showBack = false, 
  actions 
}: CommercialHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
      <div className="flex-1">
        {showBack && (
          <Button
            variant="ghost"
            className="mb-2 p-0 h-8 text-muted-foreground hover:text-foreground"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
        )}
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-2 mt-2 md:mt-0">
          {actions}
        </div>
      )}
    </div>
  );
}
