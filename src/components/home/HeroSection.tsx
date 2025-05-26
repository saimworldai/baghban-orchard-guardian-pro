
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  Star, 
  Sparkles, 
  CheckCircle, 
  Shield, 
  Users, 
  TrendingUp 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthProvider';

export function HeroSection() {
  const { user } = useAuth();

  return (
    <motion.div 
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="flex flex-col items-center justify-center mb-20 text-center relative"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        className="mb-8"
      >
        <Badge variant="outline" className="bg-gradient-to-r from-green-100 via-blue-100 to-purple-100 text-green-800 border-green-200 px-6 py-3 text-base font-semibold shadow-lg">
          <Sparkles className="w-5 h-5 mr-2" />
          🌱 Next-Generation Agricultural Intelligence
        </Badge>
      </motion.div>
      
      <motion.h1 
        className="text-7xl sm:text-8xl font-bold bg-gradient-to-br from-green-800 via-emerald-700 to-blue-700 bg-clip-text text-transparent mb-8 leading-tight"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        Baghban
      </motion.h1>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6 }}
      >
        <p className="text-3xl font-semibold text-green-700 mb-6">Your Intelligent Orchard Guardian</p>
        <p className="text-xl text-muted-foreground text-center max-w-4xl leading-relaxed mb-8">
          Transform your apple orchard with cutting-edge AI technology, real-time monitoring, and expert guidance. 
          Join thousands of farmers who've increased their yield by up to 45% with Baghban's revolutionary platform.
        </p>
      </motion.div>
      
      <motion.div 
        className="flex flex-wrap justify-center gap-4 mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      >
        {[
          { icon: CheckCircle, text: "AI-Powered Disease Detection" },
          { icon: Shield, text: "98% Accuracy Rate" },
          { icon: Users, text: "Expert Support 24/7" },
          { icon: TrendingUp, text: "Increase Yield by 45%" }
        ].map((item, index) => (
          <div key={index} className="flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
            <item.icon className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-sm font-medium text-gray-700">{item.text}</span>
          </div>
        ))}
      </motion.div>
      
      {!user && (
        <motion.div 
          className="flex flex-col sm:flex-row gap-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 100 }}
        >
          <Link to="/auth">
            <Button size="lg" className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 hover:from-green-700 hover:via-emerald-700 hover:to-green-800 shadow-xl hover:shadow-2xl transition-all duration-300 px-10 py-4 text-xl font-bold group transform hover:scale-105">
              Start Free Trial
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="border-2 border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 px-10 py-4 text-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300">
            <Star className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
