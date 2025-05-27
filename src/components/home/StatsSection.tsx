import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Zap, LeafyGreen, BarChart3, Shield, Clock, Star, CheckCircle } from 'lucide-react';

const stats = [
  {
    icon: Users,
    number: "15,000+",
    label: "Active Farmers",
    description: "Trust our platform",
    color: "from-blue-500 to-cyan-500",
    bgColor: "from-blue-50 to-cyan-50",
    thumbnailBg: "from-blue-500 to-cyan-600"
  },
  {
    icon: TrendingUp,
    number: "45%",
    label: "Yield Increase",
    description: "Average improvement",
    color: "from-green-500 to-emerald-500",
    bgColor: "from-green-50 to-emerald-50",
    thumbnailBg: "from-green-500 to-emerald-600"
  },
  {
    icon: Award,
    number: "98%",
    label: "Disease Detection",
    description: "Accuracy rate",
    color: "from-purple-500 to-indigo-500",
    bgColor: "from-purple-50 to-indigo-50",
    thumbnailBg: "from-purple-500 to-indigo-600"
  },
  {
    icon: Clock,
    number: "24/7",
    label: "Expert Support",
    description: "Always available",
    color: "from-amber-500 to-orange-500",
    bgColor: "from-amber-50 to-orange-50",
    thumbnailBg: "from-amber-500 to-orange-600"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

const statVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
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

export function StatsSection() {
  return (
    <motion.section 
      className="mb-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="text-center mb-16">
        <motion.div
          variants={statVariants}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-blue-100 px-4 py-2 rounded-full mb-6"
        >
          <BarChart3 className="h-4 w-4 text-green-600" />
          <span className="text-sm font-semibold text-green-800">Proven Results</span>
        </motion.div>
        <motion.h2 
          variants={statVariants}
          className="text-4xl md:text-5xl font-bold text-gray-800 mb-4"
        >
          Trusted by Thousands of Farmers
        </motion.h2>
        <motion.p 
          variants={statVariants}
          className="text-xl text-gray-600 max-w-3xl mx-auto"
        >
          See the impact our platform has made on orchards worldwide
        </motion.p>
      </div>

      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            variants={statVariants}
            whileHover={{ 
              y: -10, 
              scale: 1.05,
              transition: { type: "spring", stiffness: 300 }
            }}
            className="text-center group"
          >
            {/* Thumbnail */}
            <div className="relative mb-6 mx-auto">
              <div className={`w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br ${stat.thumbnailBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg relative overflow-hidden`}>
                {/* Background pattern */}
                <div className="absolute inset-0 bg-white/10"></div>
                <div className="absolute top-1 right-1 w-3 h-3 bg-white/20 rounded-full"></div>
                <div className="absolute bottom-1 left-1 w-2 h-2 bg-white/15 rounded-full"></div>
                
                {/* Main icon */}
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10"
                >
                  <stat.icon className="h-10 w-10 text-white drop-shadow-lg" />
                </motion.div>
                
                {/* Success indicator */}
                <div className="absolute -top-1 -right-1">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <CheckCircle className="w-3 h-3 text-white" />
                  </motion.div>
                </div>
              </div>
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5, type: "spring" }}
              className="mb-2"
            >
              <span className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                {stat.number}
              </span>
            </motion.div>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-1 group-hover:text-gray-900 transition-colors">
              {stat.label}
            </h3>
            <p className="text-sm text-gray-600">
              {stat.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={statVariants}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center gap-8 bg-white/80 backdrop-blur-md px-8 py-4 rounded-2xl shadow-lg border border-gray-100">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Enterprise Security</span>
          </div>
          <div className="flex items-center gap-2">
            <LeafyGreen className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Eco-Friendly Solutions</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Real-time Updates</span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
