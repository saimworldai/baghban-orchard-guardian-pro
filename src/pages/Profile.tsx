
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Calendar, Settings, Heart, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-md">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Globe className="h-16 w-16 text-green-600 mx-auto mb-4" />
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Baghban Guardian</h1>
                  <p className="text-gray-600">
                    All our features are completely free and available to everyone! 
                    You can use our AI-powered tools without creating an account.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <Button 
                    onClick={() => navigate('/disease-detection')}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    Try Disease Detection
                  </Button>
                  
                  <Button 
                    onClick={() => navigate('/weather-alerts')}
                    variant="outline"
                    className="w-full border-green-200 text-green-700 hover:bg-green-50"
                  >
                    Check Weather Alerts
                  </Button>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-3">
                      Want to save your preferences and join our community?
                    </p>
                    <Button 
                      onClick={() => navigate('/auth')}
                      variant="ghost"
                      className="w-full hover:bg-green-50"
                    >
                      Create Free Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-2">
              Your Profile
            </h1>
            <p className="text-gray-600">Welcome to the Baghban Guardian community!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Profile Information */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-green-600" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <Mail className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">{user.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p className="font-medium text-gray-800">
                      {new Date(user.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Impact */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-md">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  Community Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-800 mb-2">Thank You!</h3>
                  <p className="text-sm text-green-700">
                    By being part of our community, you're helping us make agricultural technology accessible to farmers worldwide.
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">100%</p>
                    <p className="text-xs text-blue-700">Free Access</p>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">∞</p>
                    <p className="text-xs text-green-700">Usage Limit</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-md">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button 
                  onClick={() => navigate('/disease-detection')}
                  className="h-auto p-4 flex flex-col items-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                >
                  <span className="text-2xl">🔬</span>
                  <span className="text-sm">Disease Detection</span>
                </Button>
                
                <Button 
                  onClick={() => navigate('/weather-alerts')}
                  className="h-auto p-4 flex flex-col items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                >
                  <span className="text-2xl">⛈️</span>
                  <span className="text-sm">Weather Alerts</span>
                </Button>
                
                <Button 
                  onClick={() => navigate('/expert-consultation')}
                  className="h-auto p-4 flex flex-col items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700"
                >
                  <span className="text-2xl">👨‍🌾</span>
                  <span className="text-sm">Expert Help</span>
                </Button>
                
                <Button 
                  onClick={() => navigate('/analytics')}
                  className="h-auto p-4 flex flex-col items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                >
                  <span className="text-2xl">📊</span>
                  <span className="text-sm">Analytics</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
