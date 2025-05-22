
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthProvider';

export function useExpertCall() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isStartingCall, setIsStartingCall] = useState(false);

  const startCall = async (expertId: string, expertName: string, expertAvailable: boolean) => {
    if (!user) {
      toast.error("Please login to start a consultation");
      navigate('/auth');
      return;
    }
    
    if (!expertAvailable) {
      toast.error("This expert is currently unavailable");
      return;
    }

    setIsStartingCall(true);
    toast.loading("Setting up your consultation...");

    try {
      // Create a new consultation in the database
      const { data, error } = await supabase
        .from('consultations')
        .insert({
          farmer_id: user.id,
          consultant_id: expertId,
          status: 'in_progress',
          topic: 'General Consultation',
        })
        .select();
        
      if (error) throw error;
      
      if (!data || data.length === 0) {
        throw new Error('Failed to create consultation record');
      }
      
      toast.dismiss();
      toast.success("Starting consultation");
      navigate(`/expert-consultation/call/${data[0].id}`);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to set up consultation");
      console.error("Error setting up consultation:", error);
    } finally {
      setIsStartingCall(false);
    }
  };

  return { isStartingCall, startCall };
}
