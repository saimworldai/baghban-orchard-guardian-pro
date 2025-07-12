import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';
import { enhancedToast } from '@/components/ui/enhanced-toast';

interface SpraySchedule {
  id: string;
  crop_name: string;
  spray_date: string;
  chemical_name: string;
  dosage: string;
  target_pest?: string;
  weather_conditions?: string;
  notes?: string;
  completed: boolean;
  created_at: string;
}

interface CreateSprayScheduleData {
  crop_name: string;
  spray_date: string;
  chemical_name: string;
  dosage: string;
  target_pest?: string;
  weather_conditions?: string;
  notes?: string;
}

export function useSpraySchedule() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: schedules = [], isLoading } = useQuery({
    queryKey: ['spray_schedules'],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('spray_schedules')
        .select('*')
        .order('spray_date', { ascending: true });
      
      if (error) throw error;
      return data as SpraySchedule[];
    },
    enabled: !!user,
  });

  const createScheduleMutation = useMutation({
    mutationFn: async (scheduleData: CreateSprayScheduleData) => {
      if (!user) throw new Error('User not authenticated');
      
      const { data, error } = await supabase
        .from('spray_schedules')
        .insert({ ...scheduleData, user_id: user.id })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spray_schedules'] });
      enhancedToast.success('Spray schedule created successfully');
    },
    onError: (error) => {
      enhancedToast.error('Failed to create spray schedule');
      console.error('Error creating spray schedule:', error);
    },
  });

  const updateScheduleMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<SpraySchedule> }) => {
      const { data, error } = await supabase
        .from('spray_schedules')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spray_schedules'] });
      enhancedToast.success('Schedule updated successfully');
    },
    onError: (error) => {
      enhancedToast.error('Failed to update schedule');
      console.error('Error updating schedule:', error);
    },
  });

  const deleteScheduleMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('spray_schedules')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['spray_schedules'] });
      enhancedToast.success('Schedule deleted successfully');
    },
    onError: (error) => {
      enhancedToast.error('Failed to delete schedule');
      console.error('Error deleting schedule:', error);
    },
  });

  return {
    schedules,
    isLoading,
    createSchedule: createScheduleMutation.mutate,
    updateSchedule: updateScheduleMutation.mutate,
    deleteSchedule: deleteScheduleMutation.mutate,
    isCreating: createScheduleMutation.isPending,
    isUpdating: updateScheduleMutation.isPending,
    isDeleting: deleteScheduleMutation.isPending,
  };
}