
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  Equal,
  Thermometer,
  Droplet,
  Wind,
  Eye,
  BarChart3,
  Calendar
} from 'lucide-react';
import { type WeatherData } from '@/services/weatherService';

type WeatherComparisonProps = {
  currentWeather: WeatherData | null;
  location: { name: string; lat: number; lon: number } | null;
};

type ComparisonData = {
  parameter: string;
  current: number;
  previous: number;
  unit: string;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'stable';
  change: number;
};

export const WeatherComparison: React.FC<WeatherComparisonProps> = ({ 
  currentWeather,
  location 
}) => {
  const [comparisonPeriod, setComparisonPeriod] = useState<'hour' | 'day' | 'week'>('day');

  if (!currentWeather?.data?.[0]) {
    return null;
  }

  const weather = currentWeather.data[0];

  // Simulate historical data for comparison
  const getComparisonData = (): ComparisonData[] => {
    const multiplier = comparisonPeriod === 'hour' ? 0.95 : 
                     comparisonPeriod === 'day' ? 0.9 : 0.8;
    
    return [
      {
        parameter: 'Temperature',
        current: weather.temp,
        previous: weather.temp * multiplier + (Math.random() - 0.5) * 4,
        unit: '°C',
        icon: Thermometer,
        trend: 'up',
        change: 0
      },
      {
        parameter: 'Humidity',
        current: weather.rh,
        previous: weather.rh * (multiplier + 0.1) + (Math.random() - 0.5) * 10,
        unit: '%',
        icon: Droplet,
        trend: 'down',
        change: 0
      },
      {
        parameter: 'Wind Speed',
        current: weather.wind_spd,
        previous: weather.wind_spd * multiplier + (Math.random() - 0.5) * 2,
        unit: 'km/h',
        icon: Wind,
        trend: 'stable',
        change: 0
      },
      {
        parameter: 'Visibility',
        current: weather.vis || 10,
        previous: (weather.vis || 10) * multiplier + (Math.random() - 0.5) * 2,
        unit: 'km',
        icon: Eye,
        trend: 'up',
        change: 0
      }
    ].map(item => {
      const change = ((item.current - item.previous) / item.previous) * 100;
      const trend = Math.abs(change) < 2 ? 'stable' : 
                   change > 0 ? 'up' : 'down';
      
      return { ...item, change, trend };
    });
  };

  const comparisonData = getComparisonData();

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return TrendingUp;
      case 'down': return TrendingDown;
      case 'stable': return Equal;
      default: return Equal;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-100';
      case 'down': return 'text-red-600 bg-red-100';
      case 'stable': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatChange = (change: number) => {
    const sign = change > 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center text-indigo-800">
              <BarChart3 className="mr-2 h-5 w-5" />
              Weather Trends
            </div>
            <div className="flex gap-1">
              {(['hour', 'day', 'week'] as const).map((period) => (
                <Button
                  key={period}
                  variant={comparisonPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setComparisonPeriod(period)}
                  className="text-xs"
                >
                  <Calendar className="h-3 w-3 mr-1" />
                  {period === 'hour' ? '1H' : period === 'day' ? '1D' : '1W'}
                </Button>
              ))}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {comparisonData.map((data, index) => {
              const TrendIcon = getTrendIcon(data.trend);
              
              return (
                <motion.div
                  key={data.parameter}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white/60 p-4 rounded-lg border border-white/50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <data.icon className="h-5 w-5 text-indigo-600" />
                      <span className="font-medium text-gray-800">{data.parameter}</span>
                    </div>
                    <Badge className={`text-xs ${getTrendColor(data.trend)}`}>
                      <TrendIcon className="h-3 w-3 mr-1" />
                      {formatChange(data.change)}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Current</span>
                      <span className="text-lg font-bold text-indigo-800">
                        {data.current.toFixed(1)}{data.unit}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Previous {comparisonPeriod}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {data.previous.toFixed(1)}{data.unit}
                      </span>
                    </div>
                    
                    {/* Progress bar showing change */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          data.trend === 'up' ? 'bg-green-500' :
                          data.trend === 'down' ? 'bg-red-500' : 'bg-gray-400'
                        }`}
                        style={{
                          width: `${Math.min(100, Math.abs(data.change) * 5)}%`
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          <div className="text-center text-sm text-gray-600 bg-white/40 p-3 rounded-lg">
            <Calendar className="h-4 w-4 inline mr-2" />
            Comparing current conditions with {comparisonPeriod === 'hour' ? 'previous hour' : 
                                              comparisonPeriod === 'day' ? 'yesterday' : 'last week'} at {location?.name}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
