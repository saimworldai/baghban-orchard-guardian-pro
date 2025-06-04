
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  HelpCircle, 
  Settings, 
  User,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import { useUserRole } from "@/hooks/useUserRole";
import { NavLinks } from "./NavLinks";
import { UserMenu } from "./UserMenu";
import { NotificationCenter } from "../notifications/NotificationCenter";
import { HelpCenter } from "../help/HelpCenter";
import { motion, AnimatePresence } from "framer-motion";

export function EnhancedNavigation() {
  const { user } = useAuth();
  const { role } = useUserRole();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Mock notification count - in real app, this would come from your notification service
  const unreadNotifications = 3;

  return (
    <>
      <div className="bg-white shadow-sm sticky top-0 z-40 border-b">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="text-lg font-semibold text-green-700 hover:text-green-800 transition-colors">
            🌳 Orchard Guardian Pro
          </NavLink>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks role={role} />
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Help Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowHelp(true)}
              className="relative text-gray-600 hover:text-gray-800"
            >
              <HelpCircle className="h-5 w-5" />
            </Button>

            {/* Notifications Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowNotifications(true)}
              className="relative text-gray-600 hover:text-gray-800"
            >
              <Bell className="h-5 w-5" />
              {unreadNotifications > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center p-0">
                  {unreadNotifications > 9 ? '9+' : unreadNotifications}
                </Badge>
              )}
            </Button>
            
            {/* User Menu - Desktop */}
            <div className="hidden md:block">
              <UserMenu />
            </div>
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white border-t shadow-lg"
            >
              <div className="container mx-auto px-4 py-4 space-y-3">
                <NavLinks role={role} mobile />
                <div className="pt-3 border-t">
                  <UserMenu mobile />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Notification Center */}
      <NotificationCenter 
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
      />

      {/* Help Center */}
      <HelpCenter 
        isOpen={showHelp}
        onClose={() => setShowHelp(false)}
      />
    </>
  );
}
