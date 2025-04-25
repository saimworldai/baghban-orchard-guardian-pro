
import React from 'react';
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
  farmer: FarmerProfile;
}

export function ConsultantDashboard() {
  const navigate = useNavigate();

  const { data: consultations, isLoading } = useQuery({
    queryKey: ['consultations'],
    queryFn: async () => {
      try {
        // Use any instead of typed query for now due to schema mismatch
        const { data, error } = await supabase
          .from('consultations') as any;
          
        if (error) throw error;
        return data as Consultation[];
      } catch (error) {
        console.error('Error fetching consultations:', error);
        // Return empty array on error
        return [] as Consultation[];
      }
    },
  });

  const handleAcceptConsultation = async (consultationId: string) => {
    try {
      // Use any instead of typed query for now due to schema mismatch
      const { error } = await supabase
        .from('consultations')
        .update({ 
          status: 'scheduled',
          consultant_id: (await supabase.auth.getUser()).data.user?.id
        }) as any;
        
      if (error) throw error;
      toast.success('Consultation accepted');
    } catch (error) {
      console.error('Error accepting consultation:', error);
      toast.error('Failed to accept consultation');
    }
  };

  const handleStartCall = (consultationId: string) => {
    navigate(`/expert-consultation/call/${consultationId}`);
  };

  if (isLoading) {
    return <div>Loading consultations...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Consultation Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Farmer</TableHead>
              <TableHead>Topic</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {consultations?.map((consultation) => (
              <TableRow key={consultation.id}>
                <TableCell>
                  {consultation.farmer?.profiles?.full_name || consultation.farmer?.email || "Unknown Farmer"}
                </TableCell>
                <TableCell>{consultation.topic}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={consultation.status === 'pending' ? 'bg-yellow-50 text-yellow-700' : 'bg-green-50 text-green-700'}>
                    {consultation.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {new Date(consultation.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {consultation.status === 'pending' ? (
                    <Button
                      size="sm"
                      onClick={() => handleAcceptConsultation(consultation.id)}
                    >
                      Accept
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="default"
                      onClick={() => handleStartCall(consultation.id)}
                    >
                      Join Call
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {(!consultations || consultations.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-4">
                  No consultation requests available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
