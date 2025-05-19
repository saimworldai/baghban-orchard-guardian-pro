
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { useUserRole } from "@/hooks/useUserRole";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export function Navigation() {
  const { user, signOut } = useAuth();
  const { role } = useUserRole();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <NavLink to="/" className="text-lg font-semibold">
          Orchard Management
        </NavLink>
        
        <div className="hidden md:flex items-center space-x-8">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-medium"
                : "text-gray-600 hover:text-green-600 transition-colors"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/weather-alerts"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-medium"
                : "text-gray-600 hover:text-green-600 transition-colors"
            }
          >
            Weather Alerts
          </NavLink>
          <NavLink
            to="/disease-detection"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-medium"
                : "text-gray-600 hover:text-green-600 transition-colors"
            }
          >
            Disease Detection
          </NavLink>
          <NavLink
            to="/spray-schedule"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-medium"
                : "text-gray-600 hover:text-green-600 transition-colors"
            }
          >
            Spray Schedule
          </NavLink>
          <NavLink
            to="/expert-consultation"
            className={({ isActive }) =>
              isActive
                ? "text-green-600 font-medium"
                : "text-gray-600 hover:text-green-600 transition-colors"
            }
          >
            Expert Consultation
          </NavLink>
          
          {role === 'admin' && (
            <NavLink
              to="/admin-consultation"
              className={({ isActive }) =>
                isActive
                  ? "text-green-600 font-medium"
                  : "text-gray-600 hover:text-green-600 transition-colors"
              }
            >
              Admin Dashboard
            </NavLink>
          )}
        </div>
        
        {user ? (
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
              <DropdownMenuItem onClick={() => window.location.href = '/profile'}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <NavLink to="/auth" className="text-gray-600 hover:text-green-600 transition-colors">
            Sign In
          </NavLink>
        )}
        
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" className="p-2">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Navigate through the application.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-4 bg-green-50 text-green-600 font-medium"
                    : "block py-3 px-4 text-gray-600 hover:bg-gray-50 transition-colors"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/weather-alerts"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-4 bg-green-50 text-green-600 font-medium"
                    : "block py-3 px-4 text-gray-600 hover:bg-gray-50 transition-colors"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Weather Alerts
              </NavLink>
              <NavLink
                to="/disease-detection"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-4 bg-green-50 text-green-600 font-medium"
                    : "block py-3 px-4 text-gray-600 hover:bg-gray-50 transition-colors"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Disease Detection
              </NavLink>
              <NavLink
                to="/spray-schedule"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-4 bg-green-50 text-green-600 font-medium"
                    : "block py-3 px-4 text-gray-600 hover:bg-gray-50 transition-colors"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Spray Schedule
              </NavLink>
              <NavLink
                to="/expert-consultation"
                className={({ isActive }) =>
                  isActive
                    ? "block py-3 px-4 bg-green-50 text-green-600 font-medium"
                    : "block py-3 px-4 text-gray-600 hover:bg-gray-50 transition-colors"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Expert Consultation
              </NavLink>
              
              {role === 'admin' && (
                <NavLink
                  to="/admin-consultation"
                  className={({ isActive }) =>
                    isActive
                      ? "block py-3 px-4 bg-green-50 text-green-600 font-medium"
                      : "block py-3 px-4 text-gray-600 hover:bg-gray-50 transition-colors"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Dashboard
                </NavLink>
              )}
              
              {user ? (
                <>
                  <NavLink
                    to="/profile"
                    className="block py-3 px-4 text-gray-600 hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Profile
                  </NavLink>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}>
                    Logout
                  </Button>
                </>
              ) : (
                <NavLink
                  to="/auth"
                  className="block py-3 px-4 text-gray-600 hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign In
                </NavLink>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}

export default Navigation;
