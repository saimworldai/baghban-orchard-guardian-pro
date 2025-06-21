
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { 
  Sun, 
  Cloud, 
  CloudRain, 
  Thermometer, 
  Wind, 
  Droplets,
  Eye,
  MapPin,
  Calendar,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

export function WeatherWidget() {
  const [selectedDay, setSelectedDay] = useState(0);

  // Mock weather data - in real app this would come from API
  const mockWeatherData = {
    current: {
      location: 'Punjab, India',
      temperature: 28,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      visibility: 8,
      uvIndex: 6
    },
    forecast: [
      { day: 'Today', high: 30, low: 22, condition: 'sunny', icon: Sun, rain: 10 },
      { day: 'Tomorrow', high: 32, low: 24, condition: 'cloudy', icon: Cloud, rain: 30 },
      { day: 'Wed', high: 29, low: 21, condition: 'rainy', icon: CloudRain, rain: 80 },
      { day: 'Thu', high: 27, low: 19, condition: 'rainy', icon: CloudRain, rain: 90 },
      { day: 'Fri', high: 31, low: 23, condition: 'sunny', icon: Sun, rain: 5 }
    ],
    alerts: [
      { type: 'warning', message: 'Heavy rain expected Wednesday', priority: 'high' },
      { type: 'info', message: 'Good conditions for spraying today', priority: 'medium' }
    ]
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'sunny': return 'from-yellow-400 to-orange-500';
      case 'cloudy': return 'from-gray-400 to-gray-600';
      case 'rainy': return 'from-blue-400 to-blue-600';
      default: return 'from-green-400 to-green-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Current Weather */}
      <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white border-0 overflow-hidden">
        <CardContent className="p-6 relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm opacity-90">{mockWeatherData.current.location}</span>
              </div>
              <Badge className="bg-white/20 text-white">Live</Badge>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-5xl font-bold mb-2">{mockWeatherData.current.temperature}°C</div>
                <div className="text-lg opacity-90">{mockWeatherData.current.condition}</div>
              </div>
              <Sun className="h-16 w-16 text-yellow-300" />
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/20">
              <div className="text-center">
                <Droplets className="h-5 w-5 mx-auto mb-1 opacity-80" />
                <div className="text-sm opacity-80">Humidity</div>
                <div className="font-semibold">{mockWeatherData.current.humidity}%</div>
              </div>
              <div className="text-center">
                <Wind className="h-5 w-5 mx-auto mb-1 opacity-80" />
                <div className="text-sm opacity-80">Wind</div>
                <div className="font-semibold">{mockWeatherData.current.windSpeed} km/h</div>
              </div>
              <div className="text-center">
                <Eye className="h-5 w-5 mx-auto mb-1 opacity-80" />
                <div className="text-sm opacity-80">Visibility</div>
                <div className="font-semibold">{mockWeatherData.current.visibility} km</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      {mockWeatherData.alerts.length > 0 && (
        <div className="space-y-3">
          {mockWeatherData.alerts.map((alert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`border-l-4 ${
                alert.priority === 'high' 
                  ? 'border-l-red-500 bg-red-50' 
                  : 'border-l-blue-500 bg-blue-50'
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`h-5 w-5 ${
                      alert.priority === 'high' ? 'text-red-600' : 'text-blue-600'
                    }`} />
                    <span className="font-medium text-gray-800">{alert.message}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* 5-Day Forecast */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">5-Day Forecast</h3>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              View Details
            </Button>
          </div>
          
          <div className="grid grid-cols-5 gap-3">
            {mockWeatherData.forecast.map((day, index) => (
              <motion.div
                key={index}
                className={`text-center p-4 rounded-lg cursor-pointer transition-all ${
                  selectedDay === index 
                    ? 'bg-blue-100 border-2 border-blue-300' 
                    : 'bg-gray-50 hover:bg-gray-100'
                }`}
                onClick={() => setSelectedDay(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-sm font-medium text-gray-600 mb-2">{day.day}</div>
                <day.icon className={`h-8 w-8 mx-auto mb-2 ${
                  day.condition === 'sunny' ? 'text-yellow-500' :
                  day.condition === 'cloudy' ? 'text-gray-500' :
                  'text-blue-500'
                }`} />
                <div className="text-sm font-semibold text-gray-800">{day.high}°</div>
                <div className="text-xs text-gray-500">{day.low}°</div>
                <div className="text-xs text-blue-600 mt-1">{day.rain}%</div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Farming Recommendations */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <h3 className="text-lg font-semibold text-green-800">Today's Farming Tips</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2" />
              <div>
                <div className="font-medium text-gray-800">Perfect conditions for field work</div>
                <div className="text-sm text-gray-600">Low humidity and moderate temperature ideal for outdoor activities</div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
              <div>
                <div className="font-medium text-gray-800">Plan ahead for Wednesday rain</div>
                <div className="text-sm text-gray-600">Complete outdoor tasks by Tuesday evening</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
