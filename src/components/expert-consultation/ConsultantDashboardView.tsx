
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, MessageSquare, Phone, Users, Clock, TrendingUp } from 'lucide-react';
import { ConsultantDashboard } from './index';
import { LiveCallNotifications } from './LiveCallNotifications';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';

export function ConsultantDashboardView() {
  const navigate = useNavigate();
  const [activeConsultations] = useState(3); // Mock data
  const [todaysEarnings] = useState(2500); // Mock data
  const [totalConsultations] = useState(85); // Mock data

  const handleStartVideoCall = () => {
    navigate('/expert-consultation/video');
  };

  const handleViewQueue = () => {
    toast.info("Viewing consultation queue");
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-100"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-blue-800 mb-2">Expert Dashboard</h1>
            <p className="text-blue-600 text-lg">Help farmers with your agricultural expertise</p>
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-3">
            <Button 
              onClick={handleStartVideoCall}
              className="bg-green-600 hover:bg-green-700"
            >
              <Video className="h-4 w-4 mr-2" />
              Start Video Call
            </Button>
            <Button 
              onClick={handleViewQueue}
              variant="outline"
              className="border-blue-200 hover:bg-blue-50"
            >
              <Users className="h-4 w-4 mr-2" />
              View Queue
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Consultations</p>
                <p className="text-2xl font-bold text-green-600">{activeConsultations}</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <Video className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Today's Earnings</p>
                <p className="text-2xl font-bold text-blue-600">₹{todaysEarnings}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Consultations</p>
                <p className="text-2xl font-bold text-purple-600">{totalConsultations}</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <MessageSquare className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Response Time</p>
                <p className="text-2xl font-bold text-orange-600">2.5min</p>
              </div>
              <div className="p-3 rounded-full bg-orange-100">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Live Call Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <LiveCallNotifications />
      </motion.div>

      {/* Main Dashboard */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ConsultantDashboard />
      </motion.div>
    </div>
  );
}
