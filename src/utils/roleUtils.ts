
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';

export type UserRole = 'farmer' | 'consultant' | 'admin';

// Define the user data type based on what we expect from the query
type UserData = {
  id: string;
  full_name: string | null;
  role: UserRole;
};

export const getRoleDisplayName = (role: UserRole): string => {
  switch (role) {
    case 'admin':
      return 'Administrator';
    case 'consultant':
      return 'Agricultural Consultant';
    case 'farmer':
      return 'Farmer';
    default:
      return 'User';
  }
};

export const getRoleColor = (role: UserRole): string => {
  switch (role) {
    case 'admin':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'consultant':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'farmer':
      return 'bg-green-100 text-green-800 border-green-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getAllUsersWithRoles = async (): Promise<UserData[]> => {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select(`
        user_id,
        role,
        profiles!inner(
          id,
          full_name
        )
      `);

    if (error) {
      console.error('Error fetching users with roles:', error);
      return [];
    }

    // Transform the data to match our expected format
    return (data || []).map((item: any) => ({
      id: item.user_id,
      role: item.role as UserRole,
      full_name: item.profiles?.full_name || 'Unknown User'
    }));
  } catch (error) {
    console.error('Error in getAllUsersWithRoles:', error);
    return [];
  }
};

export const updateUserRole = async (userId: string, newRole: UserRole): Promise<boolean> => {
  try {
    const { error } = await supabase
      .from('user_roles')
      .update({ role: newRole })
      .eq('user_id', userId);

    if (error) {
      console.error('Error updating user role:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in updateUserRole:', error);
    return false;
  }
};

export const canAccessAdminFeatures = (role: UserRole | null): boolean => {
  return role === 'admin';
};

export const canAccessConsultantFeatures = (role: UserRole | null): boolean => {
  return role === 'admin' || role === 'consultant';
};
