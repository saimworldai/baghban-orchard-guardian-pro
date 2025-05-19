
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
        // First try to check if a user_roles table exists
        // This is more robust than relying on the email pattern
        try {
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .single();
            
          if (roleData?.role) {
            setRole(roleData.role as UserRole);
            setLoading(false);
            return;
          }
        } catch (roleCheckError) {
          // If the user_roles table doesn't exist, continue to email-based detection
          console.log('User roles table may not exist yet, falling back to email pattern');
        }
        
        // Get user profile
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;
        
        // Temporary solution - email-based role detection
        // This should be replaced with a proper role-based system
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
