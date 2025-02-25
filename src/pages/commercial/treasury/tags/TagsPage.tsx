
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AppLayout } from "@/components/layout/app-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, Tags } from "lucide-react";
import { TreasuryTag } from "@/types/treasury";
import { TagFormModal } from "./components/TagFormModal";
import { toast } from "sonner";

export default function TagsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTag, setSelectedTag] = useState<TreasuryTag | undefined>();
  const queryClient = useQueryClient();

  const { data: tags = [], isLoading } = useQuery({
    queryKey: ['treasury-tags'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('treasury_tags')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data as TreasuryTag[];
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('treasury_tags')
        .update({ is_active: false })
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treasury-tags'] });
      toast.success('Tag deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete tag');
    }
  });

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      await deleteMutation.mutate(id);
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Treasury Tags</h1>
            <p className="text-muted-foreground">
              Manage and organize your transaction tags
            </p>
          </div>
          <Button onClick={() => {
            setSelectedTag(undefined);
            setIsModalOpen(true);
          }}>
            <Plus className="h-4 w-4 mr-2" />
            Create Tag
          </Button>
        </div>

        <Card className="p-6">
          {isLoading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <div className="grid gap-4">
              {tags.map(tag => (
                <div
                  key={tag.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                  style={{ borderColor: tag.color }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: tag.color }}
                    />
                    <span className="font-medium">{tag.name}</span>
                    {tag.rule_pattern && (
                      <span className="text-sm text-muted-foreground">
                        Rule: {tag.rule_pattern}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedTag(tag);
                        setIsModalOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                      onClick={() => handleDelete(tag.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <TagFormModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedTag(undefined);
          }}
          tag={selectedTag}
        />
      </div>
    </AppLayout>
  );
}
