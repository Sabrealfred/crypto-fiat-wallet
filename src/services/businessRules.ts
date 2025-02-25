
import { supabase } from "@/integrations/supabase/client";
import type { BusinessRule } from "@/types/system";

export async function getBusinessRules(moduleName?: string) {
  const query = supabase
    .from('business_rules')
    .select('*')
    .order('priority', { ascending: false });
    
  if (moduleName) {
    query.eq('module_name', moduleName);
  }
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data as BusinessRule[];
}

export async function evaluateBusinessRules(
  moduleName: string,
  context: Record<string, any>
): Promise<boolean> {
  const rules = await getBusinessRules(moduleName);
  
  // Solo procesar reglas activas
  const activeRules = rules.filter(rule => rule.is_active);
  
  // Evaluar cada regla según sus condiciones
  for (const rule of activeRules) {
    try {
      const conditions = rule.conditions;
      const result = await evaluateConditions(conditions, context);
      
      if (!result) {
        console.log(`Rule ${rule.rule_name} failed evaluation`);
        return false;
      }
    } catch (error) {
      console.error(`Error evaluating rule ${rule.rule_name}:`, error);
      return false;
    }
  }
  
  return true;
}

async function evaluateConditions(
  conditions: Record<string, any>,
  context: Record<string, any>
): Promise<boolean> {
  // Implementación básica de evaluación de condiciones
  // Se puede expandir según necesidades específicas
  
  for (const [key, value] of Object.entries(conditions)) {
    if (typeof value === 'object') {
      const operator = Object.keys(value)[0];
      const compareValue = value[operator];
      
      switch (operator) {
        case 'eq':
          if (context[key] !== compareValue) return false;
          break;
        case 'gt':
          if (!(context[key] > compareValue)) return false;
          break;
        case 'lt':
          if (!(context[key] < compareValue)) return false;
          break;
        case 'gte':
          if (!(context[key] >= compareValue)) return false;
          break;
        case 'lte':
          if (!(context[key] <= compareValue)) return false;
          break;
        case 'in':
          if (!Array.isArray(compareValue) || !compareValue.includes(context[key])) {
            return false;
          }
          break;
        default:
          console.warn(`Unknown operator ${operator}`);
          return false;
      }
    } else {
      if (context[key] !== value) return false;
    }
  }
  
  return true;
}
