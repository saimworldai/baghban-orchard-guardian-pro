
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Consultation } from '@/types/consultations';
import { toast } from "@/components/ui/sonner";

export function useConsultations() {
  const { 
    data: consultations, 
    isLoading, 
    refetch 
  } = useQuery({
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

  const acceptConsultation = async (consultationId: string) => {
    try {
      const { data: user } = await supabase.auth.getUser();
      if (!user.user) throw new Error('Not authenticated');

      const { error } = await supabase
        .from('consultations')
        .update({ 
          status: 'scheduled',
          consultant_id: user.user.id,
          scheduled_at: new Date().toISOString()
        })
        .eq('id', consultationId)
        .eq('consultant_id', null); // Only accept if not already assigned
        
      if (error) throw error;
      toast.success('Consultation accepted! You can now start the call.');
      refetch();
    } catch (error) {
      console.error('Error accepting consultation:', error);
      toast.error('Failed to accept consultation');
    }
  };

  const completeConsultation = async (consultationId: string) => {
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

  return {
    consultations,
    isLoading,
    refetch,
    acceptConsultation,
    completeConsultation
  };
}
