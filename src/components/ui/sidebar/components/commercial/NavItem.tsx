
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface NavItemProps {
  path: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
  isNested?: boolean;
}

export function NavItem({ path, icon: Icon, label, isCollapsed, isNested = false }: NavItemProps) {
  const location = useLocation();
  const isActive = location.pathname === path;
  
  const paddingClass = isNested ? 'pl-8' : '';

  return (
    <Link to={path}>
      <Button 
        variant={isActive ? 'secondary' : 'ghost'} 
        className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} ${paddingClass}`}
      >
        <Icon className="h-4 w-4" />
        <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
          {label}
        </span>
      </Button>
    </Link>
  );
}
