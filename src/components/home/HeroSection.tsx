
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play, CheckCircle } from 'lucide-react';

const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const features = [
  "AI-powered disease detection",
  "Real-time weather alerts",
  "Expert consultation 24/7",
  "Smart spray scheduling"
];

export function HeroSection() {
  return (
    <motion.section 
      variants={heroVariants}
      initial="hidden"
      animate="visible"
      className="text-center mb-20 relative"
      role="banner"
      aria-labelledby="hero-title"
    >
      <motion.div variants={itemVariants} className="mb-8">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 backdrop-blur-md px-6 py-3 rounded-full border border-green-200/50 shadow-lg mb-6">
          <Sparkles className="h-4 w-4 text-green-600" />
          <span className="text-sm font-semibold text-green-800">
            Trusted by 15,000+ farmers worldwide
          </span>
        </div>
      </motion.div>

      <motion.h1 
        id="hero-title"
        variants={itemVariants}
        className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
      >
        <span className="bg-gradient-to-r from-green-700 via-emerald-600 to-blue-700 bg-clip-text text-transparent">
          Smart Orchard
        </span>
        <br />
        <span className="text-gray-800">
          Management
        </span>
      </motion.h1>

      <motion.p 
        variants={itemVariants}
        className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed"
      >
        Transform your orchard with AI-powered insights, real-time monitoring, 
        and expert guidance. Increase yields by up to 45% while reducing costs.
      </motion.p>

      <motion.div variants={itemVariants} className="mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl border border-green-100 shadow-sm"
            >
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-gray-700">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-6 justify-center items-center"
      >
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-12 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
          aria-label="Start your free trial now"
        >
          Start Free Trial
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        <Button 
          variant="outline" 
          size="lg"
          className="border-2 border-gray-300 hover:border-green-500 px-12 py-4 text-lg font-semibold transition-all duration-300 group"
          aria-label="Watch product demo video"
        >
          <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          Watch Demo
        </Button>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="mt-12 text-sm text-gray-500"
      >
        <p>
          ✓ No credit card required • ✓ 14-day free trial • ✓ Cancel anytime
        </p>
      </motion.div>
    </motion.section>
  );
}
