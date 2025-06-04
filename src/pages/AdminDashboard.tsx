
import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthProvider';
import { useUserRole } from '@/hooks/useUserRole';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { AdminOverview } from '@/components/admin/AdminOverview';
import { AdminDashboard as ExpertAdminDashboard } from '@/components/expert-consultation/AdminDashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
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
          <h3 className="text-lg font-medium text-gray-700">Loading Admin Dashboard...</h3>
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto p-6"
      >
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-red-700">Access Denied</h2>
            <p className="text-red-600 mt-2">
              You need administrative privileges to access this page.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-green-50"
    >
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">System Overview</TabsTrigger>
            <TabsTrigger value="consultations">Expert Consultations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverview />
          </TabsContent>

          <TabsContent value="consultations">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <ExpertAdminDashboard />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </motion.div>
  );
}
