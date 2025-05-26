
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { TreeDeciduous, Shield, UserCheck, Globe } from 'lucide-react';

const stats = [
  { value: '15K+', label: 'Happy Farmers', icon: TreeDeciduous, color: 'text-green-600' },
  { value: '98%', label: 'Disease Detection Accuracy', icon: Shield, color: 'text-blue-600' },
  { value: '24/7', label: 'Expert Support', icon: UserCheck, color: 'text-purple-600' },
  { value: '45+', label: 'Countries Served', icon: Globe, color: 'text-amber-600' }
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

export function StatsSection() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
    >
      {stats.map((stat, index) => (
        <motion.div key={stat.label} variants={itemVariants}>
          <Card className="text-center p-8 bg-white/90 backdrop-blur-md border-green-100 hover:shadow-xl hover:scale-105 transition-all duration-300 group">
            <CardContent className="p-0">
              <div className="flex flex-col items-center">
                <div className="p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className={`h-10 w-10 ${stat.color}`} />
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-green-700 to-blue-700 bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600 font-semibold">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}
