import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from '@/hooks/useUserRole';
import { useAuth } from '@/contexts/AuthProvider';
import { toast } from '@/components/ui/sonner';
import { Video, Clock, Calendar, Mic, Camera, User, Loader2, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { EnhancedVideoCall } from './EnhancedVideoCall';

// Define a type for connection information
interface ConnectionInfo {
  downlink?: number;
  effectiveType?: string;
}

export function VideoCall() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { role } = useUserRole();
  const [isCheckingDevices, setIsCheckingDevices] = useState(true);
  const [hasCameraAccess, setHasCameraAccess] = useState(false);
  const [hasMicrophoneAccess, setHasMicrophoneAccess] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [selectedMicrophone, setSelectedMicrophone] = useState<string | null>(null);
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [availableMicrophones, setAvailableMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor'>('good');
  const [isCreatingCall, setIsCreatingCall] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Check for available devices and permissions
  useEffect(() => {
    async function checkMediaDevices() {
      try {
        // Try to access the camera and microphone
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        
        setHasCameraAccess(true);
        setHasMicrophoneAccess(true);
        
        // Display camera preview
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        // Get all available devices
        const devices = await navigator.mediaDevices.enumerateDevices();
        
        // Filter for video input (cameras)
        const cameras = devices.filter(device => device.kind === 'videoinput');
        setAvailableCameras(cameras);
        if (cameras.length > 0) setSelectedCamera(cameras[0].deviceId);
        
        // Filter for audio input (microphones)
        const microphones = devices.filter(device => device.kind === 'audioinput');
        setAvailableMicrophones(microphones);
        if (microphones.length > 0) setSelectedMicrophone(microphones[0].deviceId);
        
        // Check connection quality (simplified simulation)
        checkConnectionQuality();
        
      } catch (err) {
        console.error('Error accessing media devices:', err);
        if ((err as any).name === 'NotAllowedError' || (err as any).name === 'PermissionDeniedError') {
          toast.error('Camera and microphone access is required for video calls');
        } else {
          toast.error('Error accessing your camera or microphone');
        }
      } finally {
        setIsCheckingDevices(false);
      }
    }
    
    checkMediaDevices();
    
    // Cleanup function
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Handle device selection change
  useEffect(() => {
    async function updateMediaStream() {
      if (!selectedCamera || !selectedMicrophone) return;
      
      try {
        // Stop previous tracks
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
        }
        
        // Create new stream with selected devices
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: selectedCamera },
          audio: { deviceId: selectedMicrophone }
        });
        
        streamRef.current = newStream;
        
        // Update video preview
        if (videoRef.current) {
          videoRef.current.srcObject = newStream;
        }
      } catch (err) {
        console.error('Error updating media devices:', err);
        toast.error('Could not switch to selected devices');
      }
    }
    
    if (hasCameraAccess && hasMicrophoneAccess) {
      updateMediaStream();
    }
  }, [selectedCamera, selectedMicrophone, hasCameraAccess, hasMicrophoneAccess]);
  
  const checkConnectionQuality = () => {
    // Modified to handle browsers that don't support the Network Information API
    try {
      // Check if navigator.connection exists (Network Information API)
      const connection = (navigator as any).connection as ConnectionInfo | undefined;
      
      if (connection) {
        // Subscribe to connection changes if API is available
        (navigator as any).connection.addEventListener('change', () => {
          updateConnectionQuality(connection);
        });
        
        // Initial check
        updateConnectionQuality(connection);
      } else {
        // Fallback if Network Information API is not available
        simulateConnectionQuality();
      }
    } catch (error) {
      // Fallback if any error occurs
      simulateConnectionQuality();
    }
  };
  
  const updateConnectionQuality = (connection: ConnectionInfo) => {
    if (connection.downlink && connection.downlink > 5) {
      setConnectionQuality('excellent');
    } else if (connection.downlink && connection.downlink > 2) {
      setConnectionQuality('good');
    } else {
      setConnectionQuality('poor');
    }
  };
  
  const simulateConnectionQuality = () => {
    // Fallback simulation if Network Information API isn't available
    const randomValue = Math.random();
    if (randomValue > 0.7) {
      setConnectionQuality('excellent');
    } else if (randomValue > 0.3) {
      setConnectionQuality('good');
    } else {
      setConnectionQuality('poor');
    }
  };
  
  const handleStartCall = async () => {
    if (!user) {
      toast.error("Please login to start a video call");
      navigate('/auth');
      return;
    }
    
    if (!hasCameraAccess || !hasMicrophoneAccess) {
      toast.error("Camera and microphone access are required for video calls");
      return;
    }
    
    setIsCreatingCall(true);
    
    try {
      // Create a new consultation in the database
      const { data, error } = await supabase
        .from('consultations')
        .insert({
          farmer_id: user.id,
          status: 'pending',
          topic: 'Instant Consultation'
        })
        .select();
        
      if (error) throw error;
      
      if (!data || data.length === 0) {
        throw new Error('Failed to create consultation record');
      }
      
      toast.success("Connecting to expert...");
      setShowVideoCall(true);
    } catch (error) {
      console.error("Error setting up call:", error);
      toast.error("Failed to set up video call");
    } finally {
      setIsCreatingCall(false);
    }
  };
  
  const getConnectionQualityDisplay = () => {
    switch (connectionQuality) {
      case 'excellent':
        return (
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
            <span className="text-green-600 text-xs ml-1">Excellent</span>
          </div>
        );
      case 'good':
        return (
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
            <span className="h-2 w-2 bg-green-500 rounded-full"></span>
            <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
            <span className="text-green-600 text-xs ml-1">Good</span>
          </div>
        );
      case 'poor':
        return (
          <div className="flex items-center gap-1">
            <span className="h-2 w-2 bg-orange-500 rounded-full"></span>
            <span className="h-2 w-2 bg-orange-500 rounded-full"></span>
            <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
            <span className="h-2 w-2 bg-gray-300 rounded-full"></span>
            <span className="text-orange-600 text-xs ml-1">Poor</span>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="text-green-800">Video Consultation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Video Preview */}
            <div className="w-full md:w-2/3">
              <div className="bg-gray-900 aspect-video rounded-lg flex items-center justify-center overflow-hidden relative">
                {isCheckingDevices ? (
                  <div className="text-white flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Checking your camera and microphone...</p>
                  </div>
                ) : hasCameraAccess ? (
                  <>
                    <video 
                      ref={videoRef}
                      autoPlay 
                      muted 
                      playsInline 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        Camera Preview
                      </div>
                      {getConnectionQualityDisplay()}
                    </div>
                  </>
                ) : (
                  <div className="text-white text-center p-4">
                    <Camera className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                    <p className="mb-2">Camera access is required</p>
                    <Button 
                      onClick={() => window.location.reload()}
                      variant="outline"
                      className="bg-white text-gray-800"
                    >
                      Allow Access
                    </Button>
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Camera</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                    disabled={!hasCameraAccess || availableCameras.length === 0}
                    value={selectedCamera || ''}
                    onChange={(e) => setSelectedCamera(e.target.value)}
                  >
                    {availableCameras.map((camera) => (
                      <option key={camera.deviceId} value={camera.deviceId}>
                        {camera.label || `Camera ${camera.deviceId.substring(0, 5)}...`}
                      </option>
                    ))}
                    {availableCameras.length === 0 && (
                      <option value="">No cameras found</option>
                    )}
                  </select>
                </div>
                
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Microphone</label>
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md bg-white"
                    disabled={!hasMicrophoneAccess || availableMicrophones.length === 0}
                    value={selectedMicrophone || ''}
                    onChange={(e) => setSelectedMicrophone(e.target.value)}
                  >
                    {availableMicrophones.map((mic) => (
                      <option key={mic.deviceId} value={mic.deviceId}>
                        {mic.label || `Microphone ${mic.deviceId.substring(0, 5)}...`}
                      </option>
                    ))}
                    {availableMicrophones.length === 0 && (
                      <option value="">No microphones found</option>
                    )}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Call Info */}
            <div className="w-full md:w-1/3 space-y-6">
              <motion.div 
                className="bg-green-50 p-6 rounded-lg border border-green-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h3 className="text-xl font-semibold text-green-800 mb-4">Ready for Your Consultation?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100">
                      <User className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium">Expert Available</p>
                      <p className="text-sm text-gray-600">Connect with the next available specialist</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100">
                      <Clock className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium">Typical Wait Time</p>
                      <p className="text-sm text-gray-600">Less than 5 minutes</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-green-100">
                      <Calendar className="h-5 w-5 text-green-700" />
                    </div>
                    <div>
                      <p className="font-medium">Consultation Duration</p>
                      <p className="text-sm text-gray-600">Up to 30 minutes</p>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-green-600 hover:bg-green-700"
                  size="lg"
                  onClick={handleStartCall}
                  disabled={isCheckingDevices || !hasCameraAccess || !hasMicrophoneAccess || isCreatingCall}
                >
                  {isCreatingCall ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Setting up call...
                    </>
                  ) : (
                    <>
                      <Video className="mr-2 h-5 w-5" />
                      Start Video Consultation
                    </>
                  )}
                </Button>
                
                {connectionQuality === 'poor' && (
                  <p className="text-orange-600 text-sm mt-2">
                    Your internet connection is weak. This may affect call quality.
                  </p>
                )}
              </motion.div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                <h4 className="font-medium mb-2">Before your call:</h4>
                <ul className="space-y-2 text-sm text-gray-600 list-disc pl-5">
                  <li>Ensure you have good lighting so the expert can see clearly</li>
                  <li>Prepare any specific questions you want to ask</li>
                  <li>Have your plant/tree accessible if you need to show it</li>
                  <li>Consider taking close-up photos beforehand</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {!user && (
        <Card className="border-orange-100 bg-orange-50">
          <CardContent className="p-4">
            <p className="text-orange-600">Please log in to start a video consultation with our experts.</p>
            <Button 
              variant="link" 
              className="text-orange-700 p-0"
              onClick={() => navigate('/auth')}
            >
              Login or Register
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
