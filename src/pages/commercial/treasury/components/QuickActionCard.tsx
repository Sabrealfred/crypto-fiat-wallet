
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface QuickActionProps {
  title: string;
  icon: LucideIcon;
  path: string;
  description: string;
}

export const QuickActionCard = ({ title, icon: Icon, path, description }: QuickActionProps) => {
  const navigate = useNavigate();
  
  return (
    <Button
      variant="outline"
      className="h-auto py-4 flex flex-col items-center gap-2 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
      onClick={() => navigate(path)}
    >
      <Icon className="h-6 w-6" />
      <div className="text-center">
        <div className="font-medium">{title}</div>
        <div className="text-xs text-muted-foreground">{description}</div>
      </div>
    </Button>
  );
};
