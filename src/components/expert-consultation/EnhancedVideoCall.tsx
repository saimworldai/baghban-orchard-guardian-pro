import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthProvider';
import { useUserRole } from '@/hooks/useUserRole';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import { motion } from 'framer-motion';
import {
  Video, VideoOff, Mic, MicOff, Phone, PhoneOff,
  Settings, Maximize, MessageSquare, Share2, Clock,
  Signal, Users, Camera, Monitor, MoreVertical,
  VolumeX, Volume2, Wifi, WifiOff
} from 'lucide-react';

interface EnhancedVideoCallProps {
  consultationId?: string;
  expertName?: string;
  farmerName?: string;
  isExpert?: boolean;
  onEndCall?: () => void;
}

export function EnhancedVideoCall({
  consultationId,
  expertName = "Dr. Priya Sharma",
  farmerName = "Rajesh Kumar",
  isExpert = false,
  onEndCall
}: EnhancedVideoCallProps) {
  const { user } = useAuth();
  const { role } = useUserRole();
  const navigate = useNavigate();
  
  // Call state
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('good');
  const [isRecording, setIsRecording] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [isConnected, setIsConnected] = useState(true);
  const [remoteVideoOn, setRemoteVideoOn] = useState(true);
  const [remoteAudioOn, setRemoteAudioOn] = useState(true);
  
  // Refs
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const startTimeRef = useRef<Date>(new Date());

  useEffect(() => {
    // Timer for call duration
    const timer = setInterval(() => {
      const now = new Date();
      const duration = Math.floor((now.getTime() - startTimeRef.current.getTime()) / 1000);
      setCallDuration(duration);
    }, 1000);

    // Set up local video stream
    const setupLocalVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: true
        });
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing media devices:', error);
        toast.error('Could not access camera or microphone');
      }
    };

    setupLocalVideo();

    // Simulate connection status changes
    const connectionTimer = setInterval(() => {
      const random = Math.random();
      if (random > 0.9) {
        setConnectionQuality('poor');
      } else if (random > 0.7) {
        setConnectionQuality('good');
      } else {
        setConnectionQuality('excellent');
      }
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(connectionTimer);
    };
  }, []);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    // In real implementation, toggle video track
  };

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn);
    // In real implementation, toggle audio track
  };

  const toggleScreenShare = async () => {
    try {
      if (!isScreenSharing) {
        const stream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true
        });
        setIsScreenSharing(true);
        toast.success('Screen sharing started');
      } else {
        setIsScreenSharing(false);
        toast.info('Screen sharing stopped');
      }
    } catch (error) {
      toast.error('Could not start screen sharing');
    }
  };

  const toggleRecording = () => {
    if (role !== 'consultant' && role !== 'admin') {
      toast.error('Only experts can record sessions');
      return;
    }
    setIsRecording(!isRecording);
    toast.info(isRecording ? 'Recording stopped' : 'Recording started');
  };

  const handleEndCall = () => {
    toast.success('Call ended successfully');
    if (onEndCall) {
      onEndCall();
    } else {
      navigate('/expert-consultation');
    }
  };

  const sendMessage = () => {
    if (!chatMessage.trim()) return;
    toast.success('Message sent');
    setChatMessage('');
  };

  const getConnectionIndicator = () => {
    const indicators = {
      excellent: { color: 'text-green-500', bars: 4 },
      good: { color: 'text-yellow-500', bars: 3 },
      poor: { color: 'text-red-500', bars: 2 }
    };
    
    const { color, bars } = indicators[connectionQuality];
    
    return (
      <div className="flex items-center gap-1">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className={`w-1 h-3 rounded-sm ${
              i < bars ? color.replace('text-', 'bg-') : 'bg-gray-300'
            }`}
          />
        ))}
        <span className={`text-xs ml-1 ${color}`}>
          {connectionQuality}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-black/80 backdrop-blur-sm p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" />
            <AvatarFallback>{isExpert ? farmerName[0] : expertName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">
              {isExpert ? `Consulting with ${farmerName}` : `Expert: ${expertName}`}
            </h3>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDuration(callDuration)}
              </div>
              {isRecording && (
                <Badge variant="destructive" className="animate-pulse text-xs">
                  ● REC
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {getConnectionIndicator()}
          <Button variant="ghost" size="sm" className="text-white">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 relative">
        <div className="h-full bg-gray-900 flex items-center justify-center">
          {/* Remote Video */}
          <div className="w-full h-full relative">
            {remoteVideoOn ? (
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                poster="/placeholder.svg"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800">
                <Avatar className="h-32 w-32 mb-4">
                  <AvatarFallback className="text-4xl">
                    {isExpert ? farmerName[0] : expertName[0]}
                  </AvatarFallback>
                </Avatar>
                <p className="text-white text-lg">Camera is off</p>
              </div>
            )}

            {/* Local Video Preview */}
            <motion.div
              className="absolute top-4 right-4 w-48 h-36 bg-gray-800 rounded-lg overflow-hidden border-2 border-white/20 cursor-pointer"
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                // Toggle between large and small view
              }}
            >
              {isVideoOn ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-700">
                  <VideoOff className="h-8 w-8 text-white" />
                </div>
              )}
              <div className="absolute bottom-2 left-2 text-white text-xs bg-black/50 px-2 py-1 rounded">
                You
              </div>
            </motion.div>

            {/* Screen sharing indicator */}
            {isScreenSharing && (
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                <Monitor className="h-4 w-4" />
                Sharing screen
              </div>
            )}

            {/* Connection issues overlay */}
            {!isConnected && (
              <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                <Card>
                  <CardContent className="p-6 text-center">
                    <WifiOff className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Connection Lost</h3>
                    <p className="text-gray-600 mb-4">Trying to reconnect...</p>
                    <Button onClick={() => setIsConnected(true)}>
                      <Wifi className="h-4 w-4 mr-2" />
                      Reconnect
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Chat Sidebar */}
          {showChat && (
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              className="w-80 bg-white h-full flex flex-col border-l"
            >
              <div className="p-4 border-b">
                <h3 className="font-semibold">Chat</h3>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-3">
                  <div className="bg-gray-100 p-3 rounded-lg">
                    <p className="text-sm"><strong>Expert:</strong> What specific issue are you facing with your crops?</p>
                    <span className="text-xs text-gray-500">2 minutes ago</span>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Type a message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    rows={2}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage();
                      }
                    }}
                  />
                  <Button onClick={sendMessage} size="sm">
                    Send
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="bg-black/90 backdrop-blur-sm p-6">
        <div className="flex items-center justify-center gap-4">
          {/* Audio Control */}
          <Button
            variant={isAudioOn ? "secondary" : "destructive"}
            size="lg"
            onClick={toggleAudio}
            className="rounded-full w-14 h-14"
          >
            {isAudioOn ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
          </Button>

          {/* Video Control */}
          <Button
            variant={isVideoOn ? "secondary" : "destructive"}
            size="lg"
            onClick={toggleVideo}
            className="rounded-full w-14 h-14"
          >
            {isVideoOn ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
          </Button>

          {/* Screen Share */}
          <Button
            variant={isScreenSharing ? "default" : "ghost"}
            size="lg"
            onClick={toggleScreenShare}
            className="rounded-full w-14 h-14 text-white hover:bg-white/20"
          >
            <Share2 className="h-6 w-6" />
          </Button>

          {/* Chat Toggle */}
          <Button
            variant={showChat ? "default" : "ghost"}
            size="lg"
            onClick={() => setShowChat(!showChat)}
            className="rounded-full w-14 h-14 text-white hover:bg-white/20"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>

          {/* Record (Expert only) */}
          {(role === 'consultant' || role === 'admin') && (
            <Button
              variant={isRecording ? "destructive" : "ghost"}
              size="lg"
              onClick={toggleRecording}
              className="rounded-full w-14 h-14 text-white hover:bg-white/20"
            >
              <div className="w-4 h-4 rounded-full bg-current" />
            </Button>
          )}

          {/* Settings */}
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full w-14 h-14 text-white hover:bg-white/20"
          >
            <Settings className="h-6 w-6" />
          </Button>

          {/* End Call */}
          <Button
            variant="destructive"
            size="lg"
            onClick={handleEndCall}
            className="rounded-full w-14 h-14 ml-8"
          >
            <PhoneOff className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}