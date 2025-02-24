
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
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Profile } from "@/types/database";
import { buttonVariants } from "@/components/ui/button";
import type { VariantProps } from "class-variance-authority";

interface ProfileSelectorProps extends VariantProps<typeof buttonVariants> {
  className?: string;
}

interface UserProfile extends Profile {
  profile_type: 'personal' | 'business' | 'commercial' | 'private_banking' | 'developer';
}

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

const dashboardRoutes = {
  personal: "/personal",
  business: "/business/dashboard",
  commercial: "/commercial/dashboard",
  private_banking: "/private/dashboard",
  developer: "/developer/dashboard",
};

export function ProfileSelector({ variant = "ghost", className }: ProfileSelectorProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(null);

  const { data: profiles } = useQuery({
    queryKey: ['user-profiles'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No authenticated user");

      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id);

      if (error) {
        toast.error("Error loading profiles");
        throw error;
      }

      return profiles as UserProfile[];
    },
  });

  useEffect(() => {
    if (profiles?.length && !currentProfile) {
      const profileType = getCurrentProfileTypeFromPath(location.pathname);
      const matchingProfile = profiles.find(p => p.profile_type === profileType) || profiles[0];
      setCurrentProfile(matchingProfile);
    }
  }, [profiles, currentProfile, location.pathname]);

  const getCurrentProfileTypeFromPath = (path: string): UserProfile['profile_type'] => {
    if (path.startsWith('/business')) return 'business';
    if (path.startsWith('/commercial')) return 'commercial';
    if (path.startsWith('/private')) return 'private_banking';
    if (path.startsWith('/developer')) return 'developer';
    return 'personal';
  };

  const handleProfileChange = (profile: UserProfile) => {
    setCurrentProfile(profile);
    navigate(dashboardRoutes[profile.profile_type]);
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
        <Button variant={variant} className="flex items-center gap-2 w-full">
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
