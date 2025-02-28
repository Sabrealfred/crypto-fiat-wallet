
import { Settings, LogOut, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { DarkModeToggle } from "./dark-mode-toggle";

interface BottomButtonsProps {
  isCollapsed: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function BottomButtons({
  isCollapsed,
  isDarkMode,
  onToggleDarkMode
}: BottomButtonsProps) {
  const navigate = useNavigate();

  return (
    <div className="mt-auto pt-2 border-t space-y-1">
      <Button
        variant="ghost"
        className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}
        onClick={() => navigate('/settings')}
      >
        <Settings className="h-4 w-4" />
        <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
          Settings
        </span>
      </Button>
      
      <Button
        variant="ghost"
        className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}
        onClick={() => navigate('/marketplace')}
      >
        <ShoppingCart className="h-4 w-4" />
        <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
          Marketplace
        </span>
      </Button>
      
      <div className={`flex ${isCollapsed ? 'justify-center' : 'justify-between'} items-center px-2 py-1`}>
        <DarkModeToggle 
          isDarkMode={isDarkMode} 
          onToggle={onToggleDarkMode} 
          isCollapsed={isCollapsed}
        />
        
        {!isCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-red-600 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
