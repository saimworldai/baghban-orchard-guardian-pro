
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { useUserRole } from "@/hooks/useUserRole";
import { NavLinks } from "./navigation/NavLinks";
import { UserMenu } from "./navigation/UserMenu";
import { MobileMenu } from "./navigation/MobileMenu";

export function Navigation() {
  const { user } = useAuth();
  const { role } = useUserRole();

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <NavLink to="/" className="text-lg font-semibold">
          Orchard Management
        </NavLink>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks role={role} />
        </div>
        
        <div className="hidden md:block">
          <UserMenu />
        </div>
        
        <MobileMenu />
      </div>
    </div>
  );
}

export default Navigation;
