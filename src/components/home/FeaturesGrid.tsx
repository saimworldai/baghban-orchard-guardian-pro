
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { 
  Camera, 
  CloudRain, 
  Users, 
  Calendar,
  TrendingUp,
  Shield,
  Smartphone,
  BarChart3,
  Zap
} from 'lucide-react';

const features = [
  {
    icon: Camera,
    title: "AI Disease Detection",
    description: "Upload photos to instantly identify plant diseases with 98% accuracy. Get treatment recommendations within seconds.",
    benefits: ["Instant diagnosis", "Treatment plans", "Prevention tips"],
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50"
  },
  {
    icon: CloudRain,
    title: "Weather Intelligence",
    description: "Hyper-local weather forecasts and alerts help you make informed decisions about irrigation and protection.",
    benefits: ["7-day forecasts", "Smart alerts", "Irrigation guidance"],
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50"
  },
  {
    icon: Users,
    title: "Expert Consultation",
    description: "Connect with certified agricultural experts via video calls, chat, or scheduled consultations.",
    benefits: ["24/7 availability", "Certified experts", "Multi-language support"],
    color: "from-purple-500 to-violet-500",
    bgColor: "from-purple-50 to-violet-50"
  },
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "AI-optimized spray schedules based on weather, crop stage, and disease pressure for maximum effectiveness.",
    benefits: ["Weather integration", "Cost optimization", "Automated reminders"],
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-50 to-orange-50"
  },
  {
    icon: TrendingUp,
    title: "Yield Analytics",
    description: "Track and analyze your orchard's performance with detailed insights and recommendations for improvement.",
    benefits: ["Performance tracking", "Yield predictions", "ROI analysis"],
    color: "from-emerald-500 to-teal-500",
    bgColor: "from-emerald-50 to-teal-50"
  },
  {
    icon: Shield,
    title: "Risk Management",
    description: "Advanced monitoring systems to predict and prevent crop losses from diseases, pests, and weather.",
    benefits: ["Early warnings", "Risk assessment", "Insurance support"],
    color: "from-red-500 to-pink-500",
    bgColor: "from-red-50 to-pink-50"
  },
  {
    icon: Smartphone,
    title: "Mobile Optimized",
    description: "Full-featured mobile app that works offline, perfect for use in the field with poor connectivity.",
    benefits: ["Offline capability", "GPS tracking", "Photo sync"],
    color: "from-indigo-500 to-blue-500",
    bgColor: "from-indigo-50 to-blue-50"
  },
  {
    icon: BarChart3,
    title: "Business Intelligence",
    description: "Comprehensive reports and analytics to help you make data-driven decisions and improve profitability.",
    benefits: ["Custom reports", "Export data", "Trend analysis"],
    color: "from-slate-500 to-gray-500",
    bgColor: "from-slate-50 to-gray-50"
  },
  {
    icon: Zap,
    title: "Automation Hub",
    description: "Connect with IoT devices and automate irrigation, monitoring, and data collection across your orchard.",
    benefits: ["IoT integration", "Smart sensors", "Automated workflows"],
    color: "from-yellow-500 to-amber-500",
    bgColor: "from-yellow-50 to-amber-50"
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
  return (
    <motion.section 
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
          >
            <Card className="h-full bg-white/90 backdrop-blur-md border-gray-100 hover:border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
              
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`h-8 w-8 bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                  {feature.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>
                
                <div className="space-y-2">
                  {feature.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${feature.color}`} />
                      <span className="text-sm text-gray-600 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
