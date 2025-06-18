
import { supabase } from '@/integrations/supabase/client';
import { UserRole } from '@/hooks/useUserRole';

export interface UserWithRole {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  created_at: string;
  last_sign_in_at: string | null;
}

export async function getAllUsersWithRoles(): Promise<UserWithRole[]> {
  try {
    // Get all user roles with user data
    const { data: userRoles, error: rolesError } = await supabase
      .from('user_roles')
      .select(`
        user_id,
        role,
        profiles!inner(
          full_name
        )
      `);

    if (rolesError) {
      console.error('Error fetching user roles:', rolesError);
      return [];
    }

    // Get auth users data
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('Error fetching auth users:', authError);
      return [];
    }

    // Combine the data
    const usersWithRoles: UserWithRole[] = userRoles.map(userRole => {
      const authUser = authUsers.users.find(user => user.id === userRole.user_id);
      const profile = userRole.profiles;
      
      return {
        id: userRole.user_id,
        email: authUser?.email || 'Unknown',
        full_name: profile?.full_name || 'Unknown',
        role: userRole.role as UserRole,
        created_at: authUser?.created_at || '',
        last_sign_in_at: authUser?.last_sign_in_at || null
      };
    });

    return usersWithRoles;
  } catch (error) {
    console.error('Error in getAllUsersWithRoles:', error);
    return [];
  }
}

export async function updateUserRole(userId: string, newRole: UserRole): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_roles')
      .update({ role: newRole, updated_at: new Date().toISOString() })
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
}

export async function deleteUser(userId: string): Promise<boolean> {
  try {
    // Delete from auth (this will cascade to user_roles and profiles)
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
      console.error('Error deleting user:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deleteUser:', error);
    return false;
  }
}

export async function createAdminUser(email: string, password: string, fullName: string): Promise<boolean> {
  try {
    // Create the user
    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { full_name: fullName }
    });

    if (error || !data.user) {
      console.error('Error creating admin user:', error);
      return false;
    }

    // Update their role to admin
    const { error: roleError } = await supabase
      .from('user_roles')
      .update({ role: 'admin' })
      .eq('user_id', data.user.id);

    if (roleError) {
      console.error('Error setting admin role:', roleError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in createAdminUser:', error);
    return false;
  }
}
