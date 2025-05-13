
import React from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { ConsultantDashboard } from '@/components/expert-consultation';
import { HeaderSection } from '@/components/expert-consultation/HeaderSection';
import { TabsSection } from '@/components/expert-consultation/TabsSection';
import { HistorySection } from '@/components/expert-consultation/HistorySection';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';
import { Separator } from '@/components/ui/separator';

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

  const handleStartCall = () => {
    setActiveTab('video');
  };

  if (loading) {
    return <div className="container mx-auto p-4 text-center">Loading...</div>;
  }

  if (role === 'consultant' || role === 'admin') {
    return (
      <div className="container mx-auto p-4 space-y-6">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100 mb-6">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Consultant Dashboard</h1>
          <p className="text-green-600">Manage your consultations and help farmers with their queries</p>
        </div>
        <ConsultantDashboard />
      </div>
    );
  }

  // Farmer view (default)
  return (
    <div className="container mx-auto p-4 space-y-6">
      <HeaderSection onStartCall={handleStartCall} />
      <TabsSection activeTab={activeTab} onTabChange={setActiveTab} />
      <Separator className="my-8" />
      <HistorySection />
    </div>
  );
}
