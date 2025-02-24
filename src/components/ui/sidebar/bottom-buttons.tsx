
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { DarkModeToggle } from "@/components/layout/dark-mode-toggle";

interface BottomButtonsProps {
  isCollapsed: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function BottomButtons({ isCollapsed, isDarkMode, onToggleDarkMode }: BottomButtonsProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="mt-auto pt-4 space-y-1">
      <Link to="/settings">
        <Button variant={isActive('/settings') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Settings className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Settings
          </span>
        </Button>
      </Link>
      <DarkModeToggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />
    </div>
  );
}
