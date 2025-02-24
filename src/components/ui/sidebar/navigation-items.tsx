
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
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface NavigationItemsProps {
  isCollapsed: boolean;
}

const dashboardRoutes = {
  personal: "/personal",
  business: "/business/dashboard",
  commercial: "/commercial/dashboard",
  private_banking: "/private/dashboard",
  developer: "/developer/dashboard",
};

export function NavigationItems({ isCollapsed }: NavigationItemsProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const { data: currentOrg } = useQuery({
    queryKey: ['current-organization'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data: userOrgs, error } = await supabase
        .from('user_organizations')
        .select(`
          organization:organizations (
            id,
            name,
            type
          )
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return userOrgs?.organization;
    },
  });

  const dashboardPath = currentOrg ? dashboardRoutes[currentOrg.type] : '/personal';

  return (
    <nav className="space-y-1">
      <Link to={dashboardPath}>
        <Button variant={isActive(dashboardPath) ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
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
