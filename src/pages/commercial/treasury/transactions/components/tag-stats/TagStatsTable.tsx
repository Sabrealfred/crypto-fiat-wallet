
import { TagStats } from '../types';

interface TagStatsTableProps {
  statsArray: TagStats[];
  top5Tags: string[];
  anomalies: Record<string, number[]>;
}

export function TagStatsTable({ statsArray, top5Tags, anomalies }: TagStatsTableProps) {
  return (
    <div className="mt-6 overflow-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Tag</th>
            <th className="text-right py-2">Transactions</th>
            <th className="text-right py-2">Total Amount</th>
            <th className="text-right py-2">Average Amount</th>
            <th className="text-right py-2">Monthly Growth</th>
            <th className="text-right py-2">Predicted Trend</th>
          </tr>
        </thead>
        <tbody>
          {statsArray.map(stat => (
            <tr key={stat.tag} className="border-b hover:bg-muted/50 transition-colors">
              <td className="py-2">
                {stat.tag}
                {anomalies[stat.tag] && (
                  <span className="ml-2 text-yellow-600" title="Anomalías detectadas">⚠️</span>
                )}
              </td>
              <td className="text-right">{stat.count}</td>
              <td className="text-right">${stat.totalAmount.toLocaleString()}</td>
              <td className="text-right">${stat.averageAmount.toLocaleString()}</td>
              <td className={`text-right ${
                stat.monthlyGrowth && stat.monthlyGrowth > 0 ? 'text-green-600' : 
                stat.monthlyGrowth && stat.monthlyGrowth < 0 ? 'text-red-600' : ''
              }`}>
                {stat.monthlyGrowth ? `${stat.monthlyGrowth}%` : '-'}
              </td>
              <td className="text-right">
                {top5Tags.includes(stat.tag) ? 
                  (stat.monthlyGrowth && stat.monthlyGrowth > 5 ? '📈 Creciente' :
                   stat.monthlyGrowth && stat.monthlyGrowth < -5 ? '📉 Decreciente' : 
                   '➡️ Estable') :
                  '-'
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
