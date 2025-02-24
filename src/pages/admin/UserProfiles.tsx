
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Search, UserPlus } from "lucide-react";

interface ProfileType {
  id: string;
  code: string;
  name: string;
  description: string;
}

interface UserProfileType {
  id: string;
  user_id: string;
  profile_type_id: string;
  is_active: boolean;
}

interface User {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  profile_types: UserProfileType[];
}

export default function UserProfilesPage() {
  const queryClient = useQueryClient();

  const { data: profileTypes } = useQuery({
    queryKey: ['profile-types'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profile_types')
        .select('*');
      
      if (error) throw error;
      return data as ProfileType[];
    }
  });

  const { data: users, isLoading } = useQuery({
    queryKey: ['users-with-profiles'],
    queryFn: async () => {
      const { data: { users }, error } = await supabase.auth.admin.listUsers();
      
      if (error) throw error;

      // Fetch profile types for each user
      const usersWithProfiles = await Promise.all(
        users.map(async (user) => {
          const { data: profileTypes } = await supabase
            .from('user_profile_types')
            .select('*')
            .eq('user_id', user.id);

          return {
            ...user,
            profile_types: profileTypes || []
          };
        })
      );

      return usersWithProfiles as User[];
    }
  });

  const toggleProfileMutation = useMutation({
    mutationFn: async ({ userId, profileTypeId, isActive }: { userId: string, profileTypeId: string, isActive: boolean }) => {
      if (isActive) {
        const { error } = await supabase
          .from('user_profile_types')
          .insert({ user_id: userId, profile_type_id: profileTypeId });
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('user_profile_types')
          .delete()
          .match({ user_id: userId, profile_type_id: profileTypeId });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-with-profiles'] });
      toast.success("Profile updated successfully");
    },
    onError: () => {
      toast.error("Failed to update profile");
    }
  });

  const handleProfileToggle = (userId: string, profileTypeId: string, currentState: boolean) => {
    toggleProfileMutation.mutate({
      userId,
      profileTypeId,
      isActive: !currentState
    });
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">User Profile Management</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Input 
              placeholder="Search users..." 
              className="w-full pl-10"
            />
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-500" />
          </div>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by profile" />
            </SelectTrigger>
            <SelectContent>
              {profileTypes?.map((type) => (
                <SelectItem key={type.id} value={type.code}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">User</th>
                <th className="text-left p-2">Email</th>
                {profileTypes?.map((type) => (
                  <th key={type.id} className="text-center p-2">{type.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-2">{user.first_name} {user.last_name}</td>
                  <td className="p-2">{user.email}</td>
                  {profileTypes?.map((type) => (
                    <td key={type.id} className="text-center p-2">
                      <Switch
                        checked={user.profile_types.some(pt => pt.profile_type_id === type.id)}
                        onCheckedChange={() => handleProfileToggle(
                          user.id,
                          type.id,
                          user.profile_types.some(pt => pt.profile_type_id === type.id)
                        )}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
