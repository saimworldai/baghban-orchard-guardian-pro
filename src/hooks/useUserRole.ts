
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
        // First try to get the role from the profiles table
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        
        // For now, since the role column might not exist yet, we'll default to 'farmer'
        // In the future, you can use the actual role from the database
        // setRole((data?.role as UserRole) || 'farmer');
        
        // Temporary solution - hardcoded roles for testing
        // You can replace this with actual role from the database once the schema is updated
        if (user.email?.includes('admin')) {
          setRole('admin');
        } else if (user.email?.includes('consultant')) {
          setRole('consultant');
        } else {
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
