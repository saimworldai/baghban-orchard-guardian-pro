
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Video, MessageSquare, Calendar, Star, Phone } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { useExpertCall } from '@/hooks/useExpertCall';
import { ExpertsList } from './ExpertsList';
import { HistorySection } from './HistorySection';
import { ChatInterface } from './ChatInterface';

export function FarmerDashboardView() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isStartingCall, startCall } = useExpertCall();
  const [activeTab, setActiveTab] = useState('video');
  const [showChat, setShowChat] = useState(false);

  const handleInstantCall = () => {
    if (!user) {
      toast.error("Please login to start a consultation");
      navigate('/auth');
      return;
    }
    navigate('/expert-consultation/video');
  };

  const handleScheduleCall = () => {
    setActiveTab('schedule');
  };

  const handleEmergencyCall = () => {
    toast.info("Emergency consultation feature - connecting to 24/7 expert line");
    handleInstantCall();
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-100"
      >
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Expert Agricultural Consultation</h1>
          <p className="text-lg text-green-600 mb-8">Connect with certified agricultural experts for instant video consultations</p>
          
          {/* Main Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Button 
              onClick={handleInstantCall}
              className="bg-green-600 hover:bg-green-700 text-white p-6 h-auto flex flex-col gap-2"
              disabled={isStartingCall}
            >
              <Video className="h-8 w-8" />
              <span className="text-lg font-semibold">Instant Video Call</span>
              <span className="text-sm opacity-90">Connect now with available expert</span>
            </Button>
            
            <Button 
              onClick={() => setShowChat(true)}
              variant="outline"
              className="border-blue-200 p-6 h-auto flex flex-col gap-2 hover:bg-blue-50"
            >
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <span className="text-lg font-semibold text-blue-700">Quick Chat</span>
              <span className="text-sm text-blue-600">Text-based consultation</span>
            </Button>
            
            <Button 
              onClick={handleScheduleCall}
              variant="outline"
              className="border-purple-200 p-6 h-auto flex flex-col gap-2 hover:bg-purple-50"
            >
              <Calendar className="h-8 w-8 text-purple-600" />
              <span className="text-lg font-semibold text-purple-700">Schedule Call</span>
              <span className="text-sm text-purple-600">Book for later</span>
            </Button>
          </div>
          
          {/* Emergency Call Button */}
          <Button 
            onClick={handleEmergencyCall}
            variant="destructive"
            className="bg-red-600 hover:bg-red-700"
          >
            <Phone className="h-5 w-5 mr-2" />
            Emergency Consultation (24/7)
          </Button>
        </div>
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800">Choose Your Consultation Method</h2>
                <div className="flex gap-2">
                  <Button 
                    variant={activeTab === 'video' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('video')}
                  >
                    Video Call
                  </Button>
                  <Button 
                    variant={activeTab === 'experts' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('experts')}
                  >
                    Browse Experts
                  </Button>
                  <Button 
                    variant={activeTab === 'history' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('history')}
                  >
                    History
                  </Button>
                </div>
              </div>

              {activeTab === 'video' && (
                <div className="bg-green-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-green-800 mb-4">Start Video Consultation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">What to expect:</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Connect with certified agricultural experts</li>
                        <li>• HD video quality for clear communication</li>
                        <li>• Session recording for your reference</li>
                        <li>• Follow-up recommendations via email</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Before you start:</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li>• Prepare your questions in advance</li>
                        <li>• Have photos of your crops ready</li>
                        <li>• Ensure good lighting and internet</li>
                        <li>• Keep relevant documents nearby</li>
                      </ul>
                    </div>
                  </div>
                  <Button 
                    onClick={handleInstantCall}
                    className="w-full mt-6 bg-green-600 hover:bg-green-700"
                    size="lg"
                  >
                    <Video className="h-5 w-5 mr-2" />
                    Start Video Consultation Now
                  </Button>
                </div>
              )}

              {activeTab === 'experts' && (
                <ExpertsList />
              )}

              {activeTab === 'history' && (
                <HistorySection />
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Chat Interface */}
      {showChat && (
        <motion.div
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          className="fixed bottom-4 right-4 z-50 w-80"
        >
          <ChatInterface
            consultationId="chat-demo"
            onToggleMinimize={() => setShowChat(false)}
          />
        </motion.div>
      )}
    </div>
  );
}
