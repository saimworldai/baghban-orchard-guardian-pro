
import { supabase } from '@/integrations/supabase/client';

export type UserRole = 'farmer' | 'consultant' | 'admin';

export interface UserWithRole {
  id: string;
  email: string;
  role: UserRole;
  full_name?: string;
}

export async function getUserRole(userId: string): Promise<UserRole | null> {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();
      
    if (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
    
    return data?.role as UserRole || null;
  } catch (error) {
    console.error('Error in getUserRole:', error);
    return null;
  }
}

export async function updateUserRole(userId: string, newRole: UserRole): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_roles')
      .upsert({ 
        user_id: userId, 
        role: newRole,
        updated_at: new Date().toISOString()
      });
      
    if (error) {
      console.error('Error updating user role:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error in updateUserRole:', error);
    return false;
  }
}

export async function getAllUsersWithRoles(): Promise<UserWithRole[]> {
  try {
    const { data, error } = await supabase
      .from('user_roles')
      .select(`
        user_id,
        role,
        profiles!inner(
          full_name
        )
      `);
      
    if (error) {
      console.error('Error fetching users with roles:', error);
      return [];
    }
    
    // Transform the data to match our interface
    return data.map(item => ({
      id: item.user_id,
      email: '', // We'll need to get this from auth if needed
      role: item.role as UserRole,
      full_name: item.profiles?.full_name || undefined
    }));
  } catch (error) {
    console.error('Error in getAllUsersWithRoles:', error);
    return [];
  }
}

export async function assignAdminRole(email: string): Promise<boolean> {
  try {
    // First, get the user ID by email from profiles (since we can't query auth.users directly)
    // This is a limitation - in a real app, you'd want a more robust way to find users
    console.log(`To assign admin role to ${email}, you'll need to run this SQL command:`);
    console.log(`INSERT INTO public.user_roles (user_id, role) SELECT id, 'admin'::app_role FROM auth.users WHERE email = '${email}' ON CONFLICT (user_id, role) DO NOTHING;`);
    
    return true;
  } catch (error) {
    console.error('Error in assignAdminRole:', error);
    return false;
  }
}
