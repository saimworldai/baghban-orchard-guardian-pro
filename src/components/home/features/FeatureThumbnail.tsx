
import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { Star } from 'lucide-react';

interface FeatureThumbnailProps {
  icon: LucideIcon;
  secondaryIcon: LucideIcon;
  thumbnailBg: string;
  index: number;
}

export function FeatureThumbnail({ icon: Icon, secondaryIcon: SecondaryIcon, thumbnailBg, index }: FeatureThumbnailProps) {
  return (
    <div className={`h-32 w-full rounded-xl bg-gradient-to-br ${thumbnailBg} relative overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-300`}>
      {/* Background elements */}
      <div className="absolute inset-0 bg-white/10"></div>
      <div className="absolute top-3 right-3 w-6 h-6 bg-white/20 rounded-full"></div>
      <div className="absolute bottom-3 left-3 w-4 h-4 bg-white/15 rounded-full"></div>
      
      {/* Main content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          whileHover={{ scale: 1.2, rotate: 10 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative"
        >
          <Icon className="h-12 w-12 text-white drop-shadow-lg" />
          <motion.div
            className="absolute -top-1 -right-1"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <SecondaryIcon className="h-4 w-4 text-white/80" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Quality badge */}
      <div className="absolute top-2 left-2">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/90 rounded-full p-1"
        >
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
        </motion.div>
      </div>
      
      {/* Floating particles */}
      <motion.div
        animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-6 right-8 w-1 h-1 bg-white/50 rounded-full"
      />
      <motion.div
        animate={{ y: [0, -8, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-8 right-6 w-1.5 h-1.5 bg-white/40 rounded-full"
      />
    </div>
  );
}
