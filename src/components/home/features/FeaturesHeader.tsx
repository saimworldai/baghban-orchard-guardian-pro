
import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export function FeaturesHeader() {
  return (
    <div className="text-center mb-16">
      <motion.h2 
        id="features-title"
        variants={cardVariants}
        className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
      >
        Everything You Need to Succeed
      </motion.h2>
      <motion.p 
        variants={cardVariants}
        className="text-xl text-gray-600 max-w-3xl mx-auto"
      >
        Our comprehensive platform combines cutting-edge technology with agricultural expertise 
        to help you optimize every aspect of your orchard management.
      </motion.p>
    </div>
  );
}
