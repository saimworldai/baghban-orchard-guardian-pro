
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';
import { BackgroundElements } from '@/components/home/BackgroundElements';
import { useAuth } from '@/contexts/AuthProvider';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // If user is logged in, redirect to dashboard
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      <BackgroundElements />
      
      <div className="container mx-auto px-4 py-16">
        <HeroSection />
        <StatsSection />
        <FeaturesGrid />
        <TestimonialsSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Index;
