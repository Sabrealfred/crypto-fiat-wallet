
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DarkModeToggleProps {
  isDarkMode: boolean;
  onToggle: () => void;
}

export function DarkModeToggle({ isDarkMode, onToggle }: DarkModeToggleProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-8 w-8"
        >
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          if (isDarkMode) onToggle();
        }}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          if (!isDarkMode) onToggle();
        }}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          localStorage.removeItem('theme');
          const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          document.documentElement.classList.toggle('dark', systemPrefersDark);
          if (isDarkMode !== systemPrefersDark) onToggle();
        }}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
