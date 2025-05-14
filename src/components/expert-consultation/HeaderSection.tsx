
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Video, Star, User, Calendar } from "lucide-react";
import { motion } from 'framer-motion';

interface HeaderSectionProps {
  onStartCall: () => void;
}

export function HeaderSection({ onStartCall }: HeaderSectionProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-100 shadow-md"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-green-800"
          >
            Expert Consultation
          </motion.h1>
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            🎁 First Consultation Free!
          </Badge>
        </div>
        <p className="text-green-600 max-w-lg">Get professional advice from verified agricultural experts on pest control, disease management, and orchard optimization.</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <div className="flex items-center gap-1 text-sm bg-white/80 px-3 py-1.5 rounded-full shadow-sm">
            <Star className="h-3.5 w-3.5 text-amber-500" />
            <span>4.9 Average Rating</span>
          </div>
          <div className="flex items-center gap-1 text-sm bg-white/80 px-3 py-1.5 rounded-full shadow-sm">
            <User className="h-3.5 w-3.5 text-blue-500" />
            <span>25+ Verified Experts</span>
          </div>
          <div className="flex items-center gap-1 text-sm bg-white/80 px-3 py-1.5 rounded-full shadow-sm">
            <Calendar className="h-3.5 w-3.5 text-purple-500" />
            <span>Available 24/7</span>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, type: "spring" }}
      >
        <Button
          size="lg"
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white gap-2 shadow-lg hover:shadow-xl transition-all"
          onClick={onStartCall}
        >
          <Video className="h-5 w-5" />
          Call an Agri-Doctor Now
        </Button>
      </motion.div>
    </motion.div>
  );
}
