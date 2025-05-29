
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, AlertTriangle } from 'lucide-react';

type WeatherHeaderProps = {
  location: { name: string } | null;
  isOnline: boolean;
};

export const WeatherHeader: React.FC<WeatherHeaderProps> = ({ location, isOnline }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center max-w-3xl mx-auto mb-6"
    >
      <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
        Real-Time Weather Intelligence
      </h1>
      <p className="text-white/90 drop-shadow">
        Live geolocation-based weather monitoring with AI-powered spray recommendations
      </p>
      
      {location && (
        <div className="mt-4 bg-green-500/20 border border-green-400/30 text-green-100 px-4 py-2 rounded-lg backdrop-blur-sm flex items-center justify-center gap-2">
          <MapPin className="h-4 w-4" />
          Current Location: {location.name}
        </div>
      )}
      
      {!isOnline && (
        <div className="mt-4 bg-amber-500/20 border border-amber-400/30 text-amber-100 px-4 py-2 rounded-lg backdrop-blur-sm">
          <AlertTriangle className="inline h-4 w-4 mr-2" />
          Offline Mode - Data may not be current
        </div>
      )}
    </motion.div>
  );
};
