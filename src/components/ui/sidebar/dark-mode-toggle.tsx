
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
  isCollapsed?: boolean;
}

export function DarkModeToggle({ isDarkMode, onToggle, isCollapsed = false }: DarkModeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={`rounded-full ${isDarkMode ? 'text-blue-300 hover:text-blue-100 hover:bg-blue-900/50' : 'text-blue-800 hover:text-blue-600 hover:bg-blue-200/50'}`}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
