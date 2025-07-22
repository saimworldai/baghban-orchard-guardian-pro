
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Sparkles, 
  Play, 
  Brain, 
  Shield, 
  Users, 
  Zap, 
  Scan, 
  CloudRain, 
  MessageCircle, 
  Calendar,
  Award,
  TrendingUp,
  Leaf,
  Sun,
  Droplets,
  Wind,
  Star,
  CheckCircle
} from 'lucide-react';
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
    text: "AI Disease Detection",
    description: "Instant diagnosis with 95% accuracy",
    icon: Brain,
    secondaryIcon: Scan,
    color: "text-purple-600",
    bgColor: "from-purple-100 to-indigo-100",
    thumbnailBg: "from-purple-500 to-indigo-600",
    link: "/disease-detection",
    stats: "15k+ diseases detected"
  },
  {
    text: "Weather Intelligence",
    description: "Real-time alerts & predictions",
    icon: CloudRain,
    secondaryIcon: Shield,
    color: "text-blue-600", 
    bgColor: "from-blue-100 to-cyan-100",
    thumbnailBg: "from-blue-500 to-cyan-600",
    link: "/weather-alerts",
    stats: "99.2% accuracy rate"
  },
  {
    text: "Expert Network",
    description: "24/7 agricultural specialists",
    icon: Users,
    secondaryIcon: MessageCircle,
    color: "text-emerald-600",
    bgColor: "from-emerald-100 to-green-100",
    thumbnailBg: "from-emerald-500 to-green-600",
    link: "/expert-consultation",
    stats: "500+ certified experts"
  },
  {
    text: "Smart Scheduling",
    description: "Optimize spray timing & costs",
    icon: Calendar,
    secondaryIcon: Zap,
    color: "text-amber-600",
    bgColor: "from-amber-100 to-yellow-100",
    thumbnailBg: "from-amber-500 to-yellow-600",
    link: "/spray-schedule",
    stats: "45% cost reduction"
  }
];

const achievements = [
  { icon: Users, value: "15,000+", label: "Happy Farmers" },
  { icon: TrendingUp, value: "45%", label: "Yield Increase" },
  { icon: Award, value: "99.2%", label: "Accuracy Rate" },
  { icon: Leaf, value: "30%", label: "Less Pesticide" }
];

const weatherIcons = [Sun, CloudRain, Wind, Droplets];

