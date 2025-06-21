
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/AuthProvider';
import { LucideIcon } from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
}

export function MobileMenu({ isOpen, onClose, navigation }: MobileMenuProps) {
  const { user } = useAuth();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 bg-gradient-to-b from-green-50 to-blue-50">
        <SheetHeader>
          <SheetTitle className="text-left text-green-700">Navigation</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-2">
          {navigation.map((item) => (
            <Link key={item.href} to={item.href} onClick={onClose}>
              <Button
                variant="ghost"
                className="w-full justify-start text-left p-4 h-auto hover:bg-white/80"
              >
                <item.icon className="h-5 w-5 mr-3 text-green-600" />
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <Badge variant="secondary" className="ml-2 bg-green-100 text-green-700">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </Link>
          ))}
        </div>

        {!user && (
          <div className="mt-8 space-y-3 border-t pt-6">
            <Link to="/auth" onClick={onClose}>
              <Button variant="outline" className="w-full">
                Sign In
              </Button>
            </Link>
            <Link to="/disease-detection" onClick={onClose}>
              <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600">
                Try Free Tools
              </Button>
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
