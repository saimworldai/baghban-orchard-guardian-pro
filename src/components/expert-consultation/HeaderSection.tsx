
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Video, MessageSquare, Calendar, ClipboardList, Brain } from "lucide-react";
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { toast } from '@/components/ui/sonner';

interface HeaderSectionProps {
  onStartCall?: () => void;
}

export function HeaderSection({ onStartCall }: HeaderSectionProps) {
  const { data: onlineExperts, isLoading } = useQuery({
    queryKey: ['onlineExperts'],
    queryFn: async () => {
      // In a real app, this would fetch actual online experts from a presence system
      const mockOnlineCount = Math.floor(Math.random() * 5) + 1;
      return mockOnlineCount;
    },
    staleTime: 60000, // Refresh every minute
  });

  const quickAccessTiles = [
    { name: "Ask a Question", icon: MessageSquare, route: "chat", color: "bg-blue-50 text-blue-600" },
    { name: "Book Appointment", icon: Calendar, route: "schedule", color: "bg-purple-50 text-purple-600" },
    { name: "My Past Consults", icon: ClipboardList, route: "pastConsults", color: "bg-amber-50 text-amber-600" },
    { name: "Expert Tips", icon: Brain, route: "tips", color: "bg-green-50 text-green-600" }
  ];

  const handleTileClick = (route: string) => {
    // This will be expanded in future implementation
    toast.info(`Navigating to ${route} feature`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl p-8 shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="space-y-4 flex-1">
            <h1 className="text-3xl lg:text-4xl font-bold">Expert Guidance When You Need It</h1>
            <p className="text-lg text-green-50 max-w-xl">
              Connect with agricultural specialists for personalized advice on your orchard management challenges.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Button 
                size="lg"
                className="bg-white text-green-700 hover:bg-green-100 shadow-lg"
                onClick={onStartCall}
              >
                <Video className="mr-2 h-5 w-5" />
                Consult Now
              </Button>
              
              <div className="flex items-center px-4 py-2 bg-green-600/40 backdrop-blur-sm rounded-lg border border-white/20">
                <span className="h-3 w-3 rounded-full bg-green-300 animate-pulse mr-2"></span>
                <span className="font-semibold">
                  Experts Online: {isLoading ? '...' : onlineExperts}
                </span>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block">
            <img 
              src="/placeholder.svg" 
              alt="Expert Consultation" 
              className="w-64 h-64 object-cover rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
      
      {/* Quick Access Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickAccessTiles.map((tile, index) => (
          <motion.div 
            key={index}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              y: 0,
              transition: { delay: 0.1 * index } 
            }}
          >
            <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => handleTileClick(tile.route)}>
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className={`p-3 rounded-full ${tile.color} mb-3`}>
                  <tile.icon className="h-6 w-6" />
                </div>
                <h3 className="font-medium">{tile.name}</h3>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
