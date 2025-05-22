
import React from 'react';
import { ExpertCard } from './ExpertCard';
import { motion } from 'framer-motion';

interface Expert {
  id: string;
  name: string;
  specialty: string;
  languages: string[];
  rating: number;
  imageUrl: string;
  verified: boolean;
  available: boolean;
  pricePerMinute?: number;
  experience?: string;
}

interface ExpertsGridProps {
  experts: Expert[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export function ExpertsGrid({ experts }: ExpertsGridProps) {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {experts.map((expert) => (
        <ExpertCard key={expert.id} expert={expert} />
      ))}
    </motion.div>
  );
}
