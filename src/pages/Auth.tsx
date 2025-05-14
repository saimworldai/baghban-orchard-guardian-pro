
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { UserCheck, Lock, Mail, User, Loader2, TreeDeciduous } from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import { motion } from "framer-motion";

// Helper function to clean up auth state
const cleanupAuthState = () => {
  // Remove standard auth tokens
  localStorage.removeItem('supabase.auth.token');
  // Remove all Supabase auth keys from localStorage
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
      localStorage.removeItem(key);
    }
  });
};

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || "/";

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Clean up existing auth state
      cleanupAuthState();
      
      // Attempt global sign out first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });
      
      if (error) throw error;
      
      toast.success("Signup successful! Please check your email for verification.");
    } catch (error: any) {
      toast.error(error.message || "An error occurred during signup");
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Clean up existing auth state
      cleanupAuthState();
      
      // Attempt global sign out first
      try {
        await supabase.auth.signOut({ scope: 'global' });
      } catch (err) {
        // Continue even if this fails
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      toast.success("Login successful!");
      // Use replace: true to prevent going back to login screen
      navigate(from, { replace: true });
    } catch (error: any) {
      toast.error(error.message || "Invalid login credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4"
    >
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm -z-10"></div>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cGF0aCBmaWxsPSIjMDAwIiBmaWxsLW9wYWNpdHk9Ii4wNSIgZD0iTTk5IDEzOWMtNDAuMzE4IDAtNzMtMzIuNjgyLTczLTczUzU4LjY4Mi03IDk5LTdjNDAuMzE4IDAgNzMgMzIuNjgyIDczIDczcy0zMi42ODIgNzMtNzMgNzN6bTAtMTBjMzQuNzQyIDAgNjMtMjguMjU4IDYzLTYzUzEzMy43NDIgMTcgOTkgMTcgMzYgNDUuMjU4IDM2IDgwczI4LjI1OCA2MyA2MyA2M3oiLz48cGF0aCBkPSJNMTE1IDExNWE4IDggMCAxMCAwLTE2IDggOCAwIDAwMCAxNnoiIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iLjA1Ii8+PC9nPjwvc3ZnPg==')] bg-repeat opacity-20 -z-10"></div>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        className="w-full max-w-md"
      >
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border border-green-100 shadow-xl overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-200 rounded-full -mr-20 -mt-20 opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-200 rounded-full -ml-20 -mb-20 opacity-20"></div>
          
          <CardHeader className="space-y-2 text-center relative z-10">
            <div className="mx-auto mb-2">
              <TreeDeciduous className="h-12 w-12 text-green-600" />
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-br from-green-800 to-blue-700 bg-clip-text text-transparent">
              Baghban Guardian
            </CardTitle>
            <CardDescription>
              Sign in to access your orchard management tools
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleSignIn}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-green-600" />
                      Email
                    </Label>
                    <Input 
                      id="email"
                      type="email" 
                      placeholder="your@email.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-green-100 focus-visible:ring-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password" className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-green-600" />
                      Password
                    </Label>
                    <Input 
                      id="password"
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-green-100 focus-visible:ring-green-500"
                    />
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Sign In
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleSignUp}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-2">
                      <User className="h-4 w-4 text-green-600" />
                      Full Name
                    </Label>
                    <Input 
                      id="fullName"
                      placeholder="John Doe" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      className="border-green-100 focus-visible:ring-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail" className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-green-600" />
                      Email
                    </Label>
                    <Input 
                      id="registerEmail"
                      type="email" 
                      placeholder="your@email.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-green-100 focus-visible:ring-green-500"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword" className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-green-600" />
                      Password
                    </Label>
                    <Input 
                      id="registerPassword"
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="border-green-100 focus-visible:ring-green-500"
                    />
                  </div>
                </CardContent>
                
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-300"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      <>
                        <UserCheck className="mr-2 h-4 w-4" />
                        Create Account
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Auth;
