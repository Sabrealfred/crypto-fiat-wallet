
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface CommercialHeaderProps {
  title: string;
  description?: string;
  showBack?: boolean;
  showDemo?: boolean;
}

export function CommercialHeader({ 
  title, 
  description, 
  showBack = true,
  showDemo = true
}: CommercialHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-semibold">{title}</h1>
          {showDemo && (
            <Badge variant="enterprise" className="flex items-center gap-1">
              <Info className="h-3.5 w-3.5" />
              <span>Enterprise</span>
            </Badge>
          )}
        </div>
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="flex gap-2">
        {showBack && (
          <Button 
            variant="outline" 
            onClick={() => navigate(-1)}
            className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={() => navigate("/commercial/dashboard")}
          className="border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
        >
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </div>
    </div>
  );
}
