
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Star, 
  CalendarDays 
} from 'lucide-react';

export function CTASection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.8 }}
      className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden shadow-2xl"
    >
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20"></div>
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Orchard?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl leading-relaxed">
            Join over 15,000 farmers worldwide who trust Baghban for smarter orchard management. 
            Start your free trial today and see results within the first week.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 shadow-xl font-bold px-10 py-4 text-lg transition-all duration-300 hover:scale-105">
              <Sparkles className="mr-2 h-5 w-5" />
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/10 font-bold px-10 py-4 text-lg transition-all duration-300">
              Schedule Demo
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-6 lg:w-96">
          {[
            { icon: TrendingUp, value: "45%", label: "Yield Increase", color: "from-yellow-400/20 to-orange-400/20" },
            { icon: Shield, value: "99.9%", label: "Uptime", color: "from-blue-400/20 to-purple-400/20" },
            { icon: Star, value: "4.9", label: "User Rating", color: "from-pink-400/20 to-red-400/20" },
            { icon: CalendarDays, value: "24/7", label: "Support", color: "from-green-400/20 to-teal-400/20" }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className={`bg-gradient-to-br ${item.color} backdrop-blur-sm p-6 rounded-2xl text-center border border-white/20 shadow-lg`}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <item.icon className="h-10 w-10 mx-auto mb-3" />
              <div className="text-3xl font-bold mb-1">{item.value}</div>
              <div className="text-sm text-green-100 font-medium">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
