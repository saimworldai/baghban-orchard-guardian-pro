
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthProvider";
import { useUserRole } from "@/hooks/useUserRole";
import { 
  TreeDeciduous, 
  Menu, 
  X, 
  Bell, 
  User, 
  LogOut, 
  Settings,
  Brain,
  CloudRain,
  Users,
  Calendar,
  BarChart3,
  Shield,
  Home,
  HelpCircle
} from "lucide-react";

const publicNavItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "Try Demo", path: "/#demo", icon: Brain },
];

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: Home },
  { name: "Disease Detection", path: "/disease-detection", icon: Brain },
  { name: "Weather Alerts", path: "/weather-alerts", icon: CloudRain },
  { name: "Expert Consultation", path: "/expert-consultation", icon: Users },
  { name: "Spray Schedule", path: "/spray-schedule", icon: Calendar },
  { name: "Analytics", path: "/analytics", icon: BarChart3 },
];

export function EnhancedNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, signOut } = useAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
    setIsOpen(false);
  };

  const currentNavItems = user ? navItems : publicNavItems;

  const scrollToDemo = () => {
    const demoSection = document.querySelector('#demo') || 
                       document.querySelector('[aria-label*="demo"]') ||
                       document.querySelector('.PublicDemoSection');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3"
          >
            <NavLink to="/" className="flex items-center space-x-3 group">
              <motion.div
                whileHover={{ rotate: 10 }}
                className="p-2 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg"
              >
                <TreeDeciduous className="h-8 w-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-xl font-black bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                  Baghban Guardian
                </h1>
                <p className="text-xs text-gray-500 -mt-1">AI-Powered Agriculture</p>
              </div>
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {currentNavItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.path === "/#demo" ? (
                  <Button
                    variant="ghost"
                    onClick={scrollToDemo}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-all duration-200 group"
                  >
                    <item.icon className="h-4 w-4 text-gray-600 group-hover:text-green-600 transition-colors" />
                    <span className="font-medium text-gray-700 group-hover:text-green-700">
                      {item.name}
                    </span>
                  </Button>
                ) : (
                  <NavLink 
                    to={item.path}
                    className={({ isActive }) => 
                      `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group ${
                        isActive 
                          ? 'bg-green-100 text-green-700 shadow-md' 
                          : 'hover:bg-green-50 text-gray-700 hover:text-green-700'
                      }`
                    }
                  >
                    <item.icon className="h-4 w-4 transition-colors" />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                )}
              </motion.div>
            ))}

            {user && role === 'admin' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
              >
                <NavLink 
                  to="/admin"
                  className={({ isActive }) => 
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 group ${
                      isActive 
                        ? 'bg-red-100 text-red-700 shadow-md' 
                        : 'hover:bg-red-50 text-gray-700 hover:text-red-700'
                    }`
                  }
                >
                  <Shield className="h-4 w-4 transition-colors" />
                  <span className="font-medium">Admin</span>
                  <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs">
                    Admin
                  </Badge>
                </NavLink>
              </motion.div>
            )}
          </div>

          {/* Desktop User Menu */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <>
                {/* Notifications */}
                <motion.div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative hover:bg-green-50"
                  >
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                      3
                    </Badge>
                  </Button>
                  
                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 z-50"
                      >
                        <h3 className="font-semibold text-gray-800 mb-3">Notifications</h3>
                        <div className="space-y-3">
                          <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                            <p className="text-sm font-medium text-blue-800">Weather Alert</p>
                            <p className="text-xs text-blue-600">Rain expected in your area</p>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                            <p className="text-sm font-medium text-green-800">Analysis Complete</p>
                            <p className="text-xs text-green-600">Disease detection results ready</p>
                          </div>
                          <div className="p-3 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                            <p className="text-sm font-medium text-amber-800">Spray Reminder</p>
                            <p className="text-xs text-amber-600">Schedule spray for tomorrow</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Help */}
                <Button variant="ghost" size="icon" className="hover:bg-green-50">
                  <HelpCircle className="h-5 w-5" />
                </Button>

                {/* Profile Menu */}
                <div className="flex items-center space-x-2">
                  <NavLink to="/profile">
                    <Button variant="ghost" size="icon" className="hover:bg-green-50">
                      <User className="h-5 w-5" />
                    </Button>
                  </NavLink>
                  <Button 
                    variant="ghost" 
                    onClick={handleSignOut}
                    className="text-gray-600 hover:text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <NavLink to="/auth">
                  <Button variant="ghost" className="hover:bg-green-50">
                    Sign In
                  </Button>
                </NavLink>
                <NavLink to="/auth">
                  <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg">
                    Get Started Free
                  </Button>
                </NavLink>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="hover:bg-green-50"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-green-100 py-4 bg-white/95 backdrop-blur-md"
            >
              <div className="space-y-2">
                {currentNavItems.map((item) => (
                  <div key={item.name}>
                    {item.path === "/#demo" ? (
                      <Button
                        variant="ghost"
                        onClick={scrollToDemo}
                        className="w-full justify-start flex items-center gap-3 px-4 py-3 hover:bg-green-50"
                      >
                        <item.icon className="h-5 w-5 text-gray-600" />
                        <span className="font-medium">{item.name}</span>
                      </Button>
                    ) : (
                      <NavLink 
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) => 
                          `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            isActive 
                              ? 'bg-green-100 text-green-700' 
                              : 'hover:bg-green-50 text-gray-700'
                          }`
                        }
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.name}</span>
                      </NavLink>
                    )}
                  </div>
                ))}

                {user && role === 'admin' && (
                  <NavLink 
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) => 
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive 
                          ? 'bg-red-100 text-red-700' 
                          : 'hover:bg-red-50 text-gray-700'
                      }`
                    }
                  >
                    <Shield className="h-5 w-5" />
                    <span className="font-medium">Admin</span>
                    <Badge variant="secondary" className="bg-red-100 text-red-700 text-xs ml-auto">
                      Admin
                    </Badge>
                  </NavLink>
                )}

                <div className="border-t border-gray-200 pt-4 mt-4">
                  {user ? (
                    <div className="space-y-2">
                      <NavLink 
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50 text-gray-700"
                      >
                        <User className="h-5 w-5" />
                        <span className="font-medium">Profile</span>
                      </NavLink>
                      <Button
                        variant="ghost"
                        onClick={handleSignOut}
                        className="w-full justify-start flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="h-5 w-5" />
                        <span className="font-medium">Sign Out</span>
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <NavLink 
                        to="/auth"
                        onClick={() => setIsOpen(false)}
                        className="block"
                      >
                        <Button variant="ghost" className="w-full justify-start">
                          Sign In
                        </Button>
                      </NavLink>
                      <NavLink 
                        to="/auth"
                        onClick={() => setIsOpen(false)}
                        className="block"
                      >
                        <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white">
                          Get Started Free
                        </Button>
                      </NavLink>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
