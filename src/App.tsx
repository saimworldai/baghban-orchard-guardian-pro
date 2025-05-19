import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthProvider";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import DiseaseDetection from "./pages/DiseaseDetection";
import WeatherAlerts from "./pages/WeatherAlerts";
import SpraySchedule from "./pages/SpraySchedule";
import ExpertConsultation from "./pages/ExpertConsultation";
import ExpertCall from "./pages/ExpertCall";
import AdminConsultation from "./pages/AdminConsultation";
import CallMonitor from "./pages/CallMonitor";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <Navigation />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/weather-alerts" element={<WeatherAlerts />} />
              <Route path="/disease-detection" element={<DiseaseDetection />} />
              <Route path="/spray-schedule" element={<SpraySchedule />} />
              <Route path="/expert-consultation" element={<ExpertConsultation />} />
              <Route path="/expert-consultation/call/:consultationId" element={<ExpertCall />} />
              <Route path="/admin-consultation" element={<AdminConsultation />} />
              <Route path="/expert-consultation/monitor/:consultationId" element={<CallMonitor />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
