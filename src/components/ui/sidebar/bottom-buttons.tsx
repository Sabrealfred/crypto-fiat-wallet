
import { DarkModeToggle } from "./dark-mode-toggle";
import { Settings, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface BottomButtonsProps {
  isCollapsed: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function BottomButtons({ isCollapsed, isDarkMode, onToggleDarkMode }: BottomButtonsProps) {
  return (
    <div className="fixed bottom-0 left-0 p-4 transition-all duration-300 ease-in-out flex flex-col items-center space-y-2">
      <DarkModeToggle 
        isDarkMode={isDarkMode}
        onToggle={onToggleDarkMode}
        isCollapsed={isCollapsed}
      />
      
      <Link to="/settings">
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full"
        >
          <Settings className="h-5 w-5" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Settings
          </span>
        </Button>
      </Link>
      
      <Link to="/marketplace">
        <Button 
          variant="ghost" 
          size="icon"
          className="rounded-full"
        >
          <ShoppingCart className="h-5 w-5" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Marketplace
          </span>
        </Button>
      </Link>
    </div>
  );
}
