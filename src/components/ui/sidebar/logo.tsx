
import { Wallet2 } from "lucide-react";

interface LogoProps {
  isCollapsed: boolean;
}

export function Logo({ isCollapsed }: LogoProps) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
        <Wallet2 className="h-5 w-5 text-white" />
      </div>
      <span className={`font-semibold text-lg transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
        Waymu Wallet
      </span>
    </div>
  );
}
