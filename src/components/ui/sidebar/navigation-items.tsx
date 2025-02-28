
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EnterpriseSolutionsNavigation } from "./components/enterprise-solutions-navigation";
import { PersonalNavigation } from "./components/personal-navigation";

interface NavigationItemsProps {
  isCollapsed: boolean;
}

export function NavigationItems({ isCollapsed }: NavigationItemsProps) {
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

  return currentOrg?.type === 'commercial' ? (
    <EnterpriseSolutionsNavigation isCollapsed={isCollapsed} />
  ) : (
    <PersonalNavigation isCollapsed={isCollapsed} />
  );
}
