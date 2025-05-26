
import React from 'react';
import { motion } from 'framer-motion';
import { TreeDeciduous, Leaf, Sun, Sparkles } from 'lucide-react';

const floatingVariants = {
  floating: {
    y: [0, -25, 0],
    x: [0, 10, 0],
    rotate: [0, 5, 0],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export function BackgroundElements() {
  return (
    <>
      {/* Enhanced background elements with more complexity */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm -z-10"></div>
      
      {/* More sophisticated background patterns */}
      <div className="absolute inset-0 opacity-20 -z-10">
        <motion.div 
          className="absolute top-20 left-10"
          variants={floatingVariants}
          animate="floating"
        >
          <TreeDeciduous size={120} className="text-green-600 opacity-40" />
        </motion.div>
        <motion.div 
          className="absolute top-40 right-20"
          variants={floatingVariants}
          animate="floating"
          transition={{ delay: 1.5 }}
        >
          <Leaf size={100} className="text-emerald-500 opacity-50" />
        </motion.div>
        <motion.div 
          className="absolute bottom-20 left-20"
          variants={floatingVariants}
          animate="floating"
          transition={{ delay: 3 }}
        >
          <Sun size={110} className="text-yellow-500 opacity-40" />
        </motion.div>
        <motion.div 
          className="absolute top-1/2 right-10"
          variants={floatingVariants}
          animate="floating"
          transition={{ delay: 4.5 }}
        >
          <Sparkles size={80} className="text-purple-500 opacity-30" />
        </motion.div>
      </div>
    </>
  );
}
