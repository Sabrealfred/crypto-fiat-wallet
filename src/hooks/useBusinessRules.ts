
import { useQuery } from "@tanstack/react-query";
import { getBusinessRules } from "@/services/businessRules";
import type { BusinessRule } from "@/types/system";

export function useBusinessRules(moduleName?: string) {
  const { data: rules = [], isLoading, error } = useQuery<BusinessRule[]>({
    queryKey: ['business-rules', moduleName],
    queryFn: () => getBusinessRules(moduleName),
  });

  return {
    rules,
    isLoading,
    error,
  };
}
