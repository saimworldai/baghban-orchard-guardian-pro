
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from '@/hooks/useUserRole';
import { useQuery } from '@tanstack/react-query';
import { toast } from "@/components/ui/sonner";
import { Monitor, MessageSquare, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CallMonitor() {
  const { consultationId } = useParams<{ consultationId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { role } = useUserRole();
  const [callStatus, setCallStatus] = useState<'monitoring' | 'ended'>('monitoring');

  // Only admins can access the monitor
  if (role !== 'admin') {
    navigate('/expert-consultation');
    return null;
  }

  const { data: consultation, isLoading } = useQuery({
    queryKey: ['consultation-monitor', consultationId],
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

  const handleEndCall = async () => {
    // Only admins can forcibly end a call
    if (role !== 'admin') return;
    
    try {
      const { error } = await supabase
        .from('consultations')
        .update({ 
          status: 'completed',
          notes: consultation?.notes + "\n\nCall ended by admin."
        })
        .eq('id', consultationId);
        
      if (error) throw error;
      
      setCallStatus('ended');
      toast.success('Call ended by admin');
      
      setTimeout(() => {
        navigate('/admin-consultation');
      }, 1500);
    } catch (error) {
      console.error('Error ending call:', error);
      toast.error('Failed to end call');
    }
  };

  const handleSendMessage = () => {
    toast.info('Admin messaging feature coming soon');
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
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-100">
        <CardHeader>
          <CardTitle className="text-indigo-800 flex items-center justify-between">
            <span>Admin Call Monitoring</span>
            <MonitorBadge status={callStatus} />
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
            <div className="absolute top-0 left-0 right-0 bg-red-700 text-white px-4 py-1 text-center">
              ADMIN MONITORING - NOT VISIBLE TO PARTICIPANTS
            </div>
            
            {/* In a real implementation, this would stream the call content */}
            <div className="grid grid-cols-2 h-full w-full">
              <div className="border-r border-white/20 flex items-center justify-center">
                <div className="text-white">
                  <p className="font-bold text-center mb-2">Farmer</p>
                  <p>{consultation.farmer?.email}</p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-white">
                  <p className="font-bold text-center mb-2">Consultant</p>
                  <p>{consultation.consultant?.email || "Not assigned"}</p>
                </div>
              </div>
            </div>
            
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center bg-black/60 p-2 rounded">
              <div className="text-white text-sm">
                Call ID: {consultation.id.substring(0, 8)}...
              </div>
              <div className="text-white bg-red-600 px-2 py-1 rounded text-xs">
                ADMIN VIEW
              </div>
            </div>
          </div>
          
          <div className="bg-gray-100 p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{consultation.topic}</h3>
                <p className="text-sm text-gray-500">
                  Status: <span className="font-semibold">{consultation.status}</span>
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleSendMessage}
                >
                  <MessageSquare className="h-4 w-4 mr-1" /> Message Participants
                </Button>
                <Button 
                  variant="destructive"
                  onClick={handleEndCall}
                >
                  <Phone className="h-4 w-4 mr-1 rotate-225" /> End Call
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Consultation Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="min-h-32 bg-gray-50 p-4 rounded border">
            {consultation.notes || "No notes recorded for this consultation."}
          </div>
          
          <div className="mt-6">
            <h3 className="font-medium mb-2">Consultation Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded border">
                <p><strong>Created:</strong> {new Date(consultation.created_at).toLocaleString()}</p>
                <p><strong>Status:</strong> {consultation.status}</p>
                <p><strong>Topic:</strong> {consultation.topic}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded border">
                <p><strong>Farmer:</strong> {consultation.farmer?.email || "Unknown"}</p>
                <p><strong>Consultant:</strong> {consultation.consultant?.email || "Not Assigned"}</p>
                <p><strong>Scheduled for:</strong> {consultation.scheduled_for ? new Date(consultation.scheduled_for).toLocaleString() : 'Not scheduled'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface MonitorBadgeProps {
  status: 'monitoring' | 'ended';
}

function MonitorBadge({ status }: MonitorBadgeProps) {
  let className = '';
  let text = '';
  
  switch (status) {
    case 'monitoring':
      className = 'bg-red-50 text-red-700 border-red-200 animate-pulse';
      text = 'Monitoring Live';
      break;
    case 'ended':
      className = 'bg-gray-50 text-gray-700 border-gray-200';
      text = 'Monitoring Ended';
      break;
  }
  
  return (
    <div className="flex items-center">
      <Monitor className="h-4 w-4 mr-1" />
      <span className={`text-xs px-2 py-1 rounded-full border ${className}`}>
        {text}
      </span>
    </div>
  );
}
