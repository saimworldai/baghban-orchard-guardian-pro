
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Play, CheckCircle, Brain, Shield, Users, Zap, Scan, CloudRain, MessageCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const heroVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const features = [
  {
    text: "AI-powered disease detection",
    icon: Brain,
    secondaryIcon: Scan,
    color: "text-purple-600",
    bgColor: "from-purple-100 to-indigo-100",
    thumbnailBg: "from-purple-500 to-indigo-600",
    link: "/disease-detection"
  },
  {
    text: "Real-time weather alerts",
    icon: CloudRain,
    secondaryIcon: Shield,
    color: "text-blue-600", 
    bgColor: "from-blue-100 to-cyan-100",
    thumbnailBg: "from-blue-500 to-cyan-600",
    link: "/weather-alerts"
  },
  {
    text: "Expert consultation 24/7",
    icon: Users,
    secondaryIcon: MessageCircle,
    color: "text-emerald-600",
    bgColor: "from-emerald-100 to-green-100",
    thumbnailBg: "from-emerald-500 to-green-600",
    link: "/expert-consultation"
  },
  {
    text: "Smart spray scheduling",
    icon: Calendar,
    secondaryIcon: Zap,
    color: "text-amber-600",
    bgColor: "from-amber-100 to-yellow-100",
    thumbnailBg: "from-amber-500 to-yellow-600",
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="group cursor-pointer"
              onClick={() => handleFeatureClick(feature.link)}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Thumbnail Container */}
              <div className="relative overflow-hidden rounded-2xl mb-4 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                {/* Background Gradient */}
                <div className={`h-32 w-full bg-gradient-to-br ${feature.thumbnailBg} relative`}>
                  {/* Decorative Elements */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  <div className="absolute top-2 right-2 w-8 h-8 bg-white/20 rounded-full"></div>
                  <div className="absolute bottom-2 left-2 w-6 h-6 bg-white/15 rounded-full"></div>
                  
                  {/* Main Icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring" as const, stiffness: 300 }}
                      className="relative"
                    >
                      <feature.icon className="h-12 w-12 text-white drop-shadow-lg" />
                      {/* Secondary Icon */}
                      <motion.div
                        className="absolute -top-1 -right-1"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <feature.secondaryIcon className="h-5 w-5 text-white/80" />
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Floating particles */}
                  <div className="absolute top-4 left-4">
                    <motion.div
                      animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-2 h-2 bg-white/40 rounded-full"
                    />
                  </div>
                  <div className="absolute bottom-6 right-6">
                    <motion.div
                      animate={{ y: [0, -6, 0], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                      className="w-1.5 h-1.5 bg-white/30 rounded-full"
                    />
                  </div>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 rounded-2xl"></div>
              </div>

              {/* Text Content */}
              <div className={`bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm px-4 py-4 rounded-xl border border-white/50 shadow-md group-hover:shadow-lg transition-all duration-300`}>
                <span className="text-sm font-medium text-gray-700 leading-tight group-hover:text-gray-900 transition-colors block">
                  {feature.text}
                </span>
              </div>
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
