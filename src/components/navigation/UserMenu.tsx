
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthProvider";
import { User, LogOut, Settings } from "lucide-react";

type UserMenuProps = {
  mobile?: boolean;
};

export function UserMenu({ mobile = false }: UserMenuProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (!user) {
    return (
      <div className={mobile ? "space-y-2" : "flex items-center space-x-2"}>
        <NavLink to="/auth">
          <Button variant="ghost" className="w-full">
            Sign In
          </Button>
        </NavLink>
        <NavLink to="/auth">
          <Button className="bg-green-600 hover:bg-green-700 w-full">
            Get Started
          </Button>
        </NavLink>
      </div>
    );
  }

  if (mobile) {
    return (
      <div className="space-y-2">
        <NavLink 
          to="/profile" 
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full"
        >
          <User className="h-4 w-4" />
          Profile
        </NavLink>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full text-left"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <NavLink to="/profile">
        <Button variant="ghost" size="icon">
          <User className="h-4 w-4" />
        </Button>
      </NavLink>
      <Button variant="ghost" onClick={handleSignOut} className="text-gray-600 hover:text-gray-800">
        Sign Out
      </Button>
    </div>
  );
}
