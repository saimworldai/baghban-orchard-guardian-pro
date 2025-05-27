
import React from 'react';
import { motion } from 'framer-motion';

interface FeatureBenefitsProps {
  benefits: string[];
  color: string;
}

export function FeatureBenefits({ benefits, color }: FeatureBenefitsProps) {
  return (
    <div className="space-y-2">
      {benefits.map((benefit, i) => (
        <motion.div 
          key={i} 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        >
          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${color} flex-shrink-0`} />
          <span className="text-sm text-gray-600 font-medium">{benefit}</span>
        </motion.div>
      ))}
    </div>
  );
}
