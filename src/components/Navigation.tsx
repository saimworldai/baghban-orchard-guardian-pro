
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { useUserRole } from "@/hooks/useUserRole";
import { NavLinks } from "./navigation/NavLinks";
import { UserMenu } from "./navigation/UserMenu";
import { MobileMenu } from "./navigation/MobileMenu";
import { 
  Home, 
  BarChart3, 
  CloudRain, 
  Microscope, 
  Users, 
  Calendar,
  Settings,
  Menu
} from 'lucide-react';

export function Navigation() {
  const { user } = useAuth();
  const { role } = useUserRole();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'Weather', href: '/weather-alerts', icon: CloudRain },
    { name: 'Disease Detection', href: '/disease-detection', icon: Microscope, badge: 'AI' },
    { name: 'Expert Help', href: '/expert-consultation', icon: Users, badge: 'Free' },
    { name: 'Spray Schedule', href: '/spray-schedule', icon: Calendar },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Integrations', href: '/integrations', icon: Settings },
  ];

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
        
        <MobileMenu 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          navigation={navigation}
        />
      </div>
    </div>
  );
}

export default Navigation;
