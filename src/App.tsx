
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthProvider";
import { EnhancedNavigation } from "@/components/navigation/EnhancedNavigation";
import { OfflineIndicator } from "@/components/offline/OfflineIndicator";
import { PWAInstallPrompt } from "@/components/pwa/PWAInstallPrompt";
import { useAuth } from "@/contexts/AuthProvider";
import { useUserRole } from "@/hooks/useUserRole";

// Import pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import WeatherAlerts from "./pages/WeatherAlerts";
import DiseaseDetection from "./pages/DiseaseDetection";
import ExpertConsultation from "./pages/ExpertConsultation";
import SpraySchedule from "./pages/SpraySchedule";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import AdminConsultation from "./pages/AdminConsultation";
import ExpertCall from "./pages/ExpertCall";
import CallMonitor from "./pages/CallMonitor";
import Integrations from "./pages/Integrations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Optional Protected Route Component (only for admin features)
function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: 'admin' | 'consultant' }) {
  const { user } = useAuth();
  const { role, loading } = useUserRole();

  // Only require auth for admin routes
  if (requiredRole === 'admin') {
    if (!user) {
      return <Navigate to="/auth" replace />;
    }

    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
        </div>
      );
    }

    if (role !== 'admin') {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}

// App Routes Component
function AppRoutes() {
  return (
    <div className="min-h-screen bg-background">
      <EnhancedNavigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Public Routes - No Authentication Required */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weather-alerts" element={<WeatherAlerts />} />
        <Route path="/disease-detection" element={<DiseaseDetection />} />
        <Route path="/expert-consultation" element={<ExpertConsultation />} />
        <Route path="/spray-schedule" element={<SpraySchedule />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/integrations" element={<Integrations />} />
        
        {/* User Profile - Optional Authentication */}
        <Route path="/profile" element={<Profile />} />
        
        {/* Admin Routes - Require Authentication */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/consultations"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminConsultation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/call-monitor"
          element={
            <ProtectedRoute requiredRole="admin">
              <CallMonitor />
            </ProtectedRoute>
          }
        />
        
        {/* Expert Call - For authenticated users */}
        <Route path="/expert-call/:consultationId" element={<ExpertCall />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <OfflineIndicator />
      <PWAInstallPrompt />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <AppRoutes />
            <Toaster />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
