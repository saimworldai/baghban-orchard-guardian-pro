
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthProvider";
import { EnhancedNavigation } from "@/components/navigation/EnhancedNavigation";
import { OfflineIndicator } from "@/components/offline/OfflineIndicator";
import { PWAInstallPrompt } from "@/components/pwa/PWAInstallPrompt";
import { EnhancedErrorBoundary } from "@/components/ui/enhanced-error-boundary";
import { SkipToContent } from "@/components/accessibility/SkipToContent";
import { InstallPWA } from "@/components/advanced/InstallPWA";
import { HelpPanel } from "@/components/ui/help-panel";
import { useAuth } from "@/contexts/AuthProvider";
import { useUserRole } from "@/hooks/useUserRole";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { ThemeProvider } from "next-themes";
import { useNavigate } from "react-router-dom";

// Import pages
import Index from "./pages/Index";
import PlantCare from "./pages/PlantCare";
import Community from "./pages/Community";
import GardenCalendar from "./pages/GardenCalendar";
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
import VideoCall from "./pages/VideoCall";
import CallMonitor from "./pages/CallMonitor";
import Integrations from "./pages/Integrations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        if (failureCount < 2) return true;
        return false;
      },
    },
  },
});

// Protected Route Component (only for admin features)
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

// App Routes Component with keyboard shortcuts
function AppRoutes() {
  const navigate = useNavigate();

  // Global keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: 'k',
      ctrlKey: true,
      callback: () => {
        // Focus on search if available, or navigate to a search page
        const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      },
      description: 'Open search'
    },
    {
      key: 'd',
      ctrlKey: true,
      callback: () => navigate('/dashboard'),
      description: 'Go to dashboard'
    },
    {
      key: 'h',
      ctrlKey: true,
      callback: () => {
        // This will be handled by the HelpPanel component
      },
      description: 'Open help panel'
    },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <SkipToContent />
      <EnhancedNavigation />
      <main id="main-content" className="focus:outline-none" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Public Routes - No Authentication Required */}
          <Route path="/plant-care" element={<PlantCare />} />
          <Route path="/weather-alerts" element={<WeatherAlerts />} />
          <Route path="/disease-detection" element={<DiseaseDetection />} />
          <Route path="/community" element={<Community />} />
          <Route path="/garden-calendar" element={<GardenCalendar />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/integrations" element={<Integrations />} />
          <Route path="/expert-consultation" element={<ExpertConsultation />} />
          <Route path="/expert-consultation/video" element={<VideoCall />} />
          <Route path="/expert-consultation/call/:consultationId" element={<ExpertCall />} />
          <Route path="/spray-schedule" element={<SpraySchedule />} />
          
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
          
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <OfflineIndicator />
      <PWAInstallPrompt />
      <InstallPWA />
      <HelpPanel />
    </div>
  );
}

function App() {
  return (
    <EnhancedErrorBoundary>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
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
      </ThemeProvider>
    </EnhancedErrorBoundary>
  );
}

export default App;
