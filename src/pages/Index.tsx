
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { EnhancedHeroSection } from '@/components/home/EnhancedHeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { FeaturesGrid } from '@/components/home/FeaturesGrid';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { CTASection } from '@/components/home/CTASection';
import { BackgroundElements } from '@/components/home/BackgroundElements';
import { CommunityFeed } from '@/components/community/CommunityFeed';
import { UserAnalytics } from '@/components/analytics/UserAnalytics';
import { useAuth } from '@/contexts/AuthProvider';
import { motion } from 'framer-motion';

const Index = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 relative overflow-hidden">
      <BackgroundElements />
      
      <div className="container mx-auto px-4 py-16 space-y-24">
        <EnhancedHeroSection />
        <StatsSection />
        
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
          <UserAnalytics />
        </motion.section>
        
        <FeaturesGrid />
        
        {/* Community Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <CommunityFeed />
        </motion.section>
        
        <TestimonialsSection />
        <CTASection />
      </div>
    </div>
  );
};

export default Index;
