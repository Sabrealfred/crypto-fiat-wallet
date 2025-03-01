
import { 
  Settings, 
  ShoppingBag, 
  Moon, 
  Sun
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
    <div className={`mt-auto pt-4 border-t ${isCollapsed ? 'px-2' : 'px-4'}`}>
      <div className="flex flex-col gap-1">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={() => navigate('/settings')}
        >
          <Settings className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Settings</span>}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={() => navigate('/marketplace')}
        >
          <ShoppingBag className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Marketplace</span>}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={onToggleDarkMode}
        >
          {isDarkMode ? (
            <>
              <Sun className="h-4 w-4 text-yellow-400" />
              {!isCollapsed && <span className="ml-2">Light Mode</span>}
            </>
          ) : (
            <>
              <Moon className="h-4 w-4 text-blue-600" />
              {!isCollapsed && <span className="ml-2">Dark Mode</span>}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
