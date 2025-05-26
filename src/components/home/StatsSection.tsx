
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { TreeDeciduous, Shield, UserCheck, Globe, TrendingUp, Award } from 'lucide-react';

const stats = [
  { 
    value: '15K+', 
    label: 'Happy Farmers', 
    icon: TreeDeciduous, 
    color: 'text-green-600',
    bg: 'from-green-100 to-emerald-100',
    description: 'Worldwide community'
  },
  { 
    value: '98%', 
    label: 'Disease Detection Accuracy', 
    icon: Shield, 
    color: 'text-blue-600',
    bg: 'from-blue-100 to-cyan-100',
    description: 'AI-powered precision'
  },
  { 
    value: '24/7', 
    label: 'Expert Support', 
    icon: UserCheck, 
    color: 'text-purple-600',
    bg: 'from-purple-100 to-violet-100',
    description: 'Always available help'
  },
  { 
    value: '45+', 
    label: 'Countries Served', 
    icon: Globe, 
    color: 'text-amber-600',
    bg: 'from-amber-100 to-yellow-100',
    description: 'Global presence'
  },
  { 
    value: '45%', 
    label: 'Average Yield Increase', 
    icon: TrendingUp, 
    color: 'text-emerald-600',
    bg: 'from-emerald-100 to-green-100',
    description: 'Proven results'
  },
  { 
    value: '4.9★', 
    label: 'User Rating', 
    icon: Award, 
    color: 'text-orange-600',
    bg: 'from-orange-100 to-red-100',
    description: 'Highly rated platform'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 120,
      damping: 20,
      mass: 1
    } 
  }
};

const CounterAnimation = ({ value }: { value: string }) => {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        delay: 0.5
      }}
      className="text-4xl font-bold bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent"
    >
      {value}
    </motion.div>
  );
};

export function StatsSection() {
  return (
    <motion.section 
      className="mb-20"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
      role="region"
      aria-labelledby="stats-title"
    >
      <motion.div variants={itemVariants} className="text-center mb-12">
        <h2 id="stats-title" className="text-3xl font-bold text-gray-800 mb-4">
          Trusted by Farmers Worldwide
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join thousands of successful farmers who have transformed their orchards with our platform
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div key={stat.label} variants={itemVariants}>
            <Card className="text-center p-6 bg-white/95 backdrop-blur-md border-green-100 hover:shadow-2xl hover:scale-105 transition-all duration-500 group h-full">
              <CardContent className="p-0 flex flex-col items-center justify-between h-full">
                <div className="w-full">
                  <motion.div 
                    className={`p-4 bg-gradient-to-br ${stat.bg} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 mx-auto w-fit`}
                    whileHover={{ rotate: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </motion.div>
                  
                  <CounterAnimation value={stat.value} />
                  
                  <div className="text-sm font-semibold text-gray-700 mt-2 mb-1">
                    {stat.label}
                  </div>
                  
                  <div className="text-xs text-gray-500 leading-relaxed">
                    {stat.description}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="text-center mt-12"
      >
        <div className="inline-flex items-center gap-4 bg-gradient-to-r from-green-50 to-blue-50 px-6 py-3 rounded-full border border-green-200/50">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i}
                className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <span className="text-sm text-gray-600 font-medium">
            Loved by farmers from beginner to enterprise level
          </span>
        </div>
      </motion.div>
    </motion.section>
  );
}
