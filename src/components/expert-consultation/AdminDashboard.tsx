
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Calendar, Clock, MessageSquare, Video, Users, Monitor } from "lucide-react";
import { useUserRole } from '@/hooks/useUserRole';

interface FarmerProfile {
  email: string;
  profiles?: {
    full_name: string | null;
  } | null;
}

interface ConsultantProfile {
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
  consultant: ConsultantProfile | null;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('all');
  const { role } = useUserRole();

  // Verify that the current user is an admin
  if (role !== 'admin') {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-red-700">Access Denied</h2>
          <p className="text-red-600">You need administrative privileges to view this page.</p>
          <Button 
            className="mt-4" 
            variant="outline" 
            onClick={() => navigate('/expert-consultation')}
          >
            Return to Expert Consultation
          </Button>
        </CardContent>
      </Card>
    );
  }

  const { data: consultations, isLoading, refetch } = useQuery({
    queryKey: ['admin-consultations'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('consultations')
          .select(`
            *,
            farmer:farmer_id(email),
            consultant:consultant_id(email)
          `)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        return (data || []) as unknown as Consultation[];
      } catch (error) {
        console.error('Error fetching consultations for admin:', error);
        return [] as Consultation[];
      }
    },
  });

  const { data: consultants, isLoading: isLoadingConsultants } = useQuery({
    queryKey: ['admin-consultants'],
    queryFn: async () => {
      try {
        // In a real app, we would query the user_roles table to get all consultants
        // For now, we're simulating this with a limited query
        const { data, error } = await supabase
          .from('profiles')
          .select('id, full_name, email:id')
          .limit(5);
          
        if (error) throw error;
        return data || [];
      } catch (error) {
        console.error('Error fetching consultants:', error);
        return [];
      }
    },
  });

  const handleAssignConsultant = async (consultationId: string, consultantId: string) => {
    try {
      const { error } = await supabase
        .from('consultations')
        .update({ 
          status: 'scheduled',
          consultant_id: consultantId 
        })
        .eq('id', consultationId);
        
      if (error) throw error;
      toast.success('Consultant assigned successfully');
      refetch();
    } catch (error) {
      console.error('Error assigning consultant:', error);
      toast.error('Failed to assign consultant');
    }
  };

  const handleCancelConsultation = async (consultationId: string) => {
    try {
      const { error } = await supabase
        .from('consultations')
        .update({ 
          status: 'cancelled'
        })
        .eq('id', consultationId);
        
      if (error) throw error;
      toast.success('Consultation cancelled');
      refetch();
    } catch (error) {
      console.error('Error cancelling consultation:', error);
      toast.error('Failed to cancel consultation');
    }
  };

  const handleMonitorCall = (consultationId: string) => {
    navigate(`/expert-consultation/monitor/${consultationId}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mb-4 mx-auto"></div>
          <p className="text-gray-600">Loading consultation data...</p>
        </div>
      </div>
    );
  }

  const allConsultations = consultations || [];
  const pendingConsultations = allConsultations.filter(c => c.status === 'pending');
  const activeConsultations = allConsultations.filter(c => ['scheduled', 'in_progress'].includes(c.status));
  const completedConsultations = allConsultations.filter(c => ['completed', 'cancelled'].includes(c.status));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
          <p className="text-gray-600">Manage all consultations and assign experts</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 px-3 py-1">
            {pendingConsultations.length} Pending
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 px-3 py-1">
            {activeConsultations.length} Active
          </Badge>
          <Badge variant="outline" className="bg-purple-50 text-purple-700 px-3 py-1">
            {completedConsultations.length} Completed/Cancelled
          </Badge>
        </div>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All Consultations</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="completed">Completed/Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AdminConsultationsTable 
            consultations={allConsultations}
            consultants={consultants || []}
            onAssign={handleAssignConsultant}
            onCancel={handleCancelConsultation}
            onMonitor={handleMonitorCall}
            isAll={true}
          />
        </TabsContent>

        <TabsContent value="pending">
          <AdminConsultationsTable 
            consultations={pendingConsultations}
            consultants={consultants || []}
            onAssign={handleAssignConsultant}
            onCancel={handleCancelConsultation}
            isPending={true}
          />
        </TabsContent>

        <TabsContent value="active">
          <AdminConsultationsTable 
            consultations={activeConsultations}
            consultants={consultants || []}
            onCancel={handleCancelConsultation}
            onMonitor={handleMonitorCall}
            isActive={true}
          />
        </TabsContent>

        <TabsContent value="completed">
          <AdminConsultationsTable 
            consultations={completedConsultations}
            isCompleted={true}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface AdminConsultationsTableProps {
  consultations: Consultation[];
  consultants?: any[];
  onAssign?: (consultationId: string, consultantId: string) => void;
  onCancel?: (id: string) => void;
  onMonitor?: (id: string) => void;
  isPending?: boolean;
  isActive?: boolean;
  isCompleted?: boolean;
  isAll?: boolean;
}

function AdminConsultationsTable({ 
  consultations, 
  consultants = [], 
  onAssign, 
  onCancel,
  onMonitor, 
  isPending,
  isActive,
  isCompleted,
  isAll
}: AdminConsultationsTableProps) {

  const [expandedConsultation, setExpandedConsultation] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedConsultation(expandedConsultation === id ? null : id);
  };

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Farmer</TableHead>
              <TableHead>Expert</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultations.length > 0 ? (
              consultations.map((consultation) => (
                <React.Fragment key={consultation.id}>
                  <TableRow onClick={() => toggleExpand(consultation.id)} className="cursor-pointer hover:bg-gray-50">
                    <TableCell className="font-mono text-xs">
                      {consultation.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>
                      {consultation.farmer?.email || "Unknown Farmer"}
                    </TableCell>
                    <TableCell>
                      {consultation.consultant?.email || "Not Assigned"}
                    </TableCell>
                    <TableCell>{consultation.topic}</TableCell>
                    <TableCell>
                      <StatusBadge status={consultation.status} />
                    </TableCell>
                    <TableCell>
                      {new Date(consultation.created_at).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {(isPending || isAll) && consultation.status === 'pending' && onAssign && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              // For simplicity, assign to first consultant in the list
                              if (consultants && consultants.length > 0) {
                                onAssign(consultation.id, consultants[0].id);
                              } else {
                                toast.error('No consultants available for assignment');
                              }
                            }}
                          >
                            Assign Expert
                          </Button>
                        )}
                        {(isActive || isAll) && ['scheduled', 'in_progress'].includes(consultation.status) && onMonitor && (
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              onMonitor(consultation.id);
                            }}
                          >
                            <Monitor className="h-4 w-4 mr-1" /> Monitor
                          </Button>
                        )}
                        {!['completed', 'cancelled'].includes(consultation.status) && onCancel && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={(e) => {
                              e.stopPropagation();
                              onCancel(consultation.id);
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedConsultation === consultation.id && (
                    <TableRow>
                      <TableCell colSpan={7} className="bg-gray-50">
                        <div className="p-4">
                          <h4 className="font-medium mb-2">Consultation Details</h4>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm"><strong>Created:</strong> {new Date(consultation.created_at).toLocaleString()}</p>
                              <p className="text-sm"><strong>Scheduled for:</strong> {consultation.scheduled_for ? new Date(consultation.scheduled_for).toLocaleString() : 'Not scheduled'}</p>
                              <p className="text-sm"><strong>Status:</strong> {consultation.status}</p>
                            </div>
                            <div>
                              <p className="text-sm"><strong>Farmer:</strong> {consultation.farmer?.email || "Unknown"}</p>
                              <p className="text-sm"><strong>Expert:</strong> {consultation.consultant?.email || "Not Assigned"}</p>
                              <p className="text-sm"><strong>Topic:</strong> {consultation.topic}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <h4 className="font-medium mb-2">Notes</h4>
                            <p className="text-sm bg-white p-3 border rounded">{consultation.notes || 'No notes added yet'}</p>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
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
