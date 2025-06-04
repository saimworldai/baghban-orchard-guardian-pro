
import React from "react";
import { NavLink } from "react-router-dom";
import { 
  Home, 
  Cloud, 
  Activity, 
  Calendar, 
  Users, 
  Shield,
  BarChart3,
  Zap
} from "lucide-react";

type NavLinksProps = {
  role?: string;
  mobile?: boolean;
};

export function NavLinks({ role, mobile = false }: NavLinksProps) {
  const linkClass = mobile 
    ? "flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors w-full"
    : "flex items-center gap-2 text-gray-700 hover:text-green-600 transition-colors font-medium";

  const activeLinkClass = mobile
    ? "flex items-center gap-3 px-3 py-2 rounded-lg bg-green-100 text-green-700 font-medium w-full"
    : "flex items-center gap-2 text-green-600 font-medium";

  return (
    <div className={mobile ? "space-y-1" : "flex items-center space-x-6"}>
      <NavLink 
        to="/dashboard" 
        className={({ isActive }) => isActive ? activeLinkClass : linkClass}
      >
        <Home className="h-4 w-4" />
        Dashboard
      </NavLink>
      
      <NavLink 
        to="/weather-alerts" 
        className={({ isActive }) => isActive ? activeLinkClass : linkClass}
      >
        <Cloud className="h-4 w-4" />
        Weather
      </NavLink>
      
      <NavLink 
        to="/disease-detection" 
        className={({ isActive }) => isActive ? activeLinkClass : linkClass}
      >
        <Activity className="h-4 w-4" />
        Disease Detection
      </NavLink>
      
      <NavLink 
        to="/spray-schedule" 
        className={({ isActive }) => isActive ? activeLinkClass : linkClass}
      >
        <Calendar className="h-4 w-4" />
        Spray Schedule
      </NavLink>
      
      <NavLink 
        to="/expert-consultation" 
        className={({ isActive }) => isActive ? activeLinkClass : linkClass}
      >
        <Users className="h-4 w-4" />
        Expert Consultation
      </NavLink>
      
      <NavLink 
        to="/analytics" 
        className={({ isActive }) => isActive ? activeLinkClass : linkClass}
      >
        <BarChart3 className="h-4 w-4" />
        Analytics
      </NavLink>
      
      <NavLink 
        to="/integrations" 
        className={({ isActive }) => isActive ? activeLinkClass : linkClass}
      >
        <Zap className="h-4 w-4" />
        Integrations
      </NavLink>
      
      {role === 'admin' && (
        <NavLink 
          to="/admin-consultation" 
          className={({ isActive }) => isActive ? activeLinkClass : linkClass}
        >
          <Shield className="h-4 w-4" />
          Admin
        </NavLink>
      )}
    </div>
  );
}
