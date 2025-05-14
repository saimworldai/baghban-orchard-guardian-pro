
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Video, MessageSquare, Calendar, Star, ShieldCheck, Globe } from "lucide-react";
import { motion } from 'framer-motion';
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';

interface ExpertProps {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  rating: number;
  imageUrl: string;
  verified: boolean;
  available: boolean;
  pricePerMinute?: number;
  experience?: string;
}

export function ExpertCard({ expert }: { expert: ExpertProps }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isStartingCall, setIsStartingCall] = useState(false);

  const handleStartCall = async () => {
    if (!user) {
      toast.error("Please login to start a consultation");
      navigate('/auth');
      return;
    }
    
    if (!expert.available) {
      toast.error("This expert is currently unavailable");
      return;
    }

    setIsStartingCall(true);
    toast.loading("Setting up your consultation...");

    try {
      // Create a new consultation in the database
      const { data, error } = await supabase
        .from('consultations')
        .insert({
          farmer_id: user.id,
          consultant_id: expert.id,
          status: 'in_progress',
          topic: 'General Consultation',
        })
        .select();
        
      if (error) throw error;
      
      if (!data || data.length === 0) {
        throw new Error('Failed to create consultation record');
      }
      
      toast.dismiss();
      toast.success("Starting consultation");
      navigate(`/expert-consultation/call/${data[0].id}`);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to set up consultation");
      console.error("Error setting up consultation:", error);
    } finally {
      setIsStartingCall(false);
    }
  };

  const handleChatClick = () => {
    toast.info("Chat feature coming soon!");
  };

  const toggleBookingPopover = () => {
    setIsBooking(!isBooking);
  };

  const handleSchedule = () => {
    if (!selectedDate) {
      toast.error("Please select a date and time");
      return;
    }
    
    toast.success(`Scheduled consultation with ${expert.name} on ${selectedDate.toLocaleString()}`);
    setIsBooking(false);
  };

  // Price display helper
  const getPriceDisplay = () => {
    if (!expert.pricePerMinute) return null;
    
    return (
      <div className="mt-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full inline-flex items-center">
        <span>₹{expert.pricePerMinute}/min</span>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      <Card className="overflow-hidden hover:shadow-lg transition-shadow border-primary/10">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-offset-2 ring-primary/20">
              <AvatarImage src={expert.imageUrl} />
              <AvatarFallback className="bg-gradient-to-br from-green-100 to-blue-100 text-lg font-semibold text-primary">
                {expert.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{expert.name}</h3>
                {expert.verified && (
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 cursor-help">
                        <ShieldCheck className="h-3 w-3 mr-1" /> Verified
                      </Badge>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <div className="flex justify-between space-x-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-semibold">Verified Expert</h4>
                          <p className="text-sm">
                            This expert has been verified by our team. They have proven expertise in their field and maintain high service standards.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </HoverCard>
                )}
              </div>
              <p className="text-sm text-gray-500">{expert.specialty}</p>
              {expert.experience && (
                <p className="text-xs text-gray-500">{expert.experience} experience</p>
              )}
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(expert.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                  />
                ))}
                <span className="text-sm font-medium ml-1">{expert.rating}</span>
              </div>
              <div className="flex flex-wrap gap-1 mt-1">
                {expert.languages.map((lang) => (
                  <div key={lang} className="flex items-center">
                    <Badge variant="secondary" className="text-xs bg-primary/5 flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      {lang}
                    </Badge>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-1">
                {expert.available ? (
                  <Badge className="bg-green-100 text-green-800 border-green-200">Available Now</Badge>
                ) : (
                  <Badge variant="outline" className="text-gray-500">Unavailable</Badge>
                )}
                {getPriceDisplay()}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex gap-2 bg-gray-50/50 mt-4 p-3">
          <Button 
            variant="outline" 
            size="sm" 
            className={`flex-1 ${expert.available ? 'hover:bg-green-50 hover:text-green-700' : 'opacity-70'}`}
            disabled={!expert.available || isStartingCall}
            onClick={handleStartCall}
          >
            {isStartingCall ? (
              <span className="flex items-center">Connecting...</span>
            ) : (
              <>
                <Video className="h-4 w-4 mr-2" /> Call
              </>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 hover:bg-blue-50 hover:text-blue-700"
            onClick={handleChatClick}
          >
            <MessageSquare className="h-4 w-4 mr-2" /> Chat
          </Button>
          
          <Popover open={isBooking} onOpenChange={setIsBooking}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="flex-1 hover:bg-purple-50 hover:text-purple-700">
                <Calendar className="h-4 w-4 mr-2" /> Schedule
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <h4 className="font-medium">Schedule Consultation</h4>
                <div className="space-y-2">
                  <label className="text-sm">Select Date & Time</label>
                  <input 
                    type="datetime-local" 
                    className="w-full border rounded-md px-3 py-2"
                    onChange={(e) => setSelectedDate(e.target.value ? new Date(e.target.value) : null)}
                  />
                </div>
                <Button onClick={handleSchedule} className="w-full">
                  Confirm Booking
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
