import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthProvider';

export function useExpertBackend() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const createConsultation = async (topic: string) => {
    if (!user) {
      toast.error("Please login to create a consultation");
      return null;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('handle-consultation', {
        body: {
          action: 'create_consultation',
          farmerId: user.id,
          topic
        }
      });

      if (error) throw error;

      toast.success("Consultation request created! Experts will be notified.");
      return data.consultation;
    } catch (error) {
      console.error('Error creating consultation:', error);
      toast.error("Failed to create consultation request");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const acceptConsultation = async (consultationId: string) => {
    if (!user) {
      toast.error("Please login to accept consultations");
      return false;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('handle-consultation', {
        body: {
          action: 'accept_consultation',
          consultationId,
          expertId: user.id
        }
      });

      if (error) throw error;

      toast.success("Consultation accepted! You can now start the call.");
      return true;
    } catch (error) {
      console.error('Error accepting consultation:', error);
      toast.error("Failed to accept consultation - it may have been taken by another expert");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const startCall = async (consultationId: string) => {
    if (!user) {
      toast.error("Please login to start calls");
      return false;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('handle-consultation', {
        body: {
          action: 'start_call',
          consultationId,
          expertId: user.id
        }
      });

      if (error) throw error;

      toast.success("Call started successfully!");
      return true;
    } catch (error) {
      console.error('Error starting call:', error);
      toast.error("Failed to start call");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const endCall = async (consultationId: string) => {
    if (!user) return false;

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('handle-consultation', {
        body: {
          action: 'end_call',
          consultationId,
          expertId: user.id
        }
      });

      if (error) throw error;

      toast.success("Call ended successfully!");
      return true;
    } catch (error) {
      console.error('Error ending call:', error);
      toast.error("Failed to end call");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const joinCall = async (consultationId: string) => {
    if (!user) {
      toast.error("Please login to join calls");
      return null;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('call-management', {
        body: {
          action: 'join_call',
          consultationId,
          userId: user.id
        }
      });

      if (error) throw error;

      return data.consultation;
    } catch (error) {
      console.error('Error joining call:', error);
      toast.error("Failed to join call - access denied");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const saveCallNotes = async (consultationId: string, notes: string) => {
    if (!user) return false;

    try {
      const { data, error } = await supabase.functions.invoke('call-management', {
        body: {
          action: 'save_notes',
          consultationId,
          userId: user.id,
          notes
        }
      });

      if (error) throw error;

      toast.success("Notes saved successfully!");
      return true;
    } catch (error) {
      console.error('Error saving notes:', error);
      toast.error("Failed to save notes");
      return false;
    }
  };

  const getAvailableExperts = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('handle-consultation', {
        body: {
          action: 'get_available_experts'
        }
      });

      if (error) throw error;

      return data.experts;
    } catch (error) {
      console.error('Error fetching experts:', error);
      return [];
    }
  };

  return {
    loading,
    createConsultation,
    acceptConsultation,
    startCall,
    endCall,
    joinCall,
    saveCallNotes,
    getAvailableExperts
  };
}