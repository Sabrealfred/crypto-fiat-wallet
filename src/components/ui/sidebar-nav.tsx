
import { Button } from "@/components/ui/button";
import { Home, Wallet, CreditCard, History, Store, Settings, Wallet2, ChevronLeft, ChevronRight, Building2, Receipt } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { DarkModeToggle } from "@/components/layout/dark-mode-toggle";
import { useState } from "react";

interface SidebarNavProps {
  className?: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export function SidebarNav({
  className = "",
  isDarkMode,
  onToggleDarkMode
}: SidebarNavProps) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className={`relative h-full flex flex-col ${className}`}>
      <div className={`
        transition-all duration-300 ease-in-out h-full
        ${isCollapsed ? 'w-20' : 'w-64'}
        bg-white/70 backdrop-blur-sm p-4 border-r
      `}>
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Wallet2 className="h-5 w-5 text-white" />
          </div>
          <span className={`font-semibold text-lg transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            Waymu Wallet
          </span>
        </div>
        
        <nav className="space-y-1">
          <Link to="/">
            <Button variant={isActive('/') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Home className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Dashboard
              </span>
            </Button>
          </Link>
          <Link to="/wallet">
            <Button variant={isActive('/wallet') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Wallet className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                My Wallet
              </span>
            </Button>
          </Link>
          <Link to="/cards">
            <Button variant={isActive('/cards') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <CreditCard className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Cards
              </span>
            </Button>
          </Link>
          <Link to="/transfer">
            <Button variant={isActive('/transfer') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Building2 className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Transfer
              </span>
            </Button>
          </Link>
          <Link to="/bills">
            <Button variant={isActive('/bills') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Receipt className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Bill Pay
              </span>
            </Button>
          </Link>
          <Link to="/history">
            <Button variant={isActive('/history') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <History className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                History
              </span>
            </Button>
          </Link>
          <Link to="/marketplace">
            <Button variant={isActive('/marketplace') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
              <Store className="h-4 w-4" />
              <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
                Marketplace
              </span>
            </Button>
          </Link>
        </nav>

        {/* Bottom buttons */}
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
      </div>

      {/* Collapse toggle button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 rounded-full bg-white shadow-md border"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? 
          <ChevronRight className="h-4 w-4" /> : 
          <ChevronLeft className="h-4 w-4" />
        }
      </Button>
    </div>
  );
}
