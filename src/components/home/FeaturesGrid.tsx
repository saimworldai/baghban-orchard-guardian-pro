
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  Camera, 
  CloudSun, 
  Sprout, 
  BookOpen, 
  UserCheck, 
  ShoppingCart,
  ArrowRight
} from 'lucide-react';

const features = [
  { 
    name: 'Disease Detection', 
    icon: Camera, 
    description: 'AI-powered image analysis for early detection of common apple tree diseases with 95% accuracy',
    color: 'from-red-500/20 to-orange-500/20',
    textColor: 'text-red-700',
    link: '/disease-detection',
    badge: 'AI Powered'
  },
  { 
    name: 'Weather Alerts', 
    icon: CloudSun, 
    description: 'Real-time weather forecasts and frost warnings with location-based precision',
    color: 'from-blue-500/20 to-cyan-500/20',
    textColor: 'text-blue-700',
    link: '/weather-alerts',
    badge: 'Real-time'
  },
  { 
    name: 'Spray Schedule', 
    icon: Sprout, 
    description: 'Smart spray scheduling system optimized for disease prevention and weather conditions',
    color: 'from-green-500/20 to-emerald-500/20',
    textColor: 'text-green-700',
    link: '/spray-schedule',
    badge: 'Smart'
  },
  { 
    name: 'Knowledge Hub', 
    icon: BookOpen, 
    description: 'Comprehensive guides and tutorials from agricultural experts worldwide',
    color: 'from-amber-500/20 to-yellow-500/20',
    textColor: 'text-amber-700',
    link: '#',
    badge: 'Expert Tips'
  },
  { 
    name: 'Expert Consultation', 
    icon: UserCheck, 
    description: 'Connect with certified agriculture experts for personalized guidance 24/7',
    color: 'from-purple-500/20 to-violet-500/20',
    textColor: 'text-purple-700',
    link: '/expert-consultation',
    badge: '24/7 Support'
  },
  { 
    name: 'Shop', 
    icon: ShoppingCart, 
    description: 'Quality tools, equipment, and supplies for professional orchard management',
    color: 'from-teal-500/20 to-cyan-500/20',
    textColor: 'text-teal-700',
    link: '#',
    badge: 'Premium Quality'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: { 
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
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20"
    >
      {features.map((feature, index) => (
        <motion.div key={feature.name} variants={itemVariants}>
          <Link to={feature.link} className="group block h-full">
            <Card className="relative overflow-hidden transition-all duration-500 group-hover:translate-y-[-12px] group-hover:shadow-2xl bg-white/95 backdrop-blur-md border-primary/10 h-full group-hover:border-primary/20">
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-40 group-hover:opacity-70 transition-opacity duration-500`}></div>
              <CardContent className="relative p-10 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="p-4 rounded-2xl bg-white/90 shadow-lg group-hover:scale-125 group-hover:rotate-6 transition-all duration-500">
                    <feature.icon size={36} className={`${feature.textColor}`} />
                  </div>
                  <Badge variant="secondary" className="bg-white/90 text-gray-700 text-sm font-semibold px-3 py-1">
                    {feature.badge}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-gray-800 transition-colors">
                  {feature.name}
                </h3>
                <p className="text-gray-600 leading-relaxed flex-grow text-lg">{feature.description}</p>
                <div className="mt-6 flex items-center text-base font-semibold text-gray-700 group-hover:text-gray-900">
                  Learn more 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
