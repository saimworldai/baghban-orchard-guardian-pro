
import React, { useState } from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { ConsultantDashboard } from '@/components/expert-consultation';
import { HeaderSection } from '@/components/expert-consultation/HeaderSection';
import { TabsSection } from '@/components/expert-consultation/TabsSection';
import { HistorySection } from '@/components/expert-consultation/HistorySection';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { Separator } from '@/components/ui/separator';
import { DailyTipsCarousel } from '@/components/expert-consultation/DailyTipsCarousel';
import { SmartNotifications } from '@/components/expert-consultation/SmartNotifications';
import { LanguageSupport } from '@/components/expert-consultation/LanguageSupport';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';

export default function ExpertConsultation() {
  const { role, loading: roleLoading } = useUserRole();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('experts');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleStartCall = () => {
    setActiveTab('video');
  };

  // Don't redirect to auth if we're already loading
  const loading = authLoading || roleLoading;

  // Handle authentication - only redirect after loading completes
  const renderAuthPrompt = () => {
    if (loading) return null;
    
    if (!user) {
      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto p-8 max-w-3xl"
        >
          <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-br from-white to-green-50">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 rounded-full -mr-32 -mt-32 opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-200 rounded-full -ml-32 -mb-32 opacity-20"></div>
            
            <CardContent className="p-8 relative z-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-br from-green-800 to-blue-700 bg-clip-text text-transparent mb-4">
                  Expert Consultation
                </h1>
                <p className="text-gray-600 max-w-md mx-auto">
                  Connect with agricultural experts to get personalized advice for your orchard management needs.
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-6 mt-8">
                <Button 
                  className="w-full max-w-sm bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  size="lg"
                  onClick={() => navigate('/auth')}
                >
                  Sign in to access expert consultation
                </Button>
                
                <Button 
                  variant="outline" 
                  className="border-green-200 text-green-700 hover:bg-green-50"
                  onClick={() => navigate('/')}
                >
                  Return to home page
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      );
    }
    
    return null;
  };

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700">Loading...</h3>
        </div>
      </div>
    );
  }

  // Show auth prompt if not authenticated
  const authPrompt = renderAuthPrompt();
  if (authPrompt) return authPrompt;

  // Consultant dashboard
  if (role === 'consultant' || role === 'admin') {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100 mb-6 shadow-sm"
        >
          <h1 className="text-3xl font-bold text-green-800 mb-2">Consultant Dashboard</h1>
          <p className="text-green-600">Manage your consultations and help farmers with their queries</p>
        </motion.div>
        <ConsultantDashboard />
      </div>
    );
  }

  // Farmer view (default)
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <HeaderSection onStartCall={handleStartCall} />
      </motion.div>
      
      {/* Main Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <TabsSection activeTab={activeTab} onTabChange={setActiveTab} />
        </motion.div>
        
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Smart Notifications */}
          <SmartNotifications />
          
          {/* Daily Tips Carousel */}
          <DailyTipsCarousel />
          
          {/* Group Consultations Feature */}
          <Card className="overflow-hidden border-green-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-purple-100">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Group Consultations</h3>
                  <p className="text-sm text-gray-600">Join topic-based sessions with other farmers</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-gray-50 to-purple-50 p-3 rounded-md border border-purple-100">
                  <h4 className="font-medium text-sm">Upcoming Webinar</h4>
                  <p className="text-sm">Winter Orchard Preparation</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">Nov 15, 2023 • 3:00 PM</span>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Group session feature coming soon")} 
                      className="border-purple-200 text-purple-700 hover:bg-purple-50">
                      Join for ₹20
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-3 rounded-md border border-blue-100">
                  <h4 className="font-medium text-sm">Upcoming Webinar</h4>
                  <p className="text-sm">Pest Management for Apple Trees</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">Nov 20, 2023 • 4:30 PM</span>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Group session feature coming soon")}
                      className="border-blue-200 text-blue-700 hover:bg-blue-50">
                      Join for ₹15
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      <Separator className="my-8" />
      
      {/* Advanced Features */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Advanced Features</h2>
          <Button 
            variant="ghost" 
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-green-700 hover:text-green-800 hover:bg-green-50"
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Features
          </Button>
        </div>
        
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <LanguageSupport />
            
            <Card className="border-green-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Consultation Pricing</h3>
                
                <Tabs defaultValue="plans">
                  <TabsList className="mb-4 bg-gray-100">
                    <TabsTrigger value="plans" className="data-[state=active]:bg-green-100 data-[state=active]:text-green-800">Plans</TabsTrigger>
                    <TabsTrigger value="discounts" className="data-[state=active]:bg-amber-100 data-[state=active]:text-amber-800">Discounts</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="plans" className="space-y-4">
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                      <h4 className="font-medium text-green-800">Basic Plan</h4>
                      <p className="text-sm text-green-700">1 free consultation per month</p>
                      <p className="mt-2 font-bold text-green-800">₹0</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-800">Pay Per Consultation</h4>
                      <p className="text-sm text-blue-700">After your free monthly consultation</p>
                      <p className="mt-2 font-bold text-blue-800">₹49 - ₹99 per session</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                      <h4 className="font-medium text-purple-800">Premium Plan</h4>
                      <p className="text-sm text-purple-700">Unlimited consultations</p>
                      <p className="mt-2 font-bold text-purple-800">₹499 per month</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="discounts" className="space-y-4">
                    <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200">
                      <h4 className="font-medium text-amber-800">Early Booking</h4>
                      <p className="text-sm text-amber-700">Book 3+ days in advance</p>
                      <p className="mt-2 font-bold text-amber-800">10% OFF</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg border border-teal-200">
                      <h4 className="font-medium text-teal-800">Refer-a-Friend</h4>
                      <p className="text-sm text-teal-700">When a referred friend joins</p>
                      <p className="mt-2 font-bold text-teal-800">1 Free Consultation</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-4 rounded-lg border border-indigo-200">
                      <h4 className="font-medium text-indigo-800">Government Subsidy</h4>
                      <p className="text-sm text-indigo-700">For eligible farmers</p>
                      <p className="mt-2 font-bold text-indigo-800">Up to 75% OFF</p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        )}
      </motion.div>
      
      <Separator className="my-8" />
      
      {/* Recent Consultations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <HistorySection />
      </motion.div>
    </div>
  );
}
