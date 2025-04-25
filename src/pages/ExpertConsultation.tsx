
import React from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { ConsultantDashboard } from '@/components/expert-consultation';
import { HeaderSection } from '@/components/expert-consultation/HeaderSection';
import { TabsSection } from '@/components/expert-consultation/TabsSection';
import { HistorySection } from '@/components/expert-consultation/HistorySection';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';

export default function ExpertConsultation() {
  const { role, loading } = useUserRole();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState('experts');

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!user && !loading) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (role === 'consultant' || role === 'admin') {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <h1 className="text-3xl font-bold text-green-800 mb-6">Consultant Dashboard</h1>
        <ConsultantDashboard />
      </div>
    );
  }

  // Farmer view (default)
  return (
    <div className="container mx-auto p-4 space-y-6">
      <HeaderSection onStartCall={() => setActiveTab('video')} />
      <TabsSection />
      <HistorySection />
    </div>
  );
}
