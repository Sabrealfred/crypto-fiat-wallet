
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TreasuryTransaction } from "@/types/treasury";
import { DateRange } from "react-day-picker";
import { format, subMonths } from "date-fns";

export function useTransactionStats(dateRange: DateRange | undefined, comparisonPeriod: string) {
  const { data: transactions = [] } = useQuery({
    queryKey: ['treasury-transactions', dateRange],
    queryFn: async () => {
      let query = supabase
        .from('treasury_transactions')
        .select('id, amount, currency, transaction_date, description, status, tags, metadata, bank_name, bai_code, entity_id')
        .order('transaction_date', { ascending: false });

      if (dateRange?.from) {
        query = query.gte('transaction_date', dateRange.from.toISOString());
      }
      if (dateRange?.to) {
        query = query.lte('transaction_date', dateRange.to.toISOString());
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as TreasuryTransaction[];
    }
  });

  const { data: tags = [] } = useQuery({
    queryKey: ['treasury-tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('treasury_tags')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      return data;
    }
  });

  const getComparisonDateRange = () => {
    if (!dateRange?.from || !dateRange?.to) return undefined;
    
    const from = new Date(dateRange.from);
    const to = new Date(dateRange.to);
    const diffMonths = (to.getFullYear() - from.getFullYear()) * 12 + to.getMonth() - from.getMonth();
    
    if (comparisonPeriod === "previous") {
      return {
        from: subMonths(from, diffMonths),
        to: subMonths(to, diffMonths)
      };
    } else if (comparisonPeriod === "year") {
      return {
        from: new Date(from.setFullYear(from.getFullYear() - 1)),
        to: new Date(to.setFullYear(to.getFullYear() - 1))
      };
    }
    return undefined;
  };

  const { data: comparisonTransactions = [] } = useQuery({
    queryKey: ['treasury-transactions-comparison', dateRange, comparisonPeriod],
    queryFn: async () => {
      const comparisonRange = getComparisonDateRange();
      if (!comparisonRange) return [];

      const { data, error } = await supabase
        .from('treasury_transactions')
        .select('id, amount, currency, transaction_date, description, status, tags, metadata, bank_name, bai_code, entity_id')
        .gte('transaction_date', comparisonRange.from.toISOString())
        .lte('transaction_date', comparisonRange.to.toISOString())
        .order('transaction_date', { ascending: false });

      if (error) throw error;
      return data as TreasuryTransaction[];
    },
    enabled: !!dateRange?.from && !!dateRange?.to
  });

  return {
    transactions,
    tags,
    comparisonTransactions
  };
}
