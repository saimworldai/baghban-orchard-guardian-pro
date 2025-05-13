
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/sonner";
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MessageSquare, Video, CheckCircle } from "lucide-react";

interface FarmerProfile {
  email: string;
  profiles?: {
    full_name: string | null;
  } | null;
}

interface Consultation {
  id: string;
  farmer_id: string;
  consultant_id: string | null;
  status: 'pending' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  topic: string;
  created_at: string;
  scheduled_for: string | null;
  notes: string | null;
  farmer: FarmerProfile;
}

export function ConsultantDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('pending');

  const { data: consultations, isLoading, refetch } = useQuery({
    queryKey: ['consultations'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('consultations')
          .select(`
            *,
            farmer:farmer_id(email)
          `)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        return (data || []) as unknown as Consultation[];
      } catch (error) {
        console.error('Error fetching consultations:', error);
        return [] as Consultation[];
      }
    },
  });

  const handleAcceptConsultation = async (consultationId: string) => {
    try {
      const { error } = await supabase
        .from('consultations')
        .update({ 
          status: 'scheduled',
          consultant_id: (await supabase.auth.getUser()).data.user?.id
        })
        .eq('id', consultationId);
        
      if (error) throw error;
      toast.success('Consultation accepted');
      refetch();
    } catch (error) {
      console.error('Error accepting consultation:', error);
      toast.error('Failed to accept consultation');
    }
  };

  const handleStartCall = (consultationId: string) => {
    navigate(`/expert-consultation/call/${consultationId}`);
  };

  const handleCompleteConsultation = async (consultationId: string) => {
    try {
      const { error } = await supabase
        .from('consultations')
        .update({ status: 'completed' })
        .eq('id', consultationId);
        
      if (error) throw error;
      toast.success('Consultation marked as completed');
      refetch();
    } catch (error) {
      console.error('Error completing consultation:', error);
      toast.error('Failed to update consultation status');
    }
  };

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading consultations...</div>;
  }

  const pendingConsultations = consultations?.filter(c => c.status === 'pending') || [];
  const acceptedConsultations = consultations?.filter(c => ['scheduled', 'in_progress'].includes(c.status)) || [];
  const completedConsultations = consultations?.filter(c => c.status === 'completed') || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Consultant Dashboard</h2>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 px-3 py-1">
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
      
      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="active">Active Consultations</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <ConsultationsTable 
            consultations={pendingConsultations}
            onAccept={handleAcceptConsultation}
            onStartCall={handleStartCall}
            isPending={true}
          />
        </TabsContent>

        <TabsContent value="active">
          <ConsultationsTable 
            consultations={acceptedConsultations}
            onStartCall={handleStartCall}
            onComplete={handleCompleteConsultation}
            isActive={true}
          />
        </TabsContent>

        <TabsContent value="completed">
          <ConsultationsTable 
            consultations={completedConsultations}
            isCompleted={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface ConsultationsTableProps {
  consultations: Consultation[];
  onAccept?: (id: string) => void;
  onStartCall?: (id: string) => void;
  onComplete?: (id: string) => void;
  isPending?: boolean;
  isActive?: boolean;
  isCompleted?: boolean;
}

function ConsultationsTable({ 
  consultations, 
  onAccept, 
  onStartCall, 
  onComplete,
  isPending,
  isActive,
  isCompleted
}: ConsultationsTableProps) {
  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Farmer</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>{isCompleted ? 'Created' : 'Scheduled'}</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultations.length > 0 ? (
              consultations.map((consultation) => (
                <TableRow key={consultation.id}>
                  <TableCell>
                    {consultation.farmer?.email || "Unknown Farmer"}
                  </TableCell>
                  <TableCell>{consultation.topic}</TableCell>
                  <TableCell>
                    <StatusBadge status={consultation.status} />
                  </TableCell>
                  <TableCell>
                    {isCompleted 
                      ? new Date(consultation.created_at).toLocaleDateString()
                      : consultation.scheduled_for 
                        ? new Date(consultation.scheduled_for).toLocaleDateString() + ' ' + 
                          new Date(consultation.scheduled_for).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                        : 'Not scheduled'
                    }
                  </TableCell>
                  <TableCell>
                    {isPending && onAccept && (
                      <Button
                        size="sm"
                        onClick={() => onAccept(consultation.id)}
                      >
                        Accept
                      </Button>
                    )}
                    {isActive && (
                      <div className="flex gap-2">
                        {onStartCall && (
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => onStartCall(consultation.id)}
                          >
                            <Video className="h-4 w-4 mr-1" /> Join Call
                          </Button>
                        )}
                        {onComplete && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => onComplete(consultation.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" /> Complete
                          </Button>
                        )}
                      </div>
                    )}
                    {isCompleted && (
                      <Button size="sm" variant="outline">
                        View Report
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No consultations available in this category.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: string }) {
  let className = "";
  
  switch(status) {
    case 'pending':
      className = "bg-yellow-50 text-yellow-700 border-yellow-200";
      break;
    case 'scheduled':
      className = "bg-blue-50 text-blue-700 border-blue-200";
      break;
    case 'in_progress':
      className = "bg-purple-50 text-purple-700 border-purple-200";
      break;
    case 'completed':
      className = "bg-green-50 text-green-700 border-green-200";
      break;
    case 'cancelled':
      className = "bg-red-50 text-red-700 border-red-200";
      break;
  }
  
  return (
    <Badge variant="outline" className={className}>
      {status.replace('_', ' ')}
    </Badge>
  );
}
