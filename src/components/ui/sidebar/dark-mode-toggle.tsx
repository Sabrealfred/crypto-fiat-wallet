
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
}

export function DarkModeToggle({ isDarkMode, onToggle, isCollapsed }: DarkModeToggleProps) {
  return (
    <Button
      onClick={onToggle}
      variant="ghost"
      className={`rounded-full transition-colors hover:bg-accent ${
        isDarkMode 
          ? 'bg-blue-900/20 dark:bg-blue-800/30' 
          : 'bg-blue-100/50 dark:bg-blue-900/10'
      }`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5 text-yellow-400" />
      ) : (
        <Moon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
      )}
      <span className={`ml-2 transition-opacity duration-300 ${
        isCollapsed 
          ? 'opacity-0 w-0 overflow-hidden' 
          : 'opacity-100'
      }`}>
        {isDarkMode ? 'Light' : 'Dark'}
      </span>
    </Button>
  );
}
