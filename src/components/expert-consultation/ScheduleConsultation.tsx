
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Clock, User, Video, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import { addDays, format, isAfter, isBefore, setHours, setMinutes } from 'date-fns';
import { useQuery } from '@tanstack/react-query';

const timeSlots = [
  '09:00 AM', '10:00 AM', '11:00 AM', 
  '12:00 PM', '01:00 PM', '02:00 PM', 
  '03:00 PM', '04:00 PM', '05:00 PM'
];

interface Expert {
  id: string;
  name: string;
  specialty: string;
  avatarInitials: string;
  avatarBgColor: string;
}

export function ScheduleConsultation() {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedExpert, setSelectedExpert] = useState<string | null>(null);
  const [consultationType, setConsultationType] = useState<'video' | 'chat'>('video');
  const [topic, setTopic] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data: experts, isLoading: expertsLoading } = useQuery({
    queryKey: ['experts'],
    queryFn: async () => {
      // In a real app, fetch this from the database
      // For demo, using mock data
      const mockExperts: Expert[] = [
        {
          id: '1',
          name: 'Dr. Sarah Khan',
          specialty: 'Organic Farming',
          avatarInitials: 'SK',
          avatarBgColor: 'bg-purple-100',
        },
        {
          id: '2',
          name: 'Dr. Rajesh Kumar',
          specialty: 'Pest Control',
          avatarInitials: 'RK',
          avatarBgColor: 'bg-green-100',
        },
        {
          id: '3',
          name: 'Dr. Amina Patel',
          specialty: 'Soil Science',
          avatarInitials: 'AP',
          avatarBgColor: 'bg-blue-100',
        },
        {
          id: '4',
          name: 'Dr. John Smith',
          specialty: 'Irrigation Systems',
          avatarInitials: 'JS',
          avatarBgColor: 'bg-red-100',
        }
      ];
      return mockExperts;
    }
  });

  const parseTimeSlot = (timeString: string, selectedDate: Date): Date => {
    const [time, period] = timeString.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    
    if (period === 'PM' && hours !== 12) {
      hours += 12;
    } else if (period === 'AM' && hours === 12) {
      hours = 0;
    }
    
    return setMinutes(setHours(selectedDate, hours), minutes);
  };

  const handleSchedule = async () => {
    if (!user) {
      toast.error("Please sign in to schedule a consultation");
      return;
    }

    if (!date || !selectedTimeSlot || !selectedExpert || !topic) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const scheduledDateTime = parseTimeSlot(selectedTimeSlot, date);
      
      const { error } = await supabase
        .from('consultations')
        .insert({
          farmer_id: user.id,
          topic,
          status: 'pending',
          scheduled_for: scheduledDateTime.toISOString(),
          notes: notes || null,
        });
        
      if (error) throw error;
      
      toast.success(`Consultation scheduled for ${format(date, 'PP')} at ${selectedTimeSlot}`);
      
      // Reset form
      setDate(undefined);
      setSelectedTimeSlot(null);
      setSelectedExpert(null);
      setTopic('');
      setNotes('');
      
    } catch (error) {
      console.error('Error scheduling consultation:', error);
      toast.error("Failed to schedule consultation. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
        <CardHeader>
          <CardTitle className="text-blue-800">Schedule a Consultation</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Topic Input */}
          <div className="space-y-2">
            <label htmlFor="topic" className="text-sm font-medium text-blue-700">
              Consultation Topic
            </label>
            <Input 
              id="topic" 
              placeholder="E.g., Pest Control for Apple Trees" 
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="bg-white"
            />
          </div>

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
              {experts?.map((expert) => (
                <Button 
                  key={expert.id}
                  variant="outline" 
                  className={`justify-start p-3 h-auto ${selectedExpert === expert.id ? "bg-blue-100 border-blue-300" : ""}`}
                  onClick={() => setSelectedExpert(expert.id)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-full ${expert.avatarBgColor} flex items-center justify-center`}>
                      {expert.avatarInitials}
                    </div>
                    <div className="text-left">
                      <div className="font-medium">{expert.name}</div>
                      <div className="text-xs text-gray-500">{expert.specialty}</div>
                    </div>
                  </div>
                </Button>
              ))}
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
          
          {/* Notes */}
          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium text-blue-700">
              Additional Notes (optional)
            </label>
            <Textarea 
              id="notes" 
              placeholder="Any specific questions or information for the expert..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-white"
              rows={3}
            />
          </div>

          <div className="pt-4">
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700" 
              size="lg"
              onClick={handleSchedule}
              disabled={!date || !selectedTimeSlot || !selectedExpert || !topic || isSubmitting}
            >
              {isSubmitting ? "Scheduling..." : "Schedule Consultation"}
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
