
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EnhancedHeroSection } from '@/components/home/EnhancedHeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';
import { BackgroundElements } from '@/components/home/BackgroundElements';
import { useAuth } from '@/contexts/AuthProvider';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      <BackgroundElements />
      
      <div className="container mx-auto px-4 py-16">
        <EnhancedHeroSection />
        <StatsSection />
        <FeaturesGrid />
        <TestimonialsSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Index;
