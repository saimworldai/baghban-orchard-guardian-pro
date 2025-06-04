
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DashboardOverview } from '@/components/dashboard/DashboardOverview';
import { OnboardingTour } from '@/components/onboarding/OnboardingTour';
import { toast } from '@/components/ui/sonner';

const Dashboard: React.FC = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    if (!hasCompletedOnboarding) {
      // Delay showing onboarding to let the page load
      setTimeout(() => setShowOnboarding(true), 1000);
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setShowOnboarding(false);
    toast.success('Welcome to Orchard Guardian Pro! You\'re all set to get started.');
  };

  const handleOnboardingSkip = () => {
    localStorage.setItem('hasCompletedOnboarding', 'true');
    setShowOnboarding(false);
    toast.info('Onboarding skipped. You can access help anytime from the navigation.');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50"
    >
      <div className="container mx-auto px-4 py-8">
        <DashboardOverview />
      </div>

      <OnboardingTour
        isVisible={showOnboarding}
        onComplete={handleOnboardingComplete}
        onSkip={handleOnboardingSkip}
      />
    </motion.div>
  );
};

export default Dashboard;
