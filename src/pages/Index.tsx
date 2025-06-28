
import React, { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { EnhancedHeroSection } from '@/components/home/EnhancedHeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { BackgroundElements } from '@/components/home/BackgroundElements';
import { useAuth } from '@/contexts/AuthProvider';
import { motion } from 'framer-motion';
import { usePerformanceOptimization } from '@/hooks/usePerformanceOptimization';
import { enhancedToast } from '@/components/ui/enhanced-toast';

// Lazy load components for better performance
const FeaturesGrid = lazy(() => import('@/components/home/FeaturesGrid').then(module => ({ default: module.FeaturesGrid })));
const TestimonialsSection = lazy(() => import('@/components/home/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const CTASection = lazy(() => import('@/components/home/CTASection').then(module => ({ default: module.CTASection })));
const CommunityFeed = lazy(() => import('@/components/community/CommunityFeed').then(module => ({ default: module.CommunityFeed })));
const UserAnalytics = lazy(() => import('@/components/analytics/UserAnalytics').then(module => ({ default: module.UserAnalytics })));
const SmartSearch = lazy(() => import('@/components/advanced/SmartSearch').then(module => ({ default: module.SmartSearch })));
const InteractiveFeatures = lazy(() => import('@/components/home/InteractiveFeatures').then(module => ({ default: module.InteractiveFeatures })));
const FarmingProgress = lazy(() => import('@/components/gamification/FarmingProgress').then(module => ({ default: module.FarmingProgress })));
const WeatherWidget = lazy(() => import('@/components/weather/WeatherWidget').then(module => ({ default: module.WeatherWidget })));

// Loading component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
  </div>
);

const Index = () => {
  const { user } = useAuth();
  const { performanceMetrics } = usePerformanceOptimization();

  // Show performance metrics to users (can be removed in production)
  React.useEffect(() => {
    if (performanceMetrics.loadTime > 0) {
      console.log('Page Performance:', {
        loadTime: `${performanceMetrics.loadTime}ms`,
        renderTime: `${performanceMetrics.renderTime}ms`,
        connection: performanceMetrics.connectionType
      });
    }
  }, [performanceMetrics]);

  // Welcome message for returning users
  React.useEffect(() => {
    if (user) {
      const lastVisit = localStorage.getItem('lastVisit');
      const now = Date.now();
      
      if (!lastVisit || now - parseInt(lastVisit) > 24 * 60 * 60 * 1000) {
        enhancedToast.success(`Welcome back${user.email ? `, ${user.email.split('@')[0]}` : ''}!`, {
          description: 'Check out the latest features and updates.',
        });
      }
      
      localStorage.setItem('lastVisit', now.toString());
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      <BackgroundElements />
      
      <div className="container mx-auto px-4 py-16 space-y-24">
        <EnhancedHeroSection />
        
        {/* Smart Search Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Search Anything, Get Instant Answers
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Voice search, visual recognition, and AI-powered recommendations
            </p>
          </div>
          <Suspense fallback={<SectionLoader />}>
            <SmartSearch />
          </Suspense>
        </motion.section>

        <StatsSection />
        
        {/* Interactive Features & Weather Side by Side */}
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.section
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Suspense fallback={<SectionLoader />}>
              <WeatherWidget />
            </Suspense>
          </motion.section>
          
          <motion.section
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Suspense fallback={<SectionLoader />}>
              <FarmingProgress />
            </Suspense>
          </motion.section>
        </div>
        
        {/* Performance Analytics - Show for all users */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Real-time Performance
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience lightning-fast performance with our optimized platform
            </p>
          </div>
          <Suspense fallback={<SectionLoader />}>
            <UserAnalytics />
          </Suspense>
        </motion.section>
        
        {/* Interactive Features */}
        <Suspense fallback={<SectionLoader />}>
          <InteractiveFeatures />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <FeaturesGrid />
        </Suspense>
        
        {/* Community Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <Suspense fallback={<SectionLoader />}>
            <CommunityFeed />
          </Suspense>
        </motion.section>
        
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <CTASection />
        </Suspense>
      </div>
    </div>
  );
};

export default Index;
