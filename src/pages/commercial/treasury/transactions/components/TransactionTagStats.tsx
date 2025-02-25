
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TreasuryTransaction } from "@/types/treasury";
import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface TagStats {
  tag: string;
  totalAmount: number;
  count: number;
  averageAmount: number;
}

export function TransactionTagStats() {
  const { data: transactions = [] } = useQuery({
    queryKey: ['treasury-transactions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('treasury_transactions')
        .select('*')
        .order('transaction_date', { ascending: false });
      
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

  // Calcular estadísticas por etiqueta
  const tagStats: Record<string, TagStats> = {};
  
  transactions.forEach(transaction => {
    transaction.tags?.forEach(tagName => {
      if (!tagStats[tagName]) {
        tagStats[tagName] = {
          tag: tagName,
          totalAmount: 0,
          count: 0,
          averageAmount: 0
        };
      }
      
      tagStats[tagName].totalAmount += transaction.amount;
      tagStats[tagName].count += 1;
    });
  });

  // Calcular promedios y convertir a array
  const statsArray = Object.values(tagStats).map(stat => ({
    ...stat,
    averageAmount: stat.totalAmount / stat.count,
    totalAmount: Number(stat.totalAmount.toFixed(2)),
    averageAmount: Number((stat.totalAmount / stat.count).toFixed(2))
  }));

  // Ordenar por monto total
  statsArray.sort((a, b) => b.totalAmount - a.totalAmount);

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Transaction Analysis by Tags</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-muted/50">
          <h3 className="text-sm font-medium mb-1">Total Tags</h3>
          <p className="text-2xl font-bold">{tags.length}</p>
        </Card>
        
        <Card className="p-4 bg-muted/50">
          <h3 className="text-sm font-medium mb-1">Tagged Transactions</h3>
          <p className="text-2xl font-bold">
            {transactions.filter(t => t.tags?.length > 0).length}
          </p>
        </Card>
        
        <Card className="p-4 bg-muted/50">
          <h3 className="text-sm font-medium mb-1">Untagged Transactions</h3>
          <p className="text-2xl font-bold">
            {transactions.filter(t => !t.tags?.length).length}
          </p>
        </Card>
      </div>

      <div className="h-[300px] mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={statsArray}>
            <XAxis dataKey="tag" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="totalAmount" fill="#6366f1" name="Total Amount" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Tag</th>
              <th className="text-right py-2">Transactions</th>
              <th className="text-right py-2">Total Amount</th>
              <th className="text-right py-2">Average Amount</th>
            </tr>
          </thead>
          <tbody>
            {statsArray.map(stat => (
              <tr key={stat.tag} className="border-b">
                <td className="py-2">{stat.tag}</td>
                <td className="text-right">{stat.count}</td>
                <td className="text-right">${stat.totalAmount.toLocaleString()}</td>
                <td className="text-right">${stat.averageAmount.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
