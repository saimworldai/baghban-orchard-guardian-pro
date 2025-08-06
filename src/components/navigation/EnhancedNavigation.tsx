
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthProvider';
import { UserMenu } from './UserMenu';
import { MobileMenu } from './MobileMenu';
import { DarkModeToggle } from '@/components/advanced/DarkModeToggle';
import { VoiceCommand } from '@/components/advanced/VoiceCommand';
import { 
  Sprout, 
  Menu, 
  Home, 
  BarChart3, 
  CloudRain, 
  Microscope, 
  Users, 
  Calendar,
  Settings
} from 'lucide-react';
import { motion } from 'framer-motion';

export function EnhancedNavigation() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
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
      className="sticky top-0 z-50 w-full border-b border-border/50 glass backdrop-blur-xl shadow-lg"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="p-2 gradient-primary rounded-xl shadow-glow"
            >
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            <div>
              <span className="text-xl font-bold text-gradient-primary">
                Baghban Guardian
              </span>
              <div className="text-xs text-muted-foreground font-medium">Free for Everyone</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.href} to={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className={`relative transition-all duration-300 hover-lift ${
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
                        className="ml-2 text-xs bg-primary/10 text-primary border-primary/20 shadow-sm"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                </Link>
              );
            })}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <VoiceCommand onCommand={handleVoiceCommand} />
            <DarkModeToggle />
            
            {user ? (
              <UserMenu />
            ) : (
              <div className="hidden sm:flex sm:items-center sm:space-x-2">
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/disease-detection">
                  <Button variant="premium" size="sm">
                    Try Free
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
      />
    </motion.nav>
  );
}
