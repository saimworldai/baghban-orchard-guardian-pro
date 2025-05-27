
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play, CheckCircle, Brain, Shield, Users, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  {
    text: "AI-powered disease detection",
    icon: Brain,
    color: "text-purple-600",
    bgColor: "from-purple-100 to-indigo-100",
    link: "/disease-detection"
  },
  {
    text: "Real-time weather alerts",
    icon: Shield,
    color: "text-blue-600", 
    bgColor: "from-blue-100 to-cyan-100",
    link: "/weather-alerts"
  },
  {
    text: "Expert consultation 24/7",
    icon: Users,
    color: "text-emerald-600",
    bgColor: "from-emerald-100 to-green-100",
    link: "/expert-consultation"
  },
  {
    text: "Smart spray scheduling",
    icon: Zap,
    color: "text-amber-600",
    bgColor: "from-amber-100 to-yellow-100",
    link: "/spray-schedule"
  }
];

export function HeroSection() {
  const navigate = useNavigate();

  const handleFeatureClick = (link: string) => {
    navigate(link);
  };

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleWatchDemo = () => {
    // For now, scroll to features section or show a demo modal
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-blue-100 backdrop-blur-md px-6 py-3 rounded-full border border-green-200/50 shadow-lg mb-6">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-5 w-5 text-green-600" />
          </motion.div>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className={`flex items-center gap-3 bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm px-4 py-4 rounded-xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer`}
              onClick={() => handleFeatureClick(feature.link)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex-shrink-0"
              >
                <feature.icon className={`h-5 w-5 ${feature.color}`} />
              </motion.div>
              <span className="text-sm font-medium text-gray-700 leading-tight group-hover:text-gray-900 transition-colors">{feature.text}</span>
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
          onClick={handleGetStarted}
        >
          Start Free Trial
          <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        <Button 
          variant="outline" 
          size="lg"
          className="border-2 border-gray-300 hover:border-green-500 px-12 py-4 text-lg font-semibold transition-all duration-300 group"
          aria-label="Watch product demo video"
          onClick={handleWatchDemo}
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
