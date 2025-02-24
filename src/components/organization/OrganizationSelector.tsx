
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Building2, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Organization {
  id: string;
  name: string;
  type: 'personal' | 'business' | 'commercial' | 'private_banking' | 'developer';
  logo_url?: string;
}

const dashboardRoutes = {
  personal: "/personal",
  business: "/business/dashboard",
  commercial: "/commercial/dashboard",
  private_banking: "/private/dashboard",
  developer: "/developer/dashboard",
};

export function OrganizationSelector() {
  const navigate = useNavigate();
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);

  const { data: organizations } = useQuery({
    queryKey: ['user-organizations'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data: userOrgs, error } = await supabase
        .from('user_organizations')
        .select(`
          organization:organizations (
            id,
            name,
            type,
            logo_url
          )
        `)
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) {
        toast.error("Error loading organizations");
        throw error;
      }

      return userOrgs.map(uo => uo.organization) as Organization[];
    },
  });

  useEffect(() => {
    if (organizations?.length && !currentOrg) {
      setCurrentOrg(organizations[0]);
    }
  }, [organizations, currentOrg]);

  const handleOrganizationChange = (org: Organization) => {
    setCurrentOrg(org);
    navigate(dashboardRoutes[org.type]);
  };

  if (!organizations?.length) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full justify-start">
          <Building2 className="w-4 h-4 mr-2" />
          <span className="flex-1 text-left">{currentOrg?.name || 'Select Organization'}</span>
          <ChevronDown className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        <DropdownMenuLabel>Switch Organization</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => handleOrganizationChange(org)}
          >
            {org.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
