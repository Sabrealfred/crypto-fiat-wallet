
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Wallet2 } from "lucide-react";
import { ProfileSelector } from "@/components/profile/ProfileSelector";

interface LogoProps {
  isCollapsed: boolean;
}

export function Logo({ isCollapsed }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <Wallet2 className="h-5 w-5 text-white" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-64">
          <DropdownMenuLabel>Switch Profile</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="px-2 py-2">
            <ProfileSelector />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
      <span className={`font-semibold text-lg transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
        Waymu Wallet
      </span>
    </div>
  );
}
