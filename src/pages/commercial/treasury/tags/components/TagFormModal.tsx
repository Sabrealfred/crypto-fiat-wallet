
import { useState, useEffect } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TreasuryTag } from "@/types/treasury";
import { toast } from "sonner";

interface TagFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  tag?: TreasuryTag;
}

interface FormData {
  name: string;
  color: string;
  rule_pattern?: string;
}

export function TagFormModal({ isOpen, onClose, tag }: TagFormModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    color: "#6366f1",
    rule_pattern: "",
  });

  const queryClient = useQueryClient();

  useEffect(() => {
    if (tag) {
      setFormData({
        name: tag.name,
        color: tag.color,
        rule_pattern: tag.rule_pattern || "",
      });
    } else {
      setFormData({
        name: "",
        color: "#6366f1",
        rule_pattern: "",
      });
    }
  }, [tag]);

  const mutation = useMutation({
    mutationFn: async (data: FormData) => {
      if (tag) {
        const { error } = await supabase
          .from('treasury_tags')
          .update({
            name: data.name,
            color: data.color,
            rule_pattern: data.rule_pattern || null,
          })
          .eq('id', tag.id);
        
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('treasury_tags')
          .insert([{
            name: data.name,
            color: data.color,
            rule_pattern: data.rule_pattern || null,
            is_active: true,
          }]);
        
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['treasury-tags'] });
      toast.success(tag ? 'Tag updated successfully' : 'Tag created successfully');
      onClose();
    },
    onError: () => {
      toast.error(tag ? 'Failed to update tag' : 'Failed to create tag');
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{tag ? 'Edit Tag' : 'Create New Tag'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Tag Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Enter tag name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <div className="flex gap-2">
              <Input
                id="color"
                type="color"
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                className="w-20"
              />
              <Input
                type="text"
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                placeholder="#000000"
                pattern="^#[0-9A-Fa-f]{6}$"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pattern">Auto-tag Rule (Optional)</Label>
            <Input
              id="pattern"
              value={formData.rule_pattern || ""}
              onChange={(e) => setFormData(prev => ({ ...prev, rule_pattern: e.target.value }))}
              placeholder="e.g., *PAYROLL* or *TRANSFER*"
            />
            <p className="text-sm text-muted-foreground">
              Use * as wildcard. Transaction descriptions matching this pattern will be automatically tagged.
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending ? "Saving..." : tag ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
