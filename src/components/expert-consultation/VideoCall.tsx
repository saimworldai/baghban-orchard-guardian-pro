
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Video, Mic, MicOff, PhoneCall } from "lucide-react";
import { toast } from "@/components/ui/sonner";

export function VideoCall() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callTime, setCallTime] = useState(0);
  
  const handleStartCall = () => {
    setIsConnecting(true);
    toast.info("Connecting to expert...");
    
    // Simulate connection delay
    setTimeout(() => {
      setIsConnecting(false);
      setIsInCall(true);
      toast.success("Connected with Dr. Sarah Khan");
      
      // Start timer
      const timer = setInterval(() => {
        setCallTime(prev => prev + 1);
      }, 1000);
      
      // Cleanup timer on component unmount
      return () => clearInterval(timer);
    }, 2000);
  };
  
  const handleEndCall = () => {
    setIsInCall(false);
    setCallTime(0);
    toast.info("Call ended");
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100">
        <CardHeader>
          <CardTitle className="text-purple-800">Video Consultation</CardTitle>
        </CardHeader>
        <CardContent>
          {!isInCall ? (
            <div className="flex flex-col items-center justify-center space-y-6 p-8">
              <div className="w-full max-w-md p-6 rounded-xl bg-white/80 shadow-sm border border-purple-100 flex flex-col items-center space-y-4">
                <Video className="h-16 w-16 text-purple-500 mb-2" />
                <h3 className="text-xl font-semibold text-purple-800">Start a Video Call</h3>
                <p className="text-center text-gray-600">
                  Connect with an agricultural expert instantly via video call to discuss your farming concerns.
                </p>
                <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 my-2">
                  🎁 First Consultation Free!
                </Badge>
                <Button 
                  size="lg" 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2"
                  onClick={handleStartCall}
                  disabled={isConnecting}
                >
                  {isConnecting ? (
                    <>Connecting...</>
                  ) : (
                    <>
                      <PhoneCall className="h-5 w-5" />
                      Call an Expert Now
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-full max-w-2xl aspect-video bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                <span className="text-white/50">Video stream would appear here</span>
                
                {/* Call timer */}
                <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {formatTime(callTime)}
                </div>
                
                {/* Expert info */}
                <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 text-white px-3 py-2 rounded-lg">
                  <Avatar className="h-8 w-8 border-2 border-white">
                    <AvatarFallback>SK</AvatarFallback>
                  </Avatar>
                  <span>Dr. Sarah Khan</span>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="lg"
                  className={isMuted ? "bg-red-50 text-red-700 border-red-200" : ""}
                  onClick={() => {
                    setIsMuted(!isMuted);
                    toast.info(isMuted ? "Microphone unmuted" : "Microphone muted");
                  }}
                >
                  {isMuted ? <MicOff className="h-5 w-5 mr-2" /> : <Mic className="h-5 w-5 mr-2" />}
                  {isMuted ? "Unmute" : "Mute"}
                </Button>
                <Button 
                  variant="destructive" 
                  size="lg"
                  onClick={handleEndCall}
                >
                  <PhoneCall className="h-5 w-5 mr-2" />
                  End Call
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
