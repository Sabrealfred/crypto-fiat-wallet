
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { TreasuryTag } from "@/types/treasury";
import { useQuery } from "@tanstack/react-query";

interface FormTagsProps {
  selectedTags: string[];
  onChange: (tags: string[]) => void;
  error?: string;
}

export function FormTags({ selectedTags, onChange, error }: FormTagsProps) {
  const [tagInput, setTagInput] = useState("");

  const { data: availableTags = [] } = useQuery({
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

  const handleAddTag = () => {
    if (tagInput.trim() && !selectedTags.includes(tagInput.trim())) {
      onChange([...selectedTags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange(selectedTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const filteredTags = availableTags.filter(tag => 
    tag.name.toLowerCase().includes(tagInput.toLowerCase()) &&
    !selectedTags.includes(tag.name)
  );

  return (
    <div className="space-y-2">
      <Label>Tags</Label>
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2 min-h-[2rem]">
          {selectedTags.map(tag => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              {tag}
              <X
                className="h-3 w-3 cursor-pointer hover:text-destructive"
                onClick={() => handleRemoveTag(tag)}
              />
            </Badge>
          ))}
        </div>
        <Input
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add tags..."
          className={error ? "border-red-500" : ""}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        {tagInput && filteredTags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {filteredTags.map(tag => (
              <Badge
                key={tag.id}
                variant="outline"
                className="cursor-pointer hover:bg-secondary"
                onClick={() => {
                  onChange([...selectedTags, tag.name]);
                  setTagInput("");
                }}
                style={{ backgroundColor: tag.color + '20', borderColor: tag.color }}
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
