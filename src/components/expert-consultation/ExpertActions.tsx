
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Video, MessageSquare, Calendar, Sparkles, Zap } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from '@/components/ui/sonner';
import { motion } from 'framer-motion';

interface ExpertActionsProps {
  available: boolean;
  isStartingCall: boolean;
  onStartCall: () => void;
}

export function ExpertActions({ 
  available, 
  isStartingCall, 
  onStartCall 
}: ExpertActionsProps) {
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleChatClick = () => {
    toast.info("Chat feature coming soon!", {
      description: "We're working on bringing you real-time chat capabilities!"
    });
  };

  const handleSchedule = () => {
    if (!selectedDate) {
      toast.error("Please select a date and time");
      return;
    }
    
    toast.success(`Scheduled consultation on ${selectedDate.toLocaleString()}`, {
      description: "You'll receive a confirmation email shortly."
    });
    setIsBooking(false);
  };

  const buttonConfigs = [
    {
      icon: Video,
      label: "Call",
      onClick: onStartCall,
      disabled: !available || isStartingCall,
      gradient: "from-green-500 to-emerald-600",
      hoverGradient: "from-green-600 to-emerald-700",
      primary: true
    },
    {
      icon: MessageSquare,
      label: "Chat",
      onClick: handleChatClick,
      disabled: false,
      gradient: "from-blue-500 to-cyan-600",
      hoverGradient: "from-blue-600 to-cyan-700",
      primary: false
    }
  ];

  return (
    <div className="bg-gradient-to-r from-gray-50/80 to-gray-100/80 backdrop-blur-sm p-4 space-y-3">
      {/* Primary actions */}
      <div className="flex gap-3">
        {buttonConfigs.map((config, index) => (
          <motion.div
            key={config.label}
            className="flex-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Button 
              size="sm" 
              className={`
                w-full relative overflow-hidden
                ${config.primary ? 
                  `bg-gradient-to-r ${config.gradient} hover:bg-gradient-to-r hover:${config.hoverGradient} text-white shadow-lg` : 
                  'bg-white/80 text-gray-700 border border-gray-200 hover:bg-white hover:shadow-md'
                }
                ${config.disabled ? 'opacity-70 cursor-not-allowed' : ''}
                transition-all duration-300 font-semibold
              `}
              disabled={config.disabled}
              onClick={config.onClick}
            >
              {config.label === "Call" && isStartingCall ? (
                <motion.span 
                  className="flex items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="mr-2"
                  >
                    <Zap className="h-4 w-4" />
                  </motion.div>
                  Connecting...
                </motion.span>
              ) : (
                <>
                  <config.icon className="h-4 w-4 mr-2" /> 
                  {config.label}
                </>
              )}
              
              {/* Shine effect for primary button */}
              {config.primary && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              )}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Schedule button */}
      <Popover open={isBooking} onOpenChange={setIsBooking}>
        <PopoverTrigger asChild>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full bg-white/90 border-purple-200 text-purple-700 hover:bg-purple-50 hover:border-purple-300 font-semibold transition-all duration-300 shadow-sm hover:shadow-md"
            >
              <Calendar className="h-4 w-4 mr-2" /> 
              <Sparkles className="h-3 w-3 mr-1" />
              Schedule Consultation
            </Button>
          </motion.div>
        </PopoverTrigger>
        <PopoverContent className="w-80 bg-white/95 backdrop-blur-xl border-purple-200 shadow-2xl">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-purple-600" />
              <h4 className="font-bold text-gray-800">Schedule Consultation</h4>
            </div>
            <div className="space-y-3">
              <label className="text-sm font-medium text-gray-700">Select Date & Time</label>
              <input 
                type="datetime-local" 
                className="w-full border-2 border-purple-200 rounded-lg px-4 py-3 focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all duration-200"
                onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
              />
            </div>
            <Button 
              onClick={handleSchedule} 
              className="w-full bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Confirm Booking
            </Button>
          </motion.div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
