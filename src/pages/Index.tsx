
import React, { Suspense, lazy, useCallback } from 'react';
import { EnhancedHeroSection } from '@/components/home/EnhancedHeroSection';
import { BackgroundElements } from '@/components/home/BackgroundElements';
import { useAuth } from '@/contexts/AuthProvider';
import { motion } from 'framer-motion';
import { enhancedToast } from '@/components/ui/enhanced-toast';
import { debounce } from '@/utils/performance';
import { SectionLoader } from '@/components/ui/loading-states';
import { PageTransition } from '@/components/ui/professional-animations';

// Lazy load essential components only
const FeaturesGrid = lazy(() => import('@/components/home/FeaturesGrid').then(module => ({ default: module.FeaturesGrid })));
const TestimonialsSection = lazy(() => import('@/components/home/TestimonialsSection').then(module => ({ default: module.TestimonialsSection })));
const CTASection = lazy(() => import('@/components/home/CTASection').then(module => ({ default: module.CTASection })));
const ModernStatsSection = lazy(() => import('@/components/home/ModernStatsSection').then(module => ({ default: module.ModernStatsSection })));

const Index = () => {
  const { user } = useAuth();

  // Optimized welcome message for returning users
  const showWelcomeMessage = useCallback(
    debounce((user: any) => {
      if (!user) return;
      
      const lastVisit = localStorage.getItem('lastVisit');
      const now = Date.now();
      
      if (!lastVisit || now - parseInt(lastVisit) > 24 * 60 * 60 * 1000) {
        enhancedToast.success(`Welcome back${user.email ? `, ${user.email.split('@')[0]}` : ''}!`, {
          description: 'Discover new plant care features.',
        });
        localStorage.setItem('lastVisit', now.toString());
      }
    }, 500),
    []
  );

  React.useEffect(() => {
    if (user) {
      showWelcomeMessage(user);
    }
  }, [user, showWelcomeMessage]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <BackgroundElements />
      
      <div className="container mx-auto py-8 space-y-16">
        <EnhancedHeroSection />
        
        <Suspense fallback={<SectionLoader />}>
          <ModernStatsSection />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <FeaturesGrid />
        </Suspense>
        
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
