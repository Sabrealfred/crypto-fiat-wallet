
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle2, Building2, Users, Diamond, Code2, ChevronDown, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { UserProfile, ProfileType } from "@/types/profiles";
import { toast } from "sonner";

const profileIcons = {
  personal: UserCircle2,
  business: Building2,
  commercial: Users,
  private_banking: Diamond,
  developer: Code2,
};

const profileLabels = {
  personal: "Personal Banking",
  business: "Business Banking",
  commercial: "Commercial Banking",
  private_banking: "Private Banking",
  developer: "Developer Portal",
};

export function ProfileSelector() {
  const navigate = useNavigate();
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);

  const { data: profiles } = useQuery({
    queryKey: ['user-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .order('created_at', { ascending: true });

      if (error) {
        toast.error("Error loading profiles");
        throw error;
      }

      return data as UserProfile[];
    },
  });

  useEffect(() => {
    if (profiles?.length && !currentProfile) {
      setCurrentProfile(profiles[0]);
    }
  }, [profiles, currentProfile]);

  const handleProfileChange = (profile: UserProfile) => {
    setCurrentProfile(profile);
    // Redirect to the appropriate dashboard based on profile type
    switch (profile.profile_type) {
      case 'personal':
        navigate('/');
        break;
      case 'business':
        navigate('/business');
        break;
      case 'commercial':
        navigate('/commercial');
        break;
      case 'private_banking':
        navigate('/private');
        break;
      case 'developer':
        navigate('/developer');
        break;
    }
  };

  const handleCreateProfile = () => {
    navigate('/settings/profiles/new');
  };

  if (!profiles?.length) {
    return null;
  }

  const Icon = currentProfile ? profileIcons[currentProfile.profile_type] : UserCircle2;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          <span className="hidden md:inline">
            {currentProfile ? profileLabels[currentProfile.profile_type] : "Select Profile"}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Switch Profile</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {profiles?.map((profile) => {
          const ProfileIcon = profileIcons[profile.profile_type];
          return (
            <DropdownMenuItem
              key={profile.id}
              onClick={() => handleProfileChange(profile)}
              className="flex items-center gap-2"
            >
              <ProfileIcon className="h-4 w-4" />
              <span>{profileLabels[profile.profile_type]}</span>
              {profile.business_name && (
                <span className="text-xs text-muted-foreground ml-auto">
                  {profile.business_name}
                </span>
              )}
            </DropdownMenuItem>
          );
        })}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleCreateProfile} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          <span>Add New Profile</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
