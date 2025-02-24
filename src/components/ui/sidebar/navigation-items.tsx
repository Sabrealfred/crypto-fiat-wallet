
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  CreditCard,
  History,
  Store,
  Home,
  Building2,
  Receipt,
  LineChart,
  BadgeDollarSign,
} from "lucide-react";

interface NavigationItemsProps {
  isCollapsed: boolean;
}

export function NavigationItems({ isCollapsed }: NavigationItemsProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="space-y-1">
      <Link to={location.pathname.split('/')[1]}>
        <Button variant={isActive(location.pathname) ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Home className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Dashboard
          </span>
        </Button>
      </Link>

      {/* Wallet and Money Management */}
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
      
      {/* Investments Section */}
      <Link to="/investments">
        <Button variant={isActive('/investments') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <LineChart className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Investments
          </span>
        </Button>
      </Link>

      {/* Transfers and Payments */}
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
      <Link to="/deposits">
        <Button variant={isActive('/deposits') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <BadgeDollarSign className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Check Deposit
          </span>
        </Button>
      </Link>

      {/* History and Additional Features */}
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
  );
}
