
import React from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Wind, Droplet, CloudRain } from 'lucide-react';
import { getWeatherIcon, type WeatherData } from '@/services/weatherService';
import { 
  Cloud, Sun, CloudSun, CloudDrizzle, CloudSnow, CloudLightning
} from 'lucide-react';

type CurrentWeatherCardProps = {
  currentWeather: WeatherData;
};

export const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({ currentWeather }) => {
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

  if (!currentWeather.data || !currentWeather.data[0]) {
    return null;
  }

  const weather = currentWeather.data[0];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-center justify-between p-6 mb-8 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-100 backdrop-blur-sm"
    >
      {React.createElement(
        getIconComponent(weather.weather.code),
        { size: 74, className: "text-blue-500 drop-shadow-md" }
      )}
      <div className="text-center sm:text-left mt-4 sm:mt-0">
        <h2 className="text-2xl font-bold text-blue-800">{currentWeather.city_name}</h2>
        <p className="text-muted-foreground">{currentWeather.country_code}</p>
        <p className="text-5xl font-bold text-blue-700 mt-2 drop-shadow">
          {Math.round(weather.temp)}°C
        </p>
        <p className="text-md text-gray-600 mt-1 italic">
          {weather.weather.description}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-6 mt-6 sm:mt-0">
        <div className="flex flex-col items-center bg-white/60 p-3 rounded-lg">
          <div className="flex items-center text-blue-700">
            <Thermometer className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Feels like</span>
          </div>
          <span className="text-xl font-semibold">{Math.round(weather.app_temp)}°C</span>
        </div>
        <div className="flex flex-col items-center bg-white/60 p-3 rounded-lg">
          <div className="flex items-center text-blue-700">
            <Wind className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Wind</span>
          </div>
          <span className="text-xl font-semibold">{Math.round(weather.wind_spd)} km/h</span>
        </div>
        <div className="flex flex-col items-center bg-white/60 p-3 rounded-lg">
          <div className="flex items-center text-blue-700">
            <Droplet className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Humidity</span>
          </div>
          <span className="text-xl font-semibold">{weather.rh}%</span>
        </div>
        <div className="flex flex-col items-center bg-white/60 p-3 rounded-lg">
          <div className="flex items-center text-blue-700">
            <CloudRain className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Precip</span>
          </div>
          <span className="text-xl font-semibold">{weather.precip} mm</span>
        </div>
      </div>
    </motion.div>
  );
};
