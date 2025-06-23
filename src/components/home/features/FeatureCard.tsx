
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FeatureThumbnail } from './FeatureThumbnail';
import { FeatureBenefits } from './FeatureBenefits';
import { Feature } from './types';

interface FeatureCardProps {
  feature: Feature;
  index: number;
  onFeatureClick: (link: string) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export function FeatureCard({ feature, index, onFeatureClick }: FeatureCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        transition: { type: "spring" as const, stiffness: 300 }
      }}
      className="group cursor-pointer"
      onClick={() => onFeatureClick(feature.link)}
    >
      <Card className={`h-full bg-white/90 backdrop-blur-md ${feature.accentColor} border-2 hover:shadow-2xl transition-all duration-500 overflow-hidden relative`}>
        <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
        
        {/* Thumbnail Section */}
        <div className="p-6 pb-0">
          <FeatureThumbnail
            icon={feature.icon}
            secondaryIcon={feature.secondaryIcon}
            thumbnailBg={feature.thumbnailBg}
            index={index}
          />
        </div>
        
        <CardHeader className="pb-4 pt-0">
          <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors flex items-center justify-between">
            {feature.title}
            <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-gray-600 mb-6 leading-relaxed">
            {feature.description}
          </p>
          
          <FeatureBenefits benefits={feature.benefits} color={feature.color} />

          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
              <ArrowRight className="h-4 w-4 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
