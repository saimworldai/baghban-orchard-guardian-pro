
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, Clock, MessageSquare, Video, Check, ArrowRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/components/ui/sonner";
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

const mockExperts = [
  { id: '1', name: 'Dr. Sarah Khan', specialty: 'Organic Farming Expert', available: true },
  { id: '2', name: 'Dr. Rajesh Kumar', specialty: 'Pest Control Specialist', available: true },
  { id: '3', name: 'Amina Bibi', specialty: 'Soil Health Specialist', available: true },
  { id: '4', name: 'Dr. Vikram Singh', specialty: 'Orchard Management', available: true },
  { id: '5', name: 'Priya Sharma', specialty: 'Plant Pathology Expert', available: false },
];

const consultationTypes = [
  { id: 'video', name: 'Video Call', icon: Video },
  { id: 'chat', name: 'Text Chat', icon: MessageSquare }
];

export function ScheduleConsultation() {
  const { user } = useAuth();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [step, setStep] = useState(1);
  const [consultationType, setConsultationType] = useState<string>("video");
  const [selectedExpert, setSelectedExpert] = useState<string | undefined>(undefined);
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState<string>("English");
  const [appliedDiscount, setAppliedDiscount] = useState<string | null>(null);
  const [promoCode, setPromoCode] = useState("");
  
  // Get available consultation credits
  const { data: credits } = useQuery({
    queryKey: ['consultationCredits'],
    queryFn: () => {
      // Simulate API call to get credits
      return {
        free: 1,
        paid: 0
      };
    },
    enabled: !!user
  });

  const availableExperts = mockExperts.filter(expert => expert.available);
  
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };
  
  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };
  
  const handleExpertSelect = (expertId: string) => {
    setSelectedExpert(expertId);
  };
  
  const isDateTimeSelected = date && selectedTime;
  const isExpertSelected = !!selectedExpert;
  const isFormComplete = isDateTimeSelected && isExpertSelected && !!topic;
  
  const handleNextStep = () => {
    if (step === 1 && !isDateTimeSelected) {
      toast.error("Please select a date and time");
      return;
    }
    
    if (step === 2 && !isExpertSelected) {
      toast.error("Please select an expert");
      return;
    }
    
    if (step === 3 && !topic) {
      toast.error("Please enter a consultation topic");
      return;
    }
    
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleBookConsultation();
    }
  };
  
  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  
  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "baghban10") {
      setAppliedDiscount("10% OFF");
      toast.success("Promo code applied: 10% discount");
    } else if (promoCode.toLowerCase() === "firstconsult") {
      setAppliedDiscount("Free Consultation");
      toast.success("Promo code applied: Free consultation");
    } else {
      toast.error("Invalid promo code");
    }
  };
  
  const handleBookConsultation = () => {
    if (!user) {
      toast.error("Please login to book a consultation");
      return;
    }
    
    if (!isFormComplete) {
      toast.error("Please complete all required fields");
      return;
    }
    
    const selectedExpertObj = mockExperts.find(e => e.id === selectedExpert);
    
    toast.success("Consultation scheduled successfully!", {
      description: `${format(date!, "PPP")} at ${selectedTime} with ${selectedExpertObj?.name}`
    });
    
    // Reset form
    setDate(undefined);
    setSelectedTime(undefined);
    setStep(1);
    setSelectedExpert(undefined);
    setTopic("");
    setDetails("");
  };

  const getExpertById = (id: string) => {
    return mockExperts.find(expert => expert.id === id);
  };

  return (
    <div>
      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="text-green-800 flex items-center justify-between">
            <span>Schedule a Consultation</span>
            {user && credits && (
              <Badge variant="outline" className="bg-green-50 text-green-700">
                {credits.free} Free Consultation Available
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <div className="relative after:absolute after:left-0 after:top-[15px] after:h-[2px] after:w-full after:bg-gray-100">
              <ol className="relative z-10 flex justify-between">
                {[1, 2, 3, 4].map((stepNumber) => (
                  <li key={stepNumber} className="flex items-center">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                        stepNumber <= step ? 'bg-green-600 text-white' : 'border border-gray-300 bg-white'
                      }`}
                    >
                      {stepNumber < step ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        stepNumber
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Step 1: Select Date & Time */}
          <motion.div 
            className={`space-y-4 ${step === 1 ? 'block' : 'hidden'}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="font-medium text-lg">Select Date & Time</h3>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="bg-gray-50 p-4 rounded-md">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={handleDateSelect}
                      initialFocus
                      disabled={(date) => date < new Date()}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex-1">
                {date ? (
                  <>
                    <p className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                      <Clock className="h-4 w-4" /> 
                      Available time slots on {format(date, "EEEE, MMMM d")}
                    </p>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <Button
                          key={time}
                          variant={selectedTime === time ? "default" : "outline"}
                          className={selectedTime === time ? "bg-green-600 hover:bg-green-700" : ""}
                          onClick={() => handleTimeSelect(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    Please select a date to see available times
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Step 2: Select Expert */}
          <motion.div 
            className={`space-y-4 ${step === 2 ? 'block' : 'hidden'}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="font-medium text-lg">Select Expert</h3>
            <div className="space-y-2">
              {availableExperts.map((expert) => (
                <div
                  key={expert.id}
                  className={`flex items-center gap-4 p-3 rounded-md cursor-pointer transition-colors ${
                    selectedExpert === expert.id
                      ? 'bg-green-100 border border-green-200'
                      : 'bg-gray-50 hover:bg-gray-100 border border-gray-100'
                  }`}
                  onClick={() => handleExpertSelect(expert.id)}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-semibold">
                    {expert.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium">{expert.name}</h4>
                    <p className="text-sm text-gray-500">{expert.specialty}</p>
                  </div>
                  {selectedExpert === expert.id && (
                    <Check className="h-5 w-5 text-green-600 ml-auto" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Step 3: Consultation Details */}
          <motion.div 
            className={`space-y-4 ${step === 3 ? 'block' : 'hidden'}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="font-medium text-lg">Consultation Details</h3>

            <div className="space-y-4">
              <div>
                <label htmlFor="consultation-type" className="block text-sm font-medium text-gray-700 mb-1">
                  Consultation Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {consultationTypes.map((type) => (
                    <Button
                      key={type.id}
                      variant={consultationType === type.id ? "default" : "outline"}
                      className={`justify-start ${consultationType === type.id ? "bg-green-600 hover:bg-green-700" : ""}`}
                      onClick={() => setConsultationType(type.id)}
                    >
                      <type.icon className="mr-2 h-4 w-4" />
                      {type.name}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                  Consultation Topic*
                </label>
                <Input
                  id="topic"
                  placeholder="e.g., Apple Tree Disease Identification"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="details" className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Details
                </label>
                <Textarea
                  id="details"
                  placeholder="Provide any specific questions or information that will help the expert prepare"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="min-h-20"
                />
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Language
                </label>
                <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Hindi">Hindi</SelectItem>
                    <SelectItem value="Urdu">Urdu</SelectItem>
                    <SelectItem value="Kashmiri">Kashmiri</SelectItem>
                    <SelectItem value="Punjabi">Punjabi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>

          {/* Step 4: Review & Payment */}
          <motion.div 
            className={`space-y-4 ${step === 4 ? 'block' : 'hidden'}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h3 className="font-medium text-lg">Review & Confirm</h3>

            <div className="bg-gray-50 p-4 rounded-md space-y-4">
              <div className="flex justify-between">
                <p className="text-gray-600">Date & Time</p>
                <p className="font-medium">{date ? format(date, "PPP") : ""} at {selectedTime}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-600">Expert</p>
                <p className="font-medium">{getExpertById(selectedExpert || '')?.name}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-600">Consultation Type</p>
                <p className="font-medium">{consultationType === 'video' ? 'Video Call' : 'Text Chat'}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-600">Topic</p>
                <p className="font-medium">{topic}</p>
              </div>

              <div className="flex justify-between">
                <p className="text-gray-600">Language</p>
                <p className="font-medium">{preferredLanguage}</p>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <p className="text-gray-600">Consultation Fee</p>
                  <p className="font-medium">₹99</p>
                </div>
                
                {appliedDiscount && (
                  <div className="flex justify-between text-green-600">
                    <p>Discount</p>
                    <p className="font-medium">
                      {appliedDiscount === "Free Consultation" ? "-₹99" : "-₹9.9"}
                    </p>
                  </div>
                )}

                <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-200">
                  <p>Total</p>
                  <p>
                    {appliedDiscount === "Free Consultation" ? "₹0" : 
                     appliedDiscount === "10% OFF" ? "₹89.1" : "₹99"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  placeholder="Promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1"
                />
                <Button variant="outline" onClick={handleApplyPromo}>Apply</Button>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <Button variant="outline" onClick={handlePrevStep}>
                Back
              </Button>
            )}
            
            <Button 
              className={step < 4 ? "" : "bg-green-600 hover:bg-green-700"}
              onClick={handleNextStep}
              disabled={(step === 1 && !isDateTimeSelected) || (step === 2 && !isExpertSelected) || (step === 3 && !topic)}
            >
              {step < 4 ? (
                <>
                  Continue <ArrowRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Book Consultation"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
