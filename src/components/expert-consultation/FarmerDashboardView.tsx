
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HeaderSection } from './HeaderSection';
import { TabsSection } from './TabsSection';
import { HistorySection } from './HistorySection';
import { Separator } from '@/components/ui/separator';
import { SmartNotifications } from './SmartNotifications';
import { DailyTipsCarousel } from './DailyTipsCarousel';
import { LanguageSupport } from './LanguageSupport';
import { AdvancedFeaturesSection } from './AdvancedFeaturesSection';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Users, Video, MessageSquare, Clock, Star, Zap } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { QuickConsultationCard } from './QuickConsultationCard';
import { ConsultationQueue } from './ConsultationQueue';
import { ChatInterface } from './ChatInterface';

export function FarmerDashboardView() {
  const [activeTab, setActiveTab] = useState('experts');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isChatMinimized, setIsChatMinimized] = useState(false);

  const handleStartCall = () => {
    setActiveTab('video');
  };

  // Mock featured experts data
  const featuredExperts = [
    {
      id: '1',
      name: 'Dr. Priya Sharma',
      specialty: 'Plant Disease Specialist',
      rating: 4.9,
      languages: ['Hindi', 'English', 'Punjabi'],
      available: true,
      responseTime: 'Avg 2 min',
      location: 'Delhi, India',
      verified: true,
      experience: '15 years',
      consultations: 1250,
      imageUrl: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Dr. Rajesh Kumar',
      specialty: 'Crop Management Expert',
      rating: 4.8,
      languages: ['Hindi', 'English'],
      available: true,
      responseTime: 'Avg 3 min',
      location: 'Punjab, India',
      verified: true,
      experience: '12 years',
      consultations: 980,
      imageUrl: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Dr. Anita Patel',
      specialty: 'Organic Farming Consultant',
      rating: 4.9,
      languages: ['Gujarati', 'Hindi', 'English'],
      available: false,
      responseTime: 'Avg 5 min',
      location: 'Gujarat, India',
      verified: true,
      experience: '18 years',
      consultations: 1500,
      imageUrl: '/placeholder.svg'
    }
  ];

  const handleToggleChat = () => {
    setShowChat(!showChat);
    setIsChatMinimized(false);
  };

  const handleMinimizeChat = () => {
    setIsChatMinimized(true);
    setShowChat(false);
  };

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
      
      {/* Quick Actions Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
      >
        <Card className="relative overflow-hidden border-green-200 bg-gradient-to-br from-green-50 to-green-100/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-green-200">
                <Video className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">Instant Call</h3>
                <p className="text-xs text-green-600">Connect now</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-200">
                <MessageSquare className="h-5 w-5 text-blue-700" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-800">Quick Chat</h3>
                <p className="text-xs text-blue-600">Get help fast</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-200">
                <Clock className="h-5 w-5 text-purple-700" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-800">Schedule</h3>
                <p className="text-xs text-purple-600">Book later</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-orange-200">
                <Zap className="h-5 w-5 text-orange-700" />
              </div>
              <div>
                <h3 className="font-semibold text-orange-800">Emergency</h3>
                <p className="text-xs text-orange-600">Urgent help</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Featured Experts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-6"
      >
        <Card className="border-primary/20">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl text-primary flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Featured Experts Available Now
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => setActiveTab('experts')}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {featuredExperts.map((expert) => (
                <QuickConsultationCard
                  key={expert.id}
                  expert={expert}
                  onStartCall={() => handleStartCall()}
                  onStartChat={handleToggleChat}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <TabsSection activeTab={activeTab} onTabChange={setActiveTab} />
        </motion.div>
        
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Consultation Queue */}
          <ConsultationQueue onSelectConsultation={(id) => console.log('Selected:', id)} />
          
          {/* Smart Notifications */}
          <SmartNotifications />
          
          {/* Daily Tips Carousel */}
          <DailyTipsCarousel />
          
          {/* Group Consultations Feature */}
          <Card className="overflow-hidden border-primary/20 shadow-sm hover:shadow-md transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-purple-100">
                  <Users className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">Group Consultations</h3>
                  <p className="text-sm text-muted-foreground">Join topic-based sessions with other farmers</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-3 rounded-md border border-purple-200">
                  <h4 className="font-medium text-sm text-purple-800">Upcoming Webinar</h4>
                  <p className="text-sm text-purple-700">Winter Orchard Preparation</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-purple-600">Nov 15, 2023 • 3:00 PM</span>
                    <Button variant="outline" size="sm" onClick={() => toast.info("Group session feature coming soon")} 
                      className="border-purple-200 text-purple-700 hover:bg-purple-50">
                      Join for ₹20
                    </Button>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-3 rounded-md border border-blue-200">
                  <h4 className="font-medium text-sm text-blue-800">Upcoming Webinar</h4>
                  <p className="text-sm text-blue-700">Pest Management for Apple Trees</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-blue-600">Nov 20, 2023 • 4:30 PM</span>
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
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <HistorySection />
      </motion.div>

      {/* Floating Chat Interface */}
      {showChat && !isChatMinimized && (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          className="fixed bottom-4 right-4 z-50 w-80"
        >
          <ChatInterface
            consultationId="chat-demo"
            onToggleMinimize={handleMinimizeChat}
          />
        </motion.div>
      )}

      {/* Minimized Chat Button */}
      {(isChatMinimized || (!showChat && isChatMinimized)) && (
        <ChatInterface
          consultationId="chat-demo"
          isMinimized={true}
          onToggleMinimize={() => {
            setShowChat(true);
            setIsChatMinimized(false);
          }}
        />
      )}
    </div>
  );
}
