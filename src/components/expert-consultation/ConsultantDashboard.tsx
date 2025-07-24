
import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from 'react-router-dom';
import { ConsultationTable } from './ConsultationTable';
import { useConsultations } from '@/hooks/useConsultations';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { Bell } from 'lucide-react';

export function ConsultantDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('pending');
  const [hasNewCall, setHasNewCall] = useState(false);
  
  const { 
    consultations, 
    isLoading, 
    acceptConsultation, 
    completeConsultation,
    refetch 
  } = useConsultations();

  // Set up real-time subscription for new consultations
  useEffect(() => {
    const channel = supabase
      .channel('consultant-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'consultations'
        },
        (payload) => {
          console.log('New consultation received:', payload);
          setHasNewCall(true);
          toast.success('New consultation request received!', {
            action: {
              label: 'View',
              onClick: () => {
                setActiveTab('pending');
                setHasNewCall(false);
              }
            }
          });
          refetch();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'consultations'
        },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const handleStartCall = (consultationId: string) => {
    navigate(`/expert-consultation/call/${consultationId}`);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'pending') {
      setHasNewCall(false);
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading consultations...</div>;
  }

  // Filter consultations without assigned consultant for pending
  const pendingConsultations = consultations?.filter(c => c.status === 'pending' && !c.consultant_id) || [];
  const acceptedConsultations = consultations?.filter(c => ['scheduled', 'in_progress'].includes(c.status)) || [];
  const completedConsultations = consultations?.filter(c => c.status === 'completed') || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Consultant Dashboard</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className={`px-3 py-1 ${hasNewCall ? 'bg-red-50 text-red-700 animate-pulse' : 'bg-green-50 text-green-700'}`}>
            {hasNewCall && <Bell className="h-3 w-3 mr-1" />}
            {pendingConsultations.length} Pending
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 px-3 py-1">
            {acceptedConsultations.length} Active
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 px-3 py-1">
            {completedConsultations.length} Completed
          </Badge>
        </div>
      </div>
      
      <Tabs defaultValue="pending" value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="active">Active Consultations</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <ConsultationTable 
            consultations={pendingConsultations}
            onAccept={acceptConsultation}
            onStartCall={handleStartCall}
            isPending={true}
          />
        </TabsContent>

        <TabsContent value="active">
          <ConsultationTable 
            consultations={acceptedConsultations}
            onStartCall={handleStartCall}
            onComplete={completeConsultation}
            isActive={true}
          />
        </TabsContent>

        <TabsContent value="completed">
          <ConsultationTable 
            consultations={completedConsultations}
            isCompleted={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
