
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FeatureCard } from './features/FeatureCard';
import { FeaturesHeader } from './features/FeaturesHeader';
import { features } from './features/featuresData';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export function FeaturesGrid() {
  const navigate = useNavigate();

  const handleFeatureClick = (link: string) => {
    navigate(link);
  };

  return (
    <motion.section 
      id="features-section"
      className="mb-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
      role="region"
      aria-labelledby="features-title"
    >
      <FeaturesHeader />

      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            feature={feature}
            index={index}
            onFeatureClick={handleFeatureClick}
          />
        ))}
      </motion.div>
    </motion.section>
  );
}
