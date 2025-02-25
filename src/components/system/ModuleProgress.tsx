
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";
import type { SystemModule, ImplementationProgress } from "@/types/system";

export function ModuleProgress() {
  const { data: modules = [], isLoading: isLoadingModules } = useQuery({
    queryKey: ['system-modules'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('system_modules')
        .select('*')
        .order('category');
      
      if (error) throw error;
      return data as SystemModule[];
    }
  });

  const { data: progress = [], isLoading: isLoadingProgress } = useQuery({
    queryKey: ['implementation-progress'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('implementation_progress')
        .select('*');
      
      if (error) throw error;
      return data as ImplementationProgress[];
    }
  });

  if (isLoadingModules || isLoadingProgress) {
    return <div>Loading modules progress...</div>;
  }

  const getModuleProgress = (moduleId: string) => {
    const moduleProgress = progress.find(p => p.module_id === moduleId);
    return moduleProgress?.progress_percentage || 0;
  };

  const groupedModules = modules.reduce((acc, module) => {
    if (!acc[module.category]) {
      acc[module.category] = [];
    }
    acc[module.category].push(module);
    return acc;
  }, {} as Record<string, SystemModule[]>);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Object.entries(groupedModules).map(([category, categoryModules]) => (
        <Card key={category} className="col-span-1">
          <CardHeader>
            <CardTitle className="capitalize">
              {category.replace('_', ' ')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryModules.map(module => (
              <div key={module.id} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>{module.name}</span>
                  <span className="text-muted-foreground">
                    {getModuleProgress(module.id)}%
                  </span>
                </div>
                <Progress value={getModuleProgress(module.id)} />
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
