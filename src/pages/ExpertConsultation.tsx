
import React, { useEffect, useState } from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { ConsultantDashboard } from '@/components/expert-consultation';
import { HeaderSection } from '@/components/expert-consultation/HeaderSection';
import { TabsSection } from '@/components/expert-consultation/TabsSection';
import { HistorySection } from '@/components/expert-consultation/HistorySection';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { Separator } from '@/components/ui/separator';
import { DailyTipsCarousel } from '@/components/expert-consultation/DailyTipsCarousel';
import { SmartNotifications } from '@/components/expert-consultation/SmartNotifications';
import { LanguageSupport } from '@/components/expert-consultation/LanguageSupport';
import { Card, CardContent } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function ExpertConsultation() {
  const { role, loading } = useUserRole();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('experts');
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user && !loading) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  const handleStartCall = () => {
    setActiveTab('video');
  };

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  if (role === 'consultant' || role === 'admin') {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100 mb-6">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Consultant Dashboard</h1>
          <p className="text-green-600">Manage your consultations and help farmers with their queries</p>
        </div>
        <ConsultantDashboard />
      </div>
    );
  }

  // Farmer view (default)
  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Hero Banner */}
      <HeaderSection onStartCall={handleStartCall} />
      
      {/* Main Tabs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TabsSection activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        
        <div className="space-y-6">
          {/* Smart Notifications */}
          <SmartNotifications />
          
          {/* Daily Tips Carousel */}
          <DailyTipsCarousel />
          
          {/* Group Consultations Feature */}
          <Card>
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
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="font-medium text-sm">Upcoming Webinar</h4>
                  <p className="text-sm">Winter Orchard Preparation</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">Nov 15, 2023 • 3:00 PM</span>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Group session feature coming soon")}>
                      Join for ₹20
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 rounded-md">
                  <h4 className="font-medium text-sm">Upcoming Webinar</h4>
                  <p className="text-sm">Pest Management for Apple Trees</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">Nov 20, 2023 • 4:30 PM</span>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Group session feature coming soon")}>
                      Join for ₹15
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Separator className="my-8" />
      
      {/* Advanced Features */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Advanced Features</h2>
          <Button 
            variant="ghost" 
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Hide' : 'Show'} Advanced Features
          </Button>
        </div>
        
        {showAdvanced && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <LanguageSupport />
            
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Consultation Pricing</h3>
                
                <Tabs defaultValue="plans">
                  <TabsList className="mb-4">
                    <TabsTrigger value="plans">Plans</TabsTrigger>
                    <TabsTrigger value="discounts">Discounts</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="plans" className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                      <h4 className="font-medium text-green-800">Basic Plan</h4>
                      <p className="text-sm text-green-700">1 free consultation per month</p>
                      <p className="mt-2 font-bold text-green-800">₹0</p>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                      <h4 className="font-medium text-blue-800">Pay Per Consultation</h4>
                      <p className="text-sm text-blue-700">After your free monthly consultation</p>
                      <p className="mt-2 font-bold text-blue-800">₹49 - ₹99 per session</p>
                    </div>
                    
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                      <h4 className="font-medium text-purple-800">Premium Plan</h4>
                      <p className="text-sm text-purple-700">Unlimited consultations</p>
                      <p className="mt-2 font-bold text-purple-800">₹499 per month</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="discounts" className="space-y-4">
                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                      <h4 className="font-medium text-amber-800">Early Booking</h4>
                      <p className="text-sm text-amber-700">Book 3+ days in advance</p>
                      <p className="mt-2 font-bold text-amber-800">10% OFF</p>
                    </div>
                    
                    <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                      <h4 className="font-medium text-teal-800">Refer-a-Friend</h4>
                      <p className="text-sm text-teal-700">When a referred friend joins</p>
                      <p className="mt-2 font-bold text-teal-800">1 Free Consultation</p>
                    </div>
                    
                    <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
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
      </div>
      
      <Separator className="my-8" />
      
      {/* Recent Consultations */}
      <HistorySection />
    </div>
  );
}
