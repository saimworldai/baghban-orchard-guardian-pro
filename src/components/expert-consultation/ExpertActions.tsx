
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Video, MessageSquare, Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from '@/components/ui/sonner';

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
    toast.info("Chat feature coming soon!");
  };

  const handleSchedule = () => {
    if (!selectedDate) {
      toast.error("Please select a date and time");
      return;
    }
    
    toast.success(`Scheduled consultation on ${selectedDate.toLocaleString()}`);
    setIsBooking(false);
  };

  return (
    <div className="flex gap-2 bg-gray-50/50 mt-4 p-3">
      <Button 
        variant="outline" 
        size="sm" 
        className={`flex-1 ${available ? 'hover:bg-green-50 hover:text-green-700' : 'opacity-70'}`}
        disabled={!available || isStartingCall}
        onClick={onStartCall}
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
    </div>
  );
}
