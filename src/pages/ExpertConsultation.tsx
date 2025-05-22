
import React from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { useAuth } from '@/contexts/AuthProvider';
import { ConsultantDashboardView } from '@/components/expert-consultation/ConsultantDashboardView';
import { FarmerDashboardView } from '@/components/expert-consultation/FarmerDashboardView';
import { AuthPromptSection } from '@/components/expert-consultation/AuthPromptSection';
import { LoadingSection } from '@/components/expert-consultation/LoadingSection';

export default function ExpertConsultation() {
  const { role, loading: roleLoading } = useUserRole();
  const { user, loading: authLoading } = useAuth();
  
  // Don't redirect to auth if we're already loading
  const loading = authLoading || roleLoading;

  // Show loading state
  if (loading) {
    return <LoadingSection />;
  }

  // Show auth prompt if not authenticated
  if (!user) {
    return <AuthPromptSection />;
  }

  // Consultant dashboard
  if (role === 'consultant' || role === 'admin') {
    return <ConsultantDashboardView />;
  }

  // Farmer view (default)
  return <FarmerDashboardView />;
}
