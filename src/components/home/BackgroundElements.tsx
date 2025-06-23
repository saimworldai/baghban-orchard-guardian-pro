
import React from 'react';
import { motion } from 'framer-motion';
import { TreeDeciduous, Leaf, Sun, Sparkles, Flower, Sprout } from 'lucide-react';

const floatingVariants = {
  floating: {
    y: [0, -25, 0],
    x: [0, 15, 0],
    rotate: [0, 10, 0],
    transition: {
      duration: 12,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

const pulseVariants = {
  pulse: {
    scale: [1, 1.1, 1],
    opacity: [0.4, 0.6, 0.4],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }
};

const backgroundElements = [
  {
    icon: TreeDeciduous,
    size: 120,
    color: "text-green-600",
    position: "top-20 left-10",
    delay: 0,
    opacity: "opacity-30"
  },
  {
    icon: Leaf,
    size: 100,
    color: "text-emerald-500",
    position: "top-40 right-20",
    delay: 1.5,
    opacity: "opacity-40"
  },
  {
    icon: Sun,
    size: 110,
    color: "text-yellow-500",
    position: "bottom-20 left-20",
    delay: 3,
    opacity: "opacity-35"
  },
  {
    icon: Sparkles,
    size: 80,
    color: "text-purple-500",
    position: "top-1/2 right-10",
    delay: 4.5,
    opacity: "opacity-25"
  },
  {
    icon: Flower,
    size: 90,
    color: "text-pink-500",
    position: "top-32 left-1/2",
    delay: 2.5,
    opacity: "opacity-30"
  },
  {
    icon: Sprout,
    size: 85,
    color: "text-green-400",
    position: "bottom-40 right-1/4",
    delay: 6,
    opacity: "opacity-35"
  }
];

export function BackgroundElements() {
  return (
    <>
      {/* Enhanced layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-blue-50/80 to-emerald-50/80 backdrop-blur-sm -z-10" />
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm -z-10" />
      
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <motion.div 
          className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-green-200/30 to-blue-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-r from-purple-200/30 to-pink-200/30 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      {/* Floating nature elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none" role="presentation" aria-hidden="true">
        {backgroundElements.map((element, index) => (
          <motion.div 
            key={index}
            className={`absolute ${element.position}`}
            variants={floatingVariants}
            animate="floating"
            style={{ 
              animationDelay: `${element.delay}s`,
              willChange: 'transform'
            }}
          >
            <motion.div
              variants={pulseVariants}
              animate="pulse"
              style={{ animationDelay: `${element.delay + 1}s` }}
            >
              <element.icon 
                size={element.size} 
                className={`${element.color} ${element.opacity} filter drop-shadow-lg`} 
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Subtle particle effect */}
      <div className="absolute inset-0 -z-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-green-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
    </>
  );
}
