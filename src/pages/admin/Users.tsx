
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
}

interface UserProfileType {
  id: string;
  user_id: string;
  profile_type_id: string;
  is_active: boolean;
}

interface UserProfile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  kyc_status: string | null;
  user_profile_types: {
    profile_type_id: string;
    is_active: boolean;
    profile_types: ProfileType;
  }[];
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
      const { data, error } = await supabase
        .from('profiles')
        .select(`
          id,
          first_name,
          last_name,
          kyc_status,
          user_profile_types (
            profile_type_id,
            is_active,
            profile_types (
              id,
              code,
              name
            )
          )
        `);

      if (error) throw error;
      return data as UserProfile[];
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
      toast.success("Perfil actualizado exitosamente");
    },
    onError: (error: any) => {
      toast.error("Error al actualizar el perfil: " + error.message);
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
        <h1 className="text-3xl font-bold">Gestión de Perfiles de Usuario</h1>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Agregar Usuario
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Input 
              placeholder="Buscar usuarios..." 
              className="w-full pl-10"
            />
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-500" />
          </div>
          <Select>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrar por perfil" />
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
                <th className="text-left p-2">Usuario</th>
                <th className="text-left p-2">Estado KYC</th>
                {profileTypes?.map((type) => (
                  <th key={type.id} className="text-center p-2">{type.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-2">{user.first_name} {user.last_name}</td>
                  <td className="p-2">
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      user.kyc_status === 'approved' ? 'bg-green-100 text-green-800' :
                      user.kyc_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {user.kyc_status || 'Pendiente'}
                    </span>
                  </td>
                  {profileTypes?.map((type) => (
                    <td key={type.id} className="text-center p-2">
                      <Switch
                        checked={user.user_profile_types?.some(
                          upt => upt.profile_type_id === type.id && upt.is_active
                        )}
                        onCheckedChange={() => handleProfileToggle(
                          user.id,
                          type.id,
                          user.user_profile_types?.some(
                            upt => upt.profile_type_id === type.id && upt.is_active
                          ) || false
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
