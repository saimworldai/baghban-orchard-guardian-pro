import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, VideoOff, Mic, MicOff, Phone, PhoneOff, 
  Settings, Maximize, Users, Share2, Clock, Signal
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthProvider';
import { toast } from '@/components/ui/sonner';

interface LiveVideoInterfaceProps {
  consultationId: string;
  onEndCall: () => void;
  onToggleChat: () => void;
  isExpert?: boolean;
}

export function LiveVideoInterface({ 
  consultationId, 
  onEndCall, 
  onToggleChat, 
  isExpert = false 
}: LiveVideoInterfaceProps) {
  const { user } = useAuth();
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('good');
  const [isRecording, setIsRecording] = useState(false);
  
  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<Date>(new Date());

  useEffect(() => {
    // Timer for call duration
    const timer = setInterval(() => {
      const now = new Date();
      const duration = Math.floor((now.getTime() - startTimeRef.current.getTime()) / 1000);
      setCallDuration(duration);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
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
    
    // Simulate remote video (in real implementation, this would be WebRTC)
    setTimeout(() => {
      toast.success('Connected to expert');
    }, 1000);
  }, []);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    toast.info(isRecording ? 'Recording stopped' : 'Recording started');
  };

  const shareScreen = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
      });
      toast.success('Screen sharing started');
      // In real implementation, replace video stream with screen share
    } catch (error) {
      toast.error('Could not start screen sharing');
    }
  };

  const getConnectionIndicator = () => {
    switch (connectionQuality) {
      case 'excellent':
        return <Signal className="h-4 w-4 text-green-500" />;
      case 'good':
        return <Signal className="h-4 w-4 text-yellow-500" />;
      case 'poor':
        return <Signal className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Card ref={containerRef} className="relative overflow-hidden bg-black">
      <CardContent className="p-0 relative">
        {/* Main video area */}
        <div className="relative aspect-video bg-gray-900 min-h-[400px]">
          {/* Remote video (expert/farmer) */}
          <video
            ref={remoteVideoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
            poster="/placeholder.svg"
          />
          
          {/* Local video preview */}
          <motion.div
            className="absolute top-4 right-4 w-32 h-24 bg-gray-800 rounded-lg overflow-hidden border-2 border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className={`w-full h-full object-cover ${!isVideoOn ? 'hidden' : ''}`}
            />
            {!isVideoOn && (
              <div className="w-full h-full flex items-center justify-center bg-gray-700">
                <VideoOff className="h-6 w-6 text-white" />
              </div>
            )}
          </motion.div>

          {/* Top overlay with info */}
          <div className="absolute top-4 left-4 flex items-center gap-4">
            <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm">
              <Clock className="h-3 w-3 mr-1" />
              {formatDuration(callDuration)}
            </Badge>
            
            <div className="flex items-center gap-1 bg-black/50 text-white px-2 py-1 rounded-md backdrop-blur-sm">
              {getConnectionIndicator()}
              <span className="text-xs capitalize">{connectionQuality}</span>
            </div>

            {isRecording && (
              <Badge variant="destructive" className="animate-pulse">
                ● REC
              </Badge>
            )}
          </div>

          {/* Bottom controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <div className="flex items-center justify-between">
              {/* Left controls */}
              <div className="flex items-center gap-3">
                <Button
                  variant={isAudioOn ? "secondary" : "destructive"}
                  size="sm"
                  onClick={toggleAudio}
                  className="rounded-full w-12 h-12"
                >
                  {isAudioOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
                </Button>
                
                <Button
                  variant={isVideoOn ? "secondary" : "destructive"}
                  size="sm"
                  onClick={toggleVideo}
                  className="rounded-full w-12 h-12"
                >
                  {isVideoOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
                </Button>
              </div>

              {/* Center controls */}
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onToggleChat}
                  className="text-white hover:bg-white/20"
                >
                  <Users className="h-5 w-5" />
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={shareScreen}
                  className="text-white hover:bg-white/20"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
                
                {isExpert && (
                  <Button
                    variant={isRecording ? "destructive" : "ghost"}
                    size="sm"
                    onClick={toggleRecording}
                    className="text-white hover:bg-white/20"
                  >
                    ● {isRecording ? 'Stop' : 'Record'}
                  </Button>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>

              {/* Right controls */}
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="h-5 w-5" />
                </Button>
                
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={onEndCall}
                  className="rounded-full w-12 h-12"
                >
                  <PhoneOff className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}