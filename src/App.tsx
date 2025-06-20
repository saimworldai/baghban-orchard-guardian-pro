
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

// Protected Route Component
function ProtectedRoute({ children, requiredRole }: { children: React.ReactNode; requiredRole?: 'admin' | 'consultant' }) {
  const { user } = useAuth();
  const { role, loading } = useUserRole();

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

  if (requiredRole && role !== requiredRole && role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

// App Routes Component
function AppRoutes() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {user && <EnhancedNavigation />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/weather-alerts"
          element={
            <ProtectedRoute>
              <WeatherAlerts />
            </ProtectedRoute>
          }
        />
        <Route
          path="/disease-detection"
          element={
            <ProtectedRoute>
              <DiseaseDetection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expert-consultation"
          element={
            <ProtectedRoute>
              <ExpertConsultation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/spray-schedule"
          element={
            <ProtectedRoute>
              <SpraySchedule />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
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
          path="/expert-call/:consultationId"
          element={
            <ProtectedRoute>
              <ExpertCall />
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
        <Route
          path="/integrations"
          element={
            <ProtectedRoute>
              <Integrations />
            </ProtectedRoute>
          }
        />
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
