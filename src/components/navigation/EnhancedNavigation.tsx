
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthProvider';
import { UserMenu } from './UserMenu';
import { MobileMenu } from './MobileMenu';
import { DarkModeToggle } from '@/components/advanced/DarkModeToggle';
import { VoiceCommand } from '@/components/advanced/VoiceCommand';
import { StatusIndicator } from '@/components/ui/professional-feedback';
import { 
  Sprout, 
  Menu, 
  Home, 
  BarChart3, 
  CloudRain, 
  Microscope, 
  Users, 
  Calendar,
  Settings,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function EnhancedNavigation() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // Listen to online/offline status
  React.useEffect(() => {
    const handleOnlineStatus = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOnlineStatus);
    return () => {
      window.removeEventListener('online', handleOnlineStatus);
      window.removeEventListener('offline', handleOnlineStatus);
    };
  }, []);

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Plant Doctor', href: '/disease-detection', icon: Microscope, badge: 'AI', badgeStyle: 'premium' as const },
    { name: 'Weather', href: '/weather-alerts', icon: CloudRain },
    { name: 'Expert Help', href: '/expert-consultation', icon: Users, badge: 'Free', badgeStyle: 'success' as const },
    { name: 'Plant Care', href: '/plant-care', icon: BarChart3 },
    { name: 'Community', href: '/community', icon: Users },
  ];

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Simple voice navigation
    if (lowerCommand.includes('home'))           navigate('/');
    else if (lowerCommand.includes('dashboard')) navigate('/dashboard');
    else if (lowerCommand.includes('weather'))   navigate('/weather-alerts');
    else if (lowerCommand.includes('disease'))   navigate('/disease-detection');
    else if (lowerCommand.includes('expert'))    navigate('/expert-consultation');
    else if (lowerCommand.includes('spray'))     navigate('/spray-schedule');
    else if (lowerCommand.includes('analytics')) navigate('/analytics');
    else if (lowerCommand.includes('profile'))   navigate('/profile');
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
      className="sticky top-0 z-50 w-full border-b border-border/50 glass backdrop-blur-xl shadow-elegant"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="p-2 gradient-primary rounded-xl shadow-glow"
            >
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            <div>
              <span className="text-xl font-bold text-gradient-primary">
                Baghban Guardian
              </span>
              <div className="flex items-center gap-2">
                <div className="text-xs text-muted-foreground font-medium">Free for Everyone</div>
                <StatusIndicator status={isOnline ? 'online' : 'offline'} size="sm" />
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            <AnimatePresence>
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link to={item.href}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        size="sm"
                        className={`relative transition-all duration-300 hover-lift group ${
                          isActive 
                            ? "gradient-primary text-primary-foreground shadow-elegant" 
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        <item.icon className="h-4 w-4 mr-2" />
                        {item.name}
                        {item.badge && (
                          <Badge 
                            variant="secondary"
                            className={`ml-2 text-xs transition-all duration-200 group-hover:scale-110 ${
                              isActive 
                                ? "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30" 
                                : item.badgeStyle === 'premium'
                                ? "bg-gradient-primary text-primary-foreground border-primary/20 shadow-sm"
                                : item.badgeStyle === 'success'
                                ? "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300"
                                : "bg-primary/10 text-primary border-primary/20 shadow-sm"
                            }`}
                          >
                            {item.badge}
                            {item.badge === 'AI' && <Zap className="w-3 h-3 ml-1" />}
                          </Badge>
                        )}
                        
                        {/* Active indicator */}
                        {isActive && (
                          <motion.div
                            layoutId="activeNavItem"
                            className="absolute inset-0 bg-primary/10 rounded-md -z-10"
                            initial={false}
                            transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          />
                        )}
                      </Button>
                    </Link>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              <VoiceCommand onCommand={handleVoiceCommand} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              <DarkModeToggle />
            </motion.div>
            
            {user ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <UserMenu />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="hidden sm:flex sm:items-center sm:space-x-2"
              >
                <Link to="/auth">
                  <Button variant="outline" size="sm" className="hover-lift">
                    Sign In
                  </Button>
                </Link>
                <Link to="/disease-detection">
                  <Button variant="premium" size="sm" className="hover-lift">
                    Try Free
                  </Button>
                </Link>
              </motion.div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden hover-lift"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <motion.div
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5" />
              </motion.div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu 
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            navigation={navigation}
          />
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
