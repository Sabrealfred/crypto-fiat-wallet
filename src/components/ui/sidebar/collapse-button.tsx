
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CollapseButtonProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function CollapseButton({ isCollapsed, onToggle }: CollapseButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute -right-4 top-6 rounded-full bg-white shadow-md border"
      onClick={onToggle}
    >
      {isCollapsed ? 
        <ChevronRight className="h-4 w-4" /> : 
        <ChevronLeft className="h-4 w-4" />
      }
    </Button>
  );
}
