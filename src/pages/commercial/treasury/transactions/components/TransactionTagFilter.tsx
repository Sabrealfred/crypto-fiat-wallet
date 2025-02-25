
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { TreasuryTag } from "@/types/treasury";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface TransactionTagFilterProps {
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

export function TransactionTagFilter({ selectedTags, onTagSelect }: TransactionTagFilterProps) {
  const { data: tags = [] } = useQuery({
    queryKey: ['treasury-tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('treasury_tags')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data as TreasuryTag[];
    }
  });

  return (
    <div className="space-y-2">
      <Label>Filter by Tags</Label>
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Badge
            key={tag.id}
            variant={selectedTags.includes(tag.name) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onTagSelect(tag.name)}
            style={selectedTags.includes(tag.name) ? {} : {
              backgroundColor: tag.color + '20',
              borderColor: tag.color
            }}
          >
            {tag.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
