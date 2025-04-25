
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

export function ConsultantDashboard() {
  const navigate = useNavigate();

  const { data: consultations, isLoading } = useQuery({
    queryKey: ['consultations'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('consultations')
        .select(`
          *,
          farmer:farmer_id(
            id,
            email,
            profiles:profiles(full_name)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
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
                  {consultation.farmer?.profiles?.full_name || consultation.farmer?.email}
                </TableCell>
                <TableCell>{consultation.topic}</TableCell>
                <TableCell>
                  <Badge variant={consultation.status === 'pending' ? 'warning' : 'success'}>
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
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
