
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from '@/hooks/useUserRole';
import { useQuery } from '@tanstack/react-query';
import { toast } from "@/components/ui/sonner";
import { Video, Mic, MicOff, VideoOff, Phone, MessageSquare, Users, Share } from "lucide-react";

export default function ExpertCall() {
  const { consultationId } = useParams<{ consultationId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { role } = useUserRole();
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [notes, setNotes] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const { data: consultation, isLoading } = useQuery({
    queryKey: ['consultation', consultationId],
    queryFn: async () => {
      if (!consultationId) return null;
      
      const { data, error } = await supabase
        .from('consultations')
        .select(`
          *,
          farmer:farmer_id(email),
          consultant:consultant_id(email)
        `)
        .eq('id', consultationId)
        .single();
        
      if (error) throw error;
      return data;
    },
    enabled: !!consultationId,
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    // Update consultation status to in_progress when call starts
    const updateConsultationStatus = async () => {
      if (consultationId && (role === 'consultant' || role === 'admin')) {
        try {
          const { error } = await supabase
            .from('consultations')
            .update({ status: 'in_progress' })
            .eq('id', consultationId);
            
          if (error) throw error;
        } catch (error) {
          console.error('Error updating consultation status:', error);
        }
      }
    };

    updateConsultationStatus();

    // Set up camera and mic for call
    const setupMediaDevices = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        });
        
        localStreamRef.current = stream;
        
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        
        // In a real application, you would set up WebRTC here
        // and connect to the remote peer
        
        // For demo purposes, simulate a connection with timeout
        setTimeout(() => {
          setCallStatus('connected');
          toast.success('Call connected successfully');
        }, 2000);
      } catch (err) {
        console.error('Error accessing media devices:', err);
        toast.error('Could not access camera or microphone');
      }
    };

    setupMediaDevices();
    
    // Cleanup function
    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [user, consultationId, navigate, role]);

  // Update notes when consultation data is loaded
  useEffect(() => {
    if (consultation?.notes) {
      setNotes(consultation.notes);
    }
  }, [consultation]);

  const handleEndCall = async () => {
    // Stop all media tracks
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach(track => track.stop());
    }
    
    // Update consultation status
    if (consultationId) {
      try {
        const { error } = await supabase
          .from('consultations')
          .update({ 
            status: 'completed',
            notes: notes
          })
          .eq('id', consultationId);
          
        if (error) throw error;
      } catch (error) {
        console.error('Error updating consultation status:', error);
      }
    }
    
    setCallStatus('ended');
    toast.info('Call ended');
    
    setTimeout(() => {
      navigate('/expert-consultation');
    }, 1500);
  };

  const toggleMic = () => {
    if (localStreamRef.current) {
      const audioTracks = localStreamRef.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !isMicOn;
      });
      setIsMicOn(!isMicOn);
    }
  };
  
  const toggleCamera = () => {
    if (localStreamRef.current) {
      const videoTracks = localStreamRef.current.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !isCameraOn;
      });
      setIsCameraOn(!isCameraOn);
    }
  };

  const handleSaveNotes = async () => {
    if (!consultationId) return;
    
    setIsSavingNotes(true);
    
    try {
      const { error } = await supabase
        .from('consultations')
        .update({ notes: notes })
        .eq('id', consultationId);
        
      if (error) throw error;
      toast.success("Notes saved successfully");
    } catch (error) {
      console.error('Error saving notes:', error);
      toast.error("Failed to save notes");
    } finally {
      setIsSavingNotes(false);
    }
  };

  if (isLoading || !consultation) {
    return (
      <div className="container mx-auto p-4 flex justify-center items-center min-h-[60vh]">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle>Loading call details...</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-100">
        <CardHeader>
          <CardTitle className="text-purple-800 flex items-center justify-between">
            <span>Expert Consultation Call</span>
            <Badge status={callStatus} />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
            {callStatus === 'connecting' ? (
              <div className="text-white animate-pulse">Connecting to secure video service...</div>
            ) : callStatus === 'ended' ? (
              <div className="text-white">Call ended. Thank you!</div>
            ) : (
              <>
                {/* Main video area (remote video in real implementation) */}
                <video 
                  ref={remoteVideoRef}
                  autoPlay 
                  playsInline 
                  className="w-full h-full object-cover"
                  style={{ display: isCameraOn ? 'block' : 'none' }}
                />
                
                {!isCameraOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <div className="text-white text-lg">Camera Off</div>
                  </div>
                )}
                
                {/* Local video preview (your camera) */}
                <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 border-2 border-white rounded-md overflow-hidden">
                  <video 
                    ref={localVideoRef}
                    autoPlay 
                    muted 
                    playsInline 
                    className="h-full w-full object-cover"
                    style={{ display: isCameraOn ? 'block' : 'none' }}
                  />
                  {!isCameraOn && (
                    <div className="h-full w-full flex items-center justify-center">
                      <span className="text-white text-xs">Camera Off</span>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
          
          <div className="bg-gray-100 p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{consultation.topic}</h3>
                <p className="text-sm text-gray-500">
                  {role === 'consultant' || role === 'admin' 
                    ? `With: ${consultation.farmer?.email}`
                    : `Expert: ${consultation.consultant?.email || 'Not assigned'}`}
                </p>
              </div>
              
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" onClick={() => toast.info('Participants feature coming soon')}>
                  <Users className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast.info('Chat feature coming soon')}>
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => toast.info('Share feature coming soon')}>
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-center gap-3 mt-6">
              <Button 
                variant="outline" 
                className={isMicOn ? "bg-white" : "bg-red-100 text-red-700"}
                onClick={toggleMic}
                disabled={callStatus !== 'connected'}
              >
                {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              <Button 
                variant="outline"
                className={isCameraOn ? "bg-white" : "bg-red-100 text-red-700"}
                onClick={toggleCamera}
                disabled={callStatus !== 'connected'}
              >
                {isCameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
              </Button>
              <Button 
                variant="destructive"
                onClick={handleEndCall}
              >
                <Phone className="h-5 w-5 rotate-225" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Consultation Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea 
            placeholder="Take notes during your consultation..."
            className="min-h-32"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            readOnly={role !== 'consultant' && role !== 'admin'}
          />
          
          {(role === 'consultant' || role === 'admin') && (
            <div className="mt-4 flex justify-end">
              <Button 
                onClick={handleSaveNotes} 
                disabled={isSavingNotes}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSavingNotes ? 'Saving...' : 'Save Notes'}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

interface BadgeProps {
  status: 'connecting' | 'connected' | 'ended';
}

function Badge({ status }: BadgeProps) {
  let className = '';
  let text = '';
  
  switch (status) {
    case 'connecting':
      className = 'bg-yellow-50 text-yellow-700 border-yellow-200';
      text = 'Connecting...';
      break;
    case 'connected':
      className = 'bg-green-50 text-green-700 border-green-200 animate-pulse';
      text = 'Live';
      break;
    case 'ended':
      className = 'bg-gray-50 text-gray-700 border-gray-200';
      text = 'Call Ended';
      break;
  }
  
  return (
    <span className={`text-xs px-2 py-1 rounded-full border ${className}`}>
      {text}
    </span>
  );
}
