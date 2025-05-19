
import React from 'react';
import { AdminDashboard } from '@/components/expert-consultation/AdminDashboard';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useUserRole } from '@/hooks/useUserRole';
import { Loader2 } from 'lucide-react';

export default function AdminConsultation() {
  const { user, loading: authLoading } = useAuth();
  const { role, loading: roleLoading } = useUserRole();
  const navigate = useNavigate();
  
  const loading = authLoading || roleLoading;
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700">Loading...</h3>
        </div>
      </div>
    );
  }
  
  // Redirect if not authenticated
  if (!user) {
    navigate('/auth');
    return null;
  }
  
  // Verify admin role
  if (role !== 'admin') {
    return (
      <div className="container mx-auto p-6">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-red-700">Access Denied</h2>
            <p className="text-red-600 mt-2">
              You need administrative privileges to access this page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-100 mb-6 shadow-sm">
        <h1 className="text-3xl font-bold text-indigo-800 mb-2">Admin Dashboard</h1>
        <p className="text-indigo-600">Manage all expert consultations and monitor ongoing calls</p>
      </div>
      <AdminDashboard />
    </div>
  );
}
