
import React from 'react';
import { motion } from 'framer-motion';
import { WeatherCard } from './WeatherCard';
import { weatherThumbnails } from './WeatherThumbnails';
import { 
  Thermometer, 
  Wind, 
  Droplet, 
  Eye, 
  Gauge, 
  Sunrise, 
  Sunset,
  CloudRain,
  Compass,
  Sun
} from 'lucide-react';
import { type WeatherData } from '@/services/weatherService';

type DetailedWeatherGridProps = {
  currentWeather: WeatherData;
};

export const DetailedWeatherGrid: React.FC<DetailedWeatherGridProps> = ({ currentWeather }) => {
  if (!currentWeather.data || !currentWeather.data[0]) {
    return null;
  }

  const weather = currentWeather.data[0];

  const weatherCards = [
    {
      title: "Real Feel",
      icon: <Thermometer className="h-5 w-5 text-orange-600" />,
      value: Math.round(weather.app_temp),
      unit: "°C",
      description: "How the temperature actually feels",
      color: "orange",
      thumbnail: weatherThumbnails.temperature
    },
    {
      title: "Wind Speed",
      icon: <Wind className="h-5 w-5 text-blue-600" />,
      value: Math.round(weather.wind_spd),
      unit: "km/h",
      description: `Direction: ${weather.wind_cdir_full}`,
      color: "blue",
      thumbnail: weatherThumbnails.wind
    },
    {
      title: "Humidity",
      icon: <Droplet className="h-5 w-5 text-cyan-600" />,
      value: weather.rh,
      unit: "%",
      description: "Relative humidity in the air",
      color: "cyan",
      thumbnail: weatherThumbnails.humidity
    },
    {
      title: "Pressure",
      icon: <Gauge className="h-5 w-5 text-purple-600" />,
      value: weather.pres,
      unit: "hPa",
      description: "Atmospheric pressure",
      color: "purple",
      thumbnail: weatherThumbnails.pressure
    },
    {
      title: "Cloud Cover",
      icon: <Sun className="h-5 w-5 text-gray-600" />,
      value: weather.clouds,
      unit: "%",
      description: "Percentage of sky covered by clouds",
      color: "gray",
      thumbnail: weatherThumbnails.clouds
    },
    {
      title: "Precipitation",
      icon: <CloudRain className="h-5 w-5 text-blue-700" />,
      value: weather.precip.toFixed(1),
      unit: "mm",
      description: "Amount of rainfall",
      color: "blue",
      thumbnail: weatherThumbnails.precipitation
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="mb-8"
    >
      <h3 className="text-xl font-semibold mb-4 text-blue-800 flex items-center">
        <Gauge className="mr-2 h-5 w-5" />
        Detailed Weather Information
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {weatherCards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <WeatherCard {...card} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
