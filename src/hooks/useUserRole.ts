
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthProvider';

export type UserRole = 'farmer' | 'consultant' | 'admin';

export function useUserRole() {
  const { user } = useAuth();
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserRole() {
      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        // Use the new user_roles table to get the user's role
        const { data: roleData, error: roleError } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .single();
          
        if (roleError) {
          console.error('Error fetching user role:', roleError);
          // If no role found, default to farmer (new users get farmer role via trigger)
          setRole('farmer');
        } else if (roleData?.role) {
          setRole(roleData.role as UserRole);
        } else {
          // Fallback to farmer role
          setRole('farmer');
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setRole('farmer'); // Default to farmer role on error
      } finally {
        setLoading(false);
      }
    }

    fetchUserRole();
  }, [user]);

  return { role, loading };
}
