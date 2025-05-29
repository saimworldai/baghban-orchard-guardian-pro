
import React from 'react';
import { motion } from 'framer-motion';
import { Wind, Droplet, Check, AlertTriangle } from 'lucide-react';
import { getWeatherIcon, getSprayRecommendation, formatDay } from '@/services/weatherService';
import { 
  Cloud, Sun, CloudSun, CloudDrizzle, CloudSnow, CloudLightning, CloudRain
} from 'lucide-react';

type ForecastData = {
  temp: number;
  max_temp: number;
  min_temp: number;
  rh: number;
  wind_spd: number;
  precip: number;
  pop: number;
  weather: {
    icon: string;
    description: string;
    code: number;
  };
  datetime: string;
  valid_date: string;
};

type ForecastCardProps = {
  day: ForecastData;
  index: number;
};

export const ForecastCard: React.FC<ForecastCardProps> = ({ day, index }) => {
  const getIconComponent = (code: number) => {
    const iconName = getWeatherIcon(code);
    
    switch (iconName) {
      case "CloudLightning": return CloudLightning;
      case "CloudDrizzle": return CloudDrizzle;
      case "CloudRain": return CloudRain;
      case "CloudSnow": return CloudSnow;
      case "Cloud": return Cloud;
      case "Sun": return Sun;
      case "CloudSun": return CloudSun;
      default: return Cloud;
    }
  };

  const IconComponent = getIconComponent(day.weather.code);
  const sprayRecommendation = getSprayRecommendation(
    day.weather.code,
    day.wind_spd,
    day.precip,
    day.rh,
    day.temp
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="bg-white/90 rounded-xl shadow-md border border-blue-100 p-5 text-center hover:shadow-lg transition-all duration-300 hover:translate-y-[-2px]"
    >
      <h3 className="text-lg font-semibold text-blue-700">{formatDay(day.valid_date)}</h3>
      <IconComponent size={48} className="mx-auto my-3 text-blue-500" />
      <p className="text-2xl font-bold">{Math.round(day.temp)}°C</p>
      <p className="text-sm text-gray-600">{day.weather.description}</p>
      
      <div className="flex justify-between text-sm text-muted-foreground mt-2">
        <span>H: {Math.round(day.max_temp)}°</span>
        <span>L: {Math.round(day.min_temp)}°</span>
      </div>
      
      <div className="flex items-center justify-center gap-1 mt-2 text-sm text-blue-600">
        <Wind className="h-3 w-3" />
        <span>{Math.round(day.wind_spd)} km/h</span>
      </div>
      
      <div className="flex items-center justify-center gap-1 mt-1 text-sm text-blue-600">
        <Droplet className="h-3 w-3" />
        <span>{day.rh}%</span>
      </div>
      
      {day.pop > 0 && (
        <div className="mt-3 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100">
          {Math.round(day.pop)}% chance of rain
        </div>
      )}
      
      <div className={`mt-3 ${sprayRecommendation.recommended ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'} px-3 py-1.5 rounded-lg text-sm font-medium border flex items-center justify-center gap-1.5`}>
        {sprayRecommendation.recommended ? (
          <Check className="h-4 w-4" />
        ) : (
          <AlertTriangle className="h-4 w-4" />
        )}
        <span>
          {sprayRecommendation.recommended ? 'Spray OK' : 'Not Recommended'}
        </span>
      </div>
      
      <p className="mt-2 text-xs text-muted-foreground">
        {sprayRecommendation.reason}
      </p>
    </motion.div>
  );
};
