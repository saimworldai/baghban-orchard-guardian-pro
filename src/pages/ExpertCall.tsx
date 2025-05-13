
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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

    // Simulate connection
    const timer = setTimeout(() => {
      setCallStatus('connected');
      toast.success('Call connected successfully');
    }, 2000);

    return () => clearTimeout(timer);
  }, [user, consultationId, navigate, role]);

  const handleEndCall = () => {
    setCallStatus('ended');
    toast.info('Call ended');
    setTimeout(() => {
      navigate('/expert-consultation');
    }, 1500);
  };

  const toggleMic = () => setIsMicOn(!isMicOn);
  const toggleCamera = () => setIsCameraOn(!isCameraOn);

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
                {!isCameraOn && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                    <div className="text-white text-lg">Camera Off</div>
                  </div>
                )}
                <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 border-2 border-white rounded-md overflow-hidden">
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-white text-xs">Your camera</span>
                  </div>
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
              >
                {isMicOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
              </Button>
              <Button 
                variant="outline"
                className={isCameraOn ? "bg-white" : "bg-red-100 text-red-700"}
                onClick={toggleCamera}
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
            value={consultation.notes || ''}
            readOnly={role !== 'consultant' && role !== 'admin'}
          />
          
          {(role === 'consultant' || role === 'admin') && (
            <div className="mt-4 flex justify-end">
              <Button>Save Notes</Button>
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
