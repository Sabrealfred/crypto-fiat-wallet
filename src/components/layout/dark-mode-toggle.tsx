
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export function DarkModeToggle({ isDarkMode, onToggle }: DarkModeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onToggle}
      className="text-yellow-500 dark:text-blue-400"
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}
