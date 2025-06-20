
import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Rocket, Shield, Zap, Users, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CTASection() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const scrollToDemo = () => {
    const demoSection = document.querySelector('#demo') || 
                       document.querySelector('[aria-label*="demo"]') ||
                       document.querySelector('.PublicDemoSection');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-emerald-600 to-blue-600 rounded-3xl" />
      <div className="absolute inset-0 bg-black/10 rounded-3xl" />
      
      {/* Floating Icons */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl">
        {[
          { icon: Rocket, position: "top-10 left-10", delay: 0 },
          { icon: Shield, position: "top-20 right-16", delay: 0.5 },
          { icon: Zap, position: "bottom-16 left-16", delay: 1 },
          { icon: Users, position: "bottom-10 right-20", delay: 1.5 },
          { icon: Star, position: "top-1/2 left-8", delay: 2 }
        ].map((item, index) => (
          <motion.div
            key={index}
            className={`absolute ${item.position}`}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 0.2, scale: 1 }}
            transition={{ delay: item.delay, duration: 0.5 }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, 0],
            }}
            style={{
              animationDuration: `${4 + index}s`,
              animationIterationCount: 'infinite',
              animationTimingFunction: 'ease-in-out',
            }}
          >
            <item.icon className="h-8 w-8 text-white/30" />
          </motion.div>
        ))}
      </div>
      
      <div className="relative z-10 text-center py-20 px-8">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 mb-8"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-5 w-5 text-white" />
          </motion.div>
          <span className="text-white font-semibold">Ready to Transform Your Farm?</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold text-white mb-6"
        >
          Experience Smart Farming
          <br />
          <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            Today, For Free
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Try our AI-powered tools instantly - no signup required! 
          Join thousands of farmers increasing yields by 45% with our platform.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Button
            size="lg"
            onClick={scrollToDemo}
            className="bg-white text-green-700 hover:bg-gray-100 px-12 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group border-0"
          >
            <Rocket className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
            Try Demo Now
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <Button
            size="lg"
            variant="outline"
            onClick={handleGetStarted}
            className="border-2 border-white text-white hover:bg-white hover:text-green-700 px-12 py-4 text-lg font-bold transition-all duration-300"
          >
            Sign Up for Full Access
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 flex justify-center items-center gap-8 text-white/70"
        >
          {[
            { icon: Users, text: "15K+ Farmers" },
            { icon: Star, text: "4.9★ Rating" },
            { icon: Shield, text: "Free to Try" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05, color: "#ffffff" }}
              transition={{ duration: 0.2 }}
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
