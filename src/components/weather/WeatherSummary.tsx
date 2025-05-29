
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Clock, 
  Calendar,
  Wifi,
  WifiOff
} from 'lucide-react';
import { type WeatherData } from '@/services/weatherService';

type WeatherSummaryProps = {
  currentWeather: WeatherData;
  lastUpdated: string;
  isOnline: boolean;
  location: { name: string } | null;
};

export const WeatherSummary: React.FC<WeatherSummaryProps> = ({ 
  currentWeather, 
  lastUpdated, 
  isOnline,
  location 
}) => {
  if (!currentWeather.data || !currentWeather.data[0]) {
    return null;
  }

  const weather = currentWeather.data[0];
  const currentTime = new Date().toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-6"
    >
      <Card className="bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-200">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-blue-700">
                <MapPin className="h-4 w-4" />
                <span className="font-medium">
                  {location?.name || `${currentWeather.city_name}, ${currentWeather.country_code}`}
                </span>
              </div>
              <Badge variant={isOnline ? "default" : "destructive"} className="flex items-center gap-1">
                {isOnline ? <Wifi className="h-3 w-3" /> : <WifiOff className="h-3 w-3" />}
                {isOnline ? "Live Data" : "Offline"}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{currentTime}</span>
              </div>
              {lastUpdated && (
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Updated: {lastUpdated}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-3 text-center">
            <p className="text-sm text-blue-600 font-medium">
              Current conditions: {weather.weather.description} • {Math.round(weather.temp)}°C
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