export function EnhancedHeroSection() {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  const [activeWeatherIcon, setActiveWeatherIcon] = useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setActiveWeatherIcon((prev) => (prev + 1) % weatherIcons.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleFeatureClick = (link: string) => {
    navigate(link);
  };

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleWatchDemo = () => {
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
      className="text-center mb-20 relative overflow-hidden"
      role="banner"
      aria-labelledby="hero-title"
    >
      {/* Floating Weather Icons */}
      <div className="absolute inset-0 pointer-events-none">
        {weatherIcons.map((Icon, index) => (
          <motion.div
            key={index}
            className={`absolute ${
              index === 0 ? 'top-20 left-20' :
              index === 1 ? 'top-32 right-24' :
              index === 2 ? 'bottom-40 left-16' :
              'bottom-20 right-20'
            }`}
            animate={{
              y: [0, -20, 0],
              opacity: activeWeatherIcon === index ? [0.3, 0.6, 0.3] : 0.1,
              scale: activeWeatherIcon === index ? [1, 1.2, 1] : 0.8,
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon className="h-8 w-8 text-green-400" />
          </motion.div>
        ))}
      </div>

      {/* Trust Badge */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-100 to-blue-100 backdrop-blur-md px-8 py-4 rounded-full border border-green-200/50 shadow-xl mb-6">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-6 w-6 text-green-600" />
          </motion.div>
          <span className="text-base font-bold text-green-800">
            Trusted by 15,000+ farmers worldwide
          </span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Headline */}
      <motion.h1 
        id="hero-title"
        variants={itemVariants}
        className="text-6xl md:text-8xl font-black mb-8 leading-tight"
      >
        <span className="bg-gradient-to-r from-green-700 via-emerald-600 to-blue-700 bg-clip-text text-transparent">
          Smart Orchard
        </span>
        <br />
        <span className="text-gray-800 relative">
          Revolution
          <motion.div
            className="absolute -top-4 -right-8 text-2xl"
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🚀
          </motion.div>
        </span>
      </motion.h1>

      {/* Enhanced Subtitle */}
      <motion.div 
        variants={itemVariants}
        className="mb-12"
      >
        <p className="text-2xl md:text-3xl text-gray-600 mb-6 max-w-5xl mx-auto leading-relaxed font-medium">
          Transform your orchard with AI-powered insights, real-time monitoring, 
          and expert guidance. 
        </p>
        <div className="flex justify-center items-center gap-6 text-lg text-gray-700">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Increase yields by 45%</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span>Reduce costs by 30%</span>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Features Grid */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="group cursor-pointer relative"
              onClick={() => handleFeatureClick(feature.link)}
              onHoverStart={() => setHoveredFeature(index)}
              onHoverEnd={() => setHoveredFeature(null)}
              whileHover={{ scale: 1.05, y: -8 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Enhanced Thumbnail Container */}
              <div className="relative overflow-hidden rounded-3xl mb-6 shadow-2xl group-hover:shadow-3xl transition-all duration-500">
                {/* Background Gradient */}
                <div className={`h-40 w-full bg-gradient-to-br ${feature.thumbnailBg} relative`}>
                  {/* Animated Background Elements */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  <motion.div 
                    className="absolute top-4 right-4 w-12 h-12 bg-white/20 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute bottom-4 left-4 w-8 h-8 bg-white/15 rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                  />
                  
                  {/* Main Icon with Animation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.3, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative"
                    >
                      <feature.icon className="h-16 w-16 text-white drop-shadow-2xl" />
                      {/* Secondary Icon */}
                      <AnimatePresence>
                        {hoveredFeature === index && (
                          <motion.div
                            initial={{ scale: 0, opacity: 0, rotate: -180 }}
                            animate={{ scale: 1, opacity: 1, rotate: 0 }}
                            exit={{ scale: 0, opacity: 0, rotate: 180 }}
                            className="absolute -top-2 -right-2"
                          >
                            <feature.secondaryIcon className="h-6 w-6 text-white/90" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                  
                  {/* Optimized floating particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2 h-2 bg-white/40 rounded-full ${
                        i === 0 ? 'top-6 left-6' : i === 1 ? 'top-6 right-6' : 'bottom-6 left-1/2'
                      }`}
                      animate={{ 
                        y: [0, -10, 0], 
                        opacity: [0.3, 0.8, 0.3],
                      }}
                      transition={{ 
                        duration: 2 + i * 0.5, 
                        repeat: Infinity, 
                        delay: i * 0.3 
                      }}
                    />
                  ))}
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-3xl"></div>
              </div>

              {/* Enhanced Content Card */}
              <div className={`bg-gradient-to-br ${feature.bgColor} backdrop-blur-sm px-6 py-6 rounded-2xl border border-white/50 shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden`}>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 right-2 w-16 h-16 bg-white rounded-full blur-xl"></div>
                  <div className="absolute bottom-2 left-2 w-12 h-12 bg-white rounded-full blur-lg"></div>
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors">
                    {feature.text}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 bg-white/50 px-3 py-1 rounded-full">
                      {feature.stats}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievement Stats */}
      <motion.div variants={itemVariants} className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/50">
                <achievement.icon className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <div className="text-3xl font-black text-gray-800 mb-1">
                  {achievement.value}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {achievement.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Enhanced CTA Buttons */}
      <motion.div 
        variants={itemVariants}
        className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8"
      >
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-16 py-6 text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 group rounded-full"
          aria-label="Start your free trial now"
          onClick={handleGetStarted}
        >
          <Sparkles className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
          Start Free Trial
          <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
        </Button>
        
        <Button 
          variant="outline" 
          size="lg"
          className="border-3 border-gray-300 hover:border-green-500 hover:bg-green-50 px-16 py-6 text-xl font-bold transition-all duration-300 group rounded-full bg-white/80 backdrop-blur-sm"
          aria-label="Watch product demo video"
          onClick={handleWatchDemo}
        >
          <Play className="mr-3 h-6 w-6 group-hover:scale-125 transition-transform" />
          Watch Demo
        </Button>
      </motion.div>

      {/* Enhanced Trust Indicators */}
      <motion.div 
        variants={itemVariants}
        className="text-lg text-gray-600 bg-white/60 backdrop-blur-sm rounded-2xl px-8 py-4 mx-auto max-w-2xl border border-white/50"
      >
        <div className="flex justify-center items-center gap-6 flex-wrap">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="font-semibold">No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="font-semibold">14-day free trial</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="font-semibold">Cancel anytime</span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
