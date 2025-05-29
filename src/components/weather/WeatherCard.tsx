
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Thermometer, 
  Wind, 
  Droplet, 
  Eye, 
  Gauge, 
  Sunrise, 
  Sunset,
  CloudRain,
  Compass
} from 'lucide-react';

type WeatherCardProps = {
  title: string;
  icon: React.ReactNode;
  value: string | number;
  unit?: string;
  description?: string;
  color?: string;
  thumbnail?: string;
};

export const WeatherCard: React.FC<WeatherCardProps> = ({ 
  title, 
  icon, 
  value, 
  unit, 
  description, 
  color = "blue",
  thumbnail 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-white/90 to-blue-50/80 border border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300">
        {thumbnail && (
          <div 
            className="absolute inset-0 opacity-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${thumbnail})` }}
          />
        )}
        <CardContent className="relative p-4">
          <div className="flex items-center justify-between mb-2">
            <div className={`p-2 rounded-lg bg-${color}-100`}>
              {icon}
            </div>
            <Badge variant="secondary" className="text-xs">
              {title}
            </Badge>
          </div>
          <div className="space-y-1">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-gray-800">{value}</span>
              {unit && <span className="text-sm text-gray-600">{unit}</span>}
            </div>
            {description && (
              <p className="text-xs text-gray-600 leading-relaxed">{description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
