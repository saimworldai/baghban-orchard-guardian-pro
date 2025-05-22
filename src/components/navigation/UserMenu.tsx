
import React from "react";
import { useAuth } from "@/contexts/AuthProvider";
import { NavLink } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface UserMenuProps {
  isMobile?: boolean;
  onItemClick?: () => void;
}

export function UserMenu({ isMobile = false, onItemClick }: UserMenuProps) {
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    if (onItemClick) onItemClick();
  };

  if (!user) {
    return (
      <NavLink 
        to="/auth" 
        className="text-gray-600 hover:text-green-600 transition-colors"
        onClick={onItemClick}
      >
        Sign In
      </NavLink>
    );
  }

  if (isMobile) {
    return (
      <>
        <NavLink
          to="/profile"
          className="block py-3 px-4 text-gray-600 hover:bg-gray-50 transition-colors"
          onClick={onItemClick}
        >
          Profile
        </NavLink>
        <Button variant="ghost" className="w-full justify-start" onClick={handleLogout}>
          Logout
        </Button>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.full_name} />
            <AvatarFallback>{user.user_metadata?.full_name?.charAt(0)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => {
          window.location.href = '/profile';
          if (onItemClick) onItemClick();
        }}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
