
import React from "react";
import { NavLink } from "react-router-dom";

interface NavLinksProps {
  isMobile?: boolean;
  role?: string | null;
  onItemClick?: () => void;
}

export function NavLinks({ isMobile = false, role, onItemClick }: NavLinksProps) {
  const linkClass = isMobile
    ? ({ isActive }: { isActive: boolean }) =>
        isActive
          ? "block py-3 px-4 bg-green-50 text-green-600 font-medium"
          : "block py-3 px-4 text-gray-600 hover:bg-gray-50 transition-colors"
    : ({ isActive }: { isActive: boolean }) =>
        isActive
          ? "text-green-600 font-medium"
          : "text-gray-600 hover:text-green-600 transition-colors";

  return (
    <>
      <NavLink to="/" className={linkClass} onClick={onItemClick}>
        Home
      </NavLink>
      <NavLink to="/weather-alerts" className={linkClass} onClick={onItemClick}>
        Weather Alerts
      </NavLink>
      <NavLink to="/disease-detection" className={linkClass} onClick={onItemClick}>
        Disease Detection
      </NavLink>
      <NavLink to="/spray-schedule" className={linkClass} onClick={onItemClick}>
        Spray Schedule
      </NavLink>
      <NavLink to="/expert-consultation" className={linkClass} onClick={onItemClick}>
        Expert Consultation
      </NavLink>
      
      {role === 'admin' && (
        <NavLink to="/admin-consultation" className={linkClass} onClick={onItemClick}>
          Admin Dashboard
        </NavLink>
      )}
    </>
  );
}
