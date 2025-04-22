
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Clock, User, Video, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', 
  '12:00 PM', '01:00 PM', '02:00 PM', 
  '03:00 PM', '04:00 PM', '05:00 PM'
];

export function ScheduleConsultation() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState<'video' | 'chat'>('video');

  const handleSchedule = () => {
    if (!date || !selectedTimeSlot || !selectedExpert) {
      toast.error("Please select a date, time and expert");
      return;
    }

    toast.success(`Consultation scheduled for ${date.toDateString()} at ${selectedTimeSlot}`);
    
    // Reset form
    setDate(undefined);
    setSelectedTimeSlot(null);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-800">Schedule a Consultation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Select Date */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-blue-700 flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" /> 
              Step 1: Choose a Date
            </h3>
            <div className="border rounded-md bg-white p-1">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border-0"
                disabled={(date) => {
                  // Disable past dates and next 2 days (assuming experts need advance notice)
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  const minDate = new Date(today);
                  minDate.setDate(today.getDate() + 2);
                  return date < minDate || date > new Date(today.setDate(today.getDate() + 30));
                }}
              />
            </div>
          </div>

          {/* Step 2: Select Time */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-blue-700 flex items-center gap-2">
              <Clock className="h-4 w-4" /> 
              Step 2: Select Time Slot
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => (
                <Button 
                  key={time}
                  variant="outline" 
                  size="sm"
                  className={selectedTimeSlot === time ? "bg-blue-100 border-blue-300" : ""}
                  onClick={() => setSelectedTimeSlot(time)}
                >
                  {time}
                </Button>
              ))}
            </div>
          </div>

          {/* Step 3: Select Expert */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-blue-700 flex items-center gap-2">
              <User className="h-4 w-4" /> 
              Step 3: Choose an Expert
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Button 
                variant="outline" 
                className={`justify-start p-3 h-auto ${selectedExpert === 'dr-sarah' ? "bg-blue-100 border-blue-300" : ""}`}
                onClick={() => setSelectedExpert('dr-sarah')}
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    SK
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Dr. Sarah Khan</div>
                    <div className="text-xs text-gray-500">Organic Farming</div>
                  </div>
                </div>
              </Button>
              <Button 
                variant="outline" 
                className={`justify-start p-3 h-auto ${selectedExpert === 'dr-rajesh' ? "bg-blue-100 border-blue-300" : ""}`}
                onClick={() => setSelectedExpert('dr-rajesh')}
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    RK
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Dr. Rajesh Kumar</div>
                    <div className="text-xs text-gray-500">Pest Control</div>
                  </div>
                </div>
              </Button>
            </div>
          </div>

          {/* Step 4: Consultation Type */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-blue-700">Step 4: Consultation Type</h3>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className={consultationType === 'video' ? "bg-blue-100 border-blue-300" : ""}
                onClick={() => setConsultationType('video')}
              >
                <Video className="h-4 w-4 mr-2" />
                Video Call
              </Button>
              <Button 
                variant="outline" 
                className={consultationType === 'chat' ? "bg-blue-100 border-blue-300" : ""}
                onClick={() => setConsultationType('chat')}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Chat
              </Button>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              size="lg"
              onClick={handleSchedule}
              disabled={!date || !selectedTimeSlot || !selectedExpert}
            >
              Schedule Consultation
            </Button>
            <div className="text-center mt-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">
                ₹100 per consultation - First one FREE!
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
