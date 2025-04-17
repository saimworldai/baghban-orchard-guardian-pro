
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthProvider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { UserCheck, LogIn, Home, TreeDeciduous } from 'lucide-react';

const Navigation = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show on auth page
  if (location.pathname === '/auth') return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-100 bg-white/90 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <TreeDeciduous className="h-8 w-8 text-green-600" />
          <span className="text-xl font-bold bg-gradient-to-br from-green-800 to-blue-700 bg-clip-text text-transparent hidden sm:inline-block">
            Baghban Guardian
          </span>
        </Link>

        <div className="flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="hidden md:flex gap-1">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="border-green-200 text-green-700 hover:bg-green-50"
                onClick={() => navigate('/profile')}
              >
                <UserCheck className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Profile</span>
              </Button>
              
              <Avatar 
                className="h-8 w-8 cursor-pointer border-2 border-green-100" 
                onClick={() => navigate('/profile')}
              >
                <AvatarImage src="" />
                <AvatarFallback className="bg-gradient-to-br from-green-500 to-blue-500 text-white">
                  {user.email?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <Button 
              size="sm"
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              onClick={() => navigate('/auth')}
            >
              <LogIn className="h-4 w-4 mr-2" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
