
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Star, 
  CalendarDays,
  ArrowRight,
  CheckCircle,
  Users
} from 'lucide-react';

const guarantees = [
  { icon: CheckCircle, text: "14-day free trial" },
  { icon: Shield, text: "No setup fees" },
  { icon: Users, text: "Cancel anytime" },
  { icon: Star, text: "Money-back guarantee" }
];

export function CTASection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-green-600 via-emerald-600 to-blue-600 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden shadow-2xl"
      role="region"
      aria-labelledby="cta-title"
    >
      {/* Enhanced background layers */}
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 id="cta-title" className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Transform Your Orchard?
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <p className="text-xl text-green-100 mb-8 max-w-2xl leading-relaxed">
              Join over 15,000 farmers worldwide who trust Baghban for smarter orchard management. 
              Start your free trial today and see results within the first week.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mb-8"
          >
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto lg:mx-0">
              {guarantees.map((guarantee, index) => (
                <motion.div
                  key={guarantee.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <guarantee.icon className="h-4 w-4 text-green-200" />
                  <span className="text-green-100">{guarantee.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
          >
            <Button 
              size="lg" 
              className="bg-white text-green-700 hover:bg-gray-100 shadow-xl font-bold px-12 py-4 text-lg transition-all duration-300 hover:scale-105 group"
              aria-label="Start your 14-day free trial"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="border-2 border-white text-white hover:bg-white/10 font-bold px-12 py-4 text-lg transition-all duration-300 hover:scale-105"
              aria-label="Schedule a personalized demo"
            >
              <CalendarDays className="mr-2 h-5 w-5" />
              Schedule Demo
            </Button>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="grid grid-cols-2 gap-6 lg:w-96"
        >
          {[
            { 
              icon: TrendingUp, 
              value: "45%", 
              label: "Yield Increase", 
              color: "from-yellow-400/20 to-orange-400/20",
              iconColor: "text-yellow-200"
            },
            { 
              icon: Shield, 
              value: "99.9%", 
              label: "Uptime", 
              color: "from-blue-400/20 to-purple-400/20",
              iconColor: "text-blue-200"
            },
            { 
              icon: Star, 
              value: "4.9", 
              label: "User Rating", 
              color: "from-pink-400/20 to-red-400/20",
              iconColor: "text-pink-200"
            },
            { 
              icon: CalendarDays, 
              value: "24/7", 
              label: "Support", 
              color: "from-green-400/20 to-teal-400/20",
              iconColor: "text-green-200"
            }
          ].map((item, index) => (
            <motion.div 
              key={index}
              className={`bg-gradient-to-br ${item.color} backdrop-blur-sm p-6 rounded-2xl text-center border border-white/20 shadow-lg`}
              whileHover={{ 
                scale: 1.05, 
                y: -5,
                transition: { type: "spring", stiffness: 300 }
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
            >
              <motion.div
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <item.icon className={`h-10 w-10 mx-auto mb-3 ${item.iconColor}`} />
              </motion.div>
              <div className="text-3xl font-bold mb-1">{item.value}</div>
              <div className="text-sm text-green-100 font-medium">{item.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="relative z-10 mt-12 text-center"
      >
        <p className="text-green-100 text-sm">
          Trusted by farmers in 45+ countries • SOC 2 Type II Compliant • 99.9% uptime SLA
        </p>
      </motion.div>
    </motion.section>
  );
}
