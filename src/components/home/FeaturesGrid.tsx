
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Brain, 
  CloudRain, 
  Users, 
  Calendar,
  TrendingUp,
  Shield,
  Smartphone,
  BarChart3,
  Zap,
  Scan,
  AlertTriangle,
  MessageCircle,
  Clock,
  Target,
  Lock,
  Download,
  PieChart,
  Cpu,
  ArrowRight,
  CheckCircle,
  Star,
  Sparkles
} from 'lucide-react';

const features = [
  {
    icon: Brain,
    secondaryIcon: Scan,
    title: "AI Disease Detection",
    description: "Upload photos to instantly identify plant diseases with 98% accuracy. Get treatment recommendations within seconds.",
    benefits: ["Instant diagnosis", "Treatment plans", "Prevention tips"],
    color: "from-purple-500 to-indigo-500",
    bgColor: "from-purple-50 to-indigo-50",
    accentColor: "border-purple-200",
    thumbnailBg: "from-purple-500 to-indigo-600",
    link: "/disease-detection"
  },
  {
    icon: CloudRain,
    secondaryIcon: AlertTriangle,
    title: "Weather Intelligence",
    description: "Hyper-local weather forecasts and alerts help you make informed decisions about irrigation and protection.",
    benefits: ["7-day forecasts", "Smart alerts", "Irrigation guidance"],
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50",
    accentColor: "border-blue-200",
    thumbnailBg: "from-blue-500 to-cyan-600",
    link: "/weather-alerts"
  },
  {
    icon: Users,
    secondaryIcon: MessageCircle,
    title: "Expert Consultation",
    description: "Connect with certified agricultural experts via video calls, chat, or scheduled consultations.",
    benefits: ["24/7 availability", "Certified experts", "Multi-language support"],
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50",
    accentColor: "border-emerald-200",
    thumbnailBg: "from-emerald-500 to-teal-600",
    link: "/expert-consultation"
  },
  {
    icon: Calendar,
    secondaryIcon: Clock,
    title: "Smart Scheduling",
    description: "AI-optimized spray schedules based on weather, crop stage, and disease pressure for maximum effectiveness.",
    benefits: ["Weather integration", "Cost optimization", "Automated reminders"],
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-50 to-orange-50",
    accentColor: "border-amber-200",
    thumbnailBg: "from-amber-500 to-orange-600",
    link: "/spray-schedule"
  },
  {
    icon: TrendingUp,
    secondaryIcon: Target,
    title: "Yield Analytics",
    description: "Track and analyze your orchard's performance with detailed insights and recommendations for improvement.",
    benefits: ["Performance tracking", "Yield predictions", "ROI analysis"],
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    accentColor: "border-green-200",
    thumbnailBg: "from-green-500 to-emerald-600",
    link: "/profile"
  },
  {
    icon: Shield,
    secondaryIcon: Lock,
    title: "Risk Management",
    description: "Advanced monitoring systems to predict and prevent crop losses from diseases, pests, and weather.",
    benefits: ["Early warnings", "Risk assessment", "Insurance support"],
    color: "from-red-500 to-pink-500",
    bgColor: "from-red-50 to-pink-50",
    accentColor: "border-red-200",
    thumbnailBg: "from-red-500 to-pink-600",
    link: "/weather-alerts"
  },
  {
    icon: Smartphone,
    secondaryIcon: Download,
    title: "Mobile Optimized",
    description: "Full-featured mobile app that works offline, perfect for use in the field with poor connectivity.",
    benefits: ["Offline capability", "GPS tracking", "Photo sync"],
    color: "from-indigo-500 to-purple-500",
    bgColor: "from-indigo-50 to-purple-50",
    accentColor: "border-indigo-200",
    thumbnailBg: "from-indigo-500 to-purple-600",
    link: "/disease-detection"
  },
  {
    icon: BarChart3,
    secondaryIcon: PieChart,
    title: "Business Intelligence",
    description: "Comprehensive reports and analytics to help you make data-driven decisions and improve profitability.",
    benefits: ["Custom reports", "Export data", "Trend analysis"],
    color: "from-slate-500 to-gray-500",
    bgColor: "from-slate-50 to-gray-50",
    accentColor: "border-slate-200",
    thumbnailBg: "from-slate-500 to-gray-600",
    link: "/profile"
  },
  {
    icon: Zap,
    secondaryIcon: Cpu,
    title: "Automation Hub",
    description: "Connect with IoT devices and automate irrigation, monitoring, and data collection across your orchard.",
    benefits: ["IoT integration", "Smart sensors", "Automated workflows"],
    color: "from-yellow-500 to-amber-500",
    bgColor: "from-yellow-50 to-amber-50",
    accentColor: "border-yellow-200",
    thumbnailBg: "from-yellow-500 to-amber-600",
    link: "/spray-schedule"
  }
];

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

      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={cardVariants}
            whileHover={{ 
              y: -10, 
              scale: 1.02,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="group cursor-pointer"
            onClick={() => handleFeatureClick(feature.link)}
          >
            <Card className={`h-full bg-white/90 backdrop-blur-md ${feature.accentColor} border-2 hover:shadow-2xl transition-all duration-500 overflow-hidden relative`}>
              <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
              
              {/* Thumbnail Section */}
              <div className="p-6 pb-0">
                <div className={`h-32 w-full rounded-xl bg-gradient-to-br ${feature.thumbnailBg} relative overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300`}>
                  {/* Background elements */}
                  <div className="absolute inset-0 bg-white/10"></div>
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white/20 rounded-full"></div>
                  <div className="absolute bottom-3 left-3 w-4 h-4 bg-white/15 rounded-full"></div>
                  
                  {/* Main content */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative"
                    >
                      <feature.icon className="h-12 w-12 text-white drop-shadow-lg" />
                      <motion.div
                        className="absolute -top-1 -right-1"
                        initial={{ scale: 0, opacity: 0 }}
                        whileHover={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <feature.secondaryIcon className="h-4 w-4 text-white/80" />
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Quality badge */}
                  <div className="absolute top-2 left-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/90 rounded-full p-1"
                    >
                      <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    </motion.div>
                  </div>
                  
                  {/* Floating particles */}
                  <motion.div
                    animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-6 right-8 w-1 h-1 bg-white/50 rounded-full"
                  />
                  <motion.div
                    animate={{ y: [0, -8, 0], opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
                    className="absolute bottom-8 right-6 w-1.5 h-1.5 bg-white/40 rounded-full"
                  />
                </div>
              </div>
              
              <CardHeader className="pb-4 pt-0">
                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors flex items-center justify-between">
                  {feature.title}
                  <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.3 }}
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color} flex-shrink-0`} />
                      <span className="text-sm text-gray-600 font-medium">{benefit}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}>
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
