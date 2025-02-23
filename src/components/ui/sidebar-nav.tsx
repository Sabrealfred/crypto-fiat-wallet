
import { Button } from "@/components/ui/button";
import { 
  Home,
  Wallet,
  CreditCard,
  History,
  Store,
  Settings,
  Wallet2,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function SidebarNav() {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-white/70 backdrop-blur-sm p-4 border-r hidden md:block">
      <div className="flex items-center gap-2 mb-8">
        <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
          <Wallet2 className="h-5 w-5 text-white" />
        </div>
        <span className="font-semibold text-lg">Finance</span>
      </div>
      
      <nav className="space-y-1">
        <Link to="/">
          <Button 
            variant={isActive('/') ? 'secondary' : 'ghost'} 
            className="w-full justify-start"
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>
        <Link to="/wallet">
          <Button 
            variant={isActive('/wallet') ? 'secondary' : 'ghost'} 
            className="w-full justify-start"
          >
            <Wallet className="mr-2 h-4 w-4" />
            My Wallet
          </Button>
        </Link>
        <Link to="/cards">
          <Button 
            variant={isActive('/cards') ? 'secondary' : 'ghost'} 
            className="w-full justify-start"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Cards
          </Button>
        </Link>
        <Link to="/history">
          <Button 
            variant={isActive('/history') ? 'secondary' : 'ghost'} 
            className="w-full justify-start"
          >
            <History className="mr-2 h-4 w-4" />
            History
          </Button>
        </Link>
        <Link to="/marketplace">
          <Button 
            variant={isActive('/marketplace') ? 'secondary' : 'ghost'} 
            className="w-full justify-start"
          >
            <Store className="mr-2 h-4 w-4" />
            Marketplace
          </Button>
        </Link>
        <Link to="/settings">
          <Button 
            variant={isActive('/settings') ? 'secondary' : 'ghost'} 
            className="w-full justify-start"
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </Link>
      </nav>
    </div>
  );
}
