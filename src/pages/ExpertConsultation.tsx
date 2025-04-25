import React from 'react';
import { useUserRole } from '@/hooks/useUserRole';
import { ConsultantDashboard } from '@/components/expert-consultation';
import { VideoCall, ExpertsList, ConsultationHistory, ScheduleConsultation, AskQuestion } from "@/components/expert-consultation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthProvider';

export default function ExpertConsultation() {
  const { role, loading } = useUserRole();
  const { user } = useAuth();
  const navigate = useNavigate();

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
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-green-800">Expert Consultation</h1>
          <p className="text-green-600">Get professional advice from verified agricultural experts</p>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            🎁 First Consultation Free!
          </Badge>
        </div>
        <Button
          size="lg"
          className="bg-green-600 hover:bg-green-700 text-white gap-2 shadow-lg"
          onClick={() => setActiveTab('video')}
        >
          <Video className="h-5 w-5" />
          Call an Agri-Doctor Now
        </Button>
      </div>

      {/* Main Content */}
      <Tabs value="experts" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-green-50/50">
          <TabsTrigger value="experts" className="data-[state=active]:bg-green-100">
            <Star className="mr-2 h-4 w-4" />
            Experts
          </TabsTrigger>
          <TabsTrigger value="video" className="data-[state=active]:bg-green-100">
            <Video className="mr-2 h-4 w-4" />
            Video Call
          </TabsTrigger>
          <TabsTrigger value="chat" className="data-[state=active]:bg-green-100">
            <MessageSquare className="mr-2 h-4 w-4" />
            Ask Question
          </TabsTrigger>
          <TabsTrigger value="schedule" className="data-[state=active]:bg-green-100">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </TabsTrigger>
        </TabsList>

        <TabsContent value="experts">
          <ExpertsList />
        </TabsContent>

        <TabsContent value="video">
          <VideoCall />
        </TabsContent>

        <TabsContent value="chat">
          <AskQuestion />
        </TabsContent>

        <TabsContent value="schedule">
          <ScheduleConsultation />
        </TabsContent>
      </Tabs>

      {/* History Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Consultations</h2>
        <ConsultationHistory />
      </div>
    </div>
  );
}
