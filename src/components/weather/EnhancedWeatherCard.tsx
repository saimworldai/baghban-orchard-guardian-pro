
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from 'framer-motion';
import { 
  Cloud, 
  Thermometer, 
  Droplets, 
  Wind, 
  Sun, 
  CloudRain, 
  Snowflake,
  Zap,
  Eye,
  Gauge
} from "lucide-react";
import { type WeatherData } from '@/services/weatherService';

export interface EnhancedWeatherCardProps {
  currentWeather: WeatherData | null;
  location: {
    lat: number;
    lon: number;
    name: string;
    timestamp?: number;
    accuracy?: number;
  } | null;
}

export function EnhancedWeatherCard({ currentWeather, location }: EnhancedWeatherCardProps) {
  if (!currentWeather?.data?.[0] || !location) {
    return null;
  }

  const weather = currentWeather.data[0];

  const getWeatherIcon = (condition?: string) => {
    if (!condition) return Cloud;
    
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return Sun;
      case 'cloudy':
      case 'overcast':
        return Cloud;
      case 'rainy':
      case 'rain':
        return CloudRain;
      case 'snow':
        return Snowflake;
      case 'thunderstorm':
        return Zap;
      default:
        return Cloud;
    }
  };

  const getConditionColor = (condition?: string) => {
    if (!condition) return 'bg-gray-100 text-gray-800';
    
    switch (condition.toLowerCase()) {
      case 'sunny':
      case 'clear':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cloudy':
      case 'overcast':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rainy':
      case 'rain':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'snow':
        return 'bg-blue-50 text-blue-900 border-blue-100';
      case 'thunderstorm':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const WeatherIcon = getWeatherIcon(weather.weather?.description);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-lg border-white/50 shadow-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-2xl">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <WeatherIcon className="h-8 w-8 text-blue-600" />
            </motion.div>
            <div>
              <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Live Weather
              </span>
              <div className="text-sm font-normal text-gray-600 mt-1">
                📍 {location.name}
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Main Weather Display */}
          <div className="text-center py-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-6xl font-black text-gray-800 mb-2"
            >
              {Math.round(weather.temp)}°C
            </motion.div>
            <Badge className={`${getConditionColor(weather.weather?.description)} border px-4 py-2 text-lg font-semibold`}>
              {weather.weather?.description || 'Unknown'}
            </Badge>
          </div>

          {/* Primary Weather Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-red-50 to-orange-50 p-4 rounded-xl border border-red-100"
            >
              <div className="flex items-center gap-3">
                <Thermometer className="h-6 w-6 text-red-500" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Temperature</p>
                  <p className="text-xl font-bold text-gray-800">{Math.round(weather.temp)}°C</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-100"
            >
              <div className="flex items-center gap-3">
                <Droplets className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Humidity</p>
                  <p className="text-xl font-bold text-gray-800">{weather.rh}%</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100"
            >
              <div className="flex items-center gap-3">
                <Wind className="h-6 w-6 text-green-500" />
                <div>
                  <p className="text-sm text-gray-600 font-medium">Wind Speed</p>
                  <p className="text-xl font-bold text-gray-800">{Math.round(weather.wind_spd)} km/h</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Additional Weather Details */}
          {weather.pres && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200/50">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 rounded-xl border border-purple-100"
              >
                <div className="flex items-center gap-3">
                  <Gauge className="h-5 w-5 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Pressure</p>
                    <p className="text-lg font-bold text-gray-800">{weather.pres} hPa</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-gray-50 to-slate-50 p-4 rounded-xl border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Cloud className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Cloud Cover</p>
                    <p className="text-lg font-bold text-gray-800">{weather.clouds}%</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-indigo-50 to-blue-50 p-4 rounded-xl border border-indigo-100"
              >
                <div className="flex items-center gap-3">
                  <CloudRain className="h-5 w-5 text-indigo-500" />
                  <div>
                    <p className="text-sm text-gray-600 font-medium">Precipitation</p>
                    <p className="text-lg font-bold text-gray-800">{weather.precip} mm</p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}

          {/* Weather Quality Indicator */}
          <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-xl border border-green-200/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-green-600" />
                <span className="text-sm font-semibold text-green-800">Weather Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-green-700">Excellent</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
